import { useEffect, useRef, useState } from "react";

import netflix from "../../assets/logos/netflix.svg";
import pixar from "../../assets/logos/pixar.svg";
import disney from "../../assets/logos/disney.png";
import sony from "../../assets/logos/sony.svg";
import marvel from "../../assets/logos/marvel.svg";
import paramount from "../../assets/logos/paramount.svg";
import hbo from "../../assets/logos/hbo.svg";
import universal from "../../assets/logos/universal.svg";
import warner from "../../assets/logos/warner.svg";
import prime from "../../assets/logos/prime.png";

const logos = [
  { src: netflix, bg: "#0f0f0f", alt: "Netflix" },
  { src: pixar, bg: "#ffffff", alt: "Pixar" },
  { src: disney, bg: "#0A1D37", alt: "Disney+" },
  { src: sony, bg: "#f3f3f3", alt: "Sony Pictures" },
  { src: marvel, bg: "#F0131E", alt: "Marvel" },
  { src: paramount, bg: "#e3f2ff", alt: "Paramount+" },
  { src: hbo, bg: "#94B4C1", alt: "HBO Max" },
  { src: universal, bg: "#0b1c2d", alt: "Universal Pictures" },
  { src: warner, bg: "#ACBAC4", alt: "Warner Bros" },
  { src: prime, bg: "#6594B1", alt: "Prime Video" },
];

export const LogosCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="w-full overflow-hidden ">
      <div className={`flex w-max gap-4 ${active ? "animate-logo-scroll" : ""}`}>
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-xl shrink-0"
            style={{
              backgroundColor: logo.bg,
              width: "clamp(110px, 14vw, 160px)",
              height: "clamp(40px, 6vw, 65px)",
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-[55%] max-w-[75%] object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};