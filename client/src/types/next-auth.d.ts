// types/next-auth.d.ts

import "next-auth";
// import { JWT } from "next-auth/jwt";

// Extend the built-in User type
declare module "next-auth" {
  interface User {
    id: string;
    apiToken?: string; // Add the apiToken property from the authorize callback
  }

  interface Session {
    accessToken: string; // Add your custom property to the session
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT {
    apiToken?: string; // Add the apiToken property to the JWT
  }
}
