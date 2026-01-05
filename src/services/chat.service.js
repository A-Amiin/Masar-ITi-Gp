import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

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
