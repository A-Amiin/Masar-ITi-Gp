import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

const schema = z.object({
  message: z.string().min(1),
})

export default function MessageForm({ onSend }) {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    onSend(data.message)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-t p-3 flex gap-2"
    >
      <Input {...register("message")} placeholder="اكتب رسالة..." />
      <Button type="submit" size="icon">
        <Send size={16} />
      </Button>
    </form>
  )
}