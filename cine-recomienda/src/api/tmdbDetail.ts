import { tmdbFetch } from "./tmdb";

export type DetailType = "movies" | "series";
type TMDBType = "movie" | "tv";
const toTmdbType = (t: DetailType): TMDBType => (t === "movies" ? "movie" : "tv");

export interface DetailModel {
  id: number;
  type: DetailType;
  title: string;
  originalTitle: string;
  overview: string;
  year: number | null;
  rating: number | null;
  voteCount: number;
  runtimeMinutes: number | null;
  seasons?: number | null;
  episodes?: number | null;
  genres: string[];
  posterPath: string | null;
  backdropPath: string | null;
  trailers: Array<{ key: string; name: string; site: string }>;
  cast: Array<{ id: number; name: string; character: string; profilePath: string | null }>;
  similar: Array<{ id: number; title: string; posterPath: string | null; type: DetailType }>;
}

export async function fetchDetail(type: DetailType, id: string | number, lang = "es-ES"): Promise<DetailModel> {
  const t = toTmdbType(type);
  const data = await tmdbFetch(`/${t}/${id}?language=${lang}&append_to_response=videos,images,credits,similar`);

  const isMovie = t === "movie";
  const title = (isMovie ? data.title : data.name) ?? "";
  const originalTitle = (isMovie ? data.original_title : data.original_name) ?? "";
  const dateRaw = (isMovie ? data.release_date : data.first_air_date) as string | undefined;
  const year = dateRaw?.slice(0, 4) ? Number(dateRaw.slice(0, 4)) : null;

  const trailers = (data.videos?.results ?? [])
    .filter((v: any) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"))
    .map((v: any) => ({ key: v.key, name: v.name, site: v.site }));

  const cast = (data.credits?.cast ?? []).slice(0, 20).map((c: any) => ({
    id: c.id,
    name: c.name,
    character: c.character,
    profilePath: c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : null,
  }));

  const similar = (data.similar?.results ?? []).slice(0, 12).map((s: any) => {
    const sIsMovie = !!s.title;
    return {
      id: s.id,
      title: (sIsMovie ? s.title : s.name) ?? "",
      posterPath: s.poster_path ? `https://image.tmdb.org/t/p/w342${s.poster_path}` : null,
      type: sIsMovie ? "movies" : "series",
    };
  });

  return {
    id: data.id,
    type,
    title,
    originalTitle,
    overview: data.overview ?? "",
    year,
    rating: typeof data.vote_average === "number" ? Number(data.vote_average) : null,
    voteCount: Number(data.vote_count ?? 0),
    runtimeMinutes: isMovie ? (data.runtime ?? null) : null,
    seasons: isMovie ? undefined : (data.number_of_seasons ?? null),
    episodes: isMovie ? undefined : (data.number_of_episodes ?? null),
    genres: (data.genres ?? []).map((g: any) => g.name),
    posterPath: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
    backdropPath: data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}` : null,
    trailers,
    cast,
    similar,
  };
}