import { useEffect, useRef } from "react"
import { useNavLoad } from "../src/components/transitions/NavLoadContext" 

export const usePageLoading = (loading: boolean) => {
  const { start, stop } = useNavLoad()
  const active = useRef(false)

  useEffect(() => {

    if (loading && !active.current) { active.current = true; start() }

    if (!loading && active.current) { active.current = false; stop() }

    return () => { if (active.current) { active.current = false; stop() } }
  }, [loading]) 
}