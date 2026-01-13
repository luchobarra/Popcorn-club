// import { Button } from "./ui/button"
// import { Badge } from "./ui/badge"
// import { Play, Star, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react"

// export default function HeroSection() {
//   const handleWatchRecommendations = () => {
//     console.log("Navegando a recomendaciones...")
//     // Aquí puedes agregar la lógica de navegación
//   }

//   const handleExploreGenres = () => {
//     console.log("Explorando géneros...")
//     // Aquí puedes agregar la lógica de navegación
//   }

//   return (
//     <div className="relative h-screen w-full overflow-hidden">

//       {/* Imagen de fondo cinematográfica */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
//         }}
//       >
//         {/* Gradiente overlay para efecto cinematográfico */}
//         <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-surface/60 to-card/80"></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/30"></div>
//       </div>

//       {/* Contenido principal */}
//       <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
//         <div className="text-center max-w-5xl mx-auto">
//           {/* Badge superior */}
//           <div className="mb-6 flex justify-center">
//             <Badge className="bg-secondary/20 border border-secondary/30 text-secondary px-4 py-2 text-sm font-medium backdrop-blur-sm">
//               <Sparkles className="w-4 h-4 mr-2" />
//               Recomendaciones Personalizadas con IA
//             </Badge>
//           </div>

//           {/* Título principal */}
//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-text-primary mb-6 leading-tight tracking-tight">
//             Bienvenido a{" "}
//             <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
//               CineRecomienda
//             </span>
//           </h1>

//           {/* Subtítulo */}
//           <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed font-light">
//             Descubre tu próxima película favorita con recomendaciones inteligentes basadas en tus gustos y preferencias
//           </p>

//           {/* Estadísticas */}
//           <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10 text-text-secondary">
//             <div className="flex items-center space-x-2">
//               <Star className="w-5 h-5 text-warning" />
//               <span className="text-sm sm:text-base">
//                 <span className="font-bold text-text-primary">4.9</span> Rating
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Users className="w-5 h-5 text-secondary" />
//               <span className="text-sm sm:text-base">
//                 <span className="font-bold text-text-primary">50K+</span> Usuarios
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <TrendingUp className="w-5 h-5 text-success" />
//               <span className="text-sm sm:text-base">
//                 <span className="font-bold text-text-primary">1M+</span> Recomendaciones
//               </span>
//             </div>
//           </div>

//           {/* Botones de acción */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button
//               onClick={handleWatchRecommendations}
//               size="lg"
//               className="group relative bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-text-primary font-semibold px-8 py-4 rounded-xl shadow-2xl hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105 border-0 text-base sm:text-lg"
//             >
//               <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
//               Ver Recomendaciones
//             </Button>

//             <Button
//               onClick={handleExploreGenres}
//               variant="outline"
//               size="lg"
//               className="group bg-secondary/10 backdrop-blur-sm border-secondary/20 text-text-primary hover:bg-secondary/20 hover:border-secondary/30 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
//             >
//               Explorar Géneros
//               <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//             </Button>
//           </div>

//           {/* Indicador de scroll */}
//           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//             <div className="w-6 h-10 border-2 border-text-primary/30 rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-text-primary/60 rounded-full mt-2 animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Efectos de partículas/luces cinematográficas */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-text-primary/20 rounded-full animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary/30 rounded-full animate-ping"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse delay-1000"></div>
//         <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-success/20 rounded-full animate-ping delay-500"></div>
//       </div>

//       {/* Vignette effect */}
//       <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40 pointer-events-none"></div>
//     </div>
//   )
// }