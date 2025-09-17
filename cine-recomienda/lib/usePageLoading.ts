import { useEffect } from "react"
import { useNavLoad } from "../src/components/transitions/NavLoadContext"

export const usePageLoading = (loading: boolean) => {
  const { start, stop } = useNavLoad()
  useEffect(() => {
    if (loading) {
      start()
      return () => stop()
    } else {
      stop()
    }
  }, [loading, start, stop])
}