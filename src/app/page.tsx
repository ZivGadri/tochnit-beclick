import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full">
        <Hero />
        <Services />
        <PortfolioPreview />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
