import { useState } from "react"
import { useCrudService } from "@/hooks/useCrudService"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import ViewUserDialog from "./components/ViewIssueDialog"

const JoinUs = () => {
  // CRUD hook
  const { Items: applications, loading, error, setItems, useEdit, useDelete } =
    useCrudService("join_us")

  // Local state for selected item & dialog
  const [selectedItem, setSelectedItem] = useState(null)
  const [open, setOpen] = useState(false)

  // Change status function (optimistic update)
  const handleChangeStatus = async (id, status) => {
    // Optimistically update UI
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, isRead: true } : item
      )
    )

    try {
      await useEdit(id, { status, isRead: true })
    } catch (err) {
      console.error("Failed to update status:", err)
      // Revert if failed
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: prev.find((i) => i.id === id).status } : item
        )
      )
    }
  }

  // Delete item
  const handleDelete = async (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    await useDelete(id)
  }

  // View item: open dialog immediately, update status in background
  const handleView = (item) => {
    setSelectedItem(item) // open dialog immediately
    setOpen(true)

    // Update status in background if new
    if (item.status === "new") {
      handleChangeStatus(item.id, "reviewed")
    }
  }

  // Columns for DataTable
  const columns = getColumns(handleView, handleDelete, handleChangeStatus)

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حدث خطأ أثناء جلب البيانات</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">طلبات الانضمام</h1>

      <div className="border rounded-md p-4 bg-white dark:bg-black/50">
        <DataTable
          columns={columns}
          data={applications}
          searchPlaceholder="ابحث بالاسم أو رقم الهاتف..."
          enableCreate={false}
        />
      </div>

      {/* View Dialog */}
      <ViewUserDialog
        open={open}
        onOpenChange={(isOpen) => !isOpen && setSelectedItem(null) && setOpen(false)}
        item={selectedItem}
      />
    </div>
  )
}

export default JoinUs