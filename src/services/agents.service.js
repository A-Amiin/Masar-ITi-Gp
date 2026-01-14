import {
  collection,
  doc,
  writeBatch,
  onSnapshot,
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

    governorateAr: data.governorateAr || "",
    governorateEn: data.governorateEn || "",

    customersCount: Number(data.customersCount) || 0,
    ordersCount: Number(data.ordersCount) || 0,

    userId: userRef.id,

    // 🔥 المناديب القدام ممكن ميكونش عندهم
    createdAt: data.createdAt || serverTimestamp(),
  })

  await batch.commit()
}

/* ================= Listen (ALL representatives 🔥🔥) ================= */
export function listenToAgents(callback) {
  return onSnapshot(collection(db, "representative"), (snapshot) => {
    const reps = snapshot.docs
      .map((doc) => {
        const data = doc.data()

        return {
          id: doc.id,
          ...data,

          // ✅ ضمان القيم
          customersCount: Number(data.customersCount) || 0,
          ordersCount: Number(data.ordersCount) || 0,
          governorateAr: data.governorateAr || "",
          governorateEn: data.governorateEn || "",
        }
      })
      // ✅ ترتيب في الكلاينت بدل Firestore
      .sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0
        const bTime = b.createdAt?.seconds || 0
        return bTime - aTime
      })

    callback(reps)
  })
}

/* ================= Update (SAFE MERGE) ================= */
export async function updateAgent(agentId, data) {
  const ref = doc(db, "representative", agentId)

  const payload = {
    updatedAt: serverTimestamp(),
  }

  if (data.nameAr !== undefined) payload.nameAr = data.nameAr
  if (data.phone !== undefined) payload.phone = data.phone
  if (data.governorateAr !== undefined) payload.governorateAr = data.governorateAr
  if (data.governorateEn !== undefined) payload.governorateEn = data.governorateEn

  await updateDoc(ref, payload)
}

/* ================= Delete ================= */
export async function deleteAgent(agentId) {
  await deleteDoc(doc(db, "representative", agentId))
}