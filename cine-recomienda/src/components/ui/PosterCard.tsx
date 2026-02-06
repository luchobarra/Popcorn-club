import React, { useRef, useState } from "react"
import { type PosterProps } from "./Poster"

export interface PosterCardProps {
  id: number
  type: "movies" | "series"
  title: string
  posterUrl: string | null
  backdropUrl?: string | null       
  size?: PosterProps["size"]
  aspect?: "poster" | "landscape"
  onClick: (id: number, type: "movies" | "series") => void
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

export const PosterCard: React.FC<PosterCardProps> = ({
  id, type, title,
  posterUrl,
  backdropUrl = null,
  size = "lg",
  aspect = "poster",
  onClick,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pressing, setPressing] = useState(false)

  const onMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (prefersReduced()) return
    const el = btnRef.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`)
    el.style.setProperty("--rx", `${(0.5 - y) * 8}deg`)
  }
  const onMouseLeave = () => {
    const el = btnRef.current; if (!el) return
    el.style.setProperty("--ry", `0deg`)
    el.style.setProperty("--rx", `0deg`)
  }

  const handleClick = () => {
    setPressing(true)
    setTimeout(() => { setPressing(false); onClick(id, type) }, 140)
  }

  const classSize =
    aspect === "landscape"
      ? "aspect-[16/9] w-[clamp(14rem,22vw,18rem)]"
      : "aspect-[2/3]  w-[clamp(9rem,16vw,12rem)]"
  const usingLandscape = aspect === "landscape"
  const primarySrc = usingLandscape ? backdropUrl : posterUrl
  const fallbackSrc = !primarySrc && usingLandscape ? posterUrl : null
  const showContain = usingLandscape && !!fallbackSrc 

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label={`Ver detalle de ${title}`}
      onClick={handleClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`
        group relative inline-block rounded-2xl cursor-pointer select-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/70
        transition-[transform,box-shadow,filter] duration-200 will-change-transform
        ${classSize}
      `}
      style={{
        transform: prefersReduced()
          ? undefined
          : "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        filter: pressing ? "brightness(1.02)" : undefined,
      }}
    >
      <div className={`w-full h-full ${showContain ? "bg-[var(--color-surface)]/40" : ""}`}>
        <img
          src={(primarySrc ?? fallbackSrc) || "/placeholder.svg"}
          alt={`Poster de ${title}`}
          className={`
            w-full h-full ${showContain ? "object-contain" : "object-cover"}
            transition-transform duration-200
            ${pressing ? "scale-[0.985]" : "group-hover:scale-[1.025]"}
            rounded-2xl shadow-sm group-hover:shadow-lg
          `}
          loading="lazy"
        />
      </div>
      
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[30%] translate-x-[-120%] rotate-[20deg] opacity-0 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
          transition: "transform 700ms ease-out, opacity 300ms ease-out",
          transform: "translateX(-120%) rotate(20deg)",
        }}
      />
      <style>{`
        .group:hover > span[aria-hidden]{ transform: translateX(120%) rotate(20deg); }
        .group:active > span[aria-hidden]{ transform: translateX(130%) rotate(20deg); transition-duration:300ms; }
      `}</style>
    </button>
  )
}