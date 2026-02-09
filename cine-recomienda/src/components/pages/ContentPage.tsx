import React, { useMemo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "../../context/ContentContext";
import { ContentContainer } from "../containers/ContentContainer";
import PageCards from "../pages/PageCards";
import { FilterDrawer } from "../presentational/filter/FilterDrawer";
import { FilterToggleButton } from "../presentational/filter/FilterToggleButton";
import {ActiveFiltersChips} from "../presentational/filter/ActiveFiltersChips";

type UIMovie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre?: string;
  year?: number;
  views?: string;
};

const ContentInner: React.FC = () => {
  const {
    items,
    contentType,
    genresMap,
    loading,
    appliedFilters,
    handleApplyFilters,
    setAppliedFilters,
  } = useContent();

  // Drawer de filtros
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Crossfade SOLO cuando cambia tipo/filtros
  const [showGrid, setShowGrid] = useState(true);

  // Clave estable por tipo + filtros (NO cambia al paginar)
  const gridKey = useMemo(() => {
    const f = appliedFilters ?? {};
    return `${contentType}:${f.genre ?? "all"}:${f.year || "any"}:${f.minVote || 0}:${f.sortBy || ""}`;
  }, [contentType, appliedFilters]);

  // Salida previa al cambio (apagamos grid)
  useEffect(() => {
    setShowGrid(false);
  }, [gridKey]);

  // Entrada cuando termina el fetch del nuevo set
  useEffect(() => {
    if (!loading && !showGrid) setShowGrid(true);
  }, [loading, showGrid]);

  // Normalización para PageCards
  const normalizedMovies: UIMovie[] = useMemo(() => {
    return (items || []).map((i: any) => {
      const yearStr = (i.release_date || i.first_air_date || "").split("-")[0];
      const yearNum = Number(yearStr);
      const year = Number.isFinite(yearNum) && yearNum > 0 ? yearNum : undefined;

      let poster = "";
      if (i.poster_path) {
        poster = String(i.poster_path);
        if (!poster.startsWith("http")) {
          poster = `https://image.tmdb.org/t/p/w500${poster}`;
        }
      }

      const genreNames = (i.genre_ids || [])
        .map((gid: number) => genresMap?.[gid])
        .filter(Boolean) as string[];
      const genre = genreNames[0] ?? undefined;

      return {
        id: i.id,
        title: i.title,
        poster_path: poster,
        vote_average: i.vote_average ?? 0,
        genre,
        year,
        views: undefined,
      };
    });
  }, [items, genresMap]);


  const openFilters = () => setFiltersOpen(true);

  // Géneros para el Drawer
  const genres = useMemo(
    () => Object.entries(genresMap).map(([id, name]) => ({ id: Number(id), name })),
    [genresMap]
  );

  const resetFilters = { genre: null, year: "", minVote: 0, sortBy: "vote_average.desc" };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
        <FilterToggleButton onClick={openFilters} />
        <ActiveFiltersChips />
      </div>

      <section id="page-content">
        <AnimatePresence mode="wait" initial={false}>
          {showGrid && (
            <motion.div
              key={gridKey}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <PageCards
                movies={normalizedMovies}
                title={contentType === "movies" ? "Películas" : "Series & TV"}
                subtitle="Recomendadas para vos"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <FilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        initial={appliedFilters}
        genres={genres}
        variant={contentType === "movies" ? "movies" : "series"}
        onApply={(f) => {
          handleApplyFilters(f);
          setFiltersOpen(false);
        }}
        onReset={() => {
          setAppliedFilters(resetFilters);
          setFiltersOpen(false);
        }}
      />
    </>
  );
};

export function ContentPage() {
  return (
    <ContentContainer>
      <ContentInner />
    </ContentContainer>
  );
}