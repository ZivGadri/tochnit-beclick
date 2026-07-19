import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">תנאי שימוש</h1>
          <p className="text-gray-500 mb-10">עדכון אחרון: {new Date().toLocaleDateString("he-IL")}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. כללי</h2>
              <p>
                השימוש באתר תוכנית בקליק (&quot;האתר&quot;) כפוף לתנאי שימוש אלה. גלישה באתר או
                שימוש בשירותיו מהווה הסכמה לתנאים המפורטים להלן.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. השירותים</h2>
              <p>
                האתר מציע שירותי אדריכלות ועיצוב פנים, לרבות תכנון אדריכלי, עיצוב פנים, תכנון
                חללים ועיצוב תאורה, הניתנים למכירה כחבילות שירות דרך האתר או בעקבות בקשת
                הצעת מחיר מותאמת אישית.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. הזמנות ותשלום</h2>
              <ul className="list-disc mr-6 space-y-2">
                <li>המחירים המוצגים באתר כוללים מע&quot;ם, אלא אם צוין אחרת.</li>
                <li>
                  התשלום מתבצע באמצעות ספק הסליקה Stripe. ההזמנה תיחשב כמאושרת רק לאחר
                  קבלת אישור תשלום מלא.
                </li>
                <li>
                  לאחר ביצוע ההזמנה, נציג מטעמנו ייצור עמכם קשר לתיאום פגישת ייעוץ ותחילת
                  העבודה על הפרויקט.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. ביטולים והחזרים</h2>
              <p>
                בקשות לביטול הזמנה ייבחנו בהתאם לשלב שבו נמצא הפרויקט במועד הבקשה, ובכפוף
                להוראות חוק הגנת הצרכן, התשמ&quot;א-1981, ככל שהן חלות על השירות. לבקשת ביטול
                או החזר, יש לפנות אלינו בפרטי הקשר שבתחתית עמוד זה בהקדם האפשרי.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. קניין רוחני</h2>
              <p>
                כל התכנים באתר — לרבות טקסטים, תמונות, עיצובים ותוכניות לדוגמה — הינם רכושה
                של תוכנית בקליק ואין להעתיקם, להפיצם או לעשות בהם שימוש מסחרי ללא אישור
                מראש ובכתב.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. הגבלת אחריות</h2>
              <p>
                השירותים ניתנים כפי שהם (&quot;AS IS&quot;). האתר ותכניו אינם מהווים ייעוץ מקצועי
                מחייב, ואינם תחליף לבדיקה, תכנון ואישור מקצועיים מותאמים לפרויקט הספציפי שלכם
                בטרם ביצוע. איננו אחראים לנזק עקיף שייגרם כתוצאה משימוש באתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. דין וסמכות שיפוט</h2>
              <p>
                על תנאי שימוש אלה יחולו דיני מדינת ישראל בלבד, וסמכות השיפוט הבלעדית נתונה
                לבתי המשפט המוסמכים במחוז תל אביב.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. יצירת קשר</h2>
              <p>
                לשאלות בנוגע לתנאי שימוש אלה, ניתן לפנות אלינו דרך{" "}
                <a href="/contact" className="text-primary underline">עמוד יצירת הקשר</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
