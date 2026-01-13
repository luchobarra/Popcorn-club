// src/components/pages/Home.tsx
import React, { useCallback } from "react";
import { HeroSection } from "../ui/HeroSections";
import { PopularMoviesRailContainer } from "../containers/PopularMoviesRailContainer";
import { Top10MoviesContainer } from "../containers/Top10MoviesContainer";
import { DualCTAHubContainer } from "../containers/DualCTAHubContainer";
import { Top10SeriesContainer } from "../containers/Top10SeriesContainer";
import { TrendingSeriesRailContainer } from "../containers/TrendingSeriesRailContainer";

// Usa el mismo wrapper de animación que ya tenés (lo usabas en Detail)
import { AnimatedContent } from "../transitions/AnimatedContent"

export const Home: React.FC = () => {
  const scrollToContent = useCallback(() => {
    document.getElementById("page-content")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <main className="bg-[var(--color-background)]">
      {/* HERO (fondo simple, navbar transparente arriba) */}
      <section className="relative">
        <HeroSection variant="home" onPrimaryCta={scrollToContent} />
      </section>

      {/* Contenido principal (misma malla que ContentPage) */}
      <section
        id="page-content"
        className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-8 sm:py-12 space-y-12 md:space-y-14 lg:space-y-16"
      >
        <AnimatedContent distance={24} direction="vertical" duration={0.6} delay={0.05}>
          <Top10MoviesContainer />
        </AnimatedContent>

        <AnimatedContent distance={24} direction="vertical" duration={0.6} delay={0.10}>
          <PopularMoviesRailContainer />
        </AnimatedContent>

        <AnimatedContent distance={24} direction="vertical" duration={0.6} delay={0.15}>
          <DualCTAHubContainer />
        </AnimatedContent>

        <AnimatedContent distance={24} direction="vertical" duration={0.6} delay={0.20}>
          <Top10SeriesContainer />
        </AnimatedContent>

        <AnimatedContent distance={24} direction="vertical" duration={0.6} delay={0.25}>
          <TrendingSeriesRailContainer />
        </AnimatedContent>
      </section>
    </main>
  );
};