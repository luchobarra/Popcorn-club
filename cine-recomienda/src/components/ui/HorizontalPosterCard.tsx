// // src/components/home/cards/HorizontalPosterCard.tsx
// import React from "react";
// import type { FeedItem } from "../home/helpers";
// import { posterLandscapeUrl } from "../home/helpers";

// type Props = { item: FeedItem; onClick: () => void };

// export const HorizontalPosterCard: React.FC<Props> = ({ item, onClick }) => {
//   const landscape = posterLandscapeUrl(item.posterPath?.replace(/^https?:\/\/image\.tmdb\.org\/t\/p\/w500/, "") || null, true);

//   return (
//     <button
//       onClick={onClick}
//       className="block group shrink-0 w-[200px] sm:w-[240px] md:w-[300px] text-left"
//       aria-label={item.title}
//     >
//       <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-secondary/30">
//         {landscape ? (
//           <img
//             src={landscape}
//             alt={item.title}
//             className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
//             loading="lazy"
//           />
//         ) : (
//           <div className="h-full w-full grid place-items-center text-xs opacity-70">Sin imagen</div>
//         )}
//         {/* banda inferior para legibilidad */}
//         <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
//       </div>
//       <p className="mt-2 line-clamp-2 text-xs sm:text-sm opacity-90">{item.title}</p>
//     </button>
//   );
// };