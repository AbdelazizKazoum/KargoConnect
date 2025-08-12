/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseUser {
  id: number;
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

  vehicles?: Array<{
    id: string;
    type: string;
    plate_number: string;
    images?: string[];
  }>;
}

export interface review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

export interface PublicProfile extends BaseUser {
  demands?: Array<any>; // Optional demands array
  bookings?: Array<any>; // Optional bookings array
  trips?: Array<any>; // Optional trips array
  reviews: review[]; // Array of reviews
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

  demands?: Array<any>; // Optional demands array
  bookings?: Array<any>; // Optional bookings array
  trips?: Array<any>; // Optional trips array
  reviews: review[]; // Array of reviews

  // and more sensitive info
}
