import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">רותם</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              שירותי אדריכלות ועיצוב פנים מקצועיים עם דגש על איכות, יופי ופונקציונליות.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">שירותים</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/services/architectural-design" className="hover:text-white transition-colors">
                  עיצוב אדריכלי
                </Link>
              </li>
              <li>
                <Link href="/services/interior-design" className="hover:text-white transition-colors">
                  עיצוב פנים
                </Link>
              </li>
              <li>
                <Link href="/services/space-planning" className="hover:text-white transition-colors">
                  תכנון חללים
                </Link>
              </li>
              <li>
                <Link href="/services/lighting-design" className="hover:text-white transition-colors">
                  עיצוב תאורה
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">קישורים</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  אודות
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  תיק עבודות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  צור קשר
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-white transition-colors">
                  בקשת הצעת מחיר
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-right">
            <h4 className="text-xl font-semibold">פרטי התקשרות</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="mailto:rotemlior@outlook.co.il" className="hover:text-white transition-colors text-right">
                  rotemlior@outlook.co.il
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} רותם - שירותי אדריכלות ועיצוב פנים. כל הזכויות שמורות.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                מדיניות פרטיות
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                תנאי שימוש
              </Link>
              <Link href="/admin" className="hover:text-white transition-colors opacity-60">
                מנהל
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
