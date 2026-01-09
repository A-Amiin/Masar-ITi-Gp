import { useCrudService } from "@/hooks/useCrudService"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import ViewUserDialog from "./components/ViewIssueDialog"

const Issues = () => {
  const {
    Items: issues,
    loading,
    error,
    setItems,
    useEdit,
    useDelete,
    useGetById,
    selectedItem: selectedIssue,
    closeView,
  } = useCrudService("contact_us")

  const handleMarkRead = async (id) => {
    // 👇 optimistic update
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, isRead: true, status: "read" }
          : item
      )
    )

    // 👇 Firestore update
    await useEdit(id, {
      isRead: true,
      status: "read",
    })
  }

  const columns = getColumns(
    (id) => useGetById(id),
    (id) => useDelete(id),
    handleMarkRead
  )

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حدث خطأ أثناء جلب البيانات</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">قائمة الرسائل</h1>

      <div className="border rounded-md p-4 bg-white dark:bg-black/50">
        <DataTable
          columns={columns}
          data={issues}
          searchPlaceholder="ابحث باسم العميل أو البريد..."
          enableCreate={false}
        />
      </div>

      {/* Dialog عرض الرسالة */}
      <ViewUserDialog
        open={!!selectedIssue}
        onOpenChange={(open) => !open && closeView()}
        issue={selectedIssue}
      />
    </div>
  )
}

export default Issues
