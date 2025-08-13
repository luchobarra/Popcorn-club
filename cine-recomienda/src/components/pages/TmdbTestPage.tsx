// import { useEffect, useState } from "react";
// import { tmdbFetch } from "../api/tmdb";

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
// };

// export const TmdbTestPage = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPopularMovies = async () => {
//       try {
//         const data = await tmdbFetch("/movie/popular");
//         setMovies(data.results);
//       } catch (err) {
//         setError("Error al cargar películas populares.");
//         console.error(err);
//       }
//     };

//     fetchPopularMovies();
//   }, []);

//   if (error) return <div>{error}</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Películas Populares</h1>
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {movies.map((movie) => (
//           <div key={movie.id} className="text-center">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="rounded-lg"
//             />
//             <p className="mt-2 text-sm">{movie.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };