// src/components/container/Top10SeriesContainer.tsx
import React, { useEffect, useState } from "react";

// ⬇️ Ajustá las rutas según tu proyecto
import { tmdbFetch } from "../../api/tmdb";
import { posterUrl } from "../home/helpers";
import { RankedListTop10 } from "../home/RankedListTop10";
import { useNavigate } from "react-router-dom";
import { onItemClickFactory } from "../home/helpers";

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
    <RankedListTop10
      title="Top 10 series"
      items={items.map((t, idx) => ({
        id: t.id,
        rank: idx + 1,
        thumbUrl: posterUrl(t.poster_path ?? null, "w342"),
        title: t.name,
        year: t.first_air_date ? String(t.first_air_date).slice(0, 4) : undefined,
        rating: t.vote_average,
        onClick: () => onItemClick(t.id, "series"),
      }))}
    />
  );
};