import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Zap, DollarSign, Home, PenTool, Wrench, Building } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                אודות תוכנית בקליק
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-8">
                הפתרון המקצועי והנגיש לתכנון ועיצוב – מהיר, פשוט ובלי תיווך
              </p>
            </div>
          </div>
        </section>

        {/* What We Are Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              מה אנחנו?
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-xl text-gray-600 leading-7">
              <p>
                בעולם שהולך והופך דיגיטלי, גם עולם הבנייה משתנה.
              </p>
              <p>
                יותר ויותר לקוחות מעדיפים לוותר על פגישות אינסופיות, ימי חופש מיותרים ופרוצדורות מסובכות — ורוצים פתרונות מהירים, פשוטים ומקצועיים.
              </p>
              <p className="font-bold text-primary text-xl">
                תוכנית בקליק נולדה מתוך ההבנה הזו.
              </p>
              <p>
                אנו כאן כדי לאפשר לכל אחד להעביר רעיון או צורך – קטן או גדול – אל תוכנית מקצועית ומוכנה לביצוע, במהירות, בנוחות ובלי מתווכים.
              </p>
              <p>
                אם אתם יודעים בדיוק מה אתם רוצים, וצריכים רק סט תוכניות ברור — בלי לשכור מעצב/ת צמודים ולשלם שכר טרחה גבוה –
              </p>
              <p className="font-bold text-gray-900 text-xl">
                תוכנית בקליק היא בדיוק בשבילכם.
              </p>
              <div className="bg-white rounded-xl p-6 border-r-4 border-primary mt-6">
                <p className="text-gray-700">
                  פשוט מעלים סקיצה או תוכנית קיימת, מצרפים את הבקשות והצרכים שלכם (לפי סוג השירות), ותוך זמן קצר תקבלו תוכנית מקצועית, מדויקת ומוכנה לביצוע.
                </p>
                <p className="text-primary font-bold mt-4">
                  בלי פגישות מיותרות, בלי פרוצדורות מסובכות, והכול אונליין דרך האתר.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We're Suitable For Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                למי אנחנו מתאימים?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                &quot;תוכנית בקליק&quot; מתאימה בעיקר, אבל לא רק ל:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-r-4 border-blue-500">
                <CardHeader>
                  <Home className="w-12 h-12 text-blue-500 mb-4" />
                  <CardTitle className="text-xl">לקוחות פרטיים</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    שמעוניינים בשינויי דיירים או שיפוצים, ורוצים תוכניות מדויקות בלי מעצב/ת צמודים.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-r-4 border-purple-500">
                <CardHeader>
                  <PenTool className="w-12 h-12 text-purple-500 mb-4" />
                  <CardTitle className="text-xl">אדריכלים ומעצבים</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    שמחפשים שירותי שרטוט ומיקור חוץ מקצועיים להשלמת פרויקטים.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-r-4 border-orange-500">
                <CardHeader>
                  <Wrench className="w-12 h-12 text-orange-500 mb-4" />
                  <CardTitle className="text-xl">קבלנים קטנים ובעלי מקצוע</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    נגרים, מתקיני מטבחים, אנשי גבס, אינסטלטורים וחשמלאים, שזקוקים לתוכנית עבודה מקצועית וברורה לביצוע מהיר מול לקוחותיהם.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-r-4 border-green-500">
                <CardHeader>
                  <Building className="w-12 h-12 text-green-500 mb-4" />
                  <CardTitle className="text-xl">בעלי דירות או משרדים</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    שמתכננים שיפוץ ורוצים פתרון תכנוני מקצועי, מהיר ונגיש בתקציב הוגן.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-blue-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                למה לבחור בנו?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center bg-white/80 backdrop-blur">
                <CardHeader>
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>ניסייון של 15 שנים</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    ניסיון מוכח בתחום האדריכלות והתכנון
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur">
                <CardHeader>
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>פתרון מהיר ונגיש</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    שירות אונליין מקצועי זמין בכל עת
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>איכות ללא פשרות</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    גם במחיר נגיש – לא מתפשרים על איכות
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur">
                <CardHeader>
                  <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>מתאים לכולם</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    ללקוחות פרטיים, אנשי מקצוע ואדריכלים
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-2xl font-bold text-primary">
                תוכנית בקליק – הופכים רעיון לתוכנית. במהירות. במקצועיות. בקליק.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  מי אנחנו?
                </h2>
                <div className="space-y-4 text-xl text-gray-600 leading-7">
                  <p>
                    <strong className="text-gray-900">רותם ליאור</strong>, הנדסאית אדריכלות, החלה את דרכה בשנת 2010 בתחום שינויי הדיירים.
                  </p>
                  <p>
                    במהלך השנים ניהלה מחלקות אדריכלות בחברות מובילות, וליוותה אלפי לקוחות פרטיים ואנשי מקצוע.
                  </p>
                  <p>
                    בשנת 2020 הקימה משרד עצמאי המתמחה בתכנון דירות, בתים פרטיים, משרדים ופרויקטים רחבי היקף בתחום הבנייה הרוויה.
                  </p>
                  <p>
                    רותם זיהתה צורך ברור: לקוחות ואנשי מקצוע רבים מחפשים פתרון מהיר, נוח וחסכוני להפקת תוכניות – בלי לשכור מעצב/ת לכל הדרך, ובלי לוותר על איכות התכנון.
                  </p>
                  <p className="font-bold text-primary text-xl">
                    כך נולדה תוכנית בקליק – שירות חכם המאפשר קבלת פתרונות תכנוניים מקצועיים, שרטוטים, חוות דעת וליווי – הכול אונליין, בקלות ובמחירים נגישים.
                  </p>
                  <p>
                    לצידה של רותם עובד לאורך תקופה ארוכה צוות מקצועי מהשורה הראשונה, עם ניסיון עשיר בתחומי הבנייה והתכנון, וביחד אנו כאן כדי להעניק שירות אדיב, נגיש ומקצועי לכל לקוח ואנשי מקצוע שפונים אלינו.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/10 to-blue-100 rounded-2xl aspect-[4/3] flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Building className="w-16 h-16 text-primary" />
                    </div>
                    <p className="text-gray-700 text-xl font-medium">רותם ליאור</p>
                    <p className="text-gray-600">הנדסאית אדריכלות</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              יש לכם שאלה? צריכים ייעוץ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              צרו קשר ונשמח לעזור לכם להפוך את הרעיון שלכם למציאות
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/services">לכל השירותים</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">צרו קשר</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
