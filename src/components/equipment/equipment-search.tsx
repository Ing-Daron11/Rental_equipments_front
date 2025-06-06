"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface EquipmentSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function EquipmentSearch({ value, onChange, placeholder = "Buscar equipos..." }: EquipmentSearchProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm -z-10"></div>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-primary focus:ring-primary/20"
      />
    </div>
  )
}
