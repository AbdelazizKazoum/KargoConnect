import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import authOptions from "@/lib/auth";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  // Fetch fresh user from your backend
  const response = await fetch(
    `${process.env.EXTERNAL_API_URL}/users/${token.id}`
  );
  const user = await response.json();

  // Update the session token values
  token.isProfileComplete = user.isProfileComplete;
  token.firstName = user.firstName;
  token.lastName = user.lastName;
  token.role = user.role;

  res.json(token); // 👈 This will be merged into session client-side
}
