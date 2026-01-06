import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"

export const useUnreadNotifications = (collectionName) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!collectionName) return

    const q = query(
      collection(db, collectionName),
      where("isRead", "==", false),
      orderBy("createdAt", "desc")
    )

    const unsub = onSnapshot(q, (snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
      setLoading(false)
    })

    return () => unsub()
  }, [collectionName])

  return {
    items,
    loading,
    count: items.length,
  }
}