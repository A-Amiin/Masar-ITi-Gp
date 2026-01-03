import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const customersRef = collection(db, "customers");

export const subscribeToCustomers = (setCustomers) => {
const q = query(customersRef);

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCustomers(data);
  });
};
