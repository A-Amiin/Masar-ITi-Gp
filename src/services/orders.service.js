import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

/**
 * ===============================
 * Real-time listener for Orders
 * WITH representative name join
 * ===============================
 */

export function listenToOrders(callback) {
  let representativesMap = {}

  // 1️⃣ Listen to representatives
  const unsubscribeReps = onSnapshot(
    collection(db, "representative"),
    (repSnap) => {
      representativesMap = {}

      repSnap.docs.forEach((doc) => {
        representativesMap[doc.id] = doc.data()
      })
    }
  )

  // 2️⃣ Listen to orders
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  )

  const unsubscribeOrders = onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => {
        const data = doc.data()
        const rep = representativesMap[data.representativeId]

        return {
          id: doc.id,

          // ===== UI FIELDS =====
          orderNumber: doc.id,
          customerName: data.customer?.name || "",

          agentId: data.representativeId || "",
          agentName: rep?.nameAr || "غير معروف",

          status: mapOrderStatus(data.status),
          createdAt: data.createdAt || null,

          amount: data.totalPrice || 0,
        }
      })

      callback(orders)
    },
    (error) => {
      console.error("🔥 listenToOrders error:", error)
    }
  )

  // 3️⃣ Return combined unsubscribe
  return () => {
    unsubscribeOrders()
    unsubscribeReps()
  }
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