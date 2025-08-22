import  { createContext, useContext, useState, type ReactNode } from "react";

export type ContentType = "movies" | "series&tv";

interface ContentTypeContextValue {
  contentType: ContentType;
  setContentType: (t: ContentType) => void;
}

const ContentTypeContext = createContext<ContentTypeContextValue | undefined>(undefined);

export const ContentTypeProvider = ({
  children,
  defaultType = "movies",
}: {
  children: ReactNode;
  defaultType?: ContentType;
}) => {
  const [contentType, setContentType] = useState<ContentType>(defaultType);

  return (
    <ContentTypeContext.Provider value={{ contentType, setContentType }}>
      {children}
    </ContentTypeContext.Provider>
  );
};

/**
 * Hook para consumir el context desde cualquier componente:
 * const { contentType, setContentType } = useContentType();
 */
export const useContentType = (): ContentTypeContextValue => {
  const ctx = useContext(ContentTypeContext);
  if (!ctx) {
    throw new Error("useContentType must be used within a ContentTypeProvider");
  }
  return ctx;
};
