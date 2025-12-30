import { Button } from "@/components/ui/button"

export default function OrdersPagination({
  page,
  pageSize,
  total,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="relative mt-4 rounded-lg border p-4 text-sm">
      {/* Info – يمين */}
      <div className="text-muted-foreground">
        عرض {start} إلى {end} من {total} طلب
      </div>

      {/* Buttons – شمال */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(1)}
        >
          الأولى
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          السابق
        </Button>

        <Button size="sm">{page}</Button>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          التالي
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          الأخيرة
        </Button>
      </div>
    </div>
  )
}
