// // src/components/hero/bits/GalaxyBackground.tsx
// import React from "react";
// import { Galaxy, type GalaxyProps } from "./GalaxyBg";

// type Props = {
//   className?: string;
// } & GalaxyProps;

// /** Fondo Galaxy listo para usar como background absolute inset-0 */
// export const GalaxyBackground: React.FC<Props> = ({
//   className,
//   // defaults (los que pasaste)
//   focal = [0.5, 0.5],
//   rotation = [1.0, 0.0],
//   starSpeed = 0.5,
//   density = 2,
//   hueShift = 140,
//   disableAnimation = false,
//   speed = 0.2,
//   mouseInteraction = false,
//   glowIntensity = 0.1,
//   saturation = 0.0,
//   mouseRepulsion = false,
//   repulsionStrength = 2,
//   twinkleIntensity = 0.3,
//   rotationSpeed = 0,
//   autoCenterRepulsion = 0,
//   transparent = true,
// }) => {
//   return (
//     <div className={`absolute inset-0 ${className ?? ""}`}>
//       <Galaxy
//         focal={focal}
//         rotation={rotation}
//         starSpeed={starSpeed}
//         density={density}
//         hueShift={hueShift}
//         disableAnimation={disableAnimation}
//         speed={speed}
//         mouseInteraction={mouseInteraction}
//         glowIntensity={glowIntensity}
//         saturation={saturation}
//         mouseRepulsion={mouseRepulsion}
//         repulsionStrength={repulsionStrength}
//         twinkleIntensity={twinkleIntensity}
//         rotationSpeed={rotationSpeed}
//         autoCenterRepulsion={autoCenterRepulsion}
//         transparent={transparent}
//       />
//     </div>
//   );
// };
