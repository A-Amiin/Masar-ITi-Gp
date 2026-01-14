import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  where,
  serverTimestamp,
  addDoc
} from "firebase/firestore"
import { db } from "@/lib/firebase"

/* ===============================
   Resolve agent name (SMART)
================================ */
async function resolveAgentName(representativeId) {
  if (!representativeId) return "غير معروف"

  // 1️⃣ Try direct documentId
  const directRef = doc(db, "representative", representativeId)
  const directSnap = await getDoc(directRef)

  if (directSnap.exists()) {
    return directSnap.data().nameAr || "غير معروف"
  }

  // 2️⃣ Fallback → search by userId
  const q = query(
    collection(db, "representative"),
    where("userId", "==", representativeId)
  )

  const snap = await getDocs(q)
  if (!snap.empty) {
    return snap.docs[0].data().nameAr || "غير معروف"
  }

  return "غير معروف"
}

/* ===============================
   Listen To New Orders (FROM MOBILE)
================================ */
export function listenToNewOrders(callback) {
  const q = query(
    collection(db, "new_order"),
    orderBy("createdAt", "desc")
  )

  return onSnapshot(q, async (snapshot) => {
    const orders = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data()

        // ===== Customer =====
        const customerName = data.customer?.name || ""
        const customerPhone = data.customer?.phone || ""

        // ===== Product =====
        const products = Array.isArray(data.products) ? data.products : []
        const product = products.length > 0 ? products[0] : {}

        const productName = product.name || ""
        const price = Number(product.price) || 0
        const quantity = Number(product.quantity) || 0

        // 🔥 FIX: representativeId from ROOT (not from product)
        const representativeId = data.representativeId || ""

        // ===== Agent =====
        const agentName = await resolveAgentName(representativeId)

        return {
          id: docSnap.id,

          customerName,
          customerPhone,

          productName,
          price,
          quantity,

          agentId: representativeId,
          agentName,

          status: product.status || data.status || "",
          totalPrice: Number(data.totalPrice) || price * quantity,

          createdAt: data.createdAt || null,
        }
      })
    )

    callback(orders)
  })
}

/* ===============================
   Update Status (Admin confirm)
   Moves to orders
================================ */
export async function updateOrderStatus(orderId, newStatus) {
  const ref = doc(db, "new_order", orderId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return

  const data = snap.data()

  // ===== Customer =====
  const customerName = data.customer?.name || ""
  const customerPhone = data.customer?.phone || ""

  // ===== Product =====
  const products = Array.isArray(data.products) ? data.products : []
  const product = products.length > 0 ? products[0] : {}

  const productName = product.name || ""
  const price = Number(product.price) || 0
  const quantity = Number(product.quantity) || 0
  const totalPrice = Number(data.totalPrice) || price * quantity

  // 🔥 FIX: representativeId from ROOT
  const representativeId = data.representativeId || ""

  // ===== Agent =====
  const agentName = await resolveAgentName(representativeId)

  // ===== Move to orders =====
  await addDoc(collection(db, "orders"), {
    orderNumber: "ORD-" + Date.now(),

    customerName,
    customerPhone,

    agentId: representativeId,
    agentName,

    productName,
    price,
    quantity,
    totalPrice,

    status: newStatus,
    createdAt: serverTimestamp(),
  })

  // ===== Delete from new_order =====
  await deleteDoc(ref)
}

/* ===============================
   Delete
================================ */
export async function deleteNewOrder(orderId) {
  return deleteDoc(doc(db, "new_order", orderId))
}