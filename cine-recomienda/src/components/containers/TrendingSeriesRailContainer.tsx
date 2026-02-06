import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tmdbFetch } from "../../api/tmdb";
import { mapTv, onItemClickFactory, type FeedItem } from "../home/helpers";
import { PosterCarousel } from "../ui/PosterCarousel";

export const TrendingSeriesRailContainer: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const navigate = useNavigate();
  const onItemClick = onItemClickFactory(navigate);

  useEffect(() => {
    (async () => {
      try {
        const data = await tmdbFetch(`/trending/tv/day?language=es-ES`);
        setItems((data?.results ?? []).map(mapTv));
      } catch (e) {
        console.error("[TrendingSeries] fetch error:", e);
        setItems([]);
      }
    })();
  }, []);

  return (
    <PosterCarousel
      title="Series en tendencia"
      items={items.map((it) => ({
        id: it.id,
        title: it.title,
        posterUrl: it.posterPath,
        type: it.type,
      }))}
      onItemClick={onItemClick}
      size="md"
    />
  );
};