import React, { useMemo, useState } from "react";
import { VideoPlayerModal } from "./VideoPlayerModal";

interface VideoItem {
  key: string;     // YouTube key
  name: string;    // Título del video
  site: string;    // Esperamos "YouTube"
  type?: string;   // Trailer, Teaser, etc.
}

interface DetailVideosGridProps {
  videos: VideoItem[];
}

export const DetailVideosGrid: React.FC<DetailVideosGridProps> = ({ videos }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<{ key: string; name: string } | null>(null);

  const ytVideos = useMemo(
    () => (videos || []).filter(v => v.site === "YouTube" && v.key),
    [videos]
  );

  if (!ytVideos || ytVideos.length === 0) return null;

  const openModal = (v: { key: string; name: string }) => {
    setCurrent(v);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setCurrent(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-5 md:mb-6">
        Videos & Tráilers
      </h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {ytVideos.map((v) => {
          const thumb = `https://i.ytimg.com/vi/${v.key}/hqdefault.jpg`;
          return (
            <button
              key={v.key}
              onClick={() => openModal({ key: v.key, name: v.name })}
              className="group relative w-full rounded-xl overflow-hidden border border-[var(--color-surface)] bg-[var(--color-background)] hover:border-[var(--color-secondary)]/50 focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] transition-all"
              aria-label={`Ver ${v.type || "video"}: ${v.name}`}
            >
              <div className="aspect-video w-full overflow-hidden bg-[var(--color-surface)]">
                <img
                  src={thumb}
                  alt={v.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
  
              {/* Overlay play */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="56" height="56" viewBox="0 0 24 24" className="drop-shadow sm:w-14 sm:h-14 md:w-16 md:h-16">
                  <circle cx="12" cy="12" r="10" className="fill-[var(--color-secondary)]/90" />
                  <polygon points="10,8 16,12 10,16" className="fill-white" />
                </svg>
              </div>
  
              <div className="p-2.5 sm:p-3 text-left">
                <p className="text-[var(--color-text-primary)] font-medium line-clamp-2 text-sm sm:text-base md:text-lg">
                  {v.name}
                </p>
                {v.type && (
                  <p className="text-[0.7rem] sm:text-xs md:text-sm text-[var(--color-text-muted)] mt-1 uppercase tracking-wide">
                    {v.type}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
  
      {/* Modal */}
      <VideoPlayerModal
        open={open}
        onClose={closeModal}
        youtubeKey={current?.key}
        title={current?.name}
      />
    </section>
  );  
};