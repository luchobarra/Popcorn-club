import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Play, Bookmark, Heart } from "lucide-react";
import { AnimatedContent } from "../../transitions/AnimatedContent";

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
          min-h-[36vh] sm:min-h-[36vh] md:min-h-[38vh] lg:min-h-[50vh]
          bg-[var(--color-background)]
        "
      >
        {/* Backdrop o degradé fallback */}
        {backdropPath ? (
          <div className="absolute inset-0">
            <img
              src={backdropPath}
              alt={`Backdrop de ${title}`}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/75 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)]/70 to-[var(--color-background)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 to-transparent" />
          </div>
        )}

        {/* Contenido */}
        <div
          className="
            relative z-10 max-w-7xl mx-auto
            px-4 sm:px-6 lg:px-8
            py-5 sm:py-6 md:py-6 lg:py-10           
          "
          >
          {/* Mobile: columna; Desktop: fila */}
          <div className="flex flex-col md:flex-row md:items-start gap-5 sm:gap-6 md:gap-8 ps-[clamp(5px,3vw,26px)]">
            {/* Poster */}
            <div
              className="
                flex-none
                w-28 xs:w-36 sm:w-40 md:w-52 lg:w-60
                self-center md:self-start
                shadow-xl rounded-xl overflow-hidden
                border border-[var(--color-surface)]
                bg-[var(--color-surface)]
              "
            >
              <img
                src={posterSrc}
                alt={`Poster de ${title}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Panel de contenido */}
            <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4 text-[var(--color-text-primary)] md:text-left text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold leading-tight break-words">
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

              {/* Géneros */}
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

              {/* Rating */}
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
                <div
                  className="
                    flex items-center justify-center md:justify-start gap-2 sm:gap-3
                    flex-nowrap
                  "
                >
                  {/* Ver tráiler (habilitado/inhabilitado + tooltip) */}
                  <div className="relative group">
                    <Button
                      onClick={hasTrailer ? onPlayTrailer : undefined}
                      disabled={!hasTrailer}
                      aria-disabled={!hasTrailer}
                      className={`
                        flex items-center gap-2 whitespace-nowrap
                        h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm
                        ${hasTrailer
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
                    className="
                      flex items-center gap-2 whitespace-nowrap
                      h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm
                    "
                  >
                    <Bookmark className="w-4 h-4" />
                    Guardar
                  </Button>

                  <Button
                    onClick={onAddToFavorites}
                    variant="outline"
                    className="
                      flex items-center gap-2 whitespace-nowrap
                      h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm
                    "
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