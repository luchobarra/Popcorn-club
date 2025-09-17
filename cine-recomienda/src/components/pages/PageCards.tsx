import { useContent } from "../../context/ContentContext";
import { Star, Eye, Info, Bookmark, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre?: string;
  year?: number;
  views?: string;
}

interface MovieRecommendationsProps {
  movies: Movie[];
  title: string;
  subtitle: string;
}

export default function MovieRecommendations({
  movies,
  title,
  subtitle,
}: MovieRecommendationsProps) {
  
  const { onCardClick } = useContent();

  const handleMoreInfo = (movieId: number) => {
    onCardClick(movieId, "movies"); // navegación a /movies/:id
  };

  const handleAddToWatchlist = (movieId: number) => {
    console.log(`Agregando a guardados: ${movieId}`);
  };

  const handleAddToFavorites = (movieId: number) => {
    console.log(`Agregando a favoritos: ${movieId}`);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8.0) return "text-success";
    if (rating >= 7.0) return "text-warning";
    return "text-error";
  };

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 8.5) return "bg-success/20 text-success border-success/30";
    if (rating >= 7.0) return "bg-warning/20 text-warning border-warning/30";
    return "bg-error/20 text-error border-error/30";
  };


  return (
    <div className="bg-primary min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
        </div>
  
        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-surface/80 backdrop-blur-sm rounded-xl overflow-hidden border border-card/50 hover:border-secondary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-secondary/10
                         cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]"
              /* 👇 navega al detalle al click/tecla */
              onClick={() => handleMoreInfo(movie.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleMoreInfo(movie.id);
                }
              }}
            >
              {/* Poster Image */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster_path || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
  
                {/* Rating Badge - Top Right */}
                <div className="absolute top-3 right-3">
                  <Badge
                    className={`${getRatingBadgeColor(movie.vote_average)} backdrop-blur-sm font-semibold text-xs sm:text-sm`}
                  >
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {movie.vote_average.toFixed(1)}
                  </Badge>
                </div>
  
                {/* Genre Badge - Top Left */}
                {movie.genre && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary/70 text-text-primary border-text-primary/20 backdrop-blur-sm text-xs">
                      {movie.genre}
                    </Badge>
                  </div>
                )}
  
                {/* Overlay con botones de acción - Desktop (hover) */}
                <div className="absolute inset-0 bg-primary/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    <Button
                      /* 👇 evitar que el click del botón navegue la card */
                      onClick={(e) => { e.stopPropagation(); handleMoreInfo(movie.id); }}
                      size="icon"
                      className="bg-secondary/90 backdrop-blur-sm border border-secondary/30 text-text-primary hover:bg-secondary rounded-full shadow-lg"
                    >
                      <Info className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleAddToWatchlist(movie.id); }}
                      size="icon"
                      className="bg-accent/90 backdrop-blur-sm border border-accent/30 text-text-primary hover:bg-accent rounded-full shadow-lg"
                    >
                      <Bookmark className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleAddToFavorites(movie.id); }}
                      size="icon"
                      className="bg-error/90 backdrop-blur-sm border border-error/30 text-text-primary hover:bg-error rounded-full shadow-lg"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
  
                {/* Botones para Mobile/Tablet - Bottom Right */}
                <div className="absolute bottom-3 right-3 md:hidden">
                  <div className="flex space-x-2">
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleMoreInfo(movie.id); }}
                      size="icon"
                      className="w-8 h-8 bg-secondary/90 backdrop-blur-sm border border-secondary/30 text-text-primary hover:bg-secondary rounded-full shadow-lg"
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleAddToWatchlist(movie.id); }}
                      size="icon"
                      className="w-8 h-8 bg-accent/90 backdrop-blur-sm border border-accent/30 text-text-primary hover:bg-accent rounded-full shadow-lg"
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleAddToFavorites(movie.id); }}
                      size="icon"
                      className="w-8 h-8 bg-error/90 backdrop-blur-sm border border-error/30 text-text-primary hover:bg-error rounded-full shadow-lg"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
  
              {/* Movie Info */}
              <div className="p-4 space-y-2">
                {/* Title */}
                <h3
                  className="text-text-primary font-semibold text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-secondary transition-colors duration-300 cursor-pointer"
                  /* 👇 título también lleva al detalle, sin propagar */
                  onClick={(e) => { e.stopPropagation(); handleMoreInfo(movie.id); }}
                >
                  {movie.title}
                </h3>
  
                {/* Rating, Views and Year in same line */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className={`w-4 h-4 ${getRatingColor(movie.vote_average)} fill-current`} />
                    <span className={`font-medium ${getRatingColor(movie.vote_average)}`}>
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
  
                  <div className="flex items-center space-x-3 text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{movie.views}</span>
                    </div>
                    {movie.year && <span className="text-xs sm:text-sm">{movie.year}</span>}
                  </div>
                </div>
              </div>
  
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
}