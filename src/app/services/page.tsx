import { Services } from "@/components/sections/services";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                השירותים שלנו
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                אנו מציעים מגוון רחב של שירותי אדריכלות ועיצוב פנים המותאמים לכל צורך ותקציב.
                כל שירות מבוצע ברמה הגבוהה ביותר עם דגש על איכות ושביעות רצון הלקוח.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/quote">
                    קבלו הצעת מחיר
                    <ArrowLeft className="ms-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <Services />

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים להתחיל את הפרויקט שלכם?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              צרו קשר עכשיו לקבלת ייעוץ חינם והצעת מחיר מותאמת אישית
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">צרו קשר</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/quote">בקשת הצעת מחיר</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
