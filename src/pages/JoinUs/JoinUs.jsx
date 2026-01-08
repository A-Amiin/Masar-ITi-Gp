import { useCrudService } from "@/hooks/useCrudService"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import ViewUserDialog from "./components/ViewIssueDialog"

const JoinUs = () => {
  const {
    Items: applications,
    loading,
    error,
    setItems,
    useEdit,
    useDelete,
    selectedItem,
    closeView,
  } = useCrudService("join_us")

  const handleMarkReviewed = async (id) => {
    // 👇 optimistic update
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: "reviewed" }
          : item
      )
    )
    await useEdit(id, {
      isRead: true,
      status: "reviewed",
    })
  }

  const columns = getColumns(
    (item) => {
      if (item.status === "new") {
        handleMarkReviewed(item.id)
      }
    },
    (id) => useDelete(id),
    handleMarkReviewed
  )

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حدث خطأ أثناء جلب البيانات</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">طلبات الانضمام</h1>

      <div className="border rounded-md p-4">
        <DataTable
          columns={columns}
          data={applications}
          searchPlaceholder="ابحث بالاسم أو رقم الهاتف..."
        />
      </div>

      <ViewUserDialog
        open={!!selectedItem}
        onOpenChange={(open) => !open && closeView()}
        item={selectedItem}
      />
    </div>
  )
}

export default JoinUs