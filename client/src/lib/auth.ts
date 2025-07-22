// auth.ts

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/lib/env"; // Import the validated env object

export const { handlers, signIn, signOut, auth } = NextAuth({
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
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          // 1. Call your external API's login endpoint
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

          if (!res.ok) {
            // If the API returns an error (e.g., 401 Unauthorized), return null
            console.error("API login failed:", await res.text());
            return null;
          }

          // 2. Parse the response
          const data = await res.json();
          // Your API should return the user object and a JWT token
          // e.g., { user: { id: 1, name: 'John Doe', email: '...' }, token: '...' }

          // 3. Return an object that includes both user data and the token
          if (data && data.user && data.token) {
            return {
              ...data.user,
              apiToken: data.token, // Pass the token to the JWT callback
            };
          }

          // Return null if authentication failed
          return null;
        } catch (error) {
          console.error("Error in authorize callback:", error);
          return null;
        }
      },
    }),
  ],
  secret: env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // This callback is called whenever a JWT is created or updated.
    async jwt({ token, user }) {
      // The `user` object is what's returned from the `authorize` callback.
      // On the initial sign-in, we pass the `apiToken` to the JWT.
      if (user) {
        token.apiToken = user.apiToken;
        token.id = user.id;
      }
      return token;
    },
    // This callback is called whenever a session is checked.
    async session({ session, token }) {
      // We pass the `apiToken` and `userId` from the JWT to the session object.
      // This makes it available on the client-side.
      if (token) {
        session.accessToken = token.apiToken as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
