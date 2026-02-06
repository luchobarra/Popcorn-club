import { useEffect, useRef, useState } from "react";

const logos = [
    { src: "/src/assets/logos/netflix.svg", bg: "#0f0f0f", alt: "Netflix" },
    { src: "/src/assets/logos/pixar.svg", bg: "#ffffff", alt: "Pixar" },
    { src: "/src/assets/logos/disney.png", bg: "#0A1D37", alt: "Disney+" },
    { src: "/src/assets/logos/sony.svg", bg: "#f3f3f3", alt: "Sony Pictures" },
    { src: "/src/assets/logos/marvel.svg", bg: "#F0131E", alt: "Marvel" },
    { src: "/src/assets/logos/paramount.svg", bg: "#e3f2ff", alt: "Paramount+" },
    { src: "/src/assets/logos/hbo.svg", bg: "#94B4C1", alt: "HBO Max" },
    { src: "/src/assets/logos/universal.svg", bg: "#0b1c2d", alt: "Universal Pictures" },
    { src: "/src/assets/logos/warner.svg", bg: "#ACBAC4", alt: "Warner Bros" },
    { src: "/src/assets/logos/prime.png", bg: "#6594B1", alt: "Prime Video" },
];

export const LogosCarousel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => setActive(entry.isIntersecting),
        { threshold: 0.2 });
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