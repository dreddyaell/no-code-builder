"use client";

import { FooterItem } from "@/components/variants/types";

interface Footer1Props {
  items: FooterItem[];
}

export default function Footer1({ items }: Footer1Props) {
  return (
    <footer className="w-full bg-gray-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo of Image from items */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold">NoCode Studio</span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:text-gray-300">Extranet</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
          <a href="#" className="hover:text-gray-300">Privacy</a>
        </nav>

        {/* Language switcher */}
        <div className="text-xs text-gray-400">🌐 NL</div>
      </div>
    </footer>
  );
}