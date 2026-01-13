import React from "react";
import { NavBarView, type Section } from "../NavBarView";
import { useLocation, useNavigate } from "react-router-dom";

type NavBarVariant = "hero" | "solid";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const current: Section =
    pathname.startsWith("/movies") ? "movies" :
    pathname.startsWith("/series") ? "series" :
    "home";

  const variant: NavBarVariant = current === "home" ? "hero" : "solid";

  const onNavigate = (section: Section) => {
    if (section === "home") {
      navigate("/");
      return;
    }
    navigate(section === "movies" ? "/movies" : "/series");
  };

  return (
    <NavBarView
      current={current}
      variant={variant}   
      onNavigate={onNavigate}
      onToggleSidebar={() => {}}
    />
  );
};