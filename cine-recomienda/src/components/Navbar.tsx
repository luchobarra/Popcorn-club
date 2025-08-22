// "use client"

// import * as React from "react"
// import { useNavigate, Link} from "react-router-dom"
// import { Button } from "./ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
// import { Badge } from "./ui/badge"
// import {
//   User,
//   Settings,
//   LogOut,
//   Bell,
//   Search,
//   Menu,
//   X,
//   ChevronDown,
//   Shield,
//   CreditCard,
//   HelpCircle,
//   Home,
//   // BarChart3,
//   //Users,
//   // FileText,
//   Layout,
//   Zap,
//   Target,
//   Eye,
//   // TrendingUp,
//   // PieChart,
//   // Activity,
//   //UserPlus,
//   // Download,
//   // Calendar,
//   // Mail,
//   Star, 
//   Film, 
//   Tv
// } from "lucide-react"

// const userProfile = {
//   id: "1",
//   name: "Sarah Johnson",
//   email: "sarah.johnson@company.com",
//   role: "Product Manager",
//   initials: "SJ",
// }

// const notifications = [
//   {
//     id: "1",
//     title: "New team member",
//     message: "John Doe joined your team",
//     time: "2 min ago",
//     read: false,
//     type: "info" as const,
//   },
//   {
//     id: "2",
//     title: "Report generated",
//     message: "Monthly analytics report is ready",
//     time: "1 hour ago",
//     read: false,
//     type: "success" as const,
//   },
//   {
//     id: "3",
//     title: "System update",
//     message: "Scheduled maintenance tonight",
//     time: "3 hours ago",
//     read: true,
//     type: "warning" as const,
//   },
// ]

// const navigationButtons = [
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     icon: Home,
//     isActive: true,
//     options: [
//       { id: "overview", label: "Vista General", href: "/dashboard/overview", icon: Eye },
//       { id: "performance", label: "Rendimiento", href: "/dashboard/performance", icon: Zap },
//       { id: "widgets", label: "Widgets", href: "/dashboard/widgets", icon: Layout },
//       { id: "goals", label: "Objetivos", href: "/dashboard/goals", icon: Target },
//       { id: "settings", label: "Configuración", href: "/dashboard/settings", icon: Settings },
//     ],
//   },
//   {
//     id: "movies",
//     label: "Movies",
//     icon: Film,
//     isActive: false,
//     href: "/movies",
//   },
//   {
//     id: "recomendaciones",
//     label: "Recomendaciones",
//     icon: Star,
//     isActive: false,
//     options: [
//       {
//         id: "peliculas",
//         label: "Películas",
//         href: "/recomendaciones/movie",
//         icon: Film,
//       },
//       {
//         id: "series-tv",
//         label: "Series & TV",
//         href: "/recomendaciones/tv",
//         icon: Tv,
//       },
      
//     ],
//   },
//   {
//     id: "series",
//     label: "Series / TV",
//     icon: Tv,
//     isActive: false,
//     href: "/seriesTv", 
//   }
  
// ]

// export default function Navbar() {
  
//   const navigate = useNavigate();

//   const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
//   const unreadNotifications = notifications.filter((n) => !n.read).length

//   const toggleDropdown = (dropdownId: string) => {
//     setOpenDropdown(openDropdown === dropdownId ? null : dropdownId)
//   }

//   const closeDropdown = () => {
//     setOpenDropdown(null)
//   }

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen)
//   }

//   const handleLogoClick = () => {
//     navigate("/");
//     closeDropdown()
//   }

//   const handleOptionClick = (href: string) => {
//     navigate(href);
//     closeDropdown()
//   }

//   // Cerrar dropdown al hacer click fuera
//   React.useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Element
//       if (!target.closest("[data-dropdown]")) {
//         closeDropdown()
//       }
//     }

//     document.addEventListener("click", handleClickOutside)
//     return () => document.removeEventListener("click", handleClickOutside)
//   }, [])

//   return (
//     <>
//       <nav className="bg-primary border-b border-surface shadow-lg sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo Clickeable */}
//             <Button
//               variant="ghost"
//               onClick={handleLogoClick}
//               className="flex items-center space-x-3 flex-shrink-0 hover:bg-surface/50 rounded-lg px-3 py-2 transition-colors duration-200"
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-lg">
//                 <Shield className="w-6 h-6 text-text-primary" />
//               </div>
//               <div className="hidden sm:block">
//                 <h1 className="text-xl font-bold text-text-primary tracking-tight">Popcorn Club</h1>
//                 <p className="text-xs text-text-muted -mt-1 hidden lg:block"> Where stories come alive</p>
//               </div>
//             </Button>

