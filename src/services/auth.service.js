import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;
  const token = await user.getIdToken();

  return {
    user: {
      uid: user.uid,
      email: user.email,
    },
    token,
  };
};