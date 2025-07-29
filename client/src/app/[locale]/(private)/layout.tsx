import Header from "@/components/layout/Header";
import React from "react";
import AuthProvider from "@/providers/AuthProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <Header state="private" />
        <div>{children}</div>
      </AuthProvider>
    </>
  );
}
