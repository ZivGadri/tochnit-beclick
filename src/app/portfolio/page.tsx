"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, X } from "lucide-react";

interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: number;
  area: string;
  description: string;
  mainImage: string;
  images: ProjectImage[];
  services: string[];
}

const categories = ["כל הפרויקטים", "עיצוב פנים", "עיצוב אדריכלי", "תכנון חללים", "עיצוב תאורה"];

// Mock project data - in a real app this would come from your CMS/database
const projects: Project[] = [
  {
    id: "1",
    title: "דירת יוקרה בתל אביב",
    category: "עיצוב פנים",
    location: "תל אביב",
    year: 2024,
    area: "120 מ\"ר",
    description: "עיצוב מודרני ויוקרתי של דירת 4 חדרים במרכז תל אביב. השילוב של צבעים חמים עם חומרים טבעיים יוצר אווירה ביתית ומזמינה.",
    mainImage: "/api/placeholder/600/400",
    images: [
      { src: "/api/placeholder/800/600", alt: "סלון ראשי", caption: "הסלון הראשי עם עיצוב מודרני" },
      { src: "/api/placeholder/800/600", alt: "מטבח", caption: "מטבח מעוצב עם אי מרכזי" },
      { src: "/api/placeholder/800/600", alt: "חדר שינה", caption: "חדר השינה הראשי" },
    ],
    services: ["עיצוב פנים", "תכנון חללים", "עיצוב תאורה"],
  },
  {
    id: "2", 
    title: "בית פרטי ברמת השרון",
    category: "עיצוב אדריכלי",
    location: "רמת השרון",
    year: 2023,
    area: "300 מ\"ר",
    description: "תכנון וביצוע של בית פרטי עכשווי עם דגש על חללים פתוחים וחיבור לטבע. הבית משלב חומרים טבעיים עם טכנולוגיות מתקדמות.",
    mainImage: "/api/placeholder/600/400",
    images: [
      { src: "/api/placeholder/800/600", alt: "חזית הבית", caption: "החזית הראשית של הבית" },
      { src: "/api/placeholder/800/600", alt: "גינה פנימית", caption: "הגינה הפנימית והבריכה" },
      { src: "/api/placeholder/800/600", alt: "סלון גדול", caption: "הסלון הגדול עם תקרה גבוהה" },
    ],
    services: ["עיצוב אדריכלי", "תכנון חללים"],
  },
  {
    id: "3",
    title: "משרדי חברת הייטק",
    category: "תכנון חללים",
    location: "הרצליה",
    year: 2024,
    area: "800 מ\"ר",
    description: "תכנון משרדים מודרניים לחברת הייטק המשלבים חללי עבודה פתוחים, חדרי ישיבות מתקדמים ואזורי מנוחה נעימים.",
    mainImage: "/api/placeholder/600/400",
    images: [
      { src: "/api/placeholder/800/600", alt: "אופן ספייס", caption: "חלל העבודה הפתוח" },
      { src: "/api/placeholder/800/600", alt: "חדר ישיבות", caption: "חדר ישיבות מתקדם" },
      { src: "/api/placeholder/800/600", alt: "מטבחון", caption: "אזור המטבחון והמנוחה" },
    ],
    services: ["תכנון חללים", "עיצוב פנים"],
  },
  {
    id: "4",
    title: "דופלקס בגבעתיים",
    category: "עיצוב פנים",
    location: "גבעתיים",
    year: 2023,
    area: "180 מ\"ר",
    description: "שיפוץ מקיף של דופלקס עם דגש על ניצול מרבי של האור הטבעי וחיבור בין הקומות באמצעות גרם מדרגות מרהיב.",
    mainImage: "/api/placeholder/600/400",
    images: [
      { src: "/api/placeholder/800/600", alt: "גרם מדרגות", caption: "גרם המדרגות המרכזי" },
      { src: "/api/placeholder/800/600", alt: "קומה עליונה", caption: "הקומה העליונה עם פינת עבודה" },
      { src: "/api/placeholder/800/600", alt: "חדרי הילדים", caption: "חדרי הילדים המעוצבים" },
    ],
    services: ["עיצוב פנים", "עיצוב תאורה"],
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("כל הפרויקטים");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "כל הפרויקטים" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-background/90 py-16 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                תיק העבודות שלנו
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                גלו את הפרויקטים שעיצבנו ובנינו עבור הלקוחות שלנו. 
                כל פרויקט הוא סיפור ייחודי של יצירתיות, פונקציונליות ויופי.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="py-8 w-full border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <div className="text-center text-slate-500">
                        <div className="w-16 h-16 mx-auto mb-2 bg-slate-400 rounded-lg flex items-center justify-center">
                          <div className="w-8 h-8 bg-slate-300 rounded"></div>
                        </div>
                        <p className="text-xs">{project.title}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => openProject(project)}
                      >
                        <Eye className="w-4 h-4 me-2" />
                        צפו בפרויקט
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                          {project.category}
                        </span>
                        <span className="text-sm text-gray-500">{project.year}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{project.location}</span>
                        <span>{project.area}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  לא נמצאו פרויקטים
                </h3>
                <p className="text-gray-600">
                  אין פרויקטים בקטגוריה שנבחרה
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <Button variant="ghost" size="sm" onClick={closeProject}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Project Image */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <div className="w-24 h-24 mx-auto mb-4 bg-slate-400 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-slate-300 rounded"></div>
                      </div>
                      <p className="text-sm">תמונת פרויקט</p>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">מיקום</p>
                    <p className="font-semibold">{selectedProject.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">שנה</p>
                    <p className="font-semibold">{selectedProject.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">שטח</p>
                    <p className="font-semibold">{selectedProject.area}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">קטגוריה</p>
                    <p className="font-semibold">{selectedProject.category}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">תיאור הפרויקט</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">שירותים שסופקו</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              רוצים שהפרויקט הבא יהיה שלכם?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              בואו ניצור יחד משהו מיוחד. צרו קשר לייעוץ חינם והצעת מחיר מותאמת אישית
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
