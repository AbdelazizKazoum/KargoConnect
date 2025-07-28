// types/next-auth.d.ts

import "next-auth";
import { DefaultSession } from "next-auth";

// Extend the built-in User type
declare module "next-auth" {
  interface User {
    id: string;
    apiToken?: string; // Token returned from the credentials provider
  }

  interface Session {
    accessToken?: string; // Custom token from JWT
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Add user ID to the token
    apiToken?: string; // Add apiToken to the token
  }
}
