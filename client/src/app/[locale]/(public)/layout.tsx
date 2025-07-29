import Header from "@/components/layout/Header";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ RootLayout ~ session:", session);

  return (
    <>
      <Header state="public" user={session?.user || null} />
      <div>{children}</div>
    </>
  );
}
