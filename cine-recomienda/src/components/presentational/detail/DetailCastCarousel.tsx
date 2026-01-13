import { HorizontalScroll } from "../../ui/HorizontalScroll";
import { User } from "lucide-react";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath?: string | null; // esperá URL completa o null
}

interface DetailCastCarouselProps {
  cast: CastMember[];
}

export const DetailCastCarousel: React.FC<DetailCastCarouselProps> = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-3 sm:mb-4 md:mb-5">
        Reparto principal
      </h2>
  
      {/* Usamos gap en la pista para separar cada card */}
      <HorizontalScroll ariaLabel="Reparto principal" gap="gap-3 sm:gap-4 md:gap-5">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="flex-shrink-0 text-center
                       w-20 sm:w-24 md:w-28 lg:w-32"
          >
            <div
              className="rounded-full overflow-hidden mx-auto mb-2
                         border border-[var(--color-surface)] shadow bg-[var(--color-surface)]
                         w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
            >
              {actor.profilePath ? (
                <img
                  src={actor.profilePath}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[var(--color-text-secondary)]" />
                </div>
              )}
            </div>
  
            {/* Texto: mantiene truncado y escala suave */}
            <p className="text-[var(--color-text-primary)] font-medium text-[11px] sm:text-xs md:text-sm truncate">
              {actor.name}
            </p>
            <p className="text-[var(--color-text-secondary)] text-[10px] sm:text-[11px] md:text-xs truncate">
              {actor.character}
            </p>
          </div>
        ))}
      </HorizontalScroll>
    </section>
  );  
};