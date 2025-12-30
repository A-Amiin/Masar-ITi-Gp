import {
  collection,
  doc,
  writeBatch,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

/* ================= Add Representative ================= */
export async function addRepresentative(data) {
  const batch = writeBatch(db)

  const userRef = doc(collection(db, "users"))
  const repRef = doc(collection(db, "representative"), userRef.id)

  batch.set(userRef, {
    email: data.email || null,
    role: "representative",
    isActive: true,
    createdAt: serverTimestamp(),
  })

  batch.set(repRef, {
    nameAr: data.nameAr,
    nameEn: data.nameEn,
    phone: data.phone,
    email: data.email || null,
    governorateAr: data.governorateAr,
    governorateEn: data.governorateEn,
    customersCount: data.customersCount,
    ordersCount: data.ordersCount,
    userId: userRef.id,
    createdAt: serverTimestamp(),
  })

  await batch.commit()
}

/* ================= Listen ================= */
export function listenToAgents(callback) {
  const q = query(
    collection(db, "representative"),
    orderBy("createdAt", "desc")
  )

  return onSnapshot(q, (snapshot) => {
    const reps = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(reps)
  })
}

/* ================= Update ================= */
export async function updateAgent(agentId, data) {
  const ref = doc(db, "representative", agentId)

  await updateDoc(ref, {
    phone: data.phone,
    email: data.email,
    governorateAr: data.governorateAr,
    governorateEn: data.governorateEn,
    updatedAt: serverTimestamp(),
  })
}

/* ================= Delete ================= */
export async function deleteAgent(agentId) {
  const repRef = doc(db, "representative", agentId)
  await deleteDoc(repRef)
}

