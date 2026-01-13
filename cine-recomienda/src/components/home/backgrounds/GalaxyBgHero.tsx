// src/components/hero/bits/GalaxyBackground.tsx
import React from "react";
import { Galaxy, type GalaxyProps } from "./GalaxyBg";

type Props = {
  className?: string;
} & GalaxyProps;

/** Fondo Galaxy listo para usar como background absolute inset-0 */
export const GalaxyBackgroundHero: React.FC<Props> = ({
  className,
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.1,
  density = 0.7,
  hueShift = 360,
  disableAnimation = false,
  speed = 0.4,
  mouseInteraction = false,
  glowIntensity = 0.3,
  saturation = 0,
  mouseRepulsion = false,
  repulsionStrength = 10,
  twinkleIntensity = 1,
  rotationSpeed = 0,
  autoCenterRepulsion = 30,
  transparent = true,
}) => {
  return (
    <div className={`absolute inset-0 ${className ?? ""}`}>
      <Galaxy
        focal={focal}
        rotation={rotation}
        starSpeed={starSpeed}
        density={density}
        hueShift={hueShift}
        disableAnimation={disableAnimation}
        speed={speed}
        mouseInteraction={mouseInteraction}
        glowIntensity={glowIntensity}
        saturation={saturation}
        mouseRepulsion={mouseRepulsion}
        repulsionStrength={repulsionStrength}
        twinkleIntensity={twinkleIntensity}
        rotationSpeed={rotationSpeed}
        autoCenterRepulsion={autoCenterRepulsion}
        transparent={transparent}
      />
    </div>
  );
};