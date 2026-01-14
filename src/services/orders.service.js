import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc
} from "firebase/firestore"
import { db } from "@/lib/firebase"

/**
 * ===============================
 * Real-time listener for Orders
 * WITH agent name from ROOT representativeId
 * ===============================
 */

export function listenToOrders(callback) {
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  )

  return onSnapshot(q, async (snapshot) => {
    const orders = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data()

        // ===== CUSTOMER =====
        const customerName = data.customer?.name || data.customerName || ""

        // ===== REPRESENTATIVE (FROM ROOT 🔥) =====
        const representativeId = data.representativeId || data.agentId || ""

        let agentName = "غير معروف"
        if (representativeId) {
          const repSnap = await getDoc(
            doc(db, "representative", representativeId)
          )
          if (repSnap.exists()) {
            agentName = repSnap.data().nameAr || "غير معروف"
          }
        }

        // ===== PRICE =====
        const amount = Number(data.totalPrice) || Number(data.amount) || 0

        return {
          id: docSnap.id,

          orderNumber: docSnap.id,
          customerName,

          agentId: representativeId,
          agentName,

          status: mapOrderStatus(data.status),
          createdAt: data.createdAt || null,

          amount,
        }
      })
    )

    callback(orders)
  })
}

/* ===============================
   Helpers
================================ */
function mapOrderStatus(status) {
  switch (status) {
    case "assigned":
      return "warehouse"
    case "on_the_way":
      return "on_the_way"
    case "delivered":
      return "delivered"
    case "processing":
      return "processing"
    case "returned":
      return "returned"
    case "cancelled":
      return "cancelled"
    default:
      return "warehouse"
  }
}