// app/public/profile/[id]/page.tsx

import { notFound } from "next/navigation";
import SenderDashboardPage from "@/views/SenderDashboardPage";
import TransporterDashboardPage from "@/views/TransporterDashboardPage";
import axiosServer from "@/lib/axiosServer";
import { User } from "next-auth";

// ✅ API call using Axios
async function fetchUserById(id: string): Promise<User | null> {
  try {
    const res = await axiosServer.get(`/users/${id}/public-profile`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user by ID:", error);
    return null;
  }
}

// ✅ SEO metadata generation
export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await fetchUserById(params.id);
  console.log("🚀 ~ generateMetadata ~ user:", user);

  if (!user) {
    return {
      title: "User not found",
      description: "This profile is not available.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${user.name}'s Profile`,
    description: `Public profile of ${user.name}, a ${user.role}`,
  };
}

// ✅ Page component
export default async function PublicProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await fetchUserById(params.id);

  if (!user) {
    return notFound();
  }

  if (user.role === "sender") {
    return <SenderDashboardPage isOwnerView={false} />;
  }

  if (user.role === "transporter") {
    return <TransporterDashboardPage isOwnerView={false} />;
  }

  return <div>Unknown user role</div>;
}
