import Header from "@/components/layout/Header";
import AuthProvider from "@/providers/AuthProvider";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <Header state="auth" />
        <div>{children}</div>
      </AuthProvider>
    </>
  );
}
