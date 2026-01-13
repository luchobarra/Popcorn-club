// src/components/container/Top10MoviesContainer.tsx
import React, { useEffect, useState } from "react";

// ⬇️ Ajustá las rutas según tu proyecto
import { tmdbFetch } from "../../api/tmdb";
import { posterUrl } from "../home/helpers";
import { RankedListTop10 } from "../home/RankedListTop10";
import { useNavigate } from "react-router-dom";
import { onItemClickFactory } from "../home/helpers";

type MovieResult = {
  id: number;
  title: string;
  release_date?: string;
  vote_average?: number;
  poster_path?: string | null;
};

export const Top10MoviesContainer: React.FC = () => {
  const [items, setItems] = useState<MovieResult[]>([]);
  const navigate = useNavigate();
  const onItemClick = onItemClickFactory(navigate);

  useEffect(() => {
    (async () => {
      try {
        const data = await tmdbFetch(`/movie/top_rated?language=es-ES&page=1`);
        const results: MovieResult[] = data?.results ?? [];
        // La API ya viene ordenada, pero aseguramos y tomamos 10
        const top10 = [...results]
          .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
          .slice(0, 10);
        setItems(top10);
      } catch (e) {
        console.error("[Top10Movies] fetch error:", e);
        setItems([]);
      }
    })();
  }, []);

  return (
    <RankedListTop10
      title="Top 10 películas"
      items={items.map((m, idx) => ({
        id: m.id,
        rank: idx + 1,
        thumbUrl: posterUrl(m.poster_path ?? null, "w342"),
        title: m.title,
        year: m.release_date ? String(m.release_date).slice(0, 4) : undefined,
        rating: m.vote_average,
        onClick: () => onItemClick(m.id, "movies"),
      }))}
    />
  );
};