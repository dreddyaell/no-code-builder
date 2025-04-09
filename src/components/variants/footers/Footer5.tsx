"use client";
import React from "react";
import { FooterProps } from "../types";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Footer5({ items }: FooterProps) {
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const bgInputRef = useRef<HTMLInputElement | null>(null);

  const [logoUrl, setLogoUrl] = useState("/logo.png");
  

  useEffect(() => {
    const savedLogo = localStorage.getItem("footer5Logo");
    if (savedLogo) setLogoUrl(savedLogo);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("footer5Logo", reader.result as string);
      setLogoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <footer className="relative text-white">

      {/* Content */}
      <div className="relative z-10 px-6 py-16 text-center flex flex-col items-center justify-center">
        <div
          className="mb-6 cursor-pointer"
          onClick={() => logoInputRef.current?.click()}
        >
          <Image
            src={logoUrl}
            alt="Logo"
            width={100}
            height={50}
            className="hover:opacity-80 transition-opacity duration-200"
          />
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>

        <blockquote className="text-xl italic max-w-2xl mx-auto mb-8 text-gray-200">
          “Laat je creativiteit achter op elke pixel van deze pagina.”
        </blockquote>

        <div className="w-full max-w-md mx-auto">
          <p className="mb-2 text-sm text-gray-300">Ontvang maandelijkse inspiratie 💌</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="E-mail"
              className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded font-medium text-sm">
              Verstuur
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-xs text-gray-400 text-center py-4">
        © {new Date().getFullYear()} NoCodeBuilder – Jouw verhaal, jouw stijl, jouw platform.
      </div>
    </footer>
  );
}
