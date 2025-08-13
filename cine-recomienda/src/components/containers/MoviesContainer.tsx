"use client"

import { useEffect, useState } from "react"
import { tmdbFetch } from "../../api/tmdb"
import PageCards from "../pages/PageCards"
import { MoviesFiltersContainer } from "./MoviesFiltersContainer"
import type { MovieFilters } from "./FiltersBarContainer"

export interface Movie {
  id: number
  title: string
  vote_average: number
  poster_path: string
  genres: string[]
  year?: number
  views?: string
}

interface Genre {
  id: number
  name: string
}

export const MoviesContainer = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genresMap, setGenresMap] = useState<Record<number, string>>({})
  const [allGenres, setAllGenres] = useState<Genre[]>([])
  const [filters, setFilters] = useState<MovieFilters>({
    genres: [],
    yearFrom: null,
    yearTo: null,
    minRating: 0,
    sortBy: "rating", // Por defecto: mejor puntuación
  })

  const genreParam = filters.genres[0] || null

  // Fetch de géneros
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await tmdbFetch("/genre/movie/list?language=es-ES")
        const map: Record<number, string> = {}
        data.genres.forEach((genre: Genre) => {
          map[genre.id] = genre.name
        })
        setGenresMap(map)
        setAllGenres(data.genres)
      } catch (error) {
        console.error("Error al obtener géneros:", error)
      }
    }

    fetchGenres()
  }, [])

  // Fetch de películas populares con filtros
  useEffect(() => {
    const fetchFilteredMovies = async () => {
      if (Object.keys(genresMap).length === 0) return

      try {
        const genreId = allGenres.find((g) => g.name.toLowerCase() === genreParam?.toLowerCase())?.id

        const sortByTMDB =
          filters.sortBy === "views" ? "popularity.desc"
          : filters.sortBy === "rating" ? "vote_average.desc"
          : filters.sortBy === "year" ? "primary_release_date.desc"
          : "vote_average.desc"

        const responses = await Promise.all([
          tmdbFetch(`/discover/movie?language=es-ES&page=1&with_genres=${genreId || ""}&sort_by=${sortByTMDB}`),
          tmdbFetch(`/discover/movie?language=es-ES&page=2&with_genres=${genreId || ""}&sort_by=${sortByTMDB}`),
        ])

        const allResults = [...responses[0].results, ...responses[1].results]

        const formatted = allResults.map((item: any) => ({
          id: item.id,
          title: item.title,
          vote_average: item.vote_average,
          poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          year: Number(item.release_date?.split("-")[0]),
          genres: item.genre_ids.map((id: number) => genresMap[id]).filter(Boolean),
          views: `${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 9)}M`,
        }))

        setMovies(formatted)
      } catch (error) {
        console.error("Error al obtener películas filtradas:", error)
      }
    }

    fetchFilteredMovies()
  }, [filters, genresMap, allGenres])

  return (
    <>
      <MoviesFiltersContainer
        filters={filters}
        setFilters={setFilters}
        setMovies={setMovies}
        genresMap={genresMap}
        allGenres={allGenres}
      />
      <PageCards
        movies={movies}
        title="Películas destacadas"
        subtitle="Recomendadas para vos"
      />
    </>
  )
}