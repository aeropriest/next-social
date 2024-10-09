// utils/auth.js (optional)
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "@/utils/firebase"; // Adjust path as needed
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth();

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.email), {
      email,
      // Add other user properties if needed
    });

    return user;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed");
  }
};
