"use client"

import type { Movie } from "./MoviesContainer"
import { FiltersBar } from "../FiltersBar"
import type { MovieFilters } from "./FiltersBarContainer"
import { tmdbFetch } from "../../api/tmdb"

interface Props {
  filters: MovieFilters
  setFilters: (filters: MovieFilters) => void
  setMovies: (movies: Movie[]) => void
  genresMap: Record<number, string>
  allGenres: { id: number; name: string }[]
}

export const MoviesFiltersContainer = ({
    filters,
    setFilters,
    setMovies,
    genresMap,
    allGenres,
}: Props) => {
const handleFilterChange = (updatedFilters: MovieFilters) => {
    setFilters(updatedFilters)
}
  
const handleClearFilters = () => {
    const resetFilters: MovieFilters = {
        genres: [],
        yearFrom: null,
        yearTo: null,
        minRating: 0,
        sortBy: "rating",
    }
  
    setFilters(resetFilters)
    fetchPopularMovies()
}

const fetchPopularMovies = async () => {
    try {
      const responses = await Promise.all([
        tmdbFetch("/movie/popular?language=es-ES&page=1"),
        tmdbFetch("/movie/popular?language=es-ES&page=2"),
      ])

      const allResults = [...responses[0].results, ...responses[1].results]

      const formatted = allResults.map((item: any) => ({
        id: item.id,
        title: item.title,
        vote_average: item.vote_average,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        year: parseInt(item.release_date?.split("-")[0]) || undefined,
        genres: item.genre_ids.map((id: number) => genresMap[id]).filter(Boolean),
        views: `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 9)}M`,
      }))

      setMovies(formatted)
    } catch (error) {
      console.error("Error al obtener películas populares:", error)
    }
}

const handleApplyFilters = async () => {
    try {
      const params = new URLSearchParams()
      params.append("language", "es-ES")
  
      // Filtros base
      let sortBy = "vote_average.desc" // default: rating alto
      switch (filters.sortBy) {
        case "views":
          sortBy = "popularity.desc"
          break
        case "rating":
          sortBy = "vote_average.desc"
          break
        case "year":
          sortBy = "primary_release_date.desc"
          break
        case "title":
          sortBy = "original_title.asc"
          break
      }
  
      params.append("sort_by", sortBy)
      params.append("page", "1")
  
      // Filtro para peliculas
      if (sortBy === "vote_average.desc") {
        params.append("vote_count.gte", "100000") // Solo películas con 100+ votos
      }
  
      // Géneros
      if (filters.genres.length > 0) {
        const genreIds = allGenres
          .filter((g) => filters.genres.includes(g.name))
          .map((g) => g.id)
        if (genreIds.length > 0) {
          params.append("with_genres", genreIds.join(","))
        }
      }
  
      // Año desde/hasta
      if (filters.yearFrom) {
        params.append("primary_release_date.gte", `${filters.yearFrom}-01-01`)
      }
      if (filters.yearTo) {
        params.append("primary_release_date.lte", `${filters.yearTo}-12-31`)
      }
  
      // Puntaje mínimo
      if (filters.minRating > 0) {
        params.append("vote_average.gte", filters.minRating.toString());
        params.append("vote_count.gte", "10000000000"); // Esto filtra películas con al menos 1000 votos
      }
  
      // Pedimos 2 páginas
      const [page1, page2] = await Promise.all([
        tmdbFetch(`/discover/movie?${params.toString()}&page=1`),
        tmdbFetch(`/discover/movie?${params.toString()}&page=2`),
      ])
  
      const combined = [...page1.results, ...page2.results]
  
      const formatted = combined.map((item: any) => ({
        id: item.id,
        title: item.title,
        vote_average: item.vote_average,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        year: parseInt(item.release_date?.split("-")[0]) || undefined,
        genres: item.genre_ids.map((id: number) => genresMap[id]).filter(Boolean),
        views: `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 9)}M`,
      }))
  
      setMovies(formatted)
    } catch (error) {
      console.error("Error al aplicar filtros:", error)
    }
}
  

  return (
    <FiltersBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
        totalMovies={0}
        filteredMovies={0}
        allGenres={allGenres} 
    />
  )
}