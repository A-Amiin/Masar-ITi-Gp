import { Card } from "@/components/ui/card"

export default function OrdersTable({ orders }) {
  return (
    <Card className="p-0 overflow-hidden">
      <table className="w-full text-right text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3">رقم الطلب</th>
            <th className="p-3">العميل</th>
            <th className="p-3">المندوب</th>
            <th className="p-3">المبلغ</th>
            <th className="p-3">التاريخ</th>
            <th className="p-3">الحالة</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" className="p-6 text-center text-muted-foreground">
                لا توجد طلبات
              </td>
            </tr>
          )}

          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.orderNumber}</td>
              <td className="p-3">{order.customerName}</td>
              <td className="p-3">{order.agentName}</td>
              <td className="p-3">{order.amount} جنيه</td>
              <td className="p-3">
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleDateString("ar-EG")
                  : "-"}
              </td>
              <td className="p-3">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}