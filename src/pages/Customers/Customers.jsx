import { useState } from "react"
import { useCustomers } from "@/hooks/useCustomers"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import { CreateCustomerDialog } from "./components/CreateCustomerDialog"
import ViewCustomerDialog from "./components/ViewCustomerDialog"

const Customers = () => {
  const { customers, loading, error, selectedCustomer, removeCustomer, createCustomer, getCustomerByIdWrapper, closeCustomerView } = useCustomers()

  const [open, setOpen] = useState(false)

  const columns = getColumns(
    (row) => getCustomerByIdWrapper(row.id),
    (id) => removeCustomer(id)
  )

  const handleCreate = async (data) => {
    await createCustomer(data)
    setOpen(false)
  }

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حصل خطأ</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">قائمة العملاء</h1>

      <div className="border rounded-md bg-white dark:bg-background p-4">
        <DataTable
          columns={columns}
          data={customers}
          handleCreate={() => setOpen(true)}
        />
      </div>

      <CreateCustomerDialog
        open={open}
        onOpenChange={setOpen}
        createCustomer={handleCreate}
      />

      <ViewCustomerDialog
        open={!!selectedCustomer}
        onOpenChange={(open) => {
          if (!open) closeCustomerView()
        }}
        customer={selectedCustomer}
      />
    </div>
  )
}

export default Customers