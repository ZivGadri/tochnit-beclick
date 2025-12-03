import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const heeboFont = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "תוכנית בקליק - שירותי אדריכלות ועיצוב פנים",
  description: "תוכנית בקליק – הדרך הפשוטה והמקצועית לתכנון ועיצוב. תכנון, תוכניות ביצוע, שרטוטים, עיצובים, פגישות יעוץ או חוות דעת מקצועית.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heeboFont.variable} antialiased font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
