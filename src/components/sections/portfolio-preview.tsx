import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Eye } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "דירת יוקרה בתל אביב",
    category: "דירות מגורים",
    description: "עיצוב מודרני וחם לדירת 4 חדרים עם נוף לים",
    image: "/images/placeholder.jpg"
  },
  {
    id: 2,
    title: "מסעדה בוטיק בירושלים",
    category: "מסחרי",
    description: "עיצוב ייחודי המשלב אלמנטים מסורתיים ומודרניים",
    image: "/images/placeholder.jpg"
  },
  {
    id: 3,
    title: "בית פרטי בהרצליה",
    category: "בתים פרטיים",
    description: "תכנון אדריכלי מקיף לבית פרטי עם גינה ובריכה",
    image: "/images/placeholder.jpg"
  }
];

export function PortfolioPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            פרויקטים נבחרים
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            הציצו על כמה מהפרויקטים המרגשים שעיצבנו עבור לקוחותינו
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <Eye className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">תמונת פרויקט</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/portfolio">
              צפו בכל הפרויקטים
              <ArrowLeft className="ms-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
