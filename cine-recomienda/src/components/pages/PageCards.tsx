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
    <section className="py-[clamp(1rem,2vw,2.5rem)] px-[clamp(.75rem,2vw,1.5rem)]">
      <div className="mx-auto w-full px-1 sm:px-0">
        
        <div className="grid grid-cols-3 sm:[grid-template-columns:repeat(auto-fill,minmax(clamp(9rem,14vw,13rem),1fr))] gap-[clamp(.4rem,1vw,.75rem)] justify-items-center">
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