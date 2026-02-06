import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { PopcornClubLogo } from "./ui/PopcornClubLogo";
import { MobileMenu } from "./ui/MobileMenu";

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
  variant,
}) => {
  const [solid, setSolid] = useState(false);

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
          <MobileMenu />
          
          {/* Logo/link (desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <PopcornClubLogo />
          </div>
          
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