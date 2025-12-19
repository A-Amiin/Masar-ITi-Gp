import { useCustomers } from "@/hooks/useCustomers"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"

const Customers = () => {
  const { customers, loading, error, removeCustomer } = useCustomers()

  const columns = getColumns(
    (row) => console.log("VIEW", row),
    (id) => removeCustomer(id)
  )

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حصل خطأ</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">قائمة العملاء</h1>

      <DataTable
        columns={columns}
        data={customers}
      />
    </div>
  )
}

export default Customers