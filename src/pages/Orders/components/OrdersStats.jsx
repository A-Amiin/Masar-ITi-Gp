import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  RotateCcw,
  XCircle,
} from "lucide-react"

const ORDER_STATUSES = [
  { key: "warehouse", label: "المستودع", icon: Package },
  { key: "on_the_way", label: "في الطريق", icon: Truck },
  { key: "delivered", label: "تم التوصيل", icon: CheckCircle },
  { key: "processing", label: "قيد التنفيذ", icon: Clock },
  { key: "reviewed", label: "مراجع", icon: RotateCcw },
  { key: "canceled", label: "ملغي", icon: XCircle },
]

export default function OrdersStats({
  orders = [],
  activeStatus,
  onSelectStatus,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {ORDER_STATUSES.map((item) => {
        const Icon = item.icon
        const count = orders.filter(
          (o) => o.status === item.key
        ).length

        const isActive = activeStatus === item.key

        return (
          <button
            key={item.key}
            onClick={() => onSelectStatus(item.key)}
            className={`rounded-lg border p-4 transition text-right
              ${
                isActive
                  ? "border-primary bg-primary/10"
                  : "hover:bg-muted"
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </div>
              <span className="text-lg font-bold">{count}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
