import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

export const firestoreCRUD = (collectionName) => ({
  addItem: async (data) => {
    const colRef = collection(db, collectionName);
    await addDoc(colRef, data);
  },
  updateItem: async (id, data) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
  },
  deleteItem: async (id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },
  getItems: async () => {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  getItemById: async (id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("No such document!");
    }
  },
});