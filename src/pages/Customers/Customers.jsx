import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import { CreateCustomerDialog } from "./components/CreateCustomerDialog"
import ViewCustomerDialog from "./components/ViewCustomerDialog"
import { useCrudService } from "@/hooks/useCrudService"

const Customers = () => {
  
  const { Items: customers, loading, error, useGetAll, useCreate, useEdit, useDelete, useGetById, selectedItem: selectedCustomer, closeView } = useCrudService("customers")
  const [open, setOpen] = useState(false)

  const columns = getColumns(
    (row) => useGetById(row.id),
    (id) => useDelete(id)
  )

  const handleCreate = async (data) => {
    await useCreate(data)
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
          enableCreate={false}
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
          if (!open) closeView()
        }}
        customer={selectedCustomer}
      />
    </div>
  )
}

export default Customers