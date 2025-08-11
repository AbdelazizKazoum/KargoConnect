"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import TransporterDashboardPage from "@/views/TransporterDashboardPage";
import SenderDashboardPage from "@/views/SenderDashboardPage";
import { useUserStore } from "@/stores/userStore";
import { UserService } from "@/services/user/user.service";
import Loading from "@/components/loading/Loading";

export default function App() {
  const { data: session, status } = useSession();

  const user = useUserStore((state) => state.user);
  console.log("🚀 ~ App ~ user:", user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    async function loadUser() {
      try {
        const fetchedUser = await UserService.fetchUserProfile();

        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to load user", error);
      }
    }
    loadUser();
  }, [setUser]);

  // Show loading state while fetching session
  if (status === "loading" || !user) {
    return <Loading />;
  }

  // No session -> Unauthorized
  if (!session) {
    return <div>Unauthorized</div>;
  }

  const userRole = session.user?.role; // role should be on session.user

  if (userRole === "sender") {
    return (
      <div className="bg-background">
        <SenderDashboardPage />
      </div>
    );
  }

  if (userRole === "transporter") {
    return (
      <div className="bg-background">
        <TransporterDashboardPage user={user} />
      </div>
    );
  }

  return <div>Unauthorized role</div>;
}
