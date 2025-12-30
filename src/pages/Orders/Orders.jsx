import { useEffect, useMemo, useState } from "react"
import { listenToOrders } from "@/services/orders.service"

import OrdersStats from "./components/OrdersStats"
import OrdersFilters from "./components/OrdersFilters"
import OrdersTable from "./components/OrdersTable"
import OrdersPagination from "./components/OrdersPagination"

const PAGE_SIZE = 5

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const unsub = listenToOrders(setOrders)
    return () => unsub()
  }, [])

  /* ========= FILTER ========= */
  const filteredOrders = useMemo(() => {
    let result = orders

    if (status !== "all") {
      result = result.filter((o) => o.status === status)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (o) =>
          o.orderNumber?.toLowerCase().includes(q) ||
          o.customerName?.toLowerCase().includes(q) ||
          o.agentName?.toLowerCase().includes(q)
      )
    }

    return result
  }, [orders, search, status])

  /* ========= PAGINATION ========= */
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredOrders.slice(start, start + PAGE_SIZE)
  }, [filteredOrders, page])

  const handleClearFilters = () => {
    setSearch("")
    setStatus("all")
    setPage(1)
  }

  return (
    <div className="p-6 space-y-6" dir="rtl">
      {/* ===== 6 STATUS CARDS ===== */}
      <OrdersStats
        orders={orders}
        activeStatus={status}
        onSelectStatus={(s) => {
          setStatus(s)
          setPage(1)
        }}
      />

      {/* ===== SEARCH + FILTER (واحد بس) ===== */}
      <OrdersFilters
        search={search}
        status={status}
        onSearchChange={(v) => {
          setSearch(v)
          setPage(1)
        }}
        onStatusChange={(v) => {
          setStatus(v)
          setPage(1)
        }}
        onClear={handleClearFilters}
      />

      {/* ===== TABLE ===== */}
      <OrdersTable orders={paginatedOrders} />

      {/* ===== FOOTER PAGINATION ===== */}
      <OrdersPagination
        page={page}
        pageSize={PAGE_SIZE}
        total={filteredOrders.length}
        onPageChange={setPage}
      />
    </div>
  )
}
