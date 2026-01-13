// src/AppRouter.tsx
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, MotionConfig } from "framer-motion"
import { RouteShell } from "./components/transitions/RouteShell"
import { Home } from "./components/pages/Home"
import { ContentPage } from "./components/pages/ContentPage"
import { DetailPage } from "./components/pages/DetailPage"

export const AppRouter = () => {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <RouteShell>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<ContentPage />} />
            <Route path="/series" element={<ContentPage />} />
            <Route path="/:type/:id" element={<DetailPage />} />
          </Routes>
        </AnimatePresence>
      </RouteShell>
    </MotionConfig>
  )
}