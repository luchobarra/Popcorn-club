import { Routes, Route } from "react-router-dom";
// import ProfessionalNavbar from "./components/professional-navbar";
import { Home } from "./components/pages/Home";
import { MoviesContainer } from "./components/containers/MoviesContainer";
import { SeriesTvContainer } from "./components/containers/SeriesTvContainer";
// import { Movies } from "@/pages/movies/Movies";
// import { Series } from "@/pages/series/Series";
// import { MovieGenres } from "@/pages/movies/MovieGenres";
// import { SeriesGenres } from "@/pages/series/SeriesGenres";
// import { MovieRecommendations } from "@/pages/movies/MovieRecommendations";
// import { SeriesRecommendations } from "@/pages/series/SeriesRecommendations";
// import { MoviePopular } from "@/pages/movies/MoviePopular";
// import { SeriesPopular } from "@/pages/series/SeriesPopular";
// import { DetailPage } from "@/pages/DetailPage";
// import { Nosotros } from "@/pages/Nosotros";
import { RecommendationsContainer }  from "./components/containers/RecommendationsContainer";

export const AppRouter = () => {
  return (
    <>
      {/* <ProfessionalNavbar /> */}
      <Routes>
        <Route path="/" element={<Home />} /> 


        {/* RECOMENDACIONES */}
        <Route path="/recomendaciones/:type" element={<RecommendationsContainer />} />
        <Route path="/movies" element={<MoviesContainer />} /> //ruta del boton movie a seccion peliculas
        <Route path="/seriesTv" element={<SeriesTvContainer />} /> //ruta del boton movie a seccion series y tv





        {/* MOVIES */}
        {/* <Route path="/movies" element={<Movies />} />
        <Route path="/movies/populares" element={<MoviePopular />} />
        <Route path="/movies/recomendaciones" element={<MovieRecommendations />} />
        <Route path="/movies/generos" element={<MovieGenres />} />
        <Route path="/movies/generos/:id/:nombre" element={<MovieGenres />} /> */}

        {/* SERIES */}
        {/* <Route path="/series" element={<Series />} />
        <Route path="/series/populares" element={<SeriesPopular />} />
        <Route path="/series/recomendaciones" element={<SeriesRecommendations />} />
        <Route path="/series/generos" element={<SeriesGenres />} />
        <Route path="/series/generos/:id/:nombre" element={<SeriesGenres />} /> */}

        {/* DETALLE Y NOSOTROS */}
        {/* <Route path="/detalle/:tipo/:id" element={<DetailPage />} />
        <Route path="/nosotros" element={<Nosotros />} /> */}
      </Routes>
    </>
  );
};