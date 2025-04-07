"use client";

import { useEffect, useState } from "react";
import { HeaderItem } from "@/components/variants/types";

interface Body3Props {
  items: HeaderItem[];
  previewMode?: boolean;
  backgroundColor?: string;
}

export default function Body3({ items, previewMode, backgroundColor }: Body3Props) {
  const images = items.filter((item) => item.type === "image");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      className="w-full min-h-[90vh] flex flex-col items-center overflow-x-hidden py-12 px-4"
      style={{ backgroundColor: backgroundColor || "#121212" }}
    >
      {/* 👋 Welkomsttekst */}
      <div className="max-w-3xl text-center text-white">
        <h1 className="text-4xl font-bold mb-4">🛍️ Welkom bij onze Webshop</h1>
        <p className="text-lg">Bekijk onze nieuwste producten en aanbiedingen hieronder!</p>
      </div>

      {/* 🖼️ Slideshow als er afbeeldingen zijn */}
      {images.length > 0 && images[current] && (
        <div className="w-full max-w-4xl h-[420px] mt-10">
          <img
            src={images[current].content}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />

          {/* ⬤ Indicatoren */}
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === current ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
