import React from "react";

type Panel = {
  title: string;
  subtitle: string;
  buttonText: string;
  onClick: () => void;
  backgroundUrl?: string | null;
};

type Props = {
  left: Panel;
  right: Panel;
};

export const DualCTAHub: React.FC<Props> = ({ left, right }) => {
  return (
    // Ocupa todo el ancho del contenedor del Home (no agregamos paddings acá)
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 rounded-2xl overflow-hidden">
        <PanelBlock {...left} />
        <PanelBlock {...right} />
      </div>
    </section>
  );
};

const PanelBlock: React.FC<Panel & { reverseOnMobile?: boolean }> = ({
  title,
  subtitle,
  buttonText,
  onClick,
  backgroundUrl,
}) => {
  return (
    <div className="relative min-h-[240px] sm:min-h-[280px] md:min-h-[320px] bg-[#1F2937]">
      {/* Fondo */}
      {backgroundUrl ? (
        <>
            <img
                src={backgroundUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover brightness-45"
                loading="lazy"
            />
        </>
      ) : null}

      {/* Contenido */}
      <div
        className="relative h-full w-full flex flex-col justify-center p-5 sm:p-6 md:p-8"
      >
        {/* Título */}
        <h3
          className="
            text-[22px] sm:text-2xl md:text-3xl font-extrabold
            text-white drop-shadow
            mb-2 sm:mb-2.5
            text-center md:text-left
          "
        >
          {title}
        </h3>

        {/* Subtítulo */}
        <p
          className="text-[13px] sm:text-sm md:text-base text-white/95 drop-shadow font-semibold max-w-[60ch] leading-relaxed mb-4 sm:mb-5 text-center md:text-left"
        >
          {subtitle}
        </p>

        {/* Botón (fondo blanco, texto oscuro) */}
        <div className="flex md:justify-start justify-center">
          <button
            onClick={onClick}
            className="
              inline-flex items-center rounded-full
              h-10 sm:h-11 px-4 sm:px-5
              font-semibold
              bg-white text-[#171821]
              hover:bg-white/95 active:scale-[0.98]
              transition
              shadow-sm
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
            "
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};