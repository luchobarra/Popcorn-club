import React, { useEffect, useState } from "react";
import { useContent } from "../../context/ContentContext";
// import { FilterDrawer } from "../presentational/filter/FilterDrawer";

export const ContentFiltersContainer: React.FC = () => {
  const {
    genresMap,
    // allGenres,
    appliedFilters,
    handleApplyFilters,
    setAppliedFilters,
    // contentType,
  } = useContent();

  // estados internos para el formulario (sincronizados con appliedFilters)
  const [genre, setGenre] = useState<number | null>(appliedFilters.genre);
  const [year, setYear] = useState<string>(appliedFilters.year);
  const [minVote, setMinVote] = useState<number>(appliedFilters.minVote);
  const [sortBy, setSortBy] = useState<string>(appliedFilters.sortBy);

  // Sync cuando appliedFilters cambia desde fuera
  useEffect(() => {
    setGenre(appliedFilters.genre);
    setYear(appliedFilters.year);
    setMinVote(appliedFilters.minVote);
    setSortBy(appliedFilters.sortBy);
  }, [appliedFilters]);

  const onApply = () => {
    const f = { genre, year, minVote, sortBy };
    // actualizamos el contexto (que disparará fetch en el container)
    handleApplyFilters(f);
  };

  const onReset = () => {
    const reset = { genre: null, year: "", minVote: 0, sortBy: "vote_average.desc" };
    setGenre(reset.genre);
    setYear(reset.year);
    setMinVote(reset.minVote);
    setSortBy(reset.sortBy);
    // actualiza contexto
    setAppliedFilters(reset);
    // y dispara fetch por efecto
  };

  return (
    <div className="p-4 border-b border-gray-300 flex flex-col gap-4">
      <div>
        <label>Género:</label>
        <select
          value={genre ?? ""}
          onChange={(e) => setGenre(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Todos</option>
          {Object.entries(genresMap).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
 
      <div>
        <label>Año:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Ej: 2023" />
      </div>

      <div>
        <label>Puntaje mínimo:</label>
        <input type="number" min={0} max={10} step={0.1} value={minVote} onChange={(e) => setMinVote(Number(e.target.value))} />
      </div>

      <div>
        <label>Ordenar por:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity.desc">Más populares</option>
          <option value="vote_average.desc">Mejor puntuadas</option>
          <option value="release_date.desc">Más recientes</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={onApply} className="px-3 py-1 bg-blue-500 text-white rounded">
          Aplicar filtros
        </button>
        <button onClick={onReset} className="px-3 py-1 bg-gray-300 rounded">
          Resetear
        </button>
      </div>
    </div>
  );
};