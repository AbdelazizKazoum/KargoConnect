// components/AuthProvider.jsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  // The SessionProvider component provides session state to all components in the tree.
  return <SessionProvider>{children}</SessionProvider>;
}
