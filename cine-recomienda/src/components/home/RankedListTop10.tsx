// src/components/home/RankedListTop10.tsx
import React from "react";
import { HorizontalScroll } from "../ui/HorizontalScroll";
import { Poster } from "../ui/Poster";

type RankedItem = {
  id: number;
  rank: number;
  thumbUrl: string | null;
  title: string;
  year?: string;
  rating?: number;
  onClick: () => void;
};

type Props = {
  title: string;
  items: RankedItem[];
};

export const RankedListTop10: React.FC<Props> = ({ title, items }) => {
    if (!items?.length) return null;
  
    return (
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-3 sm:mb-4 md:mb-5">
          {title}
        </h2>
  
        {/* Sin padding interno, flechas mitad/mitad, gap en la pista */}
        <HorizontalScroll ariaLabel={title} edgePadding={false} gap="gap-5 sm:gap-6">
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 cursor-pointer group">
              <div
                className="
                  h-[120px] sm:h-[148px] w-[380px] sm:w-[420px]
                  flex items-center gap-5 rounded-2xl
                  outline-1 outline-white/15 bg-white/8 shadow-sm
                  transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white/30
                  px-2 sm:px-5 py-1
                "
                tabIndex={0}
                role="button"
                onClick={item.onClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-base sm:text-lg">#{item.rank}</span>
                </div>
  
                <div className="h-full aspect-[2/3] flex-shrink-0">
                <Poster src={item.thumbUrl ?? null} alt={item.title} size="lg" className="h-full w-full rounded-md overflow-hidden" />
                </div>
  
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-[16px] sm:text-[18px] leading-snug line-clamp-2 mb-2 drop-shadow">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[13px] sm:text-[15px] text-white/85 drop-shadow">
                    {item.year && <span>{item.year}</span>}
                    {typeof item.rating === 'number' && (
                      <>
                        {item.year && <span>•</span>}
                        <span className="flex items-center gap-1">⭐ {item.rating.toFixed(1)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </HorizontalScroll>
      </section>
    );
};
