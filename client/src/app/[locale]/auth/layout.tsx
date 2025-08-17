import Header from "@/components/layout/Header";
import authOptions from "@/lib/auth";
import AuthProvider from "@/providers/AuthProvider";
import { getServerSession } from "next-auth";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <AuthProvider>
        <Header state="auth" user={session?.user || null} />

        <div>{children}</div>
      </AuthProvider>
    </>
  );
}
