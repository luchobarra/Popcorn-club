import React from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface Props {
  onClick: () => void;
  className?: string;
}

export const FilterToggleButton: React.FC<Props> = ({ onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        bg-[linear-gradient(135deg,rgba(56,189,248,0.4)_10%,rgba(236,72,153,0.4)_90%)]
        w-full flex items-center justify-between
        rounded-xl px-4 py-2
        cursor-pointer
        border border-[var(--color-surface)]
        text-[var(--color-text-primary)]
        shadow-[0_4px_18px_-6px_rgba(0,0,0,0.5)]
        transition-all duration-200
        hover:bg-[linear-gradient(135deg,rgba(56,189,248,0.6)_10%,rgba(236,72,153,0.6)_90%)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]
        ${className}
      `}
    >
      {/* Left */}
      <div className="flex items-center gap-2">
      <span
          className="flex items-center justify-center rounded-xl p-2"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, var(--color-secondary), var(--color-accent), var(--color-secondary))",
            filter: "saturate(1.1) brightness(1.05)",
          }}
        >
          <SlidersHorizontal className="h-5 w-5 text-[var(--color-surface)]" />
        </span>
        <span className="text-sm sm:text-base font-semibold tracking-tight">Filtros</span>
      </div>

      {/* Right */}
      <ChevronDown className="h-6 w-6 text-white" />
    </button>
  );
};
