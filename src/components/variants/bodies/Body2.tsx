"use client";

import { useEffect, useState } from "react";
import { HeaderItem } from "@/components/variants/types";

interface Body2Props {
  items: HeaderItem[];
  previewMode?: boolean;
  backgroundColor?: string;
}

export default function Body2({ items, previewMode, backgroundColor }: Body2Props) {
  const images = items.filter((item) => item.type === "image");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <section
      className="w-full min-h-[90vh] flex flex-col items-center overflow-x-hidden"
      style={{ backgroundColor: backgroundColor || "#000000" }}
    >
      {/* 🔝 Slide tegen header */}
      <div className="w-full max-w-6xl h-[520px] mt-0">
        <img
          src={images[current].content}
          alt={`Slideshow ${current}`}
          className="w-full h-full object-contain mx-auto"
        />
      </div>

      {/* 📄 Beschrijving of tekst */}
      <div className="mt-6 px-4 max-w-4xl text-center text-white text-lg">
        Voeg hier je beschrijving toe of andere tekst onder de banner
      </div>

      {/* ⚪ Bullet indicatoren */}
      <div className="flex gap-2 mt-4">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i === current ? "bg-white" : "bg-gray-600"}`}
          />
        ))}
      </div>
    </section>
  );
}
