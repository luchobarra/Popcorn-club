import type { NavigateFunction } from "react-router-dom";

export type contentDetailType = "movies" | "series";

export interface contentDetailParams {
  type: contentDetailType | "movie" | "tv";
  id: number | string;
}

export function contentDetail(
  navigate: NavigateFunction,
  { type, id }: contentDetailParams
) {
  // normalizamos SIEMPRE a tu convención de rutas
  const appType: contentDetailType =
    type === "movie" || type === "movies" ? "movies" : "series";

  navigate(`/${appType}/${id}`);
}
