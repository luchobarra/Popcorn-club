import { Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { ContentContainer } from "./components/containers/ContentContainer";
import { RecommendationsContainer }  from "./components/containers/RecommendationsContainer";
import ContentPage from "./components/pages/ContentPage";

export const AppRouter = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} /> 


        {/* RECOMENDACIONES */}
        <Route path="/recomendaciones/:type" element={<RecommendationsContainer />} />
        <Route
      path="/movies"
      element={
        <ContentContainer>
          <ContentPage />
        </ContentContainer>
      }
    />
    <Route
      path="/series"
      element={
        <ContentContainer>
          <ContentPage />
        </ContentContainer>
      }
      
/>

        





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