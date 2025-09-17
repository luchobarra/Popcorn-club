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
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-5 md:mb-6">
        Reparto principal
      </h2>
  
      <HorizontalScroll ariaLabel="Reparto principal">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="w-24 sm:w-28 md:w-32 lg:w-36 flex-shrink-0 text-center"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto mb-2 border border-[var(--color-surface)] shadow bg-[var(--color-surface)]">
              {actor.profilePath ? (
                <img
                  src={actor.profilePath}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[var(--color-text-secondary)]" />
                </div>
              )}
            </div>
  
            <p className="text-[var(--color-text-primary)] font-medium text-xs sm:text-sm md:text-base truncate">
              {actor.name}
            </p>
            <p className="text-[var(--color-text-secondary)] text-[0.7rem] sm:text-xs md:text-sm truncate">
              {actor.character}
            </p>
          </div>
        ))}
      </HorizontalScroll>
    </section>
  );  
};