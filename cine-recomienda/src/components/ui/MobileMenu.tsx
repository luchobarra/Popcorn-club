import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="rounded-full p-2 bg-[var(--color-surface)]/70 hover:bg-[var(--color-surface)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] transition cursor-pointer"
        aria-label="Toggle menu"
      >
        {open ? (
          <X className="h-5 w-5 text-[var(--color-text-primary)]" />
        ) : (
          <Menu className="h-5 w-5 text-[var(--color-text-primary)]" />
        )}
      </button>

      {open && (
        <div className="absolute left-0 mt-3 w-44 rounded-xl bg-[var(--color-surface)]/95 backdrop-blur-md shadow-lg border border-white/10 overflow-hidden z-50">
          <button
            onClick={() => goTo("/movies")}
            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition"
          >
            Películas
          </button>
          <button
            onClick={() => goTo("/series")}
            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition"
          >
            Series & TV
          </button>
        </div>
      )}
    </div>
  );
};