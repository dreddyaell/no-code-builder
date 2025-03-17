"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HeaderProps } from "../types"; // ✅ Zorg ervoor dat dit correct is geïmporteerd
import styles from "./Header1.module.css";

export default function Header1({ items }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      {/* ✅ Bovenste sectie met extra links en taalopties */}
      <div className={styles.topNav}>
        <div className={styles.leftLinks}>
          <a href="#">Downloads</a>
          <a href="#">Nieuws</a>
          <a href="#">Evenementen</a>
        </div>
        <div className={styles.rightLinks}>
          <div className={styles.languageSwitcher}>
            <Image src="/icons/nl-flag.png" alt="NL" width={18} height={12} />
            <span>NL</span>
          </div>
          <a href="#">Extranet</a>
          <a href="#">WinWeb</a>
          <a href="#">Partner-portaal</a>
        </div>
      </div>

      {/* ✅ Hoofd Header met Logo en Navigatie */}
      <div className={styles.mainHeader}>
        <div className={styles.logoContainer}>
          <Image src="/logo.png" alt="Logo" width={120} height={80} />
        </div>

        {/* ✅ Navigatiebalk */}
        <nav className={styles.nav}>
          {items.map((item) => (
            <a
              key={item.id}
              href="#"
              className={styles.navLink}
              style={{
                fontSize: `${item.fontSize}px`,
                fontFamily: item.fontFamily,
                color: item.textColor,
              }}
            >
              {item.content}
            </a>
          ))}
        </nav>

        {/* ✅ Zoekbalk */}
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Zoek op trefwoord" className={styles.searchInput} />
          <button className={styles.searchButton}>🔍</button>
        </div>
      </div>
    </header>
  );
}
