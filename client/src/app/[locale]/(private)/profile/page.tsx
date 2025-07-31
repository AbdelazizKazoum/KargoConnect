import React from "react";
import TransporterDashboardPage from "@/views/TransporterDashboardPage";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import SenderDashboardPage from "@/views/SenderDashboardPage";

export default async function App() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ App ~ session:", session);

  if (!session) {
    return <div>Unauthorized</div>; // Or redirect, or show a login button
  }

  const userRole = session.user?.role;

  if (userRole === "sender") {
    // If user is a sender, render TransporterDashboardPage in a sender view
    return (
      <div className="bg-background">
        <SenderDashboardPage isOwnerView={true} />
      </div>
    );
  }

  if (userRole === "transporter") {
    // If user is a transporter, render TransporterDashboardPage in owner view
    return (
      <div className="bg-background">
        <TransporterDashboardPage isOwnerView={true} />
      </div>
    );
  }

  // Optional: Handle other roles
  return <div>Unauthorized role</div>;
}
