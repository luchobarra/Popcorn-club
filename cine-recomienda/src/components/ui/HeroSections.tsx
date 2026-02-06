import React from "react";
import { GalaxyBackgroundHero } from "../home/backgrounds/GalaxyBgHero";

type HeroVariant = "home" | "movies" | "series";

type Props = {
  variant: HeroVariant;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onPrimaryCta?: () => void;
  minHeightClass?: string;        
  overlay?: "none" | "lr" | "tb";        
  className?: string;
};

const COPY: Record<HeroVariant, { title: string; subtitle: string; cta: string }> = {
  home: {
    title: "Encontrá qué ver hoy",
    subtitle: "Descubrí estrenos, clásicos y recomendaciones hechas para vos.",
    cta: "Ver más",
  },
  movies: {
    title: "Películas para vos",
    subtitle: "Filtrá por género, popularidad y calificación en segundos.",
    cta: "Ver más",
  },
  series: {
    title: "Series para maratonear",
    subtitle: "Tendencias, temporadas y picks rápidos para decidir mejor.",
    cta: "Ver más",
  },
};

export const HeroSection: React.FC<Props> = ({
  variant,
  title,
  subtitle,
  ctaLabel,
  onPrimaryCta,
  minHeightClass = "min-h-[65svh] md:min-h-[75svh]",
  overlay = "lr",
  className = "",
}) => {
  const copy = COPY[variant];
  const T = title ?? copy.title;
  const S = subtitle ?? copy.subtitle;
  const CTA = ctaLabel ?? copy.cta;

  return (
    <section
      aria-label={`Hero ${variant}`}
      className={`relative isolate w-full overflow-hidden ${minHeightClass} ${className}`}
    >
      <div className="absolute inset-0 -z-10">
        <GalaxyBackgroundHero className="absolute inset-0" />
        {overlay !== "none" && (
          <div
            className={
              overlay === "lr"
                ? "pointer-events-none absolute inset-0 bg-gradient-to-r from-black/28 via-black/12 to-transparent"
                : "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/14 to-transparent"
            }
          />
        )}
      </div>

      <div className="relative z-10 min-h-[70svh] flex flex-col">
        <div className="h-[var(--navbar-height)] shrink-0" />
        <div className="flex-1 grid place-items-center">
            <div className="w-full max-w-7xl px-[clamp(1rem,3vw,2rem)]">
            <div className="text-center max-w-3xl mx-auto">
                <div className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[clamp(.72rem,1.6vw,.85rem)] text-white/85 backdrop-blur-sm">
                {variant === "home" ? "Inicio" : variant === "movies" ? "Películas" : "Series & TV"}
                </div>

                <h1 className="text-white drop-shadow font-extrabold leading-tight text-[clamp(2.2rem,5.8vw,3.6rem)]">
                {T}
                </h1>
                <p className="mt-2 text-white/90 drop-shadow text-[clamp(1rem,2.2vw,1.2rem)] max-w-prose mx-auto">
                {S}
                </p>

                <div className="mt-6">
                <button
                    type="button"
                    onClick={onPrimaryCta}
                    className="
                    inline-flex items-center justify-center rounded-full
                    px-[clamp(1rem,2.6vw,1.25rem)] py-[clamp(.62rem,1.9vw,.8rem)]
                    font-semibold
                    bg-white text-[#171821]
                    hover:bg-white/95 active:scale-[0.985]
                    shadow-sm
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                    transition
                    "
                >
                    {CTA}
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>

    </section>
  );
};