import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNewOrder } from "@/services/newOrders.service"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const schema = z.object({
  representativeId: z.string().min(1),
  productId: z.string().min(1),
  quantity: z.coerce.number().min(1),
  customerName: z.string().min(1),
  phone: z.string().min(1),
})

export default function NewOrderForm({
  inventory,
  representatives,
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
    },
  })

  const productId = form.watch("productId")
  const quantity = form.watch("quantity")

  const selectedProduct = useMemo(() => {
    return inventory.find((p) => p.id === productId)
  }, [productId, inventory])

  const availableQty = selectedProduct?.quantity || 0
  const price = selectedProduct?.price || 0
  const total = quantity * price

  const onSubmit = async (data) => {
    const rep = representatives.find(
      (r) => r.id === data.representativeId
    )

    await createNewOrder({
      customerName: data.customerName,
      phone: data.phone,

      representativeId: rep.id,
      representativeName: rep.nameAr,

      productId: selectedProduct.id,
      productName: selectedProduct.name,
      price,
      quantity: data.quantity,
      totalPrice: total,
    })

    alert("تم إضافة الطلب")
    form.reset()
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Customer */}
      <Input placeholder="اسم العميل" {...form.register("customerName")} />
      <Input placeholder="رقم الهاتف" {...form.register("phone")} />

      {/* Representative */}
      <Select onValueChange={(v) => form.setValue("representativeId", v)}>
        <SelectTrigger>
          <SelectValue placeholder="اختر المندوب" />
        </SelectTrigger>
        <SelectContent>
          {representatives.map((r) => (
            <SelectItem key={r.id} value={r.id}>
              {r.nameAr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Product */}
      <Select onValueChange={(v) => form.setValue("productId", v)}>
        <SelectTrigger>
          <SelectValue placeholder="اختر المنتج" />
        </SelectTrigger>
        <SelectContent>
          {inventory.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Quantity */}
      <Input
        type="number"
        {...form.register("quantity")}
        placeholder="الكمية"
      />

      {selectedProduct && (
        <div className="col-span-2 text-sm text-muted-foreground">
          المتاح في المخزن: {availableQty} | السعر: {price} | الإجمالي:{" "}
          {total}
        </div>
      )}

      {quantity > availableQty && (
        <p className="col-span-2 text-red-500 text-sm">
          الكمية المطلوبة أكبر من المتاح في المخزن
        </p>
      )}

      <div className="col-span-2">
        <Button type="submit" className="w-full">
          حفظ الطلب
        </Button>
      </div>
    </form>
  )
}