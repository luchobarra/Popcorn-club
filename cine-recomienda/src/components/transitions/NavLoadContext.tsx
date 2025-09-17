import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

type NavLoadAPI = {
  start: () => void
  stop: () => void
  visible: boolean
  progress: number
}

const Ctx = createContext<NavLoadAPI | null>(null)

export const useNavLoad = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useNavLoad must be used within <NavLoadProvider>")
  return ctx
}

const SHOW_AFTER_MS = 250     // umbral para mostrar overlay/barra (evita flash)
const MIN_VISIBLE_MS = 300    // tiempo mínimo visible si llegó a mostrarse

export const NavLoadProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const raf = useRef<number | null>(null)
  const pending = useRef(0)
  const showTimer = useRef<number | null>(null)
  const shownAt = useRef<number | null>(null)

  const loop = useCallback(() => {
    setProgress(p => p + (0.98 - p) * 0.08) // easing hacia 98%
    raf.current = requestAnimationFrame(loop)
  }, [])

  const ensureLoop = useCallback(() => {
    if (raf.current == null) raf.current = requestAnimationFrame(loop)
  }, [loop])

  const cancelLoop = useCallback(() => {
    if (raf.current != null) cancelAnimationFrame(raf.current)
    raf.current = null
  }, [])

  const start = useCallback(() => {
    pending.current += 1
    if (pending.current === 1) {
      setProgress(0.05)
      showTimer.current = window.setTimeout(() => {
        setVisible(true)
        shownAt.current = performance.now()
      }, SHOW_AFTER_MS)
      ensureLoop()
    }
  }, [ensureLoop])

  const stop = useCallback(() => {
    pending.current = Math.max(0, pending.current - 1)
    if (pending.current === 0) {
      if (showTimer.current) {
        window.clearTimeout(showTimer.current)
        showTimer.current = null
      }
      const hide = () => {
        cancelLoop()
        setProgress(1)
        setTimeout(() => {
          setVisible(false)
          setProgress(0)
          shownAt.current = null
        }, 120)
      }
      if (visible && shownAt.current != null) {
        const elapsed = performance.now() - shownAt.current
        const left = Math.max(0, MIN_VISIBLE_MS - elapsed)
        setTimeout(hide, left)
      } else {
        hide()
      }
    }
  }, [cancelLoop, visible])

  useEffect(() => () => cancelLoop(), [cancelLoop])

  return (
    <Ctx.Provider value={{ start, stop, visible, progress }}>
      {children}
    </Ctx.Provider>
  )
}