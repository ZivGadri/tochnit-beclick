import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceById } from "@/lib/services";

// Initialize Stripe only if the secret key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable." },
        { status: 500 }
      );
    }

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    // Resolve prices/names from the server-side catalog — never trust client-submitted price or name
    const resolvedItems: { id: string; quantity: number }[] = [];
    for (const item of items as { id: string; quantity: number }[]) {
      const quantity = Number(item?.quantity);
      if (!item?.id || !Number.isInteger(quantity) || quantity < 1) {
        return NextResponse.json(
          { error: `Invalid item: ${JSON.stringify(item)}` },
          { status: 400 }
        );
      }
      const service = getServiceById(item.id);
      if (!service) {
        return NextResponse.json(
          { error: `Unknown service id: ${item.id}` },
          { status: 400 }
        );
      }
      resolvedItems.push({ id: service.id, quantity });
    }

    const lineItems = resolvedItems.map(({ id, quantity }) => {
      const service = getServiceById(id)!;
      return {
        price_data: {
          currency: "ils", // Israeli Shekel
          product_data: {
            name: service.nameHe,
            description: "שירות אדריכלות ועיצוב פנים",
          },
          unit_amount: Math.round(service.price * 100), // Stripe expects amount in agorot (cents)
        },
        quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cart`,
      metadata: {
        order_type: "architecture_services",
        service_ids: resolvedItems.map((i) => `${i.id}:${i.quantity}`).join(","),
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IL"], // Israel only
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
