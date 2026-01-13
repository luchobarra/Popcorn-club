import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// UI sections (ajusta las rutas)
import { DetailHero } from "../presentational/detail/DetailHero";
import { DetailOverview } from "../presentational/detail/DetailOverview";
import { DetailCastCarousel } from "../presentational/detail/DetailCastCarousel";
import { DetailVideosGrid } from "../presentational/detail/DetailVideosGrid";
import { DetailSimilarCarousel } from "../presentational/detail/DetailSimilarCarousel";
// Servicio + helper de navegación 
import { fetchDetail } from "../../api/tmdbDetail";
import { contentDetail } from "../../../lib/contentDetail";
import { usePageLoading } from "../../../lib/UsePageLoading"
import { AnimatedContent } from "../transitions/AnimatedContent"


type DetailType = "movies" | "series";
interface DetailModel {
  id: number;
  type: DetailType;
  title: string;
  originalTitle: string;
  overview: string;
  year: number | null;
  rating: number | null;
  voteCount: number;
  runtimeMinutes: number | null;
  seasons?: number | null;
  episodes?: number | null;
  genres: string[];
  posterPath: string | null;
  backdropPath: string | null;
  trailers: Array<{ key: string; name: string; site: string; type?: string }>;
  cast: Array<{ id: number; name: string; character: string; profilePath: string | null }>;
  similar: Array<{ id: number; title: string; posterPath: string | null; type: DetailType; year?: number | null; rating?: number | null }>;
  // (opcional) si más adelante agregás:
  status?: string;
  originalLanguage?: string;
  releaseDate?: string;
  productionCompanies?: string[];
  productionCountries?: string[];
}

export const DetailPage: React.FC = () => {
  const params = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();

  const typeParam = (params.type === "movies" ? "movies" : "series") as DetailType;
  const idParam = params.id as string;

  const [data, setData] = useState<DetailModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch detalle
  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        setLoading(true);
        setErrorMsg(null);
        const detail = await fetchDetail(typeParam, idParam, "es-ES");
        if (!alive) return;
        setData(detail as DetailModel);
      } catch (err: any) {
        if (!alive) return;
        setErrorMsg("No se pudo cargar el detalle. Intentá nuevamente.");
      } finally {
        if (alive) setLoading(false);
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, [typeParam, idParam]);

  // Navegación a otro detalle (similar, cast futuro, etc.)
  const onItemClick = (id: number, type: DetailType) => {
    contentDetail(navigate, { id, type }); // te lleva a /:type/:id
  };

  // Normalizaciones livianas para la UI
  const castForUI = useMemo(
    () =>
      (data?.cast ?? []).map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profilePath: c.profilePath, // ya esperamos URL completa desde el servicio
      })),
    [data]
  );

  const videosForUI = useMemo(
    () => (data?.trailers ?? []).filter((v) => v.site === "YouTube"),
    [data]
  );

  // calcular si hay tráiler
  const hasTrailer = Boolean(videosForUI?.length);

  const similarForUI = useMemo(
    () =>
      (data?.similar ?? []).map((s) => ({
        id: s.id,
        title: s.title,
        posterPath: s.posterPath,
        rating: s.rating ?? null,
        type: s.type,
        year: s.year ?? null,
      })),
    [data]
  );

  usePageLoading(loading)

  if (errorMsg) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-[var(--color-text-primary)] text-lg mb-4">{errorMsg ?? "Sin datos para mostrar."}</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-md border border-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]/40 focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
        >
          Volver
        </button>
      </div>
    );
  }

  // Render final
  return (
    <>
      {data ? (
        <main className="bg-[var(--color-background)]">
          {/* HERO */}
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            duration={1}
            initialOpacity={0.5}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.2}
          >
            <DetailHero
              title={data.title}
              tagline={data.originalTitle !== data.title ? data.originalTitle : undefined}
              posterPath={data.posterPath ?? undefined}
              backdropPath={data.backdropPath ?? undefined}
              year={data.year ?? undefined}
              rating={data.rating ?? 0}
              voteCount={data.voteCount}
              genres={data.genres}
              hasTrailer={hasTrailer}
              onPlayTrailer={() => {
                if (videosForUI.length) {
                  const { key } = videosForUI[0]
                  window.open(`https://www.youtube.com/watch?v=${key}`, "_blank", "noopener,noreferrer")
                }
              }}
              onAddToWatchlist={() => console.log("Agregar a Mi Lista")}
              onAddToFavorites={() => console.log("Agregar a Favoritos")}
            />
          </AnimatedContent>
  
          {/* Contenido con ancho limitado */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={1}
              initialOpacity={0.5}
              animateOpacity
              scale={1.1}
              threshold={0.2}
              delay={0.2}
            >
              <DetailOverview
                overview={data.overview}
                status={data.status}
                originalLanguage={data.originalLanguage}
                releaseDate={data.releaseDate}
                runtimeMinutes={data.runtimeMinutes ?? undefined}
                seasonsCount={data.seasons ?? undefined}
                episodesCount={data.episodes ?? undefined}
                productionCompanies={data.productionCompanies}
                productionCountries={data.productionCountries}
              />
            </AnimatedContent>
  
            <AnimatedContent
              distance={24}
              direction="horizontal"
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <DetailCastCarousel cast={castForUI} />
            </AnimatedContent>
  
            <AnimatedContent
              distance={16}
              direction="vertical"
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <DetailVideosGrid videos={videosForUI} />
            </AnimatedContent>
  
            <AnimatedContent
              distance={24}
              direction="horizontal"
              duration={1}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              threshold={0.2}
            >
              <DetailSimilarCarousel items={similarForUI} onItemClick={onItemClick} />
            </AnimatedContent>
          </div>
        </main>
      ) : null}
    </>
  )      
};