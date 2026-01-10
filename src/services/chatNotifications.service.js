import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

/**
 * Notifications للأدمن
 * أي شات آخر رسالة فيه مش من الأدمن
 */
export function listenToChatNotifications(adminId, callback) {
  const q = query(
    collection(db, "chats"),
    where("lastSenderId", "!=", adminId)
  )

  return onSnapshot(q, (snap) => {
    const notifications = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    callback(notifications)
  })
}