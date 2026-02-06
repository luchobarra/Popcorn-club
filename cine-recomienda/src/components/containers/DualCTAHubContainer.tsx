import React from "react";
import { useNavigate } from "react-router-dom";
import { DualCTAHub } from "../home/DualCTAHub";

const moviesBg = new URL("../../assets/cta/moviesHome.jpg", import.meta.url).href;
const seriesBg = new URL("../../assets/cta/seriesHome.jpg", import.meta.url).href;

export const DualCTAHubContainer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DualCTAHub
      left={{
        title: "Películas",
        subtitle: "Explorá toda la cartelera y encontrá tu próxima favorita.",
        buttonText: "Ver películas",
        onClick: () => navigate("/movies"),
        backgroundUrl: moviesBg,
      }}
      right={{
        title: "Series",
        subtitle: "¿Listo para maratonear? Descubrí nuevas historias.",
        buttonText: "Ver series", 
        onClick: () => navigate("/series"),
        backgroundUrl: seriesBg,
      }}
    />
  );
};