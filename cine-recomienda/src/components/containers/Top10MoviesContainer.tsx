import React, { useEffect, useState } from "react";
import { tmdbFetch } from "../../api/tmdb";
import { posterUrl } from "../home/helpers";
import { useNavigate } from "react-router-dom";
import { onItemClickFactory } from "../home/helpers";
import { PosterCarousel } from "../ui/PosterCarousel";

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
    <PosterCarousel
      title="Top 10 películas"
      onItemClick={onItemClick}
      items={items.map((m) => ({
        id: m.id,
        title: m.title,
        posterUrl: posterUrl(m.poster_path ?? null, "w342"),
        type: "movies",
        year: m.release_date ? Number(m.release_date.slice(0, 4)) : null,
        rating: m.vote_average,
      }))}
    />
  );
};