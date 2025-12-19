import { cn } from "@/lib/utils"

export function ClassificationBadge({ value }) {
  const map = {
    "تصنيف A": "bg-blue-600 text-white",
    "تصنيف B": "bg-teal-500 text-white",
    "تصنيف C": "bg-yellow-400 text-black",
  }

  return (
    <span
      className={cn(
        "px-2 py-1 rounded text-xs font-medium",
        map[value] ?? "bg-muted"
      )}
    >
      {value.replace("تصنيف ", "")}
    </span>
  )
}