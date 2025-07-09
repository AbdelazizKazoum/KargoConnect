"use client";

import React, { useState } from "react";
import TransporterDashboardPage from "@/views/TransporterDashboardPage";

// --- Main Page Component ---

// --- App component to demonstrate both modes ---
export default function App() {
  const [isOwner, setIsOwner] = useState(true);

  return (
    <div className="bg-background">
      <TransporterDashboardPage isOwnerView={isOwner} />
    </div>
  );
}
