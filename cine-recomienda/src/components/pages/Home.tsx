import React, { useCallback } from "react";
import { HeroSection } from "../ui/HeroSections";
import { PopularMoviesRailContainer } from "../containers/PopularMoviesRailContainer";
import { Top10MoviesContainer } from "../containers/Top10MoviesContainer";
import { DualCTAHubContainer } from "../containers/DualCTAHubContainer";
import { Top10SeriesContainer } from "../containers/Top10SeriesContainer";
import { TrendingSeriesRailContainer } from "../containers/TrendingSeriesRailContainer";
import { LogosCarousel} from "../ui/LogosCarousel";

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
      {/* HERO  */}
      <section className="relative">
        <HeroSection variant="home" onPrimaryCta={scrollToContent} />
      </section>
      <LogosCarousel/>
      {/* Contenido principal */}
      <section
        id="page-content"
        className="max-w-7xl mx-auto px-1 sm:px-1 md:px-2 pt-4 pb-12 sm:pt-6 sm:pb-12 space-y-12 md:space-y-14 lg:space-y-16"
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
}