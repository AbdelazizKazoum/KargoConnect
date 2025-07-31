// lib/auth.ts (for NextAuth v4)
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/lib/env"; // Your env variables
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) return null;

        try {
          const res = await fetch(
            `${process.env.EXTERNAL_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) return null;

          const data = await res.json();

          if (data && data.access_token) {
            // Fake a user object (or fetch user info separately if needed)
            return {
              id: credentials.email, // or fetch the actual user ID
              email: credentials.email,
              username: data.user.username || credentials.email.split("@")[0], // Fallback to email prefix
              role: data.user.role || "user", // Default role
              accessToken: data.access_token, // Include access token in user object
              refreshToken: data.refresh_token, // Include refresh token if available
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  // Custom sign-in page
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;
      session.user.email = token.email;

      return session;
    },
  },
};

export default authOptions;
