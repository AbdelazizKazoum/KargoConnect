// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Kargo Connect",
      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // IMPORTANT: Add your user lookup and validation logic here.
        // This is just a placeholder.
        // You should query your database to find a user with the provided email
        // and then verify the password.
        console.log("Attempting to authorize:", credentials.email);

        // Example user object. In a real app, this would come from your database.
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        // Replace this with your actual password verification logic
        const isValid = user.email === credentials.email; // Placeholder validation

        if (isValid) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          console.error("Authentication failed for user:", credentials.email);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // A custom sign-in page
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the user id and other details to the token right after signin
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like user id from the token
      if (session.user) {
        session.user.id = token.id;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // You must provide a secret for production.
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Export handlers for GET and POST requests
export { handler as GET, handler as POST };
