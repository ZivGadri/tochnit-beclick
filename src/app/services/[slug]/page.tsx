"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { services } from "@/components/sections/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s: any) => s.id === slug);
  if (!service) return notFound();
  
  const Icon = service.icon;
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: service.id,
      name: service.title,
      description: service.description,
      price: service.numericPrice,
      category: service.category,
    });
    
    // Add a small delay for better UX feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/services" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            חזרה לכל השירותים
          </Link>
        </Button>

        <Card className="overflow-hidden border-none shadow-xl">
          <div className="bg-primary/5 p-8 md:p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
              <Icon className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{service.description}</p>
          </div>

          <CardContent className="p-8 md:p-12 space-y-12">
            {/* Sections (for services with multiple sub-services like consultation) */}
            {service.sections && service.sections.map((section: any, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-8">
                <div className="border-b-2 border-primary/20 pb-4">
                  <h2 className="text-3xl font-bold text-primary">{section.title}</h2>
                </div>
                
                {/* Section Extended Description */}
                {section.extendedDescription && (
                  <div className="space-y-4">
                    {section.extendedDescription.map((line: string, index: number) => (
                      <p key={index} className={`text-xl ${index === section.extendedDescription.length - 1 || index === section.extendedDescription.length - 2 ? 'font-bold text-primary text-xl' : 'text-gray-700'}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}

                {/* Section Process */}
                {section.process && (
                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">איך זה עובד?</h3>
                    <ul className="space-y-4">
                      {section.process.map((step: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-xl text-gray-700">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {/* Extended Description (for single-section services) */}
            {!service.sections && service.extendedDescription && (
              <div className="space-y-4">
                {service.extendedDescription.map((line: string, index: number) => (
                  <p key={index} className={`text-xl ${index === service.extendedDescription.length - 1 || index === service.extendedDescription.length - 2 ? 'font-bold text-primary text-xl' : 'text-gray-700'}`}>
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Process / How it works (for single-section services) */}
            {!service.sections && service.process && (
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">איך זה עובד?</h3>
                <ul className="space-y-4">
                  {service.process.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-xl text-gray-700">
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suitable For */}
            {service.suitableFor && (
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">מתאים ל:</h3>
                <ul className="space-y-3">
                  {service.suitableFor.map((item: string, index: number) => (
                    <li key={index} className="text-xl text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Included Services */}
            {service.includedServices && (
              <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">השירות כולל:</h3>
                <ul className="space-y-3">
                  {service.includedServices.map((item: string, index: number) => (
                    <li key={index} className={`text-xl ${index === service.includedServices.length - 1 ? 'font-bold text-green-800 mt-4' : 'text-gray-700'}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features (Legacy/Standard) */}
            {!service.process && service.features && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">מה כולל השירות?</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes */}
            {service.notes && (
              <div className="bg-yellow-50 border-r-4 border-yellow-400 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  ⚠️ הערות חשובות
                </h4>
                <ul className="space-y-2">
                  {service.notes.map((note: string, index: number) => (
                    <li key={index} className="text-yellow-800">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t">
              <div>
                <p className="text-sm text-gray-500 mb-1">מחיר השירות</p>
                <p className="text-3xl font-bold text-primary">{service.price}</p>
              </div>
              <Button size="lg" className="w-full md:w-auto text-xl px-8 py-6" onClick={handleAddToCart} disabled={isAdding}>
                {isAdding ? (
                  "מוסיף..."
                ) : (
                  <>
                    <ShoppingCart className="ml-2 h-5 w-5" />
                    הוסף לעגלה
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
