"use client";
import { HeaderProps } from "../types"; // ✅ Zorg ervoor dat dit correct is geïmporteerd
import Image from "next/image";
import styles from "./Header2.module.css";

export default function Header2({ items }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="Logo" width={100} height={60} />
      </div>

      {/* ✅ Centrale zoekbalk */}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Waar ben je naar op zoek?" className={styles.searchInput} />
        <button className={styles.searchButton}>🔍</button>
      </div>

      {/* ✅ Navigatie */}
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

      {/* ✅ CTA-knop */}
      <div className={styles.ctaContainer}>
        <button className={styles.ctaButton}>Aanmelden</button>
      </div>
    </header>
  );
}
