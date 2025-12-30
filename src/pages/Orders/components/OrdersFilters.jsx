import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function OrdersFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onClear,
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Search */}
      <Input
        placeholder="بحث..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
      />

      {/* Status Filter */}
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="الحالة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">الكل</SelectItem>
          <SelectItem value="warehouse">المستودع</SelectItem>
          <SelectItem value="on_the_way">في الطريق</SelectItem>
          <SelectItem value="delivered">تم التوصيل</SelectItem>
          <SelectItem value="processing">قيد التنفيذ</SelectItem>
          <SelectItem value="reviewed">مراجع</SelectItem>
          <SelectItem value="canceled">ملغي</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear */}
      <Button
        variant="outline"
        size="icon"
        onClick={onClear}
        title="إزالة التصفية"
      >
        <X size={16} />
      </Button>
    </div>
  )
}
