import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export const useAdminUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        setLoading(false)
        return
      }

      console.log("AUTH UID:", firebaseUser.uid)

      const q = query(
        collection(db, "users"),
        where("user_Id", "==", firebaseUser.uid)
      )

      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        console.log("NO USER DOC FOUND")
        setUser(null)
        setLoading(false)
        return
      }

      const data = snapshot.docs[0].data()

      if (data.role !== "admin") {
        console.log("NOT ADMIN")
        setUser(null)
        setLoading(false)
        return
      }

      setUser({
        uid: firebaseUser.uid,
        user_Id: data.user_Id,
        email: data.email,
        nameAr: data.nameAr,
        nameEn: data.nameEn,
        phone: data.phone,
        role: data.role,
        createdAt: data.createdAt,
      })

      setLoading(false)
    })

    return () => unsub()
  }, [])

  return { user, loading }
}