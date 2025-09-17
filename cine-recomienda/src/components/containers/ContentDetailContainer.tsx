// src/containers/ContentDetailContainer.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { DetailModel } from "../../api/tmdbDetail";
import { fetchDetail } from "../../api/tmdbDetail";

type UrlType = "movies" | "series";

export interface ContentDetailState {
  loading: boolean;
  error: string | null;
  data: DetailModel | null;
  refetch: () => void;
}

interface Props {
  children?: (state: ContentDetailState) => React.ReactNode; // opcional: para inyectar una View luego
  language?: string; // ej: "es-ES"
}

export const ContentDetailContainer: React.FC<Props> = ({ children, language = "es-ES" }) => {
  const params = useParams<{ type: UrlType; id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DetailModel | null>(null);

  const type = (params.type === "movies" || params.type === "series") ? params.type : undefined;
  const id = params.id;

  const load = async () => {
    if (!type || !id) return;
    try {
      setLoading(true);
      setError(null);
      const detail = await fetchDetail(type, id, language);
      setData(detail);
    } catch (e: any) {
      setError(e?.message ?? "Error al cargar el detalle");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id, language]);

  const state: ContentDetailState = {
    loading,
    error,
    data,
    refetch: load,
  };

  // Si todavía no tenés View, podés loguear para testear:
  if (!children) {
    if (import.meta.env.DEV) {
      // NO UI: solo debug en desarrollo
      // eslint-disable-next-line no-console
      console.log("[ContentDetailContainer]", state);
    }
    return null;
  }

  return <>{children(state)}</>;
};