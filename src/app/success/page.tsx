"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    amount: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Here you would typically verify the session with Stripe
      // and get order details from your database
      setTimeout(() => {
        setOrderDetails({
          orderNumber: `ORD-${Date.now()}`,
          amount: "12,500",
          email: "customer@example.com",
        });
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full">
        <Header />
        <main className="w-full py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">מאמת את התשלום...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!sessionId || !orderDetails) {
    return (
      <div className="min-h-screen w-full">
        <Header />
        <main className="w-full py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              לא נמצאו פרטי הזמנה
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              אירעה שגיאה באיתור פרטי ההזמנה שלכם
            </p>
            <Button asChild>
              <Link href="/">חזור לעמוד הבית</Link>
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
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              התשלום בוצע בהצלחה!
            </h1>
            <p className="text-xl text-gray-600">
              תודה שבחרתם בשירותי האדריכלות שלנו
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>פרטי ההזמנה</CardTitle>
              <CardDescription>
                אישור ההזמנה נשלח לכתובת האימייל שציינתם
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">מספר הזמנה</p>
                  <p className="font-semibold">{orderDetails.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">סכום ששולם</p>
                  <p className="font-semibold">₪{orderDetails.amount}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">השלבים הבאים</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">אישור בדוא&quot;ל</p>
                      <p className="text-sm text-gray-600">
                        נשלח אישור מפורט לכתובת: {orderDetails.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">תיאום פגישה</p>
                      <p className="text-sm text-gray-600">
                        נחזור אליכם תוך 24 שעות לתיאום פגישת ייעוץ ותכנון
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">תחילת הפרויקט</p>
                      <p className="text-sm text-gray-600">
                        נתחיל לעבוד על הפרויקט שלכם מיד לאחר הפגישה הראשונה
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  יש לכם שאלות? צרו קשר איתנו בכל עת
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild variant="outline">
                    <Link href="/contact">צרו קשר</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/">
                      חזור לעמוד הבית
                      <ArrowLeft className="ms-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full">
        <Header />
        <main className="w-full py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">טוען...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