//             {/* Navigation Buttons con Dropdowns - Centro */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navigationButtons.map((button) => {
//                 const Icon = button.icon
//                 const isOpen = openDropdown === button.id

//                 // 🔀 Si tiene href (y no tiene options), es un botón simple
//                 if (button.href && !button.options) {
//                   return (
//                     <Link
//                       key={button.id}
//                       to={button.href}
//                       className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
//                         button.isActive
//                           ? "bg-surface text-text-primary shadow-md"
//                           : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
//                       }`}
//                     >
//                       {Icon && <Icon className="w-4 h-4" />}
//                       <span>{button.label}</span>
//                     </Link>
//                   )
//                 }

//                 // 🧭 Si tiene opciones, es un dropdown
//                 return (
//                   <div key={button.id} className="relative" data-dropdown>
//                     <Button
//                       variant="ghost"
//                       onClick={() => toggleDropdown(button.id)}
//                       className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
//                         button.isActive || isOpen
//                           ? "bg-surface text-text-primary shadow-md"
//                           : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
//                       }`}
//                     >
//                       {Icon && <Icon className="w-4 h-4" />}
//                       <span>{button.label}</span>
//                       <ChevronDown
//                         className={`w-3 h-3 opacity-70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//                       />
//                     </Button>

//                     {/* Dropdown Menu */}
//                     {isOpen && (
//                       <div className="bg-card absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 backdrop-blur-md border border-primary shadow-2xl rounded-xl p-2 z-50 animate-in slide-in-from-top-2 duration-200">
//                         <div className="text-text-primary font-bold px-4 py-3 text-sm tracking-wide uppercase border-b border-white mb-2">
//                           {button.label}
//                         </div>
//                         {button.options?.map((option) => {
//                           const OptionIcon = option.icon
//                           return (
//                             <button
//                               key={option.id}
//                               onClick={() => handleOptionClick(option.href)}
//                               className="w-full px-4 py-3 hover:bg-gradient-to-r hover:from-secondary/10 hover:to-accent/10 hover:text-primary cursor-pointer transition-all duration-300 flex items-center group rounded-lg border-l-2 border-transparent hover:border-secondary hover:shadow-md"
//                             >
//                               <OptionIcon className="w-5 h-5 mr-3 text-text-primary group-hover:text-secondary group-hover:scale-110 transition-all duration-300" />
//                               <span className="text-sm text-text-primary group-hover:text-white group-hover:font-semibold transition-all duration-300">
//                                 {option.label}
//                               </span>
//                             </button>
//                           )
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>

//             {/* Right Section - Perfil y Acciones */}
//             <div className="flex items-center space-x-3">
//               {/* Search Button */}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-text-muted hover:text-text-primary hover:bg-surface/50 rounded-lg transition-colors duration-200"
//               >
//                 <Search className="w-5 h-5" />
//               </Button>

//               {/* Notifications */}
//               <div className="relative" data-dropdown>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => toggleDropdown("notifications")}
//                   className="relative text-text-muted hover:text-text-primary hover:bg-surface/50 rounded-lg transition-colors duration-200"
//                 >
//                   <Bell className="w-5 h-5" />
//                   {unreadNotifications > 0 && (
//                     <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-error text-text-primary text-xs rounded-full border-2 border-primary">
//                       {unreadNotifications}
//                     </Badge>
//                   )}
//                 </Button>

