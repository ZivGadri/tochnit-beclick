import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              עיצוב שמשקף
              <span className="text-primary block">את החלום שלכם</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              אנו מתמחים בעיצוב אדריכלי ועיצוב פנים שמשלב יופי, פונקציונליות וחדשנות.
              כל פרויקט מותאם אישית לצרכים ולחלומות שלכם.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-lg">
                <Link href="/services">
                  רואים את השירותים שלנו
                  <ArrowLeft className="ms-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/portfolio">צפו בפרויקטים שלנו</Link>
              </Button>
            </div>
            <div className="mt-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/contact">או צרו קשר לייעוץ חינם</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
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
