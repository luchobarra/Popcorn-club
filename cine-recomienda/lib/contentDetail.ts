import type { NavigateFunction } from "react-router-dom";

export type contentDetailType = "movies" | "series";

export interface contentDetailParams {
  type: contentDetailType; // "movies" | "series"
  id: number | string;
}

export function contentDetail(navigate: NavigateFunction, { type, id }: contentDetailParams) {
  // Rutas canónicas: /movies/:id y /series/:id
  navigate(`/${type}/${id}`);
}