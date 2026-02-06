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

  const appType: contentDetailType =
    type === "movie" || type === "movies" ? "movies" : "series";

  navigate(`/${appType}/${id}`);
}