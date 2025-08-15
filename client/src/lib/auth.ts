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
            // the backend returns user details along with tokens
            return {
              id: credentials.email, // or fetch the actual user ID
              email: credentials.email,
              username: data.user.username || credentials.email.split("@")[0], // Fallback to email prefix
              firstName: data.user.firstName || "",
              lastName: data.user.lastName || "",
              image: data.user.image || "",
              // Include any other fields you need
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
    // 1) On OAuth sign-in, ask Nest if the user exists / is complete
    async signIn({ user, account, profile }) {
      // Call your NestJS backend to handle linking or account creation
      const res = await fetch(`${env.EXTERNAL_API_URL}/auth/oauth-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: account?.provider,
          providerId: account?.providerAccountId,
          email: user.email,
          name: user.name,
          first_name: profile?.given_name,
          last_name: profile?.family_name,
          image: user.image,
        }),
      });

      const data = await res.json();
      console.log("🚀 ~ signIn ~ data:", data);

      if (!res.ok) return false;

      // Attach backend response to the session token
      user.backendToken = data.token;

      user.role = data.user.role;
      user.id = data.user.id; // Ensure user ID is set from backend
      user.firstName = data.user.firstName || "";
      user.lastName = data.user.lastName || "";
      user.image = data.user.image || "";

      return true;
    },

    //-------------------------------------------------------------------------------------

    async jwt({ token, user }) {
      console.log("🚀 ~ jwt ~ user:", user);

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.firsName = user.firstName;
        token.lastName = user.lastName;
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
