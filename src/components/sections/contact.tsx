import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "טלפון",
    value: "050-123-4567",
    href: "tel:0501234567"
  },
  {
    icon: Mail,
    title: "אימייל",
    value: "rotem@example.com",
    href: "mailto:rotem@example.com"
  },
  {
    icon: MapPin,
    title: "כתובת",
    value: "תל אביב, ישראל",
    href: "#"
  },
  {
    icon: Clock,
    title: "שעות פעילות",
    value: "א׳-ה׳ 9:00-18:00",
    href: "#"
  }
];

export function Contact() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            בואו נתחיל לתכנן יחד
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            מוזמנים ליצור קשר לקבלת ייעוץ חינם ולשמוע איך אנחנו יכולים להפוך את החלום שלכם למציאות
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                פרטי התקשרות
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4 space-x-reverse">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">
                              {item.title}
                            </h4>
                            {item.href !== "#" ? (
                              <a
                                href={item.href}
                                className="text-gray-600 hover:text-primary transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <span className="text-gray-600">{item.value}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  מוכנים להתחיל?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">
                  קבלו הצעת מחיר מותאמת אישית ללא התחייבות
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg">
                    <Link href="/quote">בקשת הצעת מחיר</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="tel:0501234567">התקשרו עכשיו</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              שאלות נפוצות
            </h3>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  כמה זמן לוקח פרויקט עיצוב?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  משך הפרויקט תלוי בגודל ובמורכבות. פרויקט עיצוב פנים יכול לקחת 2-6 שבועות, 
                  בעוד פרויקט אדריכלי מלא יכול לקחת 2-6 חודשים.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  האם אתם מלווים גם בביצוע?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  כן, אנו מציעים ליווי מלא של הפרויקט מהתכנון ועד הביצוע, כולל קשר עם קבלנים 
                  ופיקוח על עבודות הבנייה.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  האם הייעוץ הראשוני חינם?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  כן, אנו מציעים פגישת ייעוץ ראשונית ללא עלות לבירור הצרכים והחזון שלכם.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  איך נקבע המחיר?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  המחיר נקבע על פי היקף הפרויקט, מורכבותו ודרישות מיוחדות. אנו מתחייבים 
                  לשקיפות מלאה במתן הצעות מחיר.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
