"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { tmdbFetch } from "../../api/tmdb" // ← ✅
import PageCards from "../pages/PageCards"

interface MediaItem {
  id: number
  title: string
  name?: string
  vote_average: number
  poster_path: string
  genre?: string
  year?: number
  views?: string
}

export const RecommendationsContainer = () => {
  const { type } = useParams<{ type: "movie" | "tv" | "series" }>()
  const [media, setMedia] = useState<MediaItem[]>([])

  useEffect(() => {
    if (!type) return

    // Unificar 'series' y 'tv' en 'tv' para la llamada al API
    const fetchType = type === "series" ? "tv" : type

    const fetchRecommendations = async () => {
      try {
        const data = await tmdbFetch(`/${fetchType}/popular?language=es-ES&page=1`)

        const formatted = data.results.map((item: any) => ({
          id: item.id,
          title: item.title || item.name,
          vote_average: item.vote_average,
          poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          year: item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0],
          views: `${Math.round(item.popularity)}K`,
        }))

        setMedia(formatted)
      } catch (error) {
        console.error("Error al obtener recomendaciones:", error)
      }
    }

    fetchRecommendations()
  }, [type])

  if (!type) return <div>Cargando...</div>

  return (
    <PageCards
      movies={media}
      title={type === "movie" ? "Películas populares" : "Series populares"}
      subtitle="Basadas en lo más visto recientemente"
    />
  )
}