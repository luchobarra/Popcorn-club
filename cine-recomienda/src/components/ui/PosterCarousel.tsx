import React from "react";
import { HorizontalScroll } from "./HorizontalScroll";
import { PosterCard } from "./PosterCard";

export type PosterCarouselItem = {
  id: number;
  title: string;
  posterUrl: string | null;
  type: "movies" | "series";
  year?: number | null;
  rating?: number | null;
};

type Props = {
  items: PosterCarouselItem[];
  title?: string;
  onItemClick: (id: number, type: "movies" | "series") => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "page" | "contained";
};

export const PosterCarousel: React.FC<Props> = ({
  items,
  title = "También te puede gustar",
  onItemClick,
  size = "md",
  className = "",
  variant = "page",
}) => {
  if (!items || items.length === 0) return null;

  const isContained = variant === "contained";

  const sectionCls = isContained
    ? `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 ${className}`
    : `w-full  space-y-3 ${className}`;

  const titleCls = "text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-3 sm:mb-4 md:mb-5";

  const gapCls = isContained ? "gap-2 sm:gap-3" : "gap-5 sm:gap-6";
  const edgePadding = isContained ? true : false;

  return (
    <section className={sectionCls}>
      <h2 className={titleCls}>{title}</h2>

      <HorizontalScroll ariaLabel={title} edgePadding={edgePadding} gap={gapCls}>
        {items.map((it) => (
          <div key={`${it.type}-${it.id}`} className="flex-shrink-0">
            <PosterCard
              id={it.id}
              type={it.type}
              title={it.title}
              posterUrl={it.posterUrl}
              size={size}
              onClick={onItemClick}
            />
          </div>
        ))}
      </HorizontalScroll>
    </section>
  );
};