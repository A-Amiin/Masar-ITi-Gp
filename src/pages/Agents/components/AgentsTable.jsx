import { Eye, Pencil, Trash2 } from "lucide-react"

function Avatar({ name }) {
  return (
    <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
      {name?.charAt(0) || "؟"}
    </div>
  )
}

export default function AgentsTable({
  agents,
  page,
  totalPages,
  totalItems,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="space-y-4">
      {/* ================= TABLE ================= */}
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-right text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">المندوب</th>
              <th className="p-3">الهاتف</th>
              <th className="p-3">المحافظة</th>
              <th className="p-3">العملاء</th>
              <th className="p-3">الطلبات</th>
              <th className="p-3">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {agents.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-muted-foreground"
                >
                  لا يوجد نتائج
                </td>
              </tr>
            )}

            {agents.map((agent) => (
              <tr
                key={agent.id}
                className="border-t hover:bg-muted/40"
              >
                {/* ===== Agent ===== */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={agent.nameAr} />
                    <div className="leading-tight">
                      <div className="font-medium">
                        {agent.nameAr || "—"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {agent.email || "—"}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="p-3">
                  {agent.phone || "—"}
                </td>

                {/* Governorate */}
                <td className="p-3">
                  {agent.governorateAr || "غير محدد"}
                </td>

                {/* Customers */}
                <td className="p-3">
                  <span className="inline-flex rounded-full bg-cyan-100 px-2 py-0.5 text-xs text-cyan-700">
                    {agent.customersCount ?? "0"}
                  </span>
                </td>

                {/* Orders */}
                <td className="p-3">
                  <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    {agent.ordersCount ?? "0"}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onView(agent)}
                      className="text-muted-foreground hover:text-primary"
                      title="عرض"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => onEdit(agent)}
                      className="text-muted-foreground hover:text-primary"
                      title="تعديل"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(agent)}
                      className="text-red-500 hover:text-red-600"
                      title="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="relative p-4 text-sm border rounded-lg">
        {/* Info */}
        <div className="text-muted-foreground">
          عرض صفحة {page} من {totalPages} — إجمالي {totalItems} مندوب
        </div>

        {/* Pagination */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            الأول
          </button>

          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            السابق
          </button>

          <button className="px-3 py-1 rounded bg-primary text-white">
            {page}
          </button>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            التالي
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            الأخيرة
          </button>
        </div>
      </div>
    </div>
  )
}