import { PosterCard } from "../ui/PosterCard";
import { useContent } from "../../context/ContentContext";
import { motion } from "framer-motion";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface PageCardsProps {
  movies: Movie[];
  title: string;
  subtitle: string;
}

export default function PageCards({ movies }: PageCardsProps) {
  const { onCardClick, contentType } = useContent();
  const appType = contentType === "movies" ? "movies" : "series";

  return (
    <section className="py-[clamp(1.5rem,3vw,3rem)] px-[clamp(1rem,3vw,2rem)]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(clamp(10.5rem,24vw,15rem),1fr))] gap-[clamp(.9rem,2.2vw,1.25rem)] place-items-start">
          {movies.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PosterCard
                id={m.id}
                type={appType}
                title={m.title}
                posterUrl={m.poster_path}
                size="lg"
                onClick={onCardClick}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}