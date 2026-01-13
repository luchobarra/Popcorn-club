// src/components/NavBarView.tsx
import React, { useEffect, useState } from "react";
import { Menu, User } from "lucide-react";

export type Section = "home" | "movies" | "series";

export type NavBarVariant = "hero" | "solid";

export interface NavBarViewProps {
  current: Section;
  onNavigate: (section: Section) => void;
  onBack?: () => void;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  onSearchSubmit?: () => void;
  onToggleSidebar?: () => void;
  variant: NavBarVariant;
}

export const NavBarView: React.FC<NavBarViewProps> = ({
  current,
  onNavigate,
  onToggleSidebar,
  variant,
}) => {
  const [solid, setSolid] = useState(false);

  // Cambia a "sólido" al scrollear (sobre los heroes queda transparente)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigationItems = [
    { id: "movies" as Section, label: "Películas" },
    { id: "series" as Section, label: "Series & TV" },
  ];

  return (
    // <nav
    //   aria-label="Main"
    //   data-solid={solid ? "true" : "false"}
    //   className={[
    //     // queda fijo en el hero
    //     "absolute top-0 left-0 right-0 z-[80] w-full",
    //     "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
    //   ].join(" ")}
    // >
    <nav
      aria-label="Main"
      data-solid={variant === "hero" && solid ? "true" : "false"}
      className={[
        variant === "hero"
          ? "absolute top-0 left-0 right-0"
          : "bg-black shadow-md",
        "z-[80] w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
      ].join(" ")}
    >
      <div className="relative flex h-[var(--navbar-height)] items-center justify-between px-4 md:px-6">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden rounded-full p-2 bg-[var(--color-surface)]/70 hover:bg-[var(--color-surface)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] transition cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-[var(--color-text-primary)]" />
          </button>

          <button
            onClick={() => onNavigate("home")}
            className="group inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] cursor-pointer"
            aria-label="Go home"
          >
            <span
              className="text-xl md:text-2xl font-extrabold tracking-tight
                         bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-accent)] to-[var(--color-secondary)]
                         bg-clip-text text-transparent
                         group-hover:brightness-110 group-active:scale-[0.98] transition"
            >
              Popcorn Club
            </span>

            <svg
              className="h-6 w-6 md:h-7 md:w-7 drop-shadow-sm group-hover:brightness-110 group-active:scale-[0.98] transition"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 9h12l-1.2 10.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 9Z"
                stroke="currentColor"
                className="text-[var(--color-surface)]"
                strokeWidth="1.2"
              />
              <path
                d="M8 9l.8 11M10.5 9l.5 12M13.5 9l-.5 12M16 9l-.8 11"
                stroke="currentColor"
                className="text-[var(--color-secondary)]/80"
                strokeWidth="1.1"
              />
              <path
                d="M5.5 8.5h13c0-2-1.4-3.5-3.4-3.5-.6-1.2-1.8-2-3.1-2s-2.5.8-3.1 2C7.9 5 6.5 6.5 5.5 8.5Z"
                fill="currentColor"
                className="text-[var(--color-accent)]/80"
              />
            </svg>
          </button>
        </div>

        {/* Center: Navigation (Desktop) */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={[
                "relative px-1.5 py-2 text-sm md:text-base font-medium transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]",
                "cursor-pointer",
                current === item.id
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-secondary)]",
              ].join(" ")}
              aria-current={current === item.id ? "page" : undefined}
            >
              {item.label}
              <span
                className={[
                  "pointer-events-none absolute left-0 right-0 -bottom-0.5 h-0.5",
                  "bg-[var(--color-secondary)] transition-[width] duration-300",
                  current === item.id ? "w-full" : "w-0",
                ].join(" ")}
              />
            </button>
          ))}
        </div>

        {/* Right: User */}
        <button
          className="relative inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full
                     before:absolute before:inset-0 before:rounded-full
                     before:bg-[conic-gradient(var(--color-secondary),var(--color-accent),var(--color-secondary))]
                     before:opacity-70 before:blur-[6px]
                     hover:before:opacity-100 transition
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]
                     cursor-pointer"
          aria-label="User menu"
        >
          <span className="absolute inset-[2px] rounded-full bg-[var(--color-surface)]/80" />
          <User className="relative h-5 w-5 text-[var(--color-text-primary)]" />
        </button>
      </div>
    </nav>
  );
};