import { useEffect, useLayoutEffect } from "react"
import type { PropsWithChildren } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
import { motion, AnimatePresence, useIsPresent } from "framer-motion"
import { NavLoadProvider, useNavLoad } from "./NavLoadContext"
import { cubicBezier } from "framer-motion"

// 👇 GSAP (registro idempotente del plugin para poder refrescar)
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const DURATION_PAGE = 0.95
const EASE_PAGE = cubicBezier(0.22, 1, 0.36, 1)
const OFFSET_PUSH = 16
const OFFSET_POP = -16

const Overlay: React.FC = () => {
  const { visible } = useNavLoad()
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-[color-mix(in_oklab,var(--color-background)_88%,black_12%)] backdrop-blur-[2px] flex items-center justify-center pointer-events-auto"
        >
          <div className="flex items-center gap-3 text-[var(--color-text-primary)]/90">
            <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <span className="text-sm">Cargando…</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const TopBar: React.FC = () => {
  const { visible, progress } = useNavLoad()
  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-[3px]">
      <motion.div
        className="h-full bg-[var(--color-accent)]"
        style={{ transformOrigin: "0 50%" }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: visible ? 1 : 0, scaleX: Math.max(0.02, Math.min(progress, 0.999)) }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

const RouteAnimator: React.FC<PropsWithChildren> = ({ children }) => {
  const isPresent = useIsPresent()
  const location = useLocation()
  const navType = useNavigationType()
  const { start } = useNavLoad()

  // Inicio “carga de navegación” (Overlay/Barra) al cambiar la ruta
  useEffect(() => { start() }, [location.pathname, start])

  // Ir al tope al navegar (evita quedar en la misma posición al abrir un nuevo detalle)
  useLayoutEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }
  }, [location.pathname, navType])

  // ⚠️ Refrescar ScrollTrigger tras cada cambio de ruta (cuando el DOM ya está)
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  const yFrom = navType === "POP" ? OFFSET_POP : OFFSET_PUSH

  return (
    <div className="relative min-h-dvh">
      <TopBar />
      <Overlay />
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: yFrom }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -yFrom }}
        transition={{ duration: DURATION_PAGE, ease: EASE_PAGE }}
        // ✅ Y volvemos a refrescar cuando termina la animación de entrada de página
        onAnimationComplete={() => {
          // da igual si ya refrescó antes; esto asegura posiciones finales correctas
          ScrollTrigger.refresh()
        }}
      >
        {children}
      </motion.div>

      {/* Cortina anti-destello al desmontar */}
      <motion.div
        hidden={isPresent}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed inset-0 z-[50] bg-[var(--color-background)]"
      />
    </div>
  )
}

export const RouteShell: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <NavLoadProvider>
      <RouteAnimator>{children}</RouteAnimator>
    </NavLoadProvider>
  )
}