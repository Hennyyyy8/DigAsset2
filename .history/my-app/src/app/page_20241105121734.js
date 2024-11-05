"use client";
import { useState } from "react";
import styles from './Page.module.css';

export default function Home() {
  const [artworkData, setArtworkData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchArtworkData() {
    setLoading(true);
    const response = await fetch("https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number");
    const data = await response.json();
    
    setArtworkData(data.data);
    setLoading(false);
  }

  const DisplayArtworkData = () => {
    if (loading) return <div className={styles.loading}>Loading...</div>;

    if (artworkData && artworkData.length > 0) {
      return (
        <section className={styles.grid}>
          {artworkData.map((entry, i) => (
            <article key={i} className={styles.card}>
              <h2 className={styles.title}>{entry.title}</h2>
              <p><strong>Artist:</strong> {entry.artist_display}</p>
              <p><strong>Date:</strong> {entry.date_display}</p>
              <p><strong>Reference Number:</strong> {entry.main_reference_number}</p>
            </article>
          ))}
        </section>
      );
    }

    return <div className={styles.noData}>No artwork chud fetched</div>;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Art Institute of Chicago Artworks</h1>
      <DisplayArtworkData />
      <button
        className={styles.button}
        onClick={fetchArtworkData}
      >
        Fetch Chud . 
      </button>
    </div>
  );
}
