import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, PaintBucket, Ruler, Lightbulb } from "lucide-react";

const services = [
  {
    id: "architectural-design",
    icon: Home,
    title: "עיצוב אדריכלי",
    description: "תכנון מבנים חדשים ושיפוץ מבנים קיימים עם דגש על פונקציונליות ויופי",
    price: "החל מ-₪15,000",
    features: ["תוכניות אדריכליות מפורטות", "ליווי בתהליך הרישוי", "פיקוח על הביצוע"]
  },
  {
    id: "interior-design",
    icon: PaintBucket,
    title: "עיצוב פנים",
    description: "יצירת חללים פנימיים מעוצבים ומותאמים לאורח החיים שלכם",
    price: "החל מ-₪8,000",
    features: ["תכנון פריסת רהיטים", "בחירת צבעים וחומרים", "עיצוב תאורה"]
  },
  {
    id: "space-planning",
    icon: Ruler,
    title: "תכנון חללים",
    description: "אופטימיזציה של השימוש בחלל לקבלת מקסימום פונקציונליות",
    price: "החל מ-₪5,000",
    features: ["ניתוח חלל קיים", "הצעות לשיפור", "תוכניות מפורטות"]
  },
  {
    id: "lighting-design",
    icon: Lightbulb,
    title: "עיצוב תאורה",
    description: "תכנון מערכות תאורה שיוצרות אווירה מושלמת בכל חלל",
    price: "החל מ-₪3,000",
    features: ["תכנון נקודות תאורה", "בחירת גופי תאורה", "חיסכון באנרגיה"]
  }
];

export function Services() {
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
                  <Button asChild className="w-full">
                    <Link href={`/services/${service.id}`}>
                      פרטים נוספים
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/services">רואים את כל השירותים</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
