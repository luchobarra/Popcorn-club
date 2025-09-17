import React from "react";

interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  youtubeKey?: string | null;
  title?: string;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  open,
  onClose,
  youtubeKey,
  title,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-3 sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Reproduciendo: ${title}` : "Reproductor de video"}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[92vw] sm:max-w-3xl md:max-w-4xl aspect-video bg-[var(--color-background)] rounded-xl overflow-hidden shadow-xl border border-[var(--color-surface)]"
        onClick={(e) => e.stopPropagation()}
      >
        {youtubeKey ? (
          <iframe
            title={title || "Trailer"}
            src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-text-secondary)] text-sm sm:text-base">
            Video no disponible
          </div>
        )}
      </div>
  
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-[var(--color-surface)] hover:bg-[var(--color-surface)]/80 text-[var(--color-text-primary)] text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
        aria-label="Cerrar reproductor"
      >
        Cerrar
      </button>
    </div>
  );  
};