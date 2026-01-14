import { ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewOrdersTable({
  orders,
  page,
  totalPages,
  totalItems,
  onPageChange,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">العميل</th>
              <th className="p-3">الهاتف</th>
              <th className="p-3">المنتج</th>
              <th className="p-3">السعر</th>
              <th className="p-3">الكمية</th>
              <th className="p-3">المندوب</th>
              <th className="p-3">الحالة</th>
              <th className="p-3 text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-muted-foreground"
                >
                  لا توجد طلبات
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-t hover:bg-muted/50">
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3">{o.customerPhone}</td>
                  <td className="p-3">{o.productName}</td>
                  <td className="p-3">{o.price}</td>
                  <td className="p-3">{o.quantity}</td>
                  <td className="p-3">{o.agentName}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          o.status === "warehouse"
                            ? "bg-yellow-100 text-yellow-700"
                            : o.status === "on_the_way"
                            ? "bg-blue-100 text-blue-700"
                            : o.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : o.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-muted text-foreground"
                        }
                      `}
                    >
                      {o.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit(o)}
                      >
                        <Pencil size={16} />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDelete(o)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <div className="text-sm text-muted-foreground">
          صفحة {page} من {totalPages} — إجمالي {totalItems}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronRight size={16} />
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronLeft size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}