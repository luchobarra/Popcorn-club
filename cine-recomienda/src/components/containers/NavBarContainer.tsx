// import React from "react";
// import { useContentType } from "../../context/ContentTypeContext";
// import { NavBarView, type Section } from "../NavBarView";
// // Si usás react-router-dom, podés habilitar navegación:
// // import { useNavigate } from "react-router-dom";

// export const NavBar: React.FC = () => {
//   const { contentType, setContentType } = useContentType();
//   // const navigate = useNavigate(); // opcional

//   const current: Section =
//     contentType === "movies" ? "movies" :
//     contentType === "series&tv" ? "series&tv" :
//     "home";

//   const onNavigate = (section: Section) => {
//     if (section === "home") {
//       // opcional: navigate("/");
//       return;
//     }
//     setContentType(section);
//     // opcional: navigate(section === "movies" ? "/movies" : "/series");
//   };

//   return (
//     <NavBarView
//       current={current}
//       onNavigate={onNavigate}
//       onToggleSidebar={() => {}}
//     />
//   );
// };

import React from "react";
import { useContentType } from "../../context/ContentTypeContext";
import { NavBarView, type Section } from "../NavBarView";
import { useLocation, useNavigate } from "react-router-dom";

export const NavBar: React.FC = () => {
  const { setContentType } = useContentType();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Derivamos la pestaña activa desde la URL
  const current: Section =
    pathname.startsWith("/movies") ? "movies" :
    pathname.startsWith("/series") ? "series" :
    "home";

  const onNavigate = (section: Section) => {
    if (section === "home") {
      navigate("/");               // ir al home
      return;
    }

    // Actualizá tu contexto (si lo usa tu lógica)
    setContentType(section);

    // Navegá a la ruta correspondiente
    navigate(section === "movies" ? "/movies" : "/series");
  };

  return (
    <NavBarView
      current={current}
      onNavigate={onNavigate}
      onToggleSidebar={() => {}}
    />
  );
};