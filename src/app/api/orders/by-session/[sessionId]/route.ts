import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  const order = await prisma.order.findUnique({
    where: { stripeSessionId: sessionId },
  });

  if (order) {
    return NextResponse.json({
      status: order.status,
      orderNumber: order.id,
      amount: order.totalAmount,
      currency: order.currency,
      email: order.customerEmail,
    });
  }

  // Webhook may not have landed yet — fall back to asking Stripe directly so the
  // page can still show something instead of a hard error while the client polls.
  if (!stripe) {
    return NextResponse.json({ status: "PENDING" }, { status: 202 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      return NextResponse.json({
        status: "PENDING",
        orderNumber: null,
        amount: (session.amount_total ?? 0) / 100,
        currency: (session.currency ?? "ils").toUpperCase(),
        email: session.customer_details?.email ?? null,
      }, { status: 202 });
    }
    return NextResponse.json({ status: "PENDING" }, { status: 202 });
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}
