import React from "react";
import { HorizontalScroll } from "../../ui/HorizontalScroll";
import { Star, Film } from "lucide-react";


interface SimilarItem {
  id: number;
  title: string;
  posterPath: string | null;     // URL completa o null
  rating?: number | null;        // opcional
  type: "movies" | "series";     // para navegar correctamente
  year?: number | null;          // opcional
}

interface DetailSimilarCarouselProps {
  items: SimilarItem[];
  title?: string; // por defecto: "También te puede gustar"
  onItemClick: (id: number, type: "movies" | "series") => void;
}

export const DetailSimilarCarousel: React.FC<DetailSimilarCarouselProps> = ({
  items,
  title = "También te puede gustar",
  onItemClick,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-5 md:mb-6">
        {title}
      </h2>
  
      <HorizontalScroll ariaLabel={title}>
        {items.map((it) => (
          <button
            key={`${it.type}-${it.id}`}
            onClick={() => onItemClick(it.id, it.type)}
            className="w-28 sm:w-32 md:w-36 lg:w-40 flex-shrink-0 text-left group rounded-xl overflow-hidden border border-[var(--color-surface)] bg-[var(--color-background)] hover:border-[var(--color-secondary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] transition-all"
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden bg-[var(--color-surface)] flex items-center justify-center">
              {it.posterPath ? (
                <img
                  src={it.posterPath}
                  alt={it.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <Film className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[var(--color-text-secondary)]" />
              )}
  
              {typeof it.rating === "number" && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-[var(--color-surface)]/90 border border-[var(--color-surface)] text-[var(--color-text-primary)] text-[0.7rem] sm:text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[var(--color-secondary)]" />
                  {it.rating.toFixed(1)}
                </div>
              )}
            </div>
  
            {/* Info */}
            <div className="p-2 sm:p-3">
              <h3 className="text-[var(--color-text-primary)] font-medium text-xs sm:text-sm md:text-base line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors">
                {it.title}
              </h3>
              <p className="text-[var(--color-text-muted)] text-[0.65rem] sm:text-xs md:text-sm mt-1">
                {it.type === "movies" ? "Película" : "Serie"}
                {it.year ? ` • ${it.year}` : ""}
              </p>
            </div>
          </button>
        ))}
      </HorizontalScroll>
    </section>
  );  
};