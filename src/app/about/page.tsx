import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Calendar, Heart } from "lucide-react";
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
                אודות רותם ארמונית
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-8">
                אדריכלית ומעצבת פנים מנוסה עם ניסיון של למעלה מ-15 שנה ביצירת חללים 
                ייחודיים ופונקציונליים המשקפים את האישיות והצרכים של הלקוחות
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  הסיפור שלי
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-7">
                  <p>
                    החלום שלי להיות אדריכלית התגשם כבר בגיל צעיר, כשהבנתי שאני רוצה ליצור 
                    חללים שמשפיעים על האנשים בצורה חיובית. לאחר סיום התואר באדריכלות בטכניון, 
                    התמחיתי בעיצוב פנים ותכנון חללים מגורים ומסחריים.
                  </p>
                  <p>
                    במהלך השנים פיתחתי גישה ייחודית המשלבת פונקציונליות עם יופי, תוך 
                    התמקדות בצרכים האישיים של כל לקוח. אני מאמינה שכל חלל מספר סיפור, 
                    והתפקיד שלי הוא לעזור לכם לספר את הסיפור שלכם בצורה הטובה ביותר.
                  </p>
                  <p>
                    היום, לאחר מאות פרויקטים מוצלחים, אני ממשיכה להתרגש מכל פרויקט חדש 
                    ומהאפשרות ליצור חללים שמשמחים ומעשירים את חיי הלקוחות שלי.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 rounded-lg aspect-[3/4] flex items-center justify-center">
                  <span className="text-gray-500 text-lg">תמונה של רותם ארמונית</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                הערכים שמנחים אותי
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                עקרונות היסוד שמובילים אותי בכל פרויקט ופגישה עם לקוחות
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>תשומת לב אישית</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    כל לקוח מקבל התייחסות אישית ופתרונות המותאמים בדיוק לצרכים שלו
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>איכות ללא פשרות</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    מחויבות לרמת ביצוע גבוהה ותוצאה מושלמת בכל פרט קטן
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>עבודת צוות</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    שיתוף פעולה הדוק עם הלקוח בכל שלב כדי להבטיח תוצאה מושלמת
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>עמידה בלוחות זמנים</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    מחויבות לעמידה בלוחות הזמנים המוסכמים ותכנון מדויק של כל שלב
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                הישגים ומספרים
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-gray-600">פרויקטים מוצלחים</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-gray-600">שנות ניסיון</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-600">שביעות רצון לקוחות</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">המלצות</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              מוכנים להתחיל את הפרויקט שלכם?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              בואו נקבע פגישה ונתחיל לתכנן את החלל המושלם עבורכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/quote">בקשת הצעת מחיר</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
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
