import React, { useState } from "react";

interface SeasonItem {
  id: number;
  seasonNumber: number;
  name: string;
  airDate?: string | null;
  episodeCount: number;
  overview?: string | null;
  posterPath?: string | null; // URL completa o null
}

interface DetailSeasonsProps {
  seasons: SeasonItem[];
  onSeasonClick?: (seasonNumber: number) => void; // por si después querés navegar a episodios
}

export const DetailSeasons: React.FC<DetailSeasonsProps> = ({ seasons, onSeasonClick }) => {
  if (!seasons || seasons.length === 0) return null;

  // Abrimos la última (o la más reciente) por defecto
  const [open, setOpen] = useState<number | null>(seasons[seasons.length - 1]?.seasonNumber ?? null);

  const toggle = (sn: number) => setOpen(prev => (prev === sn ? null : sn));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-5 md:mb-6">
        Temporadas
      </h2>
  
      <div className="space-y-3">
        {seasons
          .slice()
          .sort((a, b) => (a.seasonNumber ?? 0) - (b.seasonNumber ?? 0))
          .map((s) => {
            const isOpen = open === s.seasonNumber;
            return (
              <div
                key={s.id}
                className="rounded-xl border border-[var(--color-surface)] bg-[var(--color-background)] overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(s.seasonNumber)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 text-left hover:bg-[var(--color-surface)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
                  aria-expanded={isOpen}
                  aria-controls={`season-panel-${s.seasonNumber}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 rounded-md overflow-hidden border border-[var(--color-surface)] flex-shrink-0 bg-[var(--color-surface)]">
                      <img
                        src={s.posterPath || "/placeholder.svg"}
                        alt={`Poster ${s.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
  
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[var(--color-text-primary)]">
                        {s.name || `Temporada ${s.seasonNumber}`}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-[var(--color-text-secondary)]">
                        {s.episodeCount} episodio{s.episodeCount === 1 ? "" : "s"}
                        {s.airDate ? ` • ${s.airDate}` : ""}
                      </p>
                    </div>
                  </div>
  
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-text-secondary)] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.06 1.06l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
  
                {/* Panel */}
                {isOpen && (
                  <div
                    id={`season-panel-${s.seasonNumber}`}
                    className="px-3 sm:px-4 md:px-5 pb-4 sm:pb-5 text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed"
                  >
                    <p className="mb-2 sm:mb-3">
                      {s.overview ||
                        "No hay descripción disponible para esta temporada."}
                    </p>
  
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <button
                        onClick={() => onSeasonClick?.(s.seasonNumber)}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md border border-[var(--color-surface)] text-xs sm:text-sm md:text-base text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/40 focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
                      >
                        Ver episodios
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );  
};