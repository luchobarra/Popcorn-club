// // src/components/home/RankedListTop10.tsx
// import React from "react";
// import { HorizontalScroll } from "../ui/HorizontalScroll";
// import { Poster } from "../ui/Poster";

// type RankedItem = {
//   id: number;
//   rank: number;
//   thumbUrl: string | null;
//   title: string;
//   year?: string;
//   rating?: number;
//   onClick: () => void;
// };

// type Props = {
//   title: string;
//   items: RankedItem[];
// };

// export const RankedListTop10: React.FC<Props> = ({ title, items }) => {
//     if (!items?.length) return null;
  
//     return (
//       <section className="space-y-4">
//         <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">
//           {title}
//         </h2>
    
//         <HorizontalScroll ariaLabel={title} edgePadding={false} gap="gap-6 sm:gap-8">
//           {items.map((item) => (
//             <div key={item.id} className="flex-shrink-0">
//               <div
//                 role="button"
//                 tabIndex={0}
//                 onClick={item.onClick}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     item.onClick();
//                   }
//                 }}
//                 className="
//                   relative
//                   w-[260px] sm:w-[300px]
//                   h-[150px] sm:h-[170px]
//                   rounded-2xl
//                   bg-[var(--color-surface)]/70
//                   backdrop-blur
//                   border border-white/10
//                   transition-transform duration-200
//                   hover:scale-[1.02]
//                   focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]
//                 "
//               >
//                 {/* Número ranking */}
//                 <span
//                   className="
//                     absolute top-3 right-4
//                     text-5xl sm:text-6xl
//                     font-extrabold
//                     text-white/10
//                     select-none
//                     pointer-events-none
//                   "
//                 >
//                   {item.rank}
//                 </span>
    
//                 {/* Contenido */}
//                 <div className="relative z-10 h-full flex items-center gap-4 px-4">
//                   {/* Poster */}
//                   <div className="h-[110px] sm:h-[125px] aspect-[2/3] flex-shrink-0">
//                     <Poster
//                       src={item.thumbUrl ?? null}
//                       alt={item.title}
//                       size="lg"
//                       className="h-full w-full rounded-md overflow-hidden shadow-lg"
//                     />
//                   </div>
    
//                   {/* Texto */}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm sm:text-base font-semibold text-white leading-snug line-clamp-2">
//                       {item.title}
//                     </h3>
    
//                     <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-white/70">
//                       {item.year && <span>{item.year}</span>}
//                       {typeof item.rating === "number" && (
//                         <>
//                           {item.year && <span>•</span>}
//                           <span>⭐ {item.rating.toFixed(1)}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </HorizontalScroll>
//       </section>
//     );
    
// };
