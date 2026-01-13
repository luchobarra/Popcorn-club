// src/components/presentational/detail/DetailSimilarCarousel.tsx
import React from "react";
import { PosterCarousel, type PosterCarouselItem } from "../../ui/PosterCarousel";

interface SimilarItem {
  id: number;
  title: string;
  posterPath: string | null;
  type: "movies" | "series";
  year?: number | null;
  rating?: number | null;
}

interface DetailSimilarCarouselProps {
  items: SimilarItem[];
  title?: string;
  onItemClick: (id: number, type: "movies" | "series") => void;
}

export const DetailSimilarCarousel: React.FC<DetailSimilarCarouselProps> = ({
  items,
  title = "También te puede gustar",
  onItemClick,
}) => {
  const mapped: PosterCarouselItem[] = items.map((it) => ({
    id: it.id,
    title: it.title,
    posterUrl: it.posterPath,
    type: it.type,
    year: it.year,
    rating: it.rating,
  }));

  return (
    <PosterCarousel
      title={title}
      items={mapped}
      onItemClick={onItemClick}
      size="md"
      variant="contained"   // ⬅️ vuelve al look “detail” original
    />
  );
};
