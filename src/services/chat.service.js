import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

/* ===============================
   Listen to messages
================================ */
export function listenToMessages(chatId, callback) {
  const q = query(
    collection(db, "chat", chatId, "messages"),
    orderBy("timestamp", "asc")
  )

  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(messages)
  })
}

/* ===============================
   Send message
================================ */
export async function sendMessage({
  chatId,
  senderId,
  content,
}) {
  await addDoc(
    collection(db, "chat", chatId, "messages"),
    {
      content,
      senderId,
      timestamp: serverTimestamp(),
    }
  )
}

/* ===============================
   🔔 Listen to chat notifications
================================ */
/**
 * logic:
 * - نسمع على collection chat
 * - نعتمد على lastMessage فقط
 * - لو senderId !== adminId → إشعار
 */
export function listenToChatNotifications(adminId, callback) {
  const q = query(
    collection(db, "chat"),
    orderBy("updatedAt", "desc")
  )

  return onSnapshot(q, (snap) => {
    const notifications = []

    snap.docs.forEach((doc) => {
      const data = doc.data()
      const lastMessage = data.lastMessage

      if (!lastMessage) return

      if (lastMessage.senderId !== adminId) {
        notifications.push({
          chatId: doc.id,
          representativeId: data.representativeId,
          representativeName: data.representativeName,
          content: lastMessage.content,
          timestamp: lastMessage.timestamp,
        })
      }
    })

    callback(notifications)
  })
}