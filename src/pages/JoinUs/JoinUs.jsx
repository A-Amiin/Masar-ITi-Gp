import { useCrudService } from "@/hooks/useCrudService"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import ViewUserDialog from "./components/ViewIssueDialog"

const JoinUs = () => {
  const { Items: applications, loading, error, setItems, useEdit, useDelete, selectedItem, closeView } = useCrudService("join_us")

  const handleChangeStatus = async (id, status) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status, isRead: true } : item
      )
    )

    try {
      await useEdit(id, { status, isRead: true })
    } catch (err) {
      console.error("Failed to update status:", err)
      setItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: prev.find(i => i.id === id).status } : item
        )
      )
    }
  }

  const handleDelete = async (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
    await useDelete(id)
  }

  const handleView = async (item) => {
    if (item.status === "new") {
      await handleChangeStatus(item.id, "reviewed")
    }
  }

  const columns = getColumns(
    (item) => {
      handleView(item)
    },
    handleDelete,
    handleChangeStatus
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
          enableCreate={false}
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