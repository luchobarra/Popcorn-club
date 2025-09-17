// lib/useMinDelay.ts
import { useEffect, useRef, useState } from "react";

export function useMinDelay(loading: boolean, minMs = 300) {
    const [show, setShow] = useState(loading);
    const startRef = useRef<number>(loading ? Date.now() : 0);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | undefined;

        if (loading) {
        startRef.current = Date.now();
        setShow(true);
        return () => {
            if (timeout) clearTimeout(timeout); // <-- cleanup siempre devuelve void
        };
        }

        const elapsed = Date.now() - startRef.current;
        const remain = Math.max(0, minMs - elapsed);

        timeout = setTimeout(() => setShow(false), remain);

        return () => {
        if (timeout) clearTimeout(timeout);   // <-- nada de devolver números/0
        };
    }, [loading, minMs]);

    return show;
}