// src/components/home/helpers.ts
import type { NavigateFunction } from "react-router-dom";
import { contentDetail } from "../../../lib/contentDetail";

/** Póster vertical (2:3) — tamaño configurable */
export const posterUrl = (p?: string | null, size: "w500" | "w342" = "w500") =>
  p ? `https://image.tmdb.org/t/p/${size}${p}` : null;

/** Backdrop horizontal (16:9) — compatibilidad */
export const backdropUrl = (p?: string | null) =>
  p ? `https://image.tmdb.org/t/p/w780${p}` : null;

/** Póster horizontal (16:9) robusto desde el póster principal (sin _face) */
export const posterLandscapeUrl = (filePath?: string | null) =>
  filePath ? `https://image.tmdb.org/t/p/w533_and_h300_bestv2${filePath}` : null;

export type FeedItem = {
  id: number;
  title: string;
  /** URL lista del póster vertical (2:3) */
  posterPath: string | null;
  /** file_path crudo del póster principal (para construir variantes) */
  filePath: string | null;
  type: "movies" | "series";
};

/** Mappers base (póster principal) */
export const mapMovie = (m: any): FeedItem => ({
  id: m.id,
  title: m.title ?? m.name ?? "",
  posterPath: posterUrl(m.poster_path),
  filePath: m.poster_path ?? null,
  type: "movies",
});

export const mapTv = (t: any): FeedItem => ({
  id: t.id,
  title: t.name ?? t.title ?? "",
  posterPath: posterUrl(t.poster_path),
  filePath: t.poster_path ?? null,
  type: "series",
});

/** Mappers alternativos (si querés usar backdrops en algún rail) */
export const mapMovieBackdrop = (m: any): FeedItem => ({
  id: m.id,
  title: m.title ?? "",
  posterPath: backdropUrl(m.backdrop_path),
  filePath: m.poster_path ?? null, // mantenemos poster original por si queremos landscape
  type: "movies",
});

export const mapTvBackdrop = (t: any): FeedItem => ({
  id: t.id,
  title: t.name ?? "",
  posterPath: backdropUrl(t.backdrop_path),
  filePath: t.poster_path ?? null,
  type: "series",
});

/** Navegación */
export const onItemClickFactory =
  (navigate: NavigateFunction) =>
  (id: number, type: "movies" | "series") =>
    contentDetail(navigate, { id, type });