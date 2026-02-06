import React, { useMemo } from "react";
import { useContent } from "../../../context/ContentContext";

export const ActiveFiltersChips: React.FC = () => {
  const { appliedFilters, genresMap } = useContent();
  const { genre, year, minVote, sortBy } = appliedFilters;

  const chips = useMemo(() => {
    const list: { id: string; label: string }[] = [];

    if (genre && genresMap[genre]) list.push({ id: "genre", label: genresMap[genre] });
    if (year) list.push({ id: "year", label: year });
    if (minVote > 0) list.push({ id: "minVote", label: `${minVote}+` });

    if (sortBy === "popularity.desc") list.push({ id: "sortBy", label: "Populares" });
    if (sortBy === "vote_average.desc") list.push({ id: "sortBy", label: "Mejor puntaje" });
    if (sortBy === "release_date.desc") list.push({ id: "sortBy", label: "Recientes" });

    return list;
  }, [genre, year, minVote, sortBy, genresMap]);

  if (!chips.length) return null;

  return (
    <div className="mt-[clamp(.6rem,1.4vw,1rem)] flex flex-wrap justify-center gap-[clamp(.4rem,1vw,.7rem)]">
      {chips.map((chip) => (
        <span
          key={chip.id}
          className="
            inline-flex items-center
            px-[clamp(.7rem,1.6vw,.95rem)]
            py-[clamp(.3rem,.7vw,.45rem)]
            rounded-full
            text-[clamp(.7rem,1.8vw,.8rem)]
            font-medium
            text-[var(--color-text-primary)]
            bg-[linear-gradient(135deg,
              color-mix(in_oklab,var(--color-secondary)_28%,transparent),
              color-mix(in_oklab,var(--color-accent)_22%,transparent)
            )]
            border border-[color-mix(in_oklab,var(--color-secondary)_35%,var(--color-surface)_65%)]
            shadow-[0_4px_14px_-6px_color-mix(in_oklab,var(--color-secondary)_45%,transparent)]
            backdrop-blur-[4px]
            whitespace-nowrap
            transition
          "
        >
          {chip.label}
        </span>
      ))}
    </div>
  );
};
