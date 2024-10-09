// app/AuthProvider.js
"use client"; // Ensure this file is a client component
import Main from "@/components/Main/Main";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <Main>{children}</Main>
    </SessionProvider>
  );
}
