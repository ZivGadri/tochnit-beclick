"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe (you'll need to add your publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);
    try {
      // Here we would integrate with Stripe
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.service.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe error:", error);
          alert("אירעה שגיאה בעיבוד התשלום");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("אירעה שגיאה בעיבוד התשלום. אנא נסו שוב");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen w-full">
        <Header />
        <main className="w-full py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              העגלה שלכם ריקה
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              הוסיפו שירותים לעגלה כדי להמשיך
            </p>
            <Button asChild size="lg">
              <Link href="/services">
                צפו בשירותים שלנו
                <ArrowLeft className="ms-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              עגלת הקניות שלכם
            </h1>
            <p className="text-gray-600">
              {itemCount} פריטים בעגלה
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.service.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-gray-300 rounded"></div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item.service.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.service.description}
                        </p>
                        <p className="text-xl font-bold text-primary mt-2">
                          ₪{item.service.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.service.id, Math.max(0, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.service.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>סיכום הזמנה</CardTitle>
                  <CardDescription>
                    פרטי ההזמנה והתשלום
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.service.id} className="flex justify-between text-sm">
                        <span>
                          {item.service.name} × {item.quantity}
                        </span>
                        <span>₪{(item.service.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  
                  <hr />
                  
                  <div className="flex justify-between text-sm">
                    <span>סך הכל לפני מע״ם</span>
                    <span>₪{Math.round(total / 1.17).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>מע״ם (17%)</span>
                    <span>₪{Math.round(total - (total / 1.17)).toLocaleString()}</span>
                  </div>
                  
                  <hr />
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>סך הכל לתשלום</span>
                    <span>₪{total.toLocaleString()}</span>
                  </div>

                  <div className="space-y-3 mt-6">
                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      size="lg"
                      className="w-full"
                    >
                      {isProcessing ? "מעבד..." : "לתשלום מאובטח"}
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      <Link href="/services">המשך קניות</Link>
                    </Button>
                  </div>

                  <div className="mt-6 text-xs text-gray-500 text-center">
                    <p>תשלום מאובטח באמצעות Stripe</p>
                    <p>כל הכרטיסים מוגנים בהצפנה</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
