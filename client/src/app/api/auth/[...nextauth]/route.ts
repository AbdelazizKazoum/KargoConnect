import NextAuth from "next-auth";
import authOptions from "@/lib/auth"; // default export or named export depending on how you change auth.ts

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
