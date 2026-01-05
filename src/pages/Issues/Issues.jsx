import { useCrudService } from "@/hooks/useCrudService"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import ViewUserDialog from "./components/ViewIssueDialog" 

const Issues = () => {
  const {
    Items: issues,
    loading,
    error,
    useDelete,
    useGetById,
    selectedItem: selectedIssue,
    closeView,
  } = useCrudService("contact_us")

  const columns = getColumns(
    (row) => useGetById(row.id),
    (id) => useDelete(id)
  )
  console.log(issues)
  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حدث خطأ أثناء جلب البيانات</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">قائمة الرسائل</h1>

      <div className="border rounded-md p-4">
        <DataTable
          columns={columns}
          data={issues}
          searchPlaceholder="ابحث باسم العميل أو البريد..."
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
