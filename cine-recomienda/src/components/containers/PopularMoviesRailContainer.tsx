import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tmdbFetch } from "../../api/tmdb";
import { mapMovie, onItemClickFactory, type FeedItem } from "../home/helpers";
import { PosterCarousel } from "../ui/PosterCarousel";

export const PopularMoviesRailContainer: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const navigate = useNavigate();
  const onItemClick = onItemClickFactory(navigate);

  useEffect(() => {
    (async () => {
      try {
        const data = await tmdbFetch(`/movie/popular?language=es-ES&page=1`);
        setItems((data?.results ?? []).map(mapMovie));
      } catch (e) {
        console.error("[PopularMovies] fetch error:", e);
        setItems([]);
      }
    })();
  }, []);

  return (
    <PosterCarousel
      title="Películas populares"
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