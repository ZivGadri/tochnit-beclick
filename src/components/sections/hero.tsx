import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, PenTool, FileText, Lightbulb } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              תוכנית בקליק – <span className="text-primary">הדרך הפשוטה והמקצועית</span> לתכנון ועיצוב
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
              אתם יודעים בדיוק מה אתם רוצים? אנחנו יודעים להפוך את זה לתוכנית מקצועית.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              בין אם אתם אדריכלים, מעצבים, קבלנים קטנים או לקוחות פרטיים – אצלנו תוכלו להזמין תכנון, תוכניות ביצוע, שרטוטים, עיצובים, פגישות יעוץ או חוות דעת מקצועית בצורה ישירה, מקצועית וברורה.
            </p>

            {/* How it works */}
            <div className="bg-white/50 p-6 rounded-2xl backdrop-blur-sm border border-white/20 mb-8 text-right">
              <h3 className="text-lg font-bold text-gray-900 mb-4">איך זה עובד?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">בוחרים את השירות הרצוי</span>
                </li>
                <li className="flex items-start gap-3">
                  <PenTool className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">מעלים סקיצה / תוכנית רעיונות וצרכים</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">מקבלים תוכנית סופית ברמה הגבוהה והמקצועית ביותר</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">בלי תיווך ובלי עלויות מיותרות</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="text-xl font-bold text-primary mb-2">תוכנית בקליק – פשוט, מדויק ומהיר.</p>
              <p className="text-gray-600">
                הפתרון המושלם לתכנון ועיצוב פרויקטים קטנים וגדולים, שינויי דיירים, שיפוצים עצמאיים ולכל אנשי המקצוע בענפי הבנייה השונים.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-lg">
                <Link href="/services">
                  לכל השירותים
                  <ArrowLeft className="ms-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/contact">צרו קשר</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10" />
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <div className="w-24 h-24 mx-auto mb-4 bg-slate-400 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-slate-300 rounded"></div>
                  </div>
                  <p className="text-sm">תמונת פרויקט לדוגמה</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -end-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
            <div className="absolute -bottom-6 -start-6 w-32 h-32 bg-blue-500/10 rounded-full -z-10" />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 start-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full -translate-y-1/2 -translate-x-1/2 -z-10" />
      <div className="absolute top-1/4 end-0 w-64 h-64 bg-gradient-to-l from-primary/5 to-blue-500/5 rounded-full translate-x-1/2 -z-10" />
    </section>
  );
}
