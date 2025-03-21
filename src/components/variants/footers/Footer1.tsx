"use client";

import { FooterProps } from "../types";

export default function Footer1({ items }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white p-6">
      {/* 🔝 Bovenste navigatie */}
      <div className="flex justify-between mb-6">
        <div className="space-x-4">
          <a href="#" className="hover:underline">Support</a>
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Handleidingen</a>
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Extranet</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </div>

      {/* 🔄 Dynamisch gegenereerde content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="text-center"
            style={{
              width: item.width,
              height: item.height,
              fontSize: item.fontSize,
              fontFamily: item.fontFamily,
              color: item.textColor,
            }}
          >
            {item.type === "image" ? (
              <img
                src={item.content}
                alt="footer image"
                className="mx-auto object-contain"
                style={{
                  maxWidth: item.width,
                  maxHeight: item.height,
                }}
              />
            ) : (
              <span>{item.content}</span>
            )}
          </div>
        ))}
      </div>

      {/* 🌍 Socials & taal */}
      <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        <div className="space-x-3">
          <a href="#">📘</a>
          <a href="#">🐦</a>
          <a href="#">📷</a>
        </div>
        <div className="flex items-center space-x-1">
          <img src="/icons/nl-flag.png" alt="NL" width={20} height={14} />
          <span>NL</span>
        </div>
      </div>
    </footer>
  );
}
