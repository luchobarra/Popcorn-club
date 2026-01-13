// src/components/ui/HorizontalScroll.tsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;   // padding externo lo maneja el contenedor padre (Home)
  ariaLabel?: string;
  showArrows?: boolean;
  gap?: string;         // gap en la pista
  edgePadding?: boolean; // true => padding interno; false => sin padding interno (flush)
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className = "",
  ariaLabel = "Carrusel",
  showArrows = true,
  gap = "",
  edgePadding = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`} role="region" aria-label={ariaLabel}>
      {/* carril: podemos quitar padding interno para que el contenido arranque flush */}
      <div
        ref={ref}
        className={`overflow-x-auto no-scrollbar ${edgePadding ? "px-[clamp(.6rem,1.6vw,1.2rem)]" : "px-0"} touch-pan-x`}
      >
        <div className={`flex items-stretch ${gap}`}>{children}</div>
      </div>

      {showArrows && (
        <>
          {/* md+: flechas mitad afuera/mitad adentro, iguales en todos los carruseles */}
          <button
            type="button"
            onClick={() => scrollByDir("left")}
            aria-label="Anterior"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
                       h-8 w-8 rounded-full bg-[var(--color-surface)]/80
                       border border-[var(--color-surface)]
                       hover:bg-[var(--color-surface)]/95 backdrop-blur
                       items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5 text-[var(--color-text-primary)]" />
          </button>

          <button
            type="button"
            onClick={() => scrollByDir("right")}
            aria-label="Siguiente"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10
                       h-8 w-8 rounded-full bg-[var(--color-surface)]/80
                       border border-[var(--color-surface)]
                       hover:bg-[var(--color-surface)]/95 backdrop-blur
                       items-center justify-center"
          >
            <ChevronRight className="h-5 w-5 text-[var(--color-text-primary)]" />
          </button>
        </>
      )}
    </div>
  );
};