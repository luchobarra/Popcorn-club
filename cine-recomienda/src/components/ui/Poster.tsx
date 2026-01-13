import React from "react"

type PosterSize = "xs" | "sm" | "md" | "lg" | "xl" | "detail"

const WIDTH: Record<PosterSize, string> = {
  xs: "w-[clamp(6rem,18vw,8rem)]",
  sm: "w-[clamp(7.5rem,18vw,10rem)]",
  md: "w-[clamp(9rem,20vw,12rem)]",
  lg: "w-[clamp(10.5rem,22vw,14rem)]",
  xl: "w-[clamp(12rem,24vw,16rem)]",
  detail: "w-[clamp(7rem,16vw,12rem)]", // sugerido para Detail
}

export interface PosterProps {
  src: string | null
  alt: string
  size?: PosterSize
  ratio?: `${number} / ${number}` | string // ej. "2 / 3"
  rounded?: string // tailwind, ej. "rounded-2xl"
  border?: boolean
  shadow?: boolean
  className?: string
}

export const Poster: React.FC<PosterProps> = ({
  src,
  alt,
  size = "md",
  ratio = "2 / 3",
  rounded = "rounded-2xl",
  border = true,
  shadow = true,
  className,
}) => {
  const cls = [
    "flex-none select-none overflow-hidden",
    WIDTH[size],
    rounded,
    border ? "border border-[var(--color-surface)]" : "",
    shadow ? "shadow-md" : "",
    "bg-[var(--color-surface)]",
    className ?? "",
  ].join(" ")

  return (
        <div className={cls}>
        <div className="w-full" style={{ aspectRatio: ratio }}>
            {src ? (
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
            />
            ) : (
            <div className="h-full w-full grid place-items-center text-[var(--color-text-primary)]/60">
                <span className="text-[clamp(.75rem,1.8vw,0.9rem)]">Sin póster</span>
            </div>
            )}
        </div>
        </div>
    )
}
