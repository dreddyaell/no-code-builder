"use client";
import { FooterProps } from "../types"; // ✅ Zorg ervoor dat dit correct is geïmporteerd
import styles from "./Footer1.module.css";

export default function Footer1({ items }: FooterProps) {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {items.map((item) => (
          <div key={item.id} className={styles.footerItem}>
            {item.content}
          </div>
        ))}
      </div>
    </footer>
  );
}
