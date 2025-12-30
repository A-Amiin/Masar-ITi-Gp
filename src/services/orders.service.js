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
 * ===============================
 *
 * ملاحظات مهمة:
 * - اسم الـ collection لازم يكون "orders"
 * - لازم كل order يكون عنده createdAt
 * - الكود متغلف try/catch علشان أي Error يبان
 */

export function listenToOrders(callback) {
  try {
    // ⚠️ لو عندك Orders قديمة من غير createdAt
    // استخدم query بدون orderBy مؤقتًا
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    )

    return onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        callback(orders)
      },
      (error) => {
        console.error("🔥 Firestore onSnapshot error:", error)
      }
    )
  } catch (error) {
    console.error("🔥 listenToOrders error:", error)
  }
}
