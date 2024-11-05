"use client"; 
import { useState } from "react";

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
    if (loading) return <div className="text-lg sm:text-xl md:text-2xl">Loading...</div>;

    if (artworkData && artworkData.length > 0) {
      return (
        <section className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
          {artworkData.map((entry, i) => (
            <article key={i} className="p-4 border rounded-lg shadow-sm sm:p-6 md:p-8">
              <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">{entry.title}</h2>
              <p><strong>Artist:</strong> {entry.artist_display}</p>
              <p><strong>Date:</strong> {entry.date_display}</p>
              <p><strong>Reference Number:</strong> {entry.main_reference_number}</p>
            </article>
          ))}
        </section>
      );
    }

    return <div className="text-lg sm:text-xl md:text-2xl">No artwork data fetched</div>;
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-4 sm:text-3xl md:text-4xl">Art Institute of Chicago Artworks</h1>
      <DisplayArtworkData />
      <button
        className="mt-6 px-4 py-2 border-2 rounded-md bg-gray-200 hover:bg-gray-300 sm:px-6 sm:py-3 md:px-8 md:py-4"
        onClick={fetchArtworkData}
      >
        Fetch Artworks
      </button>
    </div>
  );
}
