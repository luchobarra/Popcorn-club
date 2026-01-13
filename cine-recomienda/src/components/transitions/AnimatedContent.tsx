import React, { useRef, useLayoutEffect } from 'react'
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

  // Calculados afuera para usarlos también en el estilo inicial
  const axis = direction === 'horizontal' ? 'x' : 'y'
  const offset = reverse ? -distance : distance
  const startPct = Math.max(0, Math.min(100, (1 - threshold) * 100)) // clamp

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeto de reduced motion: pinta final y no anima
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1, clearProps: 'transform,opacity' })
        return
      }

      // NO hacemos gsap.set inicial: ya viene pintado con estilo inline
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
        }
      })
    }, ref)

    return () => {
      ctx.revert() // limpia tweens y triggers creados en este contexto
    }
  }, [axis, distance, reverse, duration, ease, initialOpacity, animateOpacity, scale, startPct, delay, onComplete])

  return (
    <div
      ref={ref}
      // Estado inicial PINTADO antes del primer render → sin “salto”
      style={{
        transform:
          axis === 'x'
            ? `translateX(${offset}px) scale(${scale})`
            : `translateY(${offset}px) scale(${scale})`,
        opacity: animateOpacity ? initialOpacity : 1,
        willChange: 'transform, opacity',
        contain: 'paint'
      }}
    >
      {children}
    </div>
  )
}