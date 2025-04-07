"use client";

import { useEffect, useRef, useState } from "react";
import { HeaderItem } from "@/components/variants/types";

interface Body3Props {
  items: HeaderItem[];
  previewMode?: boolean;
  backgroundColor?: string;
}

interface Product {
  title: string;
  price: string;
  img: string;
}

export default function Body3({ items, previewMode, backgroundColor }: Body3Props) {
  const images = items.filter((item) => item.type === "image");
  const [current, setCurrent] = useState(0);

  const [products, setProducts] = useState<Product[]>([
    {
      title: "T-shirt Zwart",
      price: "€24,95",
      img: "https://source.unsplash.com/random/400x400?shirt",
    },
    {
      title: "Sneakers Wit",
      price: "€89,00",
      img: "https://source.unsplash.com/random/400x400?sneakers",
    },
    {
      title: "Rugzak Urban",
      price: "€49,95",
      img: "https://source.unsplash.com/random/400x400?backpack",
    },
  ]);

  const fileInputs = useRef<HTMLInputElement[]>([]);

  const handleImageClick = (index: number) => {
    fileInputs.current[index]?.click();
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setProducts((prev) => {
        const updated = [...prev];
        updated[index].img = base64;
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

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
      <div className="max-w-3xl text-center text-white">
        <h1 className="text-4xl font-bold mb-4">🛍️ Welkom bij onze Webshop</h1>
        <p className="text-lg">Klik op een afbeelding om je eigen product toe te voegen!</p>
      </div>

      {/* 📽️ Slideshow */}
      {images.length > 0 && images[current] && (
        <div className="w-full max-w-4xl h-[420px] mt-10">
          <img
            src={images[current].content}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
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

      {/* 🧱 Product Grid */}
      <div className="w-full max-w-6xl mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={(el) => void (fileInputs.current[i] = el!)}
              onChange={(e) => handleImageChange(i, e)}
            />
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-64 object-cover cursor-pointer"
              onClick={() => handleImageClick(i)}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">{p.title}</h2>
              <p className="text-gray-700">{p.price}</p>
              <button className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                In winkelwagen
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
