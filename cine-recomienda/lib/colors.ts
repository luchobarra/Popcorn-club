// export const colors = {
//     // Colores principales
//     primary: "#1f2937", // Púrpura vibrante
//     secondary: "#06b6d4", // Cyan
//     accent: "#ec4899", // Rosa vibrante
  
//     // Colores de estado
//     success: "#22c55e", // Verde
//     warning: "#f59e0b", // Amarillo/Naranja
//     error: "#ef4444", // Rojo
  
//     // Colores base
//     background: "#0f172a", // Azul muy oscuro
//     surface: "#1e293b", // Azul oscuro
//     card: "#334155", // Azul medio
  
//     // Colores de texto
//     text: {
//       primary: "#f8fafc", // Blanco casi puro
//       secondary: "#cbd5e1", // Gris claro
//       muted: "#94a3b8", // Gris medio
//     },
  
//     // Colores específicos para ratings
//     rating: {
//       excellent: "#22c55e", // Verde - 8.5+
//       good: "#f59e0b", // Amarillo - 7.0-8.4
//       average: "#f97316", // Naranja - 5.0-6.9
//       poor: "#ef4444", // Rojo - <5.0
//     },
  
//     // Gradientes predefinidos (usando los colores base)
//     gradients: {
//       primary: "from-primary to-accent",
//       secondary: "from-secondary to-primary",
//       hero: "from-primary via-background to-accent",
//       card: "from-surface to-card",
//     },
//  } //as const
  
// // Tipos TypeScript
// export type ColorName = keyof typeof colors
// export type TextColorName = keyof typeof colors.text
// export type RatingColorName = keyof typeof colors.rating
// export type GradientName = keyof typeof colors.gradients
  
// // Función helper para obtener colores
// export const getColor = (colorName: ColorName) => {
//     return colors[colorName]
// }
  
// // Función helper para obtener colores de texto
// export const getTextColor = (colorName: TextColorName) => {
//     return colors.text[colorName]
// }
  
// // Función helper para obtener colores de rating
// export const getRatingColor = (rating: number) => {
//     if (rating >= 8.5) return colors.rating.excellent
//     if (rating >= 7.0) return colors.rating.good
//     if (rating >= 5.0) return colors.rating.average
//     return colors.rating.poor
// }
  
// // Función helper para obtener clase de rating
// export const getRatingClass = (rating: number) => {
//     if (rating >= 8.5) return "rating-excellent"
//     if (rating >= 7.0) return "rating-good"
//     if (rating >= 5.0) return "rating-average"
//     return "rating-poor"
// }
  
// // Función helper para obtener gradientes
// export const getGradient = (name: GradientName) => {
//     return colors.gradients[name]
// }  