import React, { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  ease?: string | ((progress: number) => number)
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number // 0..1  → start: "top (1-threshold)*100%"
  delay?: number
  onComplete?: () => void
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeto de reduced motion: pinta final y no anima
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1, clearProps: 'transform,opacity' })
      return
    }

    const axis = direction === 'horizontal' ? 'x' : 'y'
    const offset = reverse ? -distance : distance
    const startPct = Math.max(0, Math.min(100, (1 - threshold) * 100)) // clamp

    // 👇 Todo lo creado dentro del contexto se limpia con ctx.revert() (solo esta instancia)
    const ctx = gsap.context(() => {
      gsap.set(el, {
        [axis]: offset,
        scale,
        opacity: animateOpacity ? initialOpacity : 1
      })

      gsap.to(el, {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
        onComplete,
        scrollTrigger: {
          trigger: el,
          start: `top ${startPct}%`,
          toggleActions: 'play none none none',
          once: true
          // Si tu scroller NO es window, acá podrías pasar: scroller: tuNodo
        }
      })
    }, el)

    return () => {
      ctx.revert() // ✅ limpia solo los tweens/ScrollTriggers creados por esta instancia
    }
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete
  ])

  return <div ref={ref}>{children}</div>
}