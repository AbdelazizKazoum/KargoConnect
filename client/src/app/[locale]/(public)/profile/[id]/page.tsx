// app/public/profile/[id]/page.tsx

import { notFound } from "next/navigation";
import axiosServer from "@/lib/axiosServer";
import { User } from "next-auth";
import PublicSenderDashboardPage from "@/views/PublicSenderDashboardPage";
import { PublicProfile } from "@/types/user";
import PublicTransporterDashboardPage from "@/views/PublicTransporterDashboardPage";

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
  const user = (await fetchUserById(params.id)) as PublicProfile;
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
    title: `${user.firstName} ${user.lastName}'s Profile`,
    description: `Public profile of ${user.firstName} ${user.lastName}, a ${user.role}`,
  };
}

// ✅ Page component
export default async function PublicProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = (await fetchUserById(params.id)) as PublicProfile;

  if (!user) {
    return notFound();
  }

  if (user.role === "sender") {
    return <PublicSenderDashboardPage user={user} />;
  }

  if (user.role === "transporter") {
    return <PublicTransporterDashboardPage user={user} />;
  }

  return <div>Unknown user role</div>;
}
