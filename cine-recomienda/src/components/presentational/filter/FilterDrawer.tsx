// src/components/presentational/filter/FilterDrawer.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";

type Variant = "movies" | "series";
type Filters = { genre: number | null; year: string; minVote: number; sortBy: string };
type GenreOption = { id: number; name: string };

interface FilterDrawerProps {
    open: boolean;
    onClose: () => void;
    initial: Filters;
    genres: GenreOption[];
    variant: Variant;
    onApply: (f: Filters) => void;
    onReset: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
    open,
    onClose,
    initial,
    genres,
    variant,
    onApply,
    onReset,
}) => {
    const [genre, setGenre] = useState<number | null>(initial.genre);
    const [year, setYear] = useState<string>(initial.year);
    const [minVote, setMinVote] = useState<number>(initial.minVote);
    const [sortBy, setSortBy] = useState<string>(initial.sortBy);

    const title = variant === "movies" ? "Filtros de Películas" : "Filtros de Series & TV";
    const accent = variant === "movies" ? "var(--color-secondary)" : "var(--color-accent)";

    useEffect(() => {
        if (!open) return;
        setGenre(initial.genre);
        setYear(initial.year);
        setMinVote(initial.minVote);
        setSortBy(initial.sortBy);
    }, [open, initial]);

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === "Escape") onClose();
    };

    const sortedGenres = useMemo(
        () => [...genres].sort((a, b) => a.name.localeCompare(b.name, "es")),
        [genres]
    );

    const firstInputRef = useRef<HTMLSelectElement | null>(null);
    useEffect(() => {
        if (open) setTimeout(() => firstInputRef.current?.focus(), 10);
    }, [open]);

    const apply = () => onApply({ genre, year, minVote, sortBy });

    return (
        <AnimatePresence>
          {open && (
            <>
              {/* BACKDROP: oscuro + blur leve, detrás del panel */}
                <motion.button
                onClick={onClose}
                className="fixed inset-0 z-[60] pointer-events-auto"
                style={{ backgroundColor: "rgba(0,0,0,0.92)" }}  // oscuridad REAL
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                {/* blur separado, sin color */}
                <span aria-hidden className="absolute inset-0 backdrop-blur-[2px]" />
                </motion.button>

      
              {/* WRAPPER del panel (solo para centrar). No captura clics fuera del panel */}
              <motion.div
                key="fd-wrapper"
                aria-modal
                role="dialog"
                aria-labelledby="filters-title"
                className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-6 pointer-events-none"
                initial={false}
                onKeyDown={onKeyDown}
              >
                {/* PANEL: encima del backdrop, captura los clics */}
                <motion.div
                className="
                    pointer-events-auto relative w-full max-w-[min(92vw,560px)]
                    rounded-2xl
                                   
                    bg-[color-mix(in_oklab,var(--color-surface)_86%,black_14%)]
                    overflow-hidden
                    shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]             
                "
                style={{
                    /* halo suave alrededor del borde + sombra existente */
                    boxShadow: `
                       
                        0 0 50px 0.2px color-mix(in oklab, var(--color-secondary) 25%, transparent),
                        0 8px 28px -12px rgba(0,0,0,0.45)
                    `
                }}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
                >

                  {/* Header */}
                  <div className="relative px-5 sm:px-6 py-4 sm:py-5">
                    <div
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: `linear-gradient(90deg, ${accent}, transparent 70%)` }}
                    />
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-lg p-2"
                        style={{
                          background:
                            "conic-gradient(from 180deg at 50% 50%, var(--color-secondary), var(--color-accent), var(--color-secondary))",
                          filter: "saturate(1.1) brightness(1.05)",
                        }}
                      >
                        <SlidersHorizontal className="h-5 w-5 text-[var(--color-surface)]" />
                      </div>
                      <h2 id="filters-title" className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
                        {title}
                      </h2>
                      <div className="ml-auto" />
                      <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-[var(--color-surface)]/60 focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
                        aria-label="Cerrar"
                      >
                        <X className="h-5 w-5 text-[var(--color-text-primary)]" />
                      </button>
                    </div>
                  </div>
      
                  {/* Body */}
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Género */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[var(--color-text-secondary)]">Género</label>
                        <select
                          ref={firstInputRef}
                          value={genre ?? ""}
                          onChange={(e) => setGenre(e.target.value ? Number(e.target.value) : null)}
                          className="
                            w-full rounded-xl border border-[var(--color-surface)]
                            bg-[var(--color-background)]/60 text-[var(--color-text-primary)]
                            focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]
                            px-3 py-2.5 outline-none transition
                          "
                        >
                          <option value="">Todos</option>
                          {sortedGenres.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          ))}
                        </select>
                      </div>
      
                      {/* Año */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-[var(--color-text-secondary)]">Año</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="Ej: 2023"
                          min={1900}
                          max={9999}
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="
                            w-full rounded-xl border border-[var(--color-surface)]
                            bg-[var(--color-background)]/60 text-[var(--color-text-primary)]
                            focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]
                            px-3 py-2.5 outline-none transition
                          "
                        />
                      </div>
      
                      {/* Puntaje mínimo */}
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-[var(--color-text-secondary)]">Puntaje mínimo</label>
                          <span className="text-sm font-medium text-[var(--color-text-primary)]">
                            {minVote.toFixed(1)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={10}
                          step={0.1}
                          value={minVote}
                          onChange={(e) => setMinVote(Number(e.target.value))}
                          className="w-full accent-[var(--color-secondary)]"
                        />
                        <div className="flex justify-between text-[var(--color-text-muted)] text-xs">
                          <span>0</span>
                          <span>5</span>
                          <span>10</span>
                        </div>
                      </div>
      
                      {/* Ordenar por */}
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="text-sm text-[var(--color-text-secondary)]">Ordenar por</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "popularity.desc", label: "Populares" },
                            { id: "vote_average.desc", label: "Mejor puntaje" },
                            { id: "release_date.desc", label: "Recientes" },
                          ].map((opt) => {
                            const active = sortBy === opt.id
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setSortBy(opt.id)}
                                className={`
                                  rounded-xl px-3 py-2 text-sm font-medium transition border
                                  ${
                                    active
                                      ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/18 text-[var(--color-text-primary)]"
                                      : "border-[var(--color-surface)] bg-[var(--color-background)]/50 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                                  }
                                `}
                              >
                                {opt.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
      
                  {/* Footer */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-5 sm:pt-6 mt-3 border-t border-[var(--color-surface)]/90">
                    <div className="flex items-center justify-end gap-3 sm:gap-4">
                      {/* Restaurar */}
                      <button
                        type="button"
                        onClick={onReset}
                        className="
                          inline-flex items-center justify-center rounded-xl px-4 py-2.5
                          border border-[var(--color-surface)]
                          text-[var(--color-text-primary)]
                          bg-[var(--color-background)]/60
                          hover:border-[var(--color-secondary)]/60
                          hover:bg-[color-mix(in_oklab,var(--color-secondary)_10%,var(--color-background)_90%)]
                          active:bg-[color-mix(in_oklab,var(--color-secondary)_18%,var(--color-background)_82%)]
                          transition
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]
                        "
                      >
                        Restaurar
                      </button>
      
                      {/* Aplicar */}
                      <button
                        type="button"
                        onClick={apply}
                        className="
                          inline-flex items-center justify-center rounded-xl px-4 py-2.5
                          border border-[var(--color-surface)]
                          text-[var(--color-text-primary)]
                          bg-[var(--color-background)]/60
                          hover:border-[var(--color-secondary)]/60
                          hover:bg-[color-mix(in_oklab,var(--color-secondary)_10%,var(--color-background)_90%)]
                          active:bg-[color-mix(in_oklab,var(--color-secondary)_18%,var(--color-background)_82%)]
                          transition
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]
                        "
                      >
                        Aplicar filtros
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    )
       
};
