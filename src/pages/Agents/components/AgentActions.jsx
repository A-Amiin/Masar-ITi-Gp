import { Eye, Pencil, Trash2 } from "lucide-react";

export default function AgentActions() {
  return (
    <div className="flex gap-3">
      <Eye size={16} className="cursor-pointer" />
      <Pencil size={16} className="cursor-pointer" />
      <Trash2 size={16} className="cursor-pointer text-red-600" />
    </div>
  );
}
