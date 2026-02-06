import { createContext, useContext } from "react";

export type ContentType = "movies" | "series";

export interface FiltersState {
  genre: number | null;
  year: string; 
  minVote: number;
  sortBy: string; 
}

export interface ContentItem {
  id: number;
  title: string; // movies
  name: string; // tv
  poster_path: string | null;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
  first_air_date: string;
  overview: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ContentContextValue {
  // lectura de estado
  contentType: ContentType;
  setContentType: (t: ContentType) => void;

  items: ContentItem[];
  loading: boolean;
  page: number;

  allGenres: Genre[];
  genresMap: Record<number, string>;

  appliedFilters: FiltersState;

  // handlers que consumen los componentes visuales
  handleApplyFilters: (f: FiltersState) => void;
  loadMoreItems: () => Promise<void>;
  // opcional: exponer setAppliedFilters si se necesita
  setAppliedFilters: (f: FiltersState) => void;
  onCardClick: (id: number, type?: "movies" | "series") => void;
}

export const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export const useContent = (): ContentContextValue => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
};