import {
    BarChart3,
    TrendingUp,
    PieChart,
    Activity,
    Users,
    UserPlus,
    Settings,
    Shield,
    FileText,
    Download,
    Calendar,
    Mail,
    Home,
    Layout,
    Zap,
    Target,
    Eye,
    } from "lucide-react"
    
    import type { NavButton } from "../types/navbar"
    
    export const navigationButtons: NavButton[] = [
        {
        id: "dashboard",
        label: "Dashboard",
        icon: Home,
        isActive: true,
        options: [
            { id: "overview", label: "Vista General", href: "/dashboard/overview", icon: Eye },
            { id: "performance", label: "Rendimiento", href: "/dashboard/performance", icon: Zap },
            { id: "widgets", label: "Widgets", href: "/dashboard/widgets", icon: Layout },
            { id: "goals", label: "Objetivos", href: "/dashboard/goals", icon: Target },
            { id: "settings", label: "Configuración", href: "/dashboard/settings", icon: Settings },
        ],
        },
        {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        isActive: false,
        options: [
            { id: "reports", label: "Reportes", href: "/analytics/reports", icon: BarChart3 },
            { id: "trends", label: "Tendencias", href: "/analytics/trends", icon: TrendingUp },
            { id: "segments", label: "Segmentación", href: "/analytics/segments", icon: PieChart },
            { id: "realtime", label: "Tiempo Real", href: "/analytics/realtime", icon: Activity },
            { id: "export", label: "Exportar", href: "/analytics/export", icon: Download },
        ],
        },
        {
        id: "team",
        label: "Team",
        icon: Users,
        isActive: false,
        options: [
            { id: "members", label: "Miembros", href: "/team/members", icon: Users },
            { id: "invite", label: "Invitar", href: "/team/invite", icon: UserPlus },
            { id: "permissions", label: "Permisos", href: "/team/permissions", icon: Shield },
            { id: "roles", label: "Roles", href: "/team/roles", icon: Settings },
            { id: "activity", label: "Actividad", href: "/team/activity", icon: Activity },
        ],
        },
        {
        id: "reports",
        label: "Reports",
        icon: FileText,
        isActive: false,
        options: [
            { id: "generate", label: "Generar", href: "/reports/generate", icon: FileText },
            { id: "scheduled", label: "Programados", href: "/reports/scheduled", icon: Calendar },
            { id: "export", label: "Exportar", href: "/reports/export", icon: Download },
            { id: "share", label: "Compartir", href: "/reports/share", icon: Mail },
            { id: "templates", label: "Plantillas", href: "/reports/templates", icon: Layout },
        ],
        },
]
  