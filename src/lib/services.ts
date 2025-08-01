export interface Service {
  id: string;
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  price: number;
  priceDisplay: string;
  category: string;
  categoryHe: string;
  features: string[];
  featuresHe: string[];
  duration?: string;
  durationHe?: string;
  image?: string;
}

export const services: Service[] = [
  {
    id: "architectural-design",
    name: "Architectural Design",
    nameHe: "עיצוב אדריכלי",
    description: "Complete architectural planning for new buildings and renovations",
    descriptionHe: "תכנון אדריכלי מלא למבנים חדשים ושיפוצים",
    price: 15000,
    priceDisplay: "החל מ-₪15,000",
    category: "architecture",
    categoryHe: "אדריכלות",
    features: [
      "Detailed architectural plans",
      "Permit process support",
      "Construction supervision"
    ],
    featuresHe: [
      "תוכניות אדריכליות מפורטות",
      "ליווי בתהליך הרישוי",
      "פיקוח על הביצוע"
    ],
    duration: "2-6 months",
    durationHe: "2-6 חודשים"
  },
  {
    id: "interior-design",
    name: "Interior Design",
    nameHe: "עיצוב פנים",
    description: "Creating beautifully designed interior spaces tailored to your lifestyle",
    descriptionHe: "יצירת חללים פנימיים מעוצבים ומותאמים לאורח החיים שלכם",
    price: 8000,
    priceDisplay: "החל מ-₪8,000",
    category: "interior",
    categoryHe: "עיצוב פנים",
    features: [
      "Furniture layout planning",
      "Color and material selection",
      "Lighting design"
    ],
    featuresHe: [
      "תכנון פריסת רהיטים",
      "בחירת צבעים וחומרים",
      "עיצוב תאורה"
    ],
    duration: "2-8 weeks",
    durationHe: "2-8 שבועות"
  },
  {
    id: "space-planning",
    name: "Space Planning",
    nameHe: "תכנון חללים",
    description: "Optimizing space usage for maximum functionality",
    descriptionHe: "אופטימיזציה של השימוש בחלל לקבלת מקסימום פונקציונליות",
    price: 5000,
    priceDisplay: "החל מ-₪5,000",
    category: "planning",
    categoryHe: "תכנון",
    features: [
      "Existing space analysis",
      "Improvement suggestions",
      "Detailed plans"
    ],
    featuresHe: [
      "ניתוח חלל קיים",
      "הצעות לשיפור",
      "תוכניות מפורטות"
    ],
    duration: "1-3 weeks",
    durationHe: "1-3 שבועות"
  },
  {
    id: "lighting-design",
    name: "Lighting Design",
    nameHe: "עיצוב תאורה",
    description: "Designing lighting systems that create the perfect atmosphere",
    descriptionHe: "תכנון מערכות תאורה שיוצרות אווירה מושלמת בכל חלל",
    price: 3000,
    priceDisplay: "החל מ-₪3,000",
    category: "lighting",
    categoryHe: "תאורה",
    features: [
      "Lighting point planning",
      "Fixture selection",
      "Energy efficiency"
    ],
    featuresHe: [
      "תכנון נקודות תאורה",
      "בחירת גופי תאורה",
      "חיסכון באנרגיה"
    ],
    duration: "1-2 weeks",
    durationHe: "1-2 שבועות"
  }
];

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter(service => service.category === category);
}
