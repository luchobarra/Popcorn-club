import { useMemo } from "react";
import { ContentContainer } from "../containers/ContentContainer";
import { ContentFiltersContainer } from "../containers/ContentFiltersContainer";
import PageCards from "../pages/PageCards";
import { useContent } from "../../context/ContentContext";

type UIMovie = {
  id: number;
  title: string;
  poster_path: string;   // PageCards espera string SIEMPRE
  vote_average: number;
  genre?: string;        // un solo género para UI (puedes cambiar a join si querés)
  year?: number;
  views?: string;
};

const ContentInner = () => {
  const { items, contentType, genresMap } = useContent();

  // Normalizamos ContentItem[] -> UIMovie[] que espera PageCards
  const normalizedMovies: UIMovie[] = useMemo(() => {
    return (items || []).map((i: any) => {
      // Year desde release_date/first_air_date
      const yearStr = (i.release_date || i.first_air_date || "").split("-")[0];
      const yearNum = Number(yearStr);
      const year = Number.isFinite(yearNum) && yearNum > 0 ? yearNum : undefined;

      // poster_path como string (si ya viene con http, lo dejamos)
      let poster = "";
      if (i.poster_path) {
        poster = String(i.poster_path);
        if (!poster.startsWith("http")) {
          poster = `https://image.tmdb.org/t/p/w500${poster}`;
        }
      }

      // Primer género legible (si preferís todos, usá join(", "))
      const genreNames = (i.genre_ids || [])
        .map((gid: number) => genresMap?.[gid])
        .filter(Boolean) as string[];
      const genre = genreNames[0] ?? undefined;

      return {
        id: i.id,
        title: i.title,                       // ContentContainer ya setea title = title || name
        poster_path: poster,                  // siempre string
        vote_average: i.vote_average ?? 0,
        genre,
        year,
        views: undefined,                     // si luego querés simular views, lo agregamos acá
      };
    });
  }, [items, genresMap]);

  return (
    <>
      <ContentFiltersContainer />
      <PageCards
        movies={normalizedMovies}
        title={contentType === "movies" ? "Películas" : "Series & TV"}
        subtitle="Recomendadas para vos"
      />
    </>
  );
};

export default function ContentPage() {
  return (
    <ContentContainer>
      <ContentInner />
    </ContentContainer>
  );
}