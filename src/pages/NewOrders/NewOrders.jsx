import { useEffect, useMemo, useState } from "react"
import { listenToNewOrders } from "@/services/newOrders.service"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

import NewOrdersTable from "./components/NewOrdersTable"
import EditStatusDialog from "./components/EditStatusDialog"
import DeleteOrderDialog from "./components/DeleteOrderDialog"

const PAGE_SIZE = 5

export default function NewOrders() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const unsub = listenToNewOrders(setOrders)
    return () => unsub()
  }, [])

  /* ===== Search ===== */
  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return orders

    return orders.filter((o) =>
      [
        o.customerName,
        o.customerPhone,
        o.productName,
        o.agentName,
        o.status,
      ]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    )
  }, [orders, search])

  /* ===== Pagination ===== */
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE)

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredOrders.slice(start, start + PAGE_SIZE)
  }, [filteredOrders, page])

  useEffect(() => {
    setPage(1)
  }, [search])

  /* ===== Handlers ===== */
  const handleEdit = (order) => {
    setSelectedOrder(order)
    setOpenEdit(true)
  }

  const handleDelete = (order) => {
    setSelectedOrder(order)
    setOpenDelete(true)
  }

  return (
    <div className="p-6 space-y-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">الطلبات الجديدة</h1>
      </div>

      {/* Search */}
      <Card className="p-4">
        <Input
          placeholder="بحث بالعميل، المندوب، المنتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="flex justify-between px-4 py-3 border-b">
          <h2>قائمة الطلبات</h2>
          <span>إجمالي: {filteredOrders.length}</span>
        </div>

        <NewOrdersTable
          orders={paginatedOrders}
          page={page}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          onPageChange={setPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Dialogs */}
      <EditStatusDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        order={selectedOrder}
      />

      <DeleteOrderDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        order={selectedOrder}
      />
    </div>
  )
}