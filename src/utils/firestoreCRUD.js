import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, setDoc } from "firebase/firestore";

export const firestoreCRUD = (collectionName) => ({
  addItem: async (data) => {
    const colRef = collection(db, collectionName);

    if (
      collectionName === "users" &&
      data.role === "representative" &&
      data.user_Id
    ) {
      const { user_Id, ...rest } = data;

      const docRef = doc(db, collectionName, user_Id);

      await setDoc(docRef, {
        ...rest,
        user_Id: user_Id, 
      });

      return user_Id;
    }

    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: new Date(),
    });

    return docRef.id;
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

    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  },
  getItemById: async (id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  },
});