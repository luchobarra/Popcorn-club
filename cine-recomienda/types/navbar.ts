import type React from "react"

export interface NavButton {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  isActive?: boolean
  options?: DropdownOption[] 
  href?: string             
}

export interface DropdownOption {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  initials: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "warning" | "success" | "error"
}

export interface PopupOption {
  id: string
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  badge?: string
}