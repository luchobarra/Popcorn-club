// // src/components/layout/ContentBGSection.tsx
// import React from "react";
// import { GalaxyBackground } from "./home/backgrounds/GalaxyBgContent";

// type Props = {
//   children: React.ReactNode;
//   className?: string;           // paddings internos, etc.
//   minHeightClass?: string;      // alto responsive de la sección
//   overlay?: "none" | "tb" | "lr"; // degradé: top→bottom / left→right
//   interactiveBG?: boolean;
// };

// export const ContentBGSection: React.FC<Props> = ({
//   children,
//   className = "",
//   minHeightClass = "min-h-[48svh] md:min-h-[56svh]",
//   overlay = "tb",
// }) => {
//   return (
//     <section
//       className={`relative isolate overflow-hidden ${minHeightClass}`}
//       // Importante: relative para ubicar el BG absolute
//     >
//       {/* BG Galaxy */}
//       <GalaxyBackground className="-z-10"  />

//       {/* Overlay ligero para legibilidad (no bloquea mouse) */}
//       {overlay !== "none" && (
//         <div
//           className={`pointer-events-none absolute inset-0 ${
//             overlay === "lr"
//               ? "bg-gradient-to-r from-black/35 via-black/15 to-transparent"
//               : "bg-gradient-to-t from-black/40 via-black/20 to-transparent"
//           }`}
//         />
//       )}

//       {/* Contenido */}
//       <div className={`relative z-10 ${className}`}>
//         {children}
//       </div>
//     </section>
//   );
// };