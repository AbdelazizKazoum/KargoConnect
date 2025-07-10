import Header from "@/components/layout/Header";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header state="public" />
      <div>{children}</div>
    </>
  );
}
