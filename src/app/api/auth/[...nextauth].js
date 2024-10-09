import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/utils/firebase"; // Adjust path as needed
import { doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Sign in with email and password
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return userCredential.user;
        } catch (error) {
          console.error("Login failed:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Save user data to Firestore on sign-in
      try {
        await setDoc(doc(db, "users", user.email), {
          email: user.email,
          // Add other user properties if needed
        });
      } catch (error) {
        console.error("Error saving user to Firestore:", error);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
