import { useEffect, useMemo, useState } from "react"
import { listenToAgents } from "@/services/agents.service"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

import AgentsTable from "./components/AgentsTable"
import ViewAgentDialog from "./components/ViewAgentDialog"
import EditAgentDialog from "./components/EditAgentDialog"
import DeleteAgentDialog from "./components/DeleteAgentDialog"

const PAGE_SIZE = 5

export default function Agents() {
  const [agents, setAgents] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const [selectedAgent, setSelectedAgent] = useState(null)
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  useEffect(() => {
    return listenToAgents(setAgents)
  }, [])

  const filteredAgents = useMemo(() => {
    const q = search.toLowerCase()
    return agents.filter((a) =>
      [a.nameAr, a.email, a.phone, a.governorateAr]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    )
  }, [agents, search])

  const totalPages = Math.ceil(filteredAgents.length / PAGE_SIZE)
  const paginated = filteredAgents.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  return (
    <div className="p-6 space-y-4" dir="rtl">
      <h1 className="text-xl font-semibold">المناديب</h1>

      <Card className="p-4">
        <Input
          placeholder="بحث بالاسم، الإيميل، الهاتف..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      <AgentsTable
        agents={paginated}
        page={page}
        totalPages={totalPages}
        totalItems={filteredAgents.length}
        onPageChange={setPage}
        onView={(a) => { setSelectedAgent(a); setOpenView(true) }}
        onEdit={(a) => { setSelectedAgent(a); setOpenEdit(true) }}
        onDelete={(a) => { setSelectedAgent(a); setOpenDelete(true) }}
      />

      <ViewAgentDialog open={openView} onOpenChange={setOpenView} agent={selectedAgent} />
      <EditAgentDialog open={openEdit} onOpenChange={setOpenEdit} agent={selectedAgent} />
      <DeleteAgentDialog open={openDelete} onOpenChange={setOpenDelete} agent={selectedAgent} />
    </div>
  )
}