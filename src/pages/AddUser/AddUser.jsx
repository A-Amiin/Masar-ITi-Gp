import { useState } from "react"
import { useCrudService } from "@/hooks/useCrudService"
import { DataTable } from "@/components/ui/data-table"
import { getColumns } from "./components/columns"
import { CreateUserDialog } from "./components/CreateUserDialog"
import ViewUserDialog from "./components/ViewUserDialog"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

const AddUser = () => {
  const {
    Items: users,
    loading,
    error,
    useCreate,
    useDelete,
    useGetById,
    selectedItem: selectedUser,
    closeView,
  } = useCrudService("users")

  // representative collection
  const {
    useCreate: useCreateRepresentative,
  } = useCrudService("representative")

  const [open, setOpen] = useState(false)

  const columns = getColumns(
    (row) => useGetById(row.id),
    (id) => useDelete(id)
  )

  const handleCreate = async (data) => {
    const { email, password, ...rest } = data

    try {
      // Firebase Auth
      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password)

      const uid = userCredential.user.uid

      const payload = {
        ...rest,
        email,
        user_Id: uid,
        createdAt: new Date(),
      }

      // Add to users & representative
      await Promise.all([
        useCreate(payload),
        useCreateRepresentative({
          ...payload,
          role: "representative",
        }),
      ])

      setOpen(false)
    } catch (err) {
      console.error("Error creating user:", err)
    }
  }

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حصل خطأ</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">قائمة المستخدمين</h1>

      <div className="border rounded-md p-4 bg-white dark:bg-black/50 shadow-sm">
        <DataTable
          columns={columns}
          data={users}
          handleCreate={() => setOpen(true)}
        />
      </div>

      <CreateUserDialog
        open={open}
        onOpenChange={setOpen}
        create={handleCreate}
      />

      <ViewUserDialog
        open={!!selectedUser}
        onOpenChange={(open) => !open && closeView()}
        user={selectedUser}
      />
    </div>
  )
}

export default AddUser