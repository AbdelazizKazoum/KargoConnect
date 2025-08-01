export interface BaseUser {
  id: string;
  username?: string; // Optional username field
  firstName?: string; // Optional first name field
  lastName?: string; // Optional last name field
  identity_number?: string; // Optional identity number field
  email?: string; // Optional email field
  bio?: string;
  phone?: string; // Optional phone number field
  role: "admin" | "user" | "transporter" | "sender";

  verified?: boolean; // Optional verified field

  country?: string; // Optional country field
  city?: string; // Optional city field
  address?: string; // Optional address field

  image?: string;
  coverUrl?: string; // Optional cover URL

  rating?: number; // Optional rating field
}

export interface PublicProfile extends BaseUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  demands?: Array<any>; // Optional demands array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookings?: Array<any>; // Optional bookings array
}

export interface PrivateProfile extends BaseUser {
  isActive?: boolean; // Optional active status field
  phone?: string;

  isEmailVerified?: boolean; // Optional email verification status field
  isPhoneVerified?: boolean; // Optional phone verification status field
  isProfileComplete?: boolean; // Optional profile completion status field
  isTwoFactorEnabled?: boolean; // Optional two-factor authentication status field

  createdAt?: string;
  updatedAt?: string;
  // and more sensitive info
}
