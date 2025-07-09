"use client";

import React, { useState } from "react";
import SenderDashboardPage from "@/views/SenderDashboardPage";

// --- App component to demonstrate both modes ---
export default function Page() {
  const [isOwner] = useState(true);

  return (
    <div className="bg-background">
      <SenderDashboardPage isOwnerView={isOwner} />
    </div>
  );
}
