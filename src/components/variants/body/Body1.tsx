"use client";
import styles from "./Body.module.css";

export default function Body() {
  return (
    <main className={styles.bodyContainer}>
      <section className={styles.introSection}>
        <h1 className={styles.heading}>Welkom bij MIACO</h1>
        <p className={styles.subtext}>Wij bieden de beste oplossingen voor uw bedrijf.</p>
      </section>

      {/* ✅ Grid weergave voor producten/diensten */}
      <section className={styles.featureGrid}>
        <div className={styles.featureCard}>
          <h2>Innovatieve Technologie</h2>
          <p>Wij ontwikkelen high-tech oplossingen op maat.</p>
        </div>
        <div className={styles.featureCard}>
          <h2>Uitstekende Service</h2>
          <p>Onze klantenservice staat 24/7 voor u klaar.</p>
        </div>
        <div className={styles.featureCard}>
          <h2>Partnernetwerk</h2>
          <p>Word onderdeel van ons uitgebreide zakelijke netwerk.</p>
        </div>
      </section>
    </main>
  );
}
