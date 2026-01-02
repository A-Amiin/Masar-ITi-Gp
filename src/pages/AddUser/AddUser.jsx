import { useState } from "react"
import { useCrudService } from "@/hooks/useCrudService"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import { CreateUserDialog } from "./components/CreateUserDialog"
import ViewCustomerDialog from "./components/ViewUserDialog"

const AddUser = () => {
  const { Items: users, loading, error, useGetAll, useCreate, useEdit, useDelete, useGetById, selectedItem: selectedUser, closeView } = useCrudService("users")

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
      <h1 className="text-xl font-bold">قائمة المستخدمين</h1>

      <div className="border rounded-md bg-white dark:bg-background p-4">
        <DataTable
          columns={columns}
          data={users}
          handleCreate={() => setOpen(true)}
        />
      </div>

      <CreateUserDialog
        open={open}
        onOpenChange={setOpen}
        createCustomer={handleCreate}
      />

      <ViewCustomerDialog
        open={!!selectedUser}
        onOpenChange={(open) => {
          if (!open) closeView()
        }}
        customer={selectedUser}
      />
    </div>
  )
}

export default AddUser