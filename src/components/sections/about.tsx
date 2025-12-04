import { Award, Users, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    icon: Users,
    number: "200+",
    label: "לקוחות מרוצים"
  },
  {
    icon: Award,
    number: "50+",
    label: "פרויקטים שהושלמו"
  },
  {
    icon: Clock,
    number: "5+",
    label: "שנות ניסיון"
  },
  {
    icon: Star,
    number: "4.9",
    label: "דירוג ממוצע"
  }
];

export function About() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              אודות רותם
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-xl">
                אני רותם, אדריכלית ומעצבת פנים עם תשוקה ליצירת חללים שמשקפים את האישיות 
                והצרכים הייחודיים של כל לקוח.
              </p>
              <p>
                עם יותר מ-5 שנות ניסיון בתחום, אני מאמינה שעיצוב טוב אינו רק יפה למראה, 
                אלא גם פונקציונלי, בר-קיימא ומותאם לאורח החיים של הדיירים.
              </p>
              <p>
                הגישה שלי משלבת הקשבה עמוקה לחלומות הלקוח, יצירתיות ללא גבולות, 
                והבנה מעמיקה של טרנדים מודרניים בעיצוב ובאדריכלות.
              </p>
            </div>

            {/* Qualifications */}
            <div className="mt-8 space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">כישורים והכשרה</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full ml-3" />
                  תואר ראשון באדריכלות - הטכניון
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full ml-3" />
                  הסמכה בעיצוב פנים - המכללה לעיצוב
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full ml-3" />
                  חברה בלשכת האדריכלים
                </div>
              </div>
            </div>
          </div>

          {/* Image and Stats */}
          <div className="space-y-8">
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden shadow-xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <div className="w-24 h-24 mx-auto mb-4 bg-slate-400 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-slate-300 rounded-full"></div>
                    </div>
                    <p className="text-sm">תמונה אישית</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center p-6">
                    <CardContent className="p-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
