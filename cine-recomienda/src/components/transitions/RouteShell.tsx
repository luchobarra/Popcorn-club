import { useEffect, useLayoutEffect } from "react"
import type { PropsWithChildren } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
import { motion, AnimatePresence, useIsPresent } from "framer-motion"
import { NavLoadProvider, useNavLoad } from "./NavLoadContext"
import { cubicBezier } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const DURATION_PAGE = 1.2
const EASE_PAGE = cubicBezier(0.22, 1, 0.3, 1)
const OFFSET_PUSH = 16
const OFFSET_POP = -16

// helper local
const useIsDetail = () => {
    const { pathname } = useLocation()
    return /^\/(movies|series)\/\d+/.test(pathname)
}

const Overlay: React.FC = () => {
    const { visible } = useNavLoad()
    const isDetail = useIsDetail()
    return (
        <AnimatePresence>
        {visible && isDetail && (
            <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[var(--color-background)]/95 backdrop-blur-[2px] flex items-center justify-center pointer-events-auto"
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
    const isDetail = useIsDetail()
    return (
        <div className="fixed left-0 right-0 top-0 z-[70] h-[3px]">
        <motion.div
            className="h-full bg-[var(--color-accent)]"
            style={{ transformOrigin: "0 50%" }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
            opacity: visible && isDetail ? 1 : 0,
            scaleX: Math.max(0.02, Math.min(progress, 0.999)),
            }}
            transition={{ duration: 0.2 }}
        />
        </div>
    )
}

const RouteAnimator: React.FC<PropsWithChildren> = ({ children }) => {
    const isPresent = useIsPresent()
    const location = useLocation()
    const navType = useNavigationType()
    const isDetail = useIsDetail()

    useLayoutEffect(() => {
        if (navType !== "POP") window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }, [location.pathname, navType])

    useEffect(() => {
        const id = requestAnimationFrame(() => ScrollTrigger.refresh())
        return () => cancelAnimationFrame(id)
    }, [location.pathname])

    const yFrom = navType === "POP" ? OFFSET_POP : OFFSET_PUSH

    return (
        <div className="relative min-h-dvh">
        <TopBar />
        <Overlay />

        <AnimatePresence mode="wait" initial={false}>
            <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: yFrom }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -yFrom }}
            transition={{ duration: DURATION_PAGE, ease: EASE_PAGE }}
            onAnimationComplete={() => ScrollTrigger.refresh()}
            >
            {children}
            </motion.div>
        </AnimatePresence>

        {/* Cortina anti-destello: SOLO en detalle */}
        {isDetail && (
            <motion.div
            hidden={isPresent}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-0 z-[50] bg-[var(--color-background)]"
            />
        )}
        </div>
    )
}

export const RouteShell: React.FC<PropsWithChildren> = ({ children }) => (
  <NavLoadProvider>
    <RouteAnimator>{children}</RouteAnimator>
  </NavLoadProvider>
)