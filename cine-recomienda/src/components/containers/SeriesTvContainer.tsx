// "use client"

// import { useEffect, useState } from "react"
// import { tmdbFetch } from "../../api/tmdb"
// import PageCards from "../pages/PageCards"

// interface SeriesItem {
//   id: number
//   title: string
//   vote_average: number
//   poster_path: string
//   genre?: string
//   year?: number
//   views?: string
// }

// export const SeriesTvContainer = () => {
//   const [series, setSeries] = useState<SeriesItem[]>([])

//   useEffect(() => {
//     const fetchSeries = async () => {
//       try {
//         const data = await tmdbFetch(`/tv/popular?language=es-ES&page=1`)

//         const sorted = [...data.results].sort((a, b) => b.popularity - a.popularity)

//         const formatted = sorted.map((item: any) => ({
//           id: item.id,
//           title: item.name,
//           vote_average: item.vote_average,
//           poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
//           year: item.first_air_date?.split("-")[0],
//           views: `${Math.round(item.popularity)}K`,
//         }))

//         setSeries(formatted)
//       } catch (error) {
//         console.error("Error al obtener series:", error)
//       }
//     }

//     fetchSeries()
//   }, [])

//   return (
//     <PageCards
//       movies={series}
//       title="Series y programas populares"
//       subtitle="Lo más visto recientemente en televisión"
//     />
//   )
// }