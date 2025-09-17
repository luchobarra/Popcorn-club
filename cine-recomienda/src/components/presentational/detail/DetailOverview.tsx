interface DetailOverviewProps {
    overview: string;
    status?: string;
    originalLanguage?: string;
    releaseDate?: string;
    runtimeMinutes?: number;   // para películas
    seasonsCount?: number;     // para series
    episodesCount?: number;    // para series
    productionCompanies?: string[];
    productionCountries?: string[];
  }
  
export const DetailOverview: React.FC<DetailOverviewProps> = ({
    overview,
    status,
    originalLanguage,
    releaseDate,
    runtimeMinutes,
    seasonsCount,
    episodesCount,
    productionCompanies = [],
    productionCountries = [],
}) => {
  return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Título */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-5 md:mb-6">
          Resumen
        </h2>
    
        {/* Sinopsis */}
        <p className="text-[var(--color-text-secondary)] text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 mb-6 sm:mb-7 md:mb-8">
          {overview || "No hay sinopsis disponible."}
        </p>
    
        {/* Datos técnicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 text-xs sm:text-sm md:text-base">
          {status && (
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Estado: </span>
              <span className="text-[var(--color-text-secondary)]">{status}</span>
            </div>
          )}
          {originalLanguage && (
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Idioma original: </span>
              <span className="text-[var(--color-text-secondary)]">{originalLanguage.toUpperCase()}</span>
            </div>
          )}
          {releaseDate && (
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Lanzamiento: </span>
              <span className="text-[var(--color-text-secondary)]">{releaseDate}</span>
            </div>
          )}
          {runtimeMinutes && (
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Duración: </span>
              <span className="text-[var(--color-text-secondary)]">{runtimeMinutes} min</span>
            </div>
          )}
          {seasonsCount && (
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Temporadas: </span>
              <span className="text-[var(--color-text-secondary)]">{seasonsCount}</span>
            </div>
          )}
          {episodesCount && (
            <div>
              <span className="font-semibold text-[var(--color-text-primary)]">Episodios: </span>
              <span className="text-[var(--color-text-secondary)]">{episodesCount}</span>
            </div>
          )}
          {productionCompanies.length > 0 && (
            <div className="sm:col-span-2 break-words leading-6 sm:leading-7">
              <span className="font-semibold text-[var(--color-text-primary)]">Productoras: </span>
              <span className="text-[var(--color-text-secondary)]">{productionCompanies.join(", ")}</span>
            </div>
          )}
          {productionCountries.length > 0 && (
            <div className="sm:col-span-2 break-words leading-6 sm:leading-7">
              <span className="font-semibold text-[var(--color-text-primary)]">Países: </span>
              <span className="text-[var(--color-text-secondary)]">{productionCountries.join(", ")}</span>
            </div>
          )}
        </div>
      </section>
    );    
};  