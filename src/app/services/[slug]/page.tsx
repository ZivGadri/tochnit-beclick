"use client";

import { notFound, useParams } from "next/navigation";
import { services } from "@/components/sections/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s: any) => s.id === slug);
  if (!service) return notFound();
  
  const Icon = service.icon;
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: service.id,
      name: service.title,
      description: service.description,
      price: service.numericPrice,
      category: service.category,
    });
    
    // Add a small delay for better UX feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Icon className="w-10 h-10 text-primary" />
          <CardTitle className="text-2xl">{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg">{service.description}</p>
          <ul className="mb-4 list-disc pr-6 text-gray-700">
            {service.features.map((f: string) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <span className="font-bold text-xl text-primary">{service.price}</span>
            <Button onClick={handleAddToCart} disabled={isAdding}>
              {isAdding ? "מוסיף..." : "הוסף לעגלה"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
