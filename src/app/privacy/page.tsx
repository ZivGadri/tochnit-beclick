import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">מדיניות פרטיות</h1>
          <p className="text-gray-500 mb-10">עדכון אחרון: {new Date().toLocaleDateString("he-IL")}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. כללי</h2>
              <p>
                תוכנית בקליק (&quot;אנחנו&quot;, &quot;החברה&quot;) מכבדת את פרטיותכם. מדיניות זו מסבירה אילו
                מידע אנו אוספים כאשר אתם משתמשים באתר, לשם מה אנו משתמשים בו, ועם מי אנו
                עשויים לשתף אותו.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. מידע שאנו אוספים</h2>
              <ul className="list-disc mr-6 space-y-2">
                <li>
                  <strong>פרטי יצירת קשר:</strong> שם, כתובת דוא&quot;ל וטלפון, כאשר אתם ממלאים טופס
                  יצירת קשר, בקשת הצעת מחיר, או מבצעים הזמנה.
                </li>
                <li>
                  <strong>פרטי הפרויקט:</strong> תיאור הפרויקט, סוגו, תקציב, לוחות זמנים, וקבצים
                  שאתם מעלים במסגרת בקשת הצעת מחיר.
                </li>
                <li>
                  <strong>פרטי תשלום:</strong> תשלומים מעובדים ישירות על ידי ספק הסליקה שלנו, Stripe.
                  איננו שומרים פרטי כרטיס אשראי בשרתים שלנו.
                </li>
                <li>
                  <strong>מידע טכני:</strong> כתובת IP ונתוני שימוש בסיסיים הנאספים אוטומטית לצורך
                  אבטחה ומניעת הונאות (ראו סעיף 4).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. כיצד אנו משתמשים במידע</h2>
              <ul className="list-disc mr-6 space-y-2">
                <li>לצורך מענה לפניות, הכנת הצעות מחיר ומתן השירותים המבוקשים.</li>
                <li>לעיבוד תשלומים ומעקב אחר הזמנות.</li>
                <li>לשליחת עדכונים ואישורים הקשורים לפנייה או להזמנה שלכם.</li>
                <li>לשיפור האתר והשירותים שלנו.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. שיתוף מידע עם צדדים שלישיים</h2>
              <p className="mb-2">
                אנו משתמשים בספקי שירות חיצוניים הבאים לצורך הפעלת האתר, וכל אחד מהם מקבל
                גישה למידע הנדרש לו בלבד לצורך מתן השירות:
              </p>
              <ul className="list-disc mr-6 space-y-2">
                <li><strong>Stripe</strong> — עיבוד תשלומים מאובטח.</li>
                <li><strong>Resend</strong> — שליחת הודעות דוא&quot;ל (אישורי הזמנה, מענה לפניות).</li>
                <li><strong>Google reCAPTCHA</strong> — הגנה מפני ספאם ושימוש לרעה בטפסים.</li>
                <li><strong>Supabase</strong> — אחסון מסד הנתונים שלנו.</li>
              </ul>
              <p className="mt-2">
                איננו מוכרים את המידע האישי שלכם לצדדים שלישיים למטרות שיווקיות.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. שמירת מידע</h2>
              <p>
                אנו שומרים את המידע האישי שלכם למשך הזמן הנדרש לצורך מתן השירות, עמידה
                בדרישות חוקיות, וטיפול בכל מחלוקת אפשרית.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. זכויותיכם</h2>
              <p>
                בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981, אתם זכאים לעיין במידע שנשמר אודותיכם,
                לבקש את תיקונו או מחיקתו, ולהתנגד לשימוש בו לצרכי דיוור ישיר. לצורך מימוש
                זכויות אלו, פנו אלינו בפרטי הקשר שלהלן.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. עוגיות (Cookies)</h2>
              <p>
                האתר עושה שימוש בעוגיות של Google reCAPTCHA לצורך הגנה מפני ספאם. עוגיות אלו
                אינן משמשות אותנו למטרות פרסום או מעקב.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. יצירת קשר</h2>
              <p>
                לשאלות בנוגע למדיניות פרטיות זו, ניתן לפנות אלינו דרך{" "}
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
