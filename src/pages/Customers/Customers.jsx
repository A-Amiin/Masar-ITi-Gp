import { useState } from "react"
import { useCustomers } from "@/hooks/useCustomers"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import { CreateCustomerDialog } from "./components/create-customer-dialog"

const Customers = () => {
  const { customers, loading, error, removeCustomer, createCustomer } = useCustomers()

  const [open, setOpen] = useState(false)

  const columns = getColumns(
    (row) => console.log("VIEW", row),
    (id) => removeCustomer(id)
  )

  const handleCreate = (data) => {
    setOpen(false)
  }

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حصل خطأ</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">قائمة العملاء</h1>

      <DataTable
        columns={columns}
        data={customers}
        handleCreate={() => setOpen(true)}
      />

      <CreateCustomerDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleCreate}
        createCustomer={createCustomer}
      />
    </div>
  )
}

export default Customers;