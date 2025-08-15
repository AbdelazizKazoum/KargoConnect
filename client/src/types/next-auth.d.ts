import "next-auth";
import {
  DefaultSession,
  DefaultUser,
  Account,
  Profile as NextAuthProfile,
} from "next-auth";

// Extend the default Profile type to include Google fields
declare module "next-auth" {
  // This will replace the default Profile type inside callbacks
  interface Profile extends NextAuthProfile {
    given_name?: string;
    family_name?: string;
    email_verified?: boolean;
    picture?: string;
  }

  interface User extends DefaultUser {
    id: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    email?: string;
    image?: string;

    accessToken?: string;
    refreshToken?: string;
    backendToken?: string;

    account?: Account;
    profile?: Profile;
  }

  interface Session {
    accessToken?: string;
    refreshToken?: string;
    account?: Account;
    profile?: Profile;

    user: {
      id?: string;
      username?: string;
      role?: string;
      email?: string;
      image?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    role?: string;
    email?: string;
    picture?: string;

    accessToken?: string;
    refreshToken?: string;
    backendToken?: string;

    account?: Account;
    profile?: Profile;
  }
}
