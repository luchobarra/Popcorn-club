import React, { useEffect, useRef, useState, useCallback } from "react";
import ContentContext, { type ContentItem, type FiltersState, type Genre } from "../../context/ContentContext";
import { tmdbFetch } from "../../api/tmdb"; 
import { useNavigate, useLocation } from "react-router-dom";
import { contentDetail } from "../../../lib/contentDetail";  


interface Props {
  children: React.ReactNode;
}

/**
 * ContentContainer = proveedor de contexto con TODA la lógica.
 * Uso: envolver la UI que consume el contexto:
 * <ContentContainer>
 *   <ContentFiltersContainer />
 *   <PageCards ... />
 * </ContentContainer>
 */
export const ContentContainer: React.FC<Props> = ({ children }) => {
  // contentType viene del ContentTypeContext (Navbar setea ahí)
  const navigate = useNavigate();

  const [items, setItems] = useState<ContentItem[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [genresMap, setGenresMap] = useState<Record<number, string>>({});
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const routeType: "movies" | "series" = pathname.startsWith("/series") ? "series" : "movies";

  const setContentType = useCallback((t: "movies" | "series") => {
    if (t !== routeType) {
      navigate(t === "movies" ? "/movies" : "/series");
    }
  }, [navigate, routeType]);


  const [appliedFilters, setAppliedFilters] = useState<FiltersState>({
    genre: null,
    year: "",
    minVote: 0,
    sortBy: "vote_average.desc",
  });

  // para deduplicar eficiencia O(1)
  const seenIdsRef = useRef<Set<number>>(new Set());
  // para descartar respuestas viejas
  const requestIdRef = useRef(0); 

  // --- Fetch géneros según tipo (movie | tv)
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const endpoint = routeType === "movies" ? "/genre/movie/list" : "/genre/tv/list";
        const data = await tmdbFetch(`${endpoint}?language=es-ES`);
        setAllGenres(data.genres || []);
        const map: Record<number, string> = {};
        (data.genres || []).forEach((g: any) => (map[g.id] = g.name));
        setGenresMap(map);
      } catch (err) {
        console.error("Error al obtener géneros:", err);
      }
    };

    fetchGenres();
  }, [routeType]);

  // --- Helper: construir URL discover según type + filtros + página
  const buildUrl = (pageNumber: number = 1) => {
    const isMovies = routeType === "movies";
    const type = isMovies ? "movie" : "tv";
  
    // defaults más sanos: TV por popularidad y con más votos
    const sortBy = appliedFilters.sortBy || (isMovies ? "vote_average.desc" : "popularity.desc");
    const minVotes = isMovies ? 200 : 300;
  
    const params: string[] = [
      "language=es-ES",
      "include_adult=false",
      `page=${pageNumber}`,
      `vote_count.gte=${minVotes}`,
      `sort_by=${sortBy}`,
    ];
  
    if (appliedFilters.genre != null) {
      params.push(`with_genres=${appliedFilters.genre}`);
    } else if (!isMovies) {
      // En TV, si no elegiste género, evitá animación (suele traer anime desconocido)
      params.push("without_genres=16");
    }
  
    if (appliedFilters.year) {
      if (isMovies) {
        params.push(`primary_release_year=${appliedFilters.year}`);
      } else {
        params.push(`first_air_date.gte=${appliedFilters.year}-01-01`);
        params.push(`first_air_date.lte=${appliedFilters.year}-12-31`);
      }
    }
  
    if (appliedFilters.minVote && appliedFilters.minVote > 0) {
      params.push(`vote_average.gte=${appliedFilters.minVote}`);
    }
  
    return `/discover/${type}?${params.join("&")}`;
  };  

  // --- Fetch inicial / cuando cambian filtros o génerosMap -> precargar p1 y p2
  useEffect(() => {
    const fetchFiltered = async () => {
      if (Object.keys(genresMap).length === 0) return;
      const reqId = ++requestIdRef.current;

      try {
        setLoading(true);
        // precarga páginas 1 y 2
        const [r1, r2] = await Promise.all([tmdbFetch(buildUrl(1)), tmdbFetch(buildUrl(2))]);
        // si ya vino otra petición descartamos esta respuesta
        if (reqId !== requestIdRef.current) return;

        const allResults = [...(r1.results || []), ...(r2.results || [])];

        // formateo y dedupe
        seenIdsRef.current.clear();
        const formatted = allResults
          .map((item: any) => {
            const title = routeType === "movies" ? item.title : item.name;
            const yearString =
              routeType === "movies" ? item.release_date : item.first_air_date;
            const year = yearString ? Number(yearString.split("-")[0]) : undefined;

            return {
              id: item.id,
              title,
              name: item.name,
              poster_path: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
              genre_ids: item.genre_ids || [],
              vote_average: item.vote_average,
              release_date: item.release_date,
              first_air_date: item.first_air_date,
              overview: item.overview,
              year,
            } as ContentItem;
          })
          .filter((it: ContentItem) => {
            if (!it.id) return false;
            if (seenIdsRef.current.has(it.id)) return false;
            seenIdsRef.current.add(it.id);
            return true;
          });

        setItems(formatted);
        setPage(2); // ya cargamos la 1 y 2
      } catch (err) {
        console.error("Error al obtener items filtrados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters, genresMap, routeType]);

  // --- loadMore (infinite scroll / "cargar más")
  const loadMoreItems = async () => {
    if (loading || Object.keys(genresMap).length === 0) return;
    setLoading(true);
    const nextPage = page + 1;
    const reqId = ++requestIdRef.current;

    try {
      const res = await tmdbFetch(buildUrl(nextPage));
      if (reqId !== requestIdRef.current) return;

      const newResults = res.results || [];
      const formatted = newResults
        .map((item: any) => {
          const title = routeType === "movies" ? item.title : item.name;
          const yearString =
            routeType === "movies" ? item.release_date : item.first_air_date;
          const year = yearString ? Number(yearString.split("-")[0]) : undefined;

          return {
            id: item.id,
            title,
            name: item.name,
            poster_path: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
            genre_ids: item.genre_ids || [],
            vote_average: item.vote_average,
            release_date: item.release_date,
            first_air_date: item.first_air_date,
            overview: item.overview,
            year,
          } as ContentItem;
        })
        .filter((it: ContentItem) => {
          if (!it.id) return false;
          if (seenIdsRef.current.has(it.id)) return false;
          seenIdsRef.current.add(it.id);
          return true;
        });

      setItems((prev) => [...prev, ...formatted]);
      setPage(nextPage);
    } catch (err) {
      console.error("Error al cargar más items:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- handler que recibirá ContentFiltersContainer
  const handleApplyFilters = (f: FiltersState) => {
    // aplicamos filtros (se cargan de nuevo)
    setAppliedFilters(f);
    setPage(1);
    seenIdsRef.current.clear();
    // la effect de [appliedFilters] se encargará del fetch
  };

  // --- click global para ir al detalle
  const onCardClick = (id: number, explicitType?: "movies" | "series") => {
    const type = explicitType ?? (routeType === "movies" ? "movies" : "series");
    contentDetail(navigate, { type, id });
  };


  // --- Detector de scroll: si querés habilitarlo aquí, o preferir que el UI use loadMoreItems
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        loadMoreItems();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, page, genresMap, routeType]);

  // --- valor que exponemos en el contexto
  const ctxValue = {
    contentType: routeType,
    routeType,
    items,
    loading,
    page,
    allGenres,
    genresMap,
    appliedFilters,
    handleApplyFilters,
    loadMoreItems,
    setAppliedFilters,
    onCardClick,
    setContentType,
  };

  return <ContentContext.Provider value={ctxValue}>{children}</ContentContext.Provider>;
};