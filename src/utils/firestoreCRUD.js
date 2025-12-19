import { db } from "@/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

export const addItem = async (data) => {
  const colRef = collection(db, "customers");
  await addDoc(colRef, data);
};

export const updateItem = async (id, data) => {
  const docRef = doc(db, "customers", id);
  await updateDoc(docRef, data);
};

export const deleteItem = async (id) => {
  const docRef = doc(db, "customers", id);
  await deleteDoc(docRef);
};

export const getItems = async () => {
  const colRef = collection(db, "customers");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};