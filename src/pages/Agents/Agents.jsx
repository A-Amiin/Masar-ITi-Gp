import { useEffect, useMemo, useState } from "react"
import { listenToAgents } from "@/services/agents.service"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"

import AgentsTable from "./components/AgentsTable"
import AddAgentDialog from "./components/AddAgentDialog"
import ViewAgentDialog from "./components/ViewAgentDialog"
import EditAgentDialog from "./components/EditAgentDialog"
import DeleteAgentDialog from "./components/DeleteAgentDialog"

const PAGE_SIZE = 5

export default function Agents() {
  const [agents, setAgents] = useState([])

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const [openAdd, setOpenAdd] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const [selectedAgent, setSelectedAgent] = useState(null)

  /* ================= Firebase ================= */
  useEffect(() => {
    const unsub = listenToAgents(setAgents)
    return () => unsub()
  }, [])

  /* ================= Search ================= */
  const filteredAgents = useMemo(() => {
    const q = search.toLowerCase().trim()

    if (!q) return agents

    return agents.filter((a) =>
      [
        a.nameAr,
        a.email,
        a.phone,
        a.governorateAr,
      ]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    )
  }, [agents, search])

  /* ================= Pagination ================= */
  const totalPages = Math.ceil(filteredAgents.length / PAGE_SIZE)

  const paginatedAgents = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredAgents.slice(start, start + PAGE_SIZE)
  }, [filteredAgents, page])

  useEffect(() => {
    setPage(1) // يرجع لأول صفحة عند البحث
  }, [search])

  /* ================= Handlers ================= */
  const handleView = (agent) => {
    setSelectedAgent(agent)
    setOpenView(true)
  }

  const handleEdit = (agent) => {
    setSelectedAgent(agent)
    setOpenEdit(true)
  }

  const handleDelete = (agent) => {
    setSelectedAgent(agent)
    setOpenDelete(true)
  }

  return (
    <div className="p-6 space-y-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">المناديب</h1>

        <Button onClick={() => setOpenAdd(true)} className="gap-2">
          <Plus size={16} />
          إضافة مندوب
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <Input
          placeholder="بحث بالاسم، الإيميل، الهاتف..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="flex justify-between px-4 py-3 border-b">
          <h2>قائمة المناديب</h2>
          <span>إجمالي: {filteredAgents.length}</span>
        </div>

        <AgentsTable
          agents={paginatedAgents}
          page={page}
          totalPages={totalPages}
          totalItems={filteredAgents.length}
          onPageChange={setPage}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Dialogs */}
      <AddAgentDialog open={openAdd} onOpenChange={setOpenAdd} />

      <ViewAgentDialog
        open={openView}
        onOpenChange={setOpenView}
        agent={selectedAgent}
      />

      <EditAgentDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        agent={selectedAgent}
      />

      <DeleteAgentDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        agent={selectedAgent}
      />
    </div>
  )
}