//                 {openDropdown === "notifications" && (
//                   <div className="absolute top-full right-0 mt-2 w-80 bg-text-primary/98 backdrop-blur-md border border-card shadow-2xl rounded-xl z-50 animate-in slide-in-from-top-2 duration-200">
//                     <div className="text-primary font-bold px-4 py-3 border-b border-card bg-gradient-to-r from-surface/50 to-card/50 rounded-t-xl">
//                       Notifications ({unreadNotifications} new)
//                     </div>
//                     <div className="max-h-96 overflow-y-auto">
//                       {notifications.map((notification) => (
//                         <button
//                           key={notification.id}
//                           className="w-full px-4 py-3 hover:bg-surface/20 cursor-pointer border-b border-surface/20 last:border-b-0 transition-colors duration-200"
//                         >
//                           <div className="flex items-start space-x-3 w-full">
//                             <div
//                               className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
//                                 notification.type === "info"
//                                   ? "bg-secondary"
//                                   : notification.type === "success"
//                                     ? "bg-success"
//                                     : notification.type === "warning"
//                                       ? "bg-warning"
//                                       : "bg-error"
//                               }`}
//                             />
//                             <div className="flex-1 min-w-0 text-left">
//                               <p className="text-sm font-medium text-primary">{notification.title}</p>
//                               <p className="text-xs text-text-muted mt-0.5">{notification.message}</p>
//                               <p className="text-xs text-text-muted mt-1">{notification.time}</p>
//                             </div>
//                             {!notification.read && (
//                               <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 mt-2" />
//                             )}
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* User Profile Dropdown */}
//               <div className="relative" data-dropdown>
//                 <Button
//                   variant="ghost"
//                   onClick={() => toggleDropdown("profile")}
//                   className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-surface/50 transition-colors duration-200"
//                 >
//                   <Avatar className="w-8 h-8">
//                     <AvatarImage src="/placeholder.svg" alt={userProfile.name} />
//                     <AvatarFallback className="bg-gradient-to-br from-success to-secondary text-text-primary font-semibold">
//                       {userProfile.initials}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="hidden md:block text-left">
//                     <p className="text-sm font-medium text-text-primary">{userProfile.name}</p>
//                     <p className="text-xs text-text-muted">{userProfile.role}</p>
//                   </div>
//                   <ChevronDown
//                     className={`w-4 h-4 text-text-muted transition-transform duration-200 ${openDropdown === "profile" ? "rotate-180" : ""}`}
//                   />
//                 </Button>

//                 {openDropdown === "profile" && (
//                   <div className="absolute top-full right-0 mt-2 w-64 bg-text-primary/98 backdrop-blur-md border border-card shadow-2xl rounded-xl p-2 z-50 animate-in slide-in-from-top-2 duration-200">
//                     <div className="px-4 py-3 border-b border-card mb-2">
//                       <div className="flex items-center space-x-3">
//                         <Avatar className="w-12 h-12">
//                           <AvatarImage src="/placeholder.svg" alt={userProfile.name} />
//                           <AvatarFallback className="bg-gradient-to-br from-success to-secondary text-text-primary font-semibold text-lg">
//                             {userProfile.initials}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-semibold text-primary truncate">{userProfile.name}</p>
//                           <p className="text-xs text-text-muted truncate">{userProfile.email}</p>
//                           <Badge variant="secondary" className="text-xs mt-1 bg-surface text-text-secondary">
//                             {userProfile.role}
//                           </Badge>
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => handleOptionClick("/profile")}
//                       className="w-full px-4 py-3 hover:bg-gradient-to-r hover:from-success/10 hover:to-secondary/10 hover:text-primary cursor-pointer transition-all duration-300 flex items-center group rounded-lg border-l-2 border-transparent hover:border-success hover:shadow-md"
//                     >
//                       <User className="w-5 h-5 mr-3 text-text-muted group-hover:text-success group-hover:scale-110 transition-all duration-300" />
//                       <span className="text-sm text-text-muted group-hover:text-primary group-hover:font-semibold transition-all duration-300">
//                         Mi Perfil
//                       </span>
//                     </button>

//                     <button
//                       onClick={() => handleOptionClick("/billing")}
//                       className="w-full px-4 py-3 hover:bg-gradient-to-r hover:from-success/10 hover:to-secondary/10 hover:text-primary cursor-pointer transition-all duration-300 flex items-center group rounded-lg border-l-2 border-transparent hover:border-success hover:shadow-md"
//                     >
//                       <CreditCard className="w-5 h-5 mr-3 text-text-muted group-hover:text-success group-hover:scale-110 transition-all duration-300" />
//                       <span className="text-sm text-text-muted group-hover:text-primary group-hover:font-semibold transition-all duration-300">
//                         Facturación
//                       </span>
//                     </button>

//                     <button
//                       onClick={() => handleOptionClick("/settings")}
//                       className="w-full px-4 py-3 hover:bg-gradient-to-r hover:from-success/10 hover:to-secondary/10 hover:text-primary cursor-pointer transition-all duration-300 flex items-center group rounded-lg border-l-2 border-transparent hover:border-success hover:shadow-md"
//                     >
//                       <Settings className="w-5 h-5 mr-3 text-text-muted group-hover:text-success group-hover:scale-110 transition-all duration-300" />
//                       <span className="text-sm text-text-muted group-hover:text-primary group-hover:font-semibold transition-all duration-300">
//                         Configuración
//                       </span>
//                     </button>

