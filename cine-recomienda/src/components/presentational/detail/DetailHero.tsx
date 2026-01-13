import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Play, Bookmark, Heart } from "lucide-react";
import { AnimatedContent } from "../../transitions/AnimatedContent";
import { Poster } from "../../ui/Poster";

interface DetailHeroProps {
  title: string;
  tagline?: string;
  posterPath?: string | null;
  backdropPath?: string | null;
  year?: number;
  rating: number;
  voteCount: number;
  genres: string[];
  hasTrailer?: boolean;
  onAddToWatchlist?: () => void;
  onAddToFavorites?: () => void;
  onPlayTrailer?: () => void;
}

export const DetailHero: React.FC<DetailHeroProps> = ({
  title,
  tagline,
  posterPath,
  backdropPath,
  year,
  rating,
  voteCount,
  genres,
  hasTrailer = false,
  onAddToWatchlist,
  onAddToFavorites,
  onPlayTrailer,
}) => {
  const posterSrc =
    posterPath && posterPath.trim().length > 0
      ? posterPath
      : "/placeholder-poster.svg";

      return (
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1}
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <section
            className="
              relative w-full
              min-h-[36vh] sm:min-h-[44vh] md:min-h-[52vh]
              lg:h-[70vh] lg:max-h-[640px]
              bg-[var(--color-background)]
            "
          >
            {backdropPath ? (
              <div className="absolute inset-0">
                <img
                  src={backdropPath}
                  alt={`Backdrop de ${title}`}
                  className="
                    w-full h-full
                    object-cover
                    object-[50%_50%]
                    md:object-[50%_45%]
                    lg:object-[50%_40%]
                    opacity-45
                  "
                />
                {/* Degrade en el hero por atras del poster */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[88%] bg-gradient-to-t from-[var(--color-background)]/95 via-[var(--color-background)]/55 to-[var(--color-background)]/1" />
              </div>
            ) : (
              <div className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)]/70 to-[var(--color-background)]" />
                <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[var(--color-background)]/55 to-transparent" />
              </div>
            )}
      
            {/* Contenido: más abajo para no chocar con el navbar y centrado en el hero */}
            <div
              className="
                relative z-10 max-w-7xl mx-auto
                px-4 sm:px-6 lg:px-8
                pt-[calc(env(safe-area-inset-top)+68px)] sm:pt-[84px] md:pt-[96px]
                pb-8 sm:pb-10 md:pb-12
              "
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5 sm:gap-6 md:gap-8">
                {/* Poster */}
                <Poster
                  src={posterSrc}
                  alt={`Poster de ${title}`}
                  size="detail"
                  className="self-center md:self-start"
                />
      
                {/* Panel */}
                <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4 text-[var(--color-text-primary)] md:text-left text-center">
                  <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold leading-snug break-words">
                    {title}{" "}
                    {year && (
                      <span className="text-[var(--color-text-secondary)]">({year})</span>
                    )}
                  </h1>
      
                  {tagline && (
                    <p className="italic text-[var(--color-text-secondary)]">
                      {tagline}
                    </p>
                  )}
      
                  {genres?.length > 0 && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {genres.map((g) => (
                        <Badge
                          key={g}
                          className="bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
                        >
                          {g}
                        </Badge>
                      ))}
                    </div>
                  )}
      
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="text-lg font-bold text-[var(--color-secondary)]">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {voteCount} votos
                    </span>
                  </div>
      
                  {/* Acciones */}
                  <div className="mt-1 sm:mt-2">
                    <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 flex-nowrap">
                      <div className="relative group">
                        <Button
                          onClick={hasTrailer ? onPlayTrailer : undefined}
                          disabled={!hasTrailer}
                          aria-disabled={!hasTrailer}
                          className={`
                            flex items-center gap-2 whitespace-nowrap
                            h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm
                            ${
                              hasTrailer
                                ? "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary)]/90"
                                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] cursor-not-allowed opacity-60"
                            }
                          `}
                        >
                          <Play className="w-4 h-4" />
                          Ver tráiler
                        </Button>
      
                        {!hasTrailer && (
                          <div
                            className="
                              pointer-events-none
                              absolute left-1/2 -translate-x-1/2 -top-9
                              whitespace-nowrap rounded-md px-2 py-1 text-xs
                              bg-[var(--color-surface)] text-[var(--color-text-primary)]
                              border border-[var(--color-surface)]/60
                              opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                              transition-opacity
                            "
                            role="status"
                          >
                            Tráiler no disponible
                          </div>
                        )}
                      </div>
      
                      <Button
                        onClick={onAddToWatchlist}
                        variant="outline"
                        className="flex items-center gap-2 whitespace-nowrap h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
                      >
                        <Bookmark className="w-4 h-4" />
                        Guardar
                      </Button>
      
                      <Button
                        onClick={onAddToFavorites}
                        variant="outline"
                        className="flex items-center gap-2 whitespace-nowrap h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
                      >
                        <Heart className="w-4 h-4" />
                        Favorito
                      </Button>
                    </div>
                  </div>
                  {/* /Acciones */}
                </div>
              </div>
            </div>
          </section>
        </AnimatedContent>
      );
      
};