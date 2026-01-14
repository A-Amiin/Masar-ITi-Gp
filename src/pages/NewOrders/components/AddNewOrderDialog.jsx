import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

import { subscribeToInventory } from "@/services/inventory.service"
import { listenToAgents } from "@/services/agents.service"
import { addNewOrder } from "@/services/newOrders.service"

export default function AddNewOrderDialog({ open, onOpenChange }) {
  const { register, handleSubmit, reset, watch } = useForm()

  const [products, setProducts] = useState([])
  const [agents, setAgents] = useState([])

  const selectedProductId = watch("productId")

  const selectedProduct = products.find(p => p.id === selectedProductId)

  useEffect(() => {
    if (!open) return

    const unsubProducts = subscribeToInventory(setProducts)
    const unsubAgents = listenToAgents(setAgents)

    return () => {
      unsubProducts()
      unsubAgents()
    }
  }, [open])

  const onSubmit = async (data) => {
    const product = products.find(p => p.id === data.productId)
    const agent = agents.find(a => a.id === data.representativeId)

    if (!product || !agent) return

    if (Number(data.quantity) > product.quantity) {
      alert(`الكمية المتاحة فقط: ${product.quantity}`)
      return
    }

    await addNewOrder({
  representativeId: agent.id,
  representativeName: agent.nameAr,   // 🔥 أضف هذا
  productId: product.id,
  productName: product.nameAr,
  price: Number(product.price),       // 🔥 تأكيد رقم
  quantity: Number(data.quantity),
  customerName: data.customerName,
  customerPhone: data.customerPhone,
})

    reset()
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-[400px] p-6 space-y-4">
        <h2 className="font-semibold text-lg">إضافة طلب جديد</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          <Input placeholder="اسم العميل" {...register("customerName", { required: true })} />
          <Input placeholder="رقم العميل" {...register("customerPhone", { required: true })} />

          {/* Representative */}
          <select
            {...register("representativeId", { required: true })}
            className="w-full border rounded p-2"
          >
            <option value="">اختر المندوب</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nameAr}
              </option>
            ))}
          </select>

          {/* Product */}
          <select
            {...register("productId", { required: true })}
            className="w-full border rounded p-2"
          >
            <option value="">اختر المنتج</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nameAr} ({p.quantity})
              </option>
            ))}
          </select>

          {selectedProduct && (
            <div className="text-xs text-muted-foreground">
              الكمية المتاحة: {selectedProduct.quantity}
            </div>
          )}

          <Input
            type="number"
            min="1"
            placeholder="الكمية"
            {...register("quantity", { required: true })}
          />

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              حفظ
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}