// src/components/FiltersBar/FiltersBarContainer.tsx
import React from "react";
import { FiltersBar } from "../FiltersBar";

export interface MovieFilters {
    genres: number[];
    yearFrom: number | null;
    yearTo: number | null;
    minRating: number;
    sortBy: string;
}
  
export interface Genre {
    id: number;
    name: string;
}

interface FiltersBarContainerProps {
  filters: MovieFilters;
  setFilters: React.Dispatch<React.SetStateAction<MovieFilters>>;
  onApplyFilters: () => void;
  allGenres: Genre[];
  totalMovies: number;
  filteredMovies: number;
}

export const FiltersBarContainer: React.FC<FiltersBarContainerProps> = ({
  filters,
  setFilters,
  onApplyFilters,
  allGenres,
  totalMovies,
  filteredMovies,
}) => {
  const handleFilterChange = (updated: MovieFilters) => setFilters(updated);
  const handleClear = () =>
    setFilters({
      genres: [],
      yearFrom: null,
      yearTo: null,
      minRating: 0,
      sortBy: "popularity.desc",
    });

  return (
    <FiltersBar
      filters={filters}
      onFilterChange={handleFilterChange}
      onClear={handleClear}
      onApply={onApplyFilters}
      allGenres={allGenres}
      totalMovies={totalMovies}
      filteredMovies={filteredMovies}
    />
  );
};