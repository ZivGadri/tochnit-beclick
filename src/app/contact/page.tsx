"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(9, "מספר טלפון חייב להכיל לפחות 9 ספרות"),
  subject: z.string().min(5, "נושא חייב להכיל לפחות 5 תווים"),
  message: z.string().min(10, "הודעה חייבת להכיל לפחות 10 תווים"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send email notification to admin
      const emailResponse = await fetch('/api/email/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: `${data.subject ? `נושא: ${data.subject}\n\n` : ''}${data.message}`,
        }),
      });

      const emailResult = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(emailResult.error || 'Failed to send email');
      }

      console.log("Contact form submitted successfully:", data);
      console.log("Email sent:", emailResult);
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full">
        <Header />
        <main className="w-full py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                תודה על פנייתכם!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                קיבלנו את הודעתכם ונחזור אליכם בהקדם האפשרי, בדרך כלל תוך 24 שעות.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                שלח הודעה נוספת
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              צרו קשר
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-8">
              מוזמנים ליצור קשר לכל שאלה, ייעוץ או לתיאום פגישה. נשמח לעזור לכם 
              להגשים את החלום האדריכלי שלכם
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  פרטי התקשרות
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">כתובת המשרד</h3>
                      <p className="text-gray-600">
                        רחוב הרצל 25<br />
                        תל אביב-יפו 6571234<br />
                        ישראל
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">טלפון</h3>
                      <p className="text-gray-600" dir="ltr">03-1234567</p>
                      <p className="text-gray-600" dir="ltr">050-1234567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">דואר אלקטרוני</h3>
                      <p className="text-gray-600" dir="ltr">rotem@architecture.co.il</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">שעות פעילות</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>ראשון - חמישי: 09:00 - 18:00</p>
                        <p>יום שישי: 09:00 - 14:00</p>
                        <p>שבת: סגור</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">פגישות ייעוץ</h3>
                  <p className="text-blue-700 text-sm">
                    פגישת הייעוץ הראשונה חינם! קבעו פגישה לדיון ראשוני על הפרויקט שלכם
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>שלחו לנו הודעה</CardTitle>
                    <CardDescription>
                      מלאו את הטופס ונחזור אליכם בהקדם האפשרי
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>שם מלא *</FormLabel>
                                <FormControl>
                                  <Input placeholder="הזינו את שמכם המלא" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>טלפון *</FormLabel>
                                <FormControl>
                                  <Input placeholder="050-1234567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>דוא&quot;ל *</FormLabel>
                              <FormControl>
                                <Input placeholder="your@email.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>נושא ההודעה *</FormLabel>
                              <FormControl>
                                <Input placeholder="באיזה נושא תרצו לדבר?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>הודעה *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="ספרו לנו על הפרויקט שלכם או השאלות שיש לכם..."
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full md:w-auto"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full me-2"></div>
                              שולח...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 me-2" />
                              שלח הודעה
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                מיקום המשרד
              </h2>
              <p className="text-xl text-gray-600">
                מוזמנים לבקר במשרד שלנו בלב תל אביב
              </p>
            </div>
            
            <div className="bg-gray-200 rounded-lg aspect-[16/9] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">מפה אינטראקטיבית תתווסף כאן</p>
                <p className="text-sm">רחוב הרצל 25, תל אביב-יפו</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
