import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { z } from "zod";
import { ContactFormAdminEmail } from "@/components/emails/contact-form-admin";
import { ThankYouEmail } from "@/components/emails/thank-you-email";
import { render } from "@react-email/render";

// Validation schema for contact form email
const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ContactFormSchema.parse(body);

    // Verify reCAPTCHA first
    const recaptchaResult = await verifyRecaptcha(
      validatedData.recaptchaToken, 
      'contact_submission', // expected action
      0.5 // minimum score
    );
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: recaptchaResult.error || "reCAPTCHA verification failed",
          score: recaptchaResult.score 
        },
        { status: 400 }
      );
    }

    // Get admin email from environment
    const adminEmail = process.env.RESEND_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.error("Admin email not configured");
      return NextResponse.json(
        { success: false, error: "Admin email not configured" },
        { status: 500 }
      );
    }

    // Generate admin email with React Email
    const adminEmailHtml = await render(ContactFormAdminEmail({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
    }));

    // Send email to admin
    const adminResult = await sendEmail({
      to: adminEmail,
      subject: `💬 הודעת קשר חדשה מ-${validatedData.name}`,
      html: adminEmailHtml,
    });

    // Generate thank you email with React Email
    const thankYouHtml = await render(ThankYouEmail({
      name: validatedData.name,
      type: 'contact',
    }));

    // Send thank you email to customer
    const customerResult = await sendEmail({
      to: validatedData.email,
      subject: `תודה על פנייתך אלינו - רותם אדריכלות ועיצוב`,
      html: thankYouHtml,
    });

    if (adminResult.success) {
      // Log if customer email failed but don't fail the request
      if (!customerResult.success) {
        console.error("Customer thank you email failed:", customerResult.error);
      }

      return NextResponse.json({
        success: true,
        message: "Contact form email sent successfully",
        messageId: adminResult.messageId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: adminResult.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending contact form email:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
