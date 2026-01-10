import { collection, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function listenToRepresentatives(callback) {
  return onSnapshot(
    collection(db, "representative"),
    (snap) => {
      const reps = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(reps)
    }
  )
}