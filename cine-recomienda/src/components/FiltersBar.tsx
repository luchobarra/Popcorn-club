import type { ChangeEvent } from "react";
import type { MovieFilters, Genre } from "./containers/FiltersBarContainer"; // ajusta import si está en otro archivo

interface FiltersBarProps {
  filters: MovieFilters;
  allGenres: Genre[];
  onFilterChange: (updatedFilters: MovieFilters) => void;
  onClear: () => void;
  onApply: () => void;
  totalMovies: number;
  filteredMovies: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  allGenres,
  onFilterChange,
  onClear,
  onApply,
  totalMovies,
  filteredMovies,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let val: any = value;

    if (name === "yearFrom" || name === "yearTo" || name === "minRating") {
      val = value === "" ? null : Number(value);
    }

    if (name === "genres") {
      // Para select multiple (si lo usas), adaptá aquí la lógica. Si es select simple:
      val = value === "" ? [] : [value];
    }

    onFilterChange({
      ...filters,
      [name]: val,
    });
  };

  return (
    <section className="bg-primary p-4 rounded-lg shadow-md w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Año desde */}
        <input
          type="number"
          name="yearFrom"
          placeholder="Año desde"
          min={1900}
          max={new Date().getFullYear()}
          value={filters.yearFrom ?? ""}
          onChange={handleChange}
          className="w-full md:w-32 p-2 rounded border border-card bg-surface text-text-primary"
        />

        {/* Año hasta */}
        <input
          type="number"
          name="yearTo"
          placeholder="Año hasta"
          min={1900}
          max={new Date().getFullYear()}
          value={filters.yearTo ?? ""}
          onChange={handleChange}
          className="w-full md:w-32 p-2 rounded border border-card bg-surface text-text-primary"
        />

        {/* Género */}
        <select
          name="genres"
          value={filters.genres[0] ?? ""}
          onChange={handleChange}
          className="w-full md:w-48 p-2 rounded border border-card bg-surface text-text-primary"
        >
          <option value="">Todos los géneros</option>
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>

        {/* Puntaje mínimo */}
        <input
          type="number"
          name="minRating"
          placeholder="Puntaje mínimo"
          min={0}
          max={10}
          value={filters.minRating ?? 0}
          onChange={handleChange}
          className="w-full md:w-32 p-2 rounded border border-card bg-surface text-text-primary"
        />

        {/* Ordenar por */}
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="w-full md:w-48 p-2 rounded border border-card bg-surface text-text-primary"
        >
          <option value="popularity.desc">Más vistas</option>
          <option value="vote_average.desc">Mayor puntuación</option>
          <option value="primary_release_date.desc">Año más reciente</option>
          <option value="original_title.asc">Título A-Z</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={onClear}
          className="px-4 py-2 rounded border border-secondary text-secondary hover:bg-secondary hover:text-white transition"
        >
          Limpiar
        </button>
        <button
          onClick={onApply}
          className="px-4 py-2 rounded bg-secondary text-white hover:bg-accent transition"
        >
          Aplicar
        </button>
      </div>

      <p className="mt-3 text-text-muted text-right text-sm">
        Mostrando {filteredMovies} de {totalMovies} películas
      </p>
    </section>
  );
};