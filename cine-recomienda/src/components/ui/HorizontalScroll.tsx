import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  showArrows?: boolean;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className = "",
  ariaLabel = "Carrusel",
  showArrows = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      {showArrows && (
        <>
          <button
            onClick={() => scrollBy("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-[var(--color-surface)]/90 hover:bg-[var(--color-surface)] focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-text-primary)]" />
          </button>
          <button
            onClick={() => scrollBy("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-[var(--color-surface)]/90 hover:bg-[var(--color-surface)] focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-text-primary)]" />
          </button>
        </>
      )}

      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 pb-2 pr-6"
      >
        {React.Children.map(children, (child) => (
          <div className="snap-start">{child}</div>
        ))}
      </div>

      {/* Degradés laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--color-background)] to-transparent" />
    </div>
  );
};