import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";
import { getServiceById } from "@/lib/services";
import { sendEmail } from "@/lib/resend";
import { OrderConfirmationEmail } from "@/components/emails/order-confirmation-email";

// Needs the Node runtime (not edge) for Stripe's signature verification and Prisma
export const runtime = "nodejs";

let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
  });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const idQtyPairs = (session.metadata?.service_ids ?? "")
    .split(",")
    .filter(Boolean)
    .map((pair) => {
      const [id, qty] = pair.split(":");
      return { id, quantity: Number(qty) || 1 };
    });

  const resolvedServices = idQtyPairs
    .map(({ id, quantity }) => {
      const service = getServiceById(id);
      return service ? { service, quantity } : null;
    })
    .filter((s): s is { service: NonNullable<ReturnType<typeof getServiceById>>; quantity: number } => s !== null);

  const projectTitle = resolvedServices.map((s) => s.service.nameHe).join(", ") || "הזמנת שירות";
  const projectType = resolvedServices[0]?.service.category ?? "architecture_services";
  const serviceNames = resolvedServices.flatMap((s) => Array(s.quantity).fill(s.service.nameHe));

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  // Stripe may redeliver the same event — only the first delivery should trigger emails
  const alreadyExists = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
    select: { id: true },
  });

  const order = await prisma.order.upsert({
    where: { stripeSessionId: session.id },
    create: {
      stripeSessionId: session.id,
      stripePaymentId: paymentIntentId,
      status: "CONFIRMED",
      totalAmount: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? "ils").toUpperCase(),
      customerEmail: session.customer_details?.email ?? null,
      customerName: session.customer_details?.name ?? null,
      customerPhone: session.customer_details?.phone ?? null,
      projectTitle,
      projectType,
      services: serviceNames,
    },
    update: {
      status: "CONFIRMED",
      stripePaymentId: paymentIntentId,
      customerEmail: session.customer_details?.email ?? null,
      customerName: session.customer_details?.name ?? null,
      customerPhone: session.customer_details?.phone ?? null,
    },
  });

  if (!alreadyExists) {
    await sendOrderEmails(order);
  }
}

async function sendOrderEmails(order: {
  id: string;
  customerEmail: string | null;
  customerName: string | null;
  services: string[];
  totalAmount: number;
  currency: string;
  projectTitle: string;
}) {
  // Email failures shouldn't fail the webhook (which would make Stripe retry the whole handler)
  try {
    if (order.customerEmail) {
      const html = await render(
        OrderConfirmationEmail({
          name: order.customerName || "לקוח יקר",
          orderNumber: order.id,
          services: order.services,
          totalAmount: order.totalAmount,
          currency: order.currency,
        })
      );
      const result = await sendEmail({
        to: order.customerEmail,
        subject: `התשלום התקבל בהצלחה - הזמנה ${order.id}`,
        html,
      });
      if (!result.success) {
        console.error("Order confirmation email failed:", result.error);
      }
    }

    const adminEmail = process.env.RESEND_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const result = await sendEmail({
        to: adminEmail,
        subject: `💰 הזמנה חדשה שולמה - ${order.projectTitle}`,
        html: `<div dir="rtl" style="font-family: Arial, sans-serif;">
          <h2>התקבל תשלום עבור הזמנה חדשה</h2>
          <p><strong>מספר הזמנה:</strong> ${order.id}</p>
          <p><strong>לקוח:</strong> ${order.customerName || "לא צוין"} (${order.customerEmail || "לא צוין"})</p>
          <p><strong>שירותים:</strong> ${order.services.join(", ") || order.projectTitle}</p>
          <p><strong>סכום:</strong> ${order.totalAmount.toLocaleString()} ${order.currency}</p>
        </div>`,
      });
      if (!result.success) {
        console.error("Admin order notification email failed:", result.error);
      }
    }
  } catch (error) {
    console.error("Error sending order emails:", error);
  }
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    // Return 500 so Stripe retries the webhook on transient failures (e.g. DB hiccup)
    console.error("Error processing Stripe webhook:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
