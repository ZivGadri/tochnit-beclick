import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { QuoteRequestAdminEmail } from "@/components/emails/quote-request-admin";
import { ThankYouEmail } from "@/components/emails/thank-you-email";
import { render } from "@react-email/render";

// Validation schema for quote request email
const QuoteRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  services: z.array(z.string()).min(1, "At least one service is required"),
  budget: z.string().min(1, "Budget is required"),
  description: z.string().min(1, "Description is required"),
  files: z.array(z.string()).optional(),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification is required"),
  // Additional fields from the actual form
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  projectType: z.string().optional(),
  projectSize: z.string().optional(),
  timeline: z.string().optional(),
  location: z.string().optional(),
  specialRequirements: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = QuoteRequestSchema.parse(body);

    // Verify reCAPTCHA first
    const recaptchaResult = await verifyRecaptcha(
      validatedData.recaptchaToken,
      'quote_submission', // expected action
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

    // Save quote request to database
    const quoteRequest = await prisma.quote.create({
      data: {
        // Basic info
        firstName: validatedData.firstName || validatedData.name.split(' ')[0] || validatedData.name,
        lastName: validatedData.lastName || validatedData.name.split(' ')[1] || '',
        email: validatedData.email,
        phone: validatedData.phone,
        
        // Project details
        projectType: validatedData.projectType || "",
        projectSize: validatedData.projectSize || "",
        budget: validatedData.budget,
        timeline: validatedData.timeline || "",
        location: validatedData.location || "",
        
        // Services and description
        services: validatedData.services,
        description: validatedData.description,
        specialRequirements: validatedData.specialRequirements,
        
        // Terms (default values since not provided in this API)
        agreeToTerms: true,
        allowMarketing: false,
        
        // Status
        status: "PENDING",
      },
    });

    // Generate admin email with React Email
    const adminEmailHtml = await render(QuoteRequestAdminEmail({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      services: validatedData.services,
      budget: validatedData.budget,
      description: validatedData.description,
      projectType: validatedData.projectType,
      projectSize: validatedData.projectSize,
      timeline: validatedData.timeline,
      location: validatedData.location,
      specialRequirements: validatedData.specialRequirements,
      files: validatedData.files,
    }));

    // Send email to admin
    const adminResult = await sendEmail({
      to: adminEmail,
      subject: `🏠 בקשת הצעת מחיר חדשה מ-${validatedData.name}`,
      html: adminEmailHtml,
    });

    // Generate thank you email with React Email
    const thankYouHtml = await render(ThankYouEmail({
      name: validatedData.name,
      type: 'quote',
    }));

    // Send thank you email to customer
    const customerResult = await sendEmail({
      to: validatedData.email,
      subject: `תודה על בקשת הצעת המחיר שלך - רותם אדריכלות ועיצוב`,
      html: thankYouHtml,
    });

    if (adminResult.success) {
      // Log if customer email failed but don't fail the request
      if (!customerResult.success) {
        console.error("Customer thank you email failed:", customerResult.error);
      }

      return NextResponse.json({
        success: true,
        message: "Quote request email sent successfully",
        messageId: adminResult.messageId,
        quoteId: quoteRequest.id,
      });
    } else {
      // If email fails, we should still keep the database record but log the error
      console.error("Email failed but quote saved:", adminResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: "Quote saved but email notification failed",
          quoteId: quoteRequest.id 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing quote request:", error);
    
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
