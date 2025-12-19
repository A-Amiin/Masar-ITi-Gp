import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const INVENTORY_COLLECTION = "inventory";
const inventoryRef = collection(db, INVENTORY_COLLECTION);


export const addInventoryProduct = async (product) => {
  return addDoc(inventoryRef, {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: null,
  });
};

export const subscribeToInventory = (setProducts) => {
  const q = query(inventoryRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(data);
  });
};


export const subscribeToInventoryWithFilters = (
  filters,
  setProducts
) => {
  const q = query(inventoryRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    let data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      data = data.filter((p) =>
        p.nameAr?.toLowerCase().includes(keyword)
      );
    }

    if (filters.discount === "withDiscount") {
      data = data.filter((p) => p.hasDiscount === true);
    }

    if (filters.discount === "noDiscount") {
      data = data.filter((p) => p.hasDiscount === false);
    }


    if (filters.stock === "available") {
      data = data.filter((p) => p.status === "متوفر");
    }

    if (filters.stock === "low") {
      data = data.filter((p) => p.status === "نفد تقريبًا");
    }

    if (filters.stock === "out") {
      data = data.filter((p) => p.status === "غير متوفر");
    }

    setProducts(data);
  });
};

export const updateInventoryProduct = async (id, data) => {
  const ref = doc(db, INVENTORY_COLLECTION, id);
  return updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteInventoryProduct = async (id) => {
  const ref = doc(db, INVENTORY_COLLECTION, id);
  return deleteDoc(ref);
};
