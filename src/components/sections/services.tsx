"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, PaintBucket, Ruler, MessageSquare, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export const services = [
  {
    id: "interior-design",
    icon: PaintBucket,
    title: "תכנון ועיצוב פנים",
    description: "תכנון ועיצוב פנים מותאם אישית לצרכים שלכם, יצירת חללים הרמוניים ופונקציונליים.",
    price: "החל מ-₪2,500",
    numericPrice: 2500,
    category: "עיצוב פנים",
    features: ["תכנון העמדה", "בחירת חומרים וגוונים", "הדמיות תלת מימד"],
    extendedDescription: [
      "🏢 קניתם דירה וצריכים להגיש סט תוכניות למחלקת שינויי דיירים?",
      "✏️ יש לכם רעיון אבל צריכים עזרה קלה בתכנון?",
      "🛠️ רוצים לשפץ וזקוקים ליד מכוונת ותוכניות לביצוע?",
      "🖼️ רוצים לעצב מחדש משרד או חלל עבודה?",
      "🎨 רוצים לעצב ארון, קיר דקורטיבי או פריט ייחודי אחר?",
      "תוכנית בקליק כאן בשבילכם – בלי תיווך ובלי עלויות מיותרות.",
      "פשוט, מקצועי, ומהיר."
    ],
    process: [
      "📌 מעלים תוכנית קיימת בפורמט DWG עם הצרכים והבקשות שלכם,",
      "🖊️ מעלים סקיצה של הפריט אותו אתם רוצים לתכנן,",
      "🎨 מקבלים תוכנית לביצוע עם פתרונות מעשיים וחשיבה עיצובית."
    ],
    notes: [
      "השירות אינו כולל פגישות למעט שיחות ומיילים להבהרה מצד המבצע.",
      "יש להעביר את התוכניות ליועצים מקצועיים לאישור טרם ביצוע התוכנית.",
      "במידה ואין תוכנית DWG יש לגשת קודם לשירות המרת תוכניות בשירותי השרטוט."
    ]
  },
  {
    id: "drafting",
    icon: Ruler,
    title: "שירותי שרטוט",
    description: "שירותי שרטוט מקצועיים לכל מטרה, המרת סקיצות לתוכניות עבודה מדויקות.",
    price: "החל מ-₪500",
    numericPrice: 500,
    category: "שרטוט",
    features: ["שרטוט תוכניות קיימות", "הכנת תוכניות מכר", "שרטוט לביצוע"],
    extendedDescription: [
      "יודעים בדיוק מה אתם רוצים ורק צריכים תוכנית ביצוע לקבלן?",
      "אדריכלים, מעצבים או בעלי מקצוע שמחפשים מיקור חוץ לשרטוט תוכניות?",
      "לקוחות שצריכים תוכנית לשיפוץ עצמי קטן?",
      "תוכנית בקליק כאן בשבילכם.",
      "פשוט, מקצועי, ומהיר."
    ],
    process: [
      "🖊️ מעלים סקיצה, DWG או PDF ע\"פ דרישת השירות המבוקש.",
      "📏 אנו ממירים / יוצרים שרטוט טכני מקצועי בקובץ DWG."
    ],
    suitableFor: [
      "🏠 לקוחות פרטיים,",
      "✏️ אדריכלים ומעצבים,",
      "🪚 בעלי מקצוע שזקוקים לשרטוט במיקור חוץ,",
      "🛠️ כל מי שמחפש להפוך רעיון לתוכנית."
    ],
    notes: [
      "השירות אינו כולל פגישות למעט שיחות ומיילים להבהרה מצד המבצע.",
      "יש להעביר את התוכניות ליועצים מקצועיים לאישור טרם ביצוע התוכנית.",
      "לשירותים הדורשים תוכנית בקובץ DWG ובמידה ואין, יש לגשת קודם לשירות המרת תוכניות בשירותי השרטוט."
    ]
  },
  {
    id: "consultation",
    icon: MessageSquare,
    title: "פגישות יעוץ / חוות דעת",
    description: "ייעוץ מקצועי וחוות דעת אדריכלית לפני רכישה, שיפוץ או בניה.",
    price: "החל מ-₪450",
    numericPrice: 450,
    category: "ייעוץ",
    features: ["בדיקת נכס לפני קניה", "ייעוץ תכנוני", "פתרון בעיות רישוי"]
  },
  {
    id: "full-planning",
    icon: Home,
    title: "תכנון וליווי מלא",
    description: "מעטפת תכנון וליווי מלאה משלב הרעיון ועד קבלת המפתח.",
    price: "החל מ-₪15,000",
    numericPrice: 15000,
    category: "תכנון",
    features: ["תכנון אדריכלי מלא", "הגשה להיתרים", "פיקוח עליון"]
  }
];

export function Services() {
  const { addItem } = useCart();
  const [addingStates, setAddingStates] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (service: typeof services[0]) => {
    setAddingStates(prev => ({ ...prev, [service.id]: true }));
    
    addItem({
      id: service.id,
      name: service.title,
      description: service.description,
      price: service.numericPrice,
      category: service.category,
    });

    // Reset loading state after a short delay
    setTimeout(() => {
      setAddingStates(prev => ({ ...prev, [service.id]: false }));
    }, 500);
  };

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            השירותים שלנו
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            אנו מציעים מגוון רחב של שירותי עיצוב ואדריכלות, כל אחד מותאם במיוחד לצרכים שלכם
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            const isAdding = addingStates[service.id] || false;
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full ml-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <Button asChild className="w-full" variant="outline">
                      <Link href={`/services/${service.id}`}>
                        פרטים נוספים
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => handleAddToCart(service)}
                      disabled={isAdding}
                      className="w-full"
                    >
                      {isAdding ? (
                        "מוסיף..."
                      ) : (
                        <>
                          <ShoppingCart className="ml-2 h-4 w-4" />
                          הוסף לעגלה
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/cart">עגלת קניות</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