//                     <button
//                       onClick={() => handleOptionClick("/help")}
//                       className="w-full px-4 py-3 hover:bg-gradient-to-r hover:from-success/10 hover:to-secondary/10 hover:text-primary cursor-pointer transition-all duration-300 flex items-center group rounded-lg border-l-2 border-transparent hover:border-success hover:shadow-md"
//                     >
//                       <HelpCircle className="w-5 h-5 mr-3 text-text-muted group-hover:text-success group-hover:scale-110 transition-all duration-300" />
//                       <span className="text-sm text-text-muted group-hover:text-primary group-hover:font-semibold transition-all duration-300">
//                         Ayuda
//                       </span>
//                     </button>

//                     <button
//                       onClick={() => handleOptionClick("/account")}
//                       className="w-full px-4 py-3 hover:bg-gradient-to-r hover:from-success/10 hover:to-secondary/10 hover:text-primary cursor-pointer transition-all duration-300 flex items-center group rounded-lg border-l-2 border-transparent hover:border-success hover:shadow-md"
//                     >
//                       <User className="w-5 h-5 mr-3 text-text-muted group-hover:text-success group-hover:scale-110 transition-all duration-300" />
//                       <span className="text-sm text-text-muted group-hover:text-primary group-hover:font-semibold transition-all duration-300">
//                         Mi Cuenta
//                       </span>
//                     </button>

//                     <div className="border-t border-card my-2"></div>

//                     <button className="w-full px-4 py-3 hover:bg-gradient-to-r hover:from-error/10 hover:to-error/20 hover:text-error cursor-pointer transition-all duration-300 flex items-center group rounded-lg border-l-2 border-transparent hover:border-error hover:shadow-md">
//                       <LogOut className="w-5 h-5 mr-3 text-error group-hover:text-error group-hover:scale-110 transition-all duration-300" />
//                       <span className="text-sm text-error group-hover:text-error group-hover:font-semibold transition-all duration-300">
//                         Cerrar Sesión
//                       </span>
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Menu Button */}
//               <div className="lg:hidden">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={toggleMobileMenu}
//                   className="text-text-muted hover:text-text-primary hover:bg-surface/50 rounded-lg"
//                 >
//                   {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden border-t border-surface bg-primary">
//             <div className="px-4 py-3 space-y-2">
//               {navigationButtons.map((button) => (
//                 <div key={button.id} className="space-y-1">
//                   <Button
//                     variant="ghost"
//                     onClick={() => toggleDropdown(`mobile-${button.id}`)}
//                     className={`w-full justify-between px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
//                       button.isActive || openDropdown === `mobile-${button.id}`
//                         ? "bg-surface text-text-primary"
//                         : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-3">
//                       {button.icon && <button.icon className="w-5 h-5" />}
//                       <span>{button.label}</span>
//                     </div>
//                     <ChevronDown
//                       className={`w-4 h-4 transition-transform duration-200 ${openDropdown === `mobile-${button.id}` ? "rotate-180" : ""}`}
//                     />
//                   </Button>

//                   {openDropdown === `mobile-${button.id}` && (
//                     <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
//                       {button.options?.map((option) => {
//                         const OptionIcon = option.icon
//                         return (
//                           <button
//                             key={option.id}
//                             onClick={() => {
//                               handleOptionClick(option.href)
//                               setIsMobileMenuOpen(false)
//                             }}
//                             className="w-full px-3 py-2 hover:bg-surface cursor-pointer transition-colors duration-150 flex items-center text-text-secondary hover:text-text-primary rounded-md"
//                           >
//                             <OptionIcon className="w-4 h-4 mr-3" />
//                             <span className="text-sm">{option.label}</span>
//                           </button>
//                         )
//                       })}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </nav>
//     </>
//   )
// }

import { useContentType } from "../context/ContentTypeContext";

export default function NavBar() {
  const { contentType, setContentType } = useContentType();

  return (
    <nav>
      <button onClick={() => setContentType("movies")} aria-pressed={contentType === "movies"}>
        Películas
      </button>
      <button onClick={() => setContentType("series&tv")} aria-pressed={contentType === "series&tv"}>
        Series & TV
      </button>
    </nav>
  );
}
