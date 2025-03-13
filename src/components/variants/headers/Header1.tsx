"use client";
import Image from "next/image";
import styles from "./Header1.module.css";
import { HeaderProps } from "../../Header"; // ✅ Importeer de juiste props

const Header1: React.FC<HeaderProps> = ({ items = [] }) => {
  return (
    <div className={styles.headerContent}>
      <div className={styles.logoContainer}>
        <Image src="/logo.png" alt="Logo" width={80} height={40} />
      </div>

      {/* ✅ Dynamische navigatie-items */}
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

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Zoek op trefwoord..."
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>🔍</button>
        <span className={styles.languageSwitcher}>🌐 NL | Extranet</span>
      </div>
    </div>
  );
};

export default Header1;
