import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export const useAdminUser = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
console.log(user)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        setLoading(false)
        return
      }

      const ref = doc(db, "users", firebaseUser.uid)
      const snap = await getDoc(ref)

      if (snap.exists() && snap.data().user_type === "admin") {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: snap.data().name,
          avatar: snap.data().avatar,
        })
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => unsub()
  }, [])

  return { user, loading }
}