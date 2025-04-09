"use client";
import React from "react";
import { FooterProps } from "../types";

export default function Footer3({ items }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4">📦 Producten</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline">Overzicht</a></li>
            <li><a href="#" className="hover:underline">Prijzen</a></li>
            <li><a href="#" className="hover:underline">Integraties</a></li>
            <li><a href="#" className="hover:underline">Download</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">📚 Resources</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline">Documentatie</a></li>
            <li><a href="#" className="hover:underline">API Referentie</a></li>
            <li><a href="#" className="hover:underline">Tutorials</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">🏢 Bedrijf</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline">Over ons</a></li>
            <li><a href="#" className="hover:underline">Vacatures</a></li>
            <li><a href="#" className="hover:underline">Nieuws</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">📣 Volg ons</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} JouwBedrijf. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
