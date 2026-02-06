import React, { useEffect, useState } from "react";
import { tmdbFetch } from "../../api/tmdb";
import { posterUrl } from "../home/helpers";
import { useNavigate } from "react-router-dom";
import { onItemClickFactory } from "../home/helpers";
import { PosterCarousel } from "../ui/PosterCarousel";

type TvResult = {
  id: number;
  name: string;
  first_air_date?: string;
  vote_average?: number;
  poster_path?: string | null;
};

export const Top10SeriesContainer: React.FC = () => {
  const [items, setItems] = useState<TvResult[]>([]);
  const navigate = useNavigate();
  const onItemClick = onItemClickFactory(navigate);

  useEffect(() => {
    (async () => {
      try {
        const data = await tmdbFetch(`/tv/top_rated?language=es-ES&page=1`);
        const results: TvResult[] = data?.results ?? [];
        const top10 = [...results]
          .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
          .slice(0, 10);
        setItems(top10);
      } catch (e) {
        console.error("[Top10Series] fetch error:", e);
        setItems([]);
      }
    })();
  }, []);

  return (
    <PosterCarousel
      title="Top 10 series"
      onItemClick={onItemClick}
      items={items.map((t) => ({
        id: t.id,
        title: t.name,
        posterUrl: posterUrl(t.poster_path ?? null, "w342"),
        type: "series",
        year: t.first_air_date ? Number(t.first_air_date.slice(0, 4)) : null,
        rating: t.vote_average,
      }))}
    />
  );
};