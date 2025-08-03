import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { QuoteResponseEmail } from "@/components/emails/quote-response-email";
import { render } from "@react-email/render";

// Validation schema for quote response email
const QuoteResponseSchema = z.object({
  customerEmail: z.string().email("Valid customer email is required"),
  customerName: z.string().min(1, "Customer name is required"),
  quoteAmount: z.string().min(1, "Quote amount is required"),
  services: z.array(z.string()).min(1, "At least one service is required"),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated admin
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = QuoteResponseSchema.parse(body);

    // Generate email with React Email
    const emailHtml = await render(QuoteResponseEmail({
      customerName: validatedData.customerName,
      quoteAmount: validatedData.quoteAmount,
      services: validatedData.services,
      notes: validatedData.notes,
    }));

    // Send email to customer
    const result = await sendEmail({
      to: validatedData.customerEmail,
      subject: `הצעת המחיר שלך מרותם אדריכלות ועיצוב - ${validatedData.quoteAmount}`,
      html: emailHtml,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Quote response email sent successfully",
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending quote response email:", error);
    
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
