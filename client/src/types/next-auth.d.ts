import "next-auth";
import { DefaultSession } from "next-auth";

// Extend the built-in User type
declare module "next-auth" {
  interface User {
    id: string;
    username?: string; // Optional username field
    role?: string; // Optional role field
    email?: string; // Optional email field
    image?: string; // Optional image field

    accessToken?: string; // Token returned from the credentials provider
    refreshToken?: string; // Optional refresh token field
  }

  interface Session {
    accessToken?: string; // Custom token from JWT
    user: {
      id?: string;
      accessToken?: string; // Include access token in session
      username?: string; // Optional username field
      role?: string; // Optional role field
      email?: string; // Optional email field
    } & DefaultSession["user"];
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Add user ID to the token
    accessToken?: string; // Add apiToken to the token
    username?: string; // Optional username field
    role?: string; // Optional role field
    email?: string; // Optional email field
  }
}
