"use client";

import { Car, MapPin, Package, Search, Zap } from "lucide-react";
import { useState } from "react";

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState("sender");

  const senderSteps = [
    {
      icon: (
        <Search className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />
      ),
      title: "1. Find a Trip",
      description:
        "Search for transporters heading to your desired destination.",
    },
    {
      icon: (
        <Package className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />
      ),
      title: "2. Book Your Space",
      description:
        "Send a booking request with your package details and wait for approval.",
    },
    {
      icon: (
        <MapPin className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />
      ),
      title: "3. Track Your Delivery",
      description:
        "Coordinate with your transporter and track your package in real-time.",
    },
  ];

  const transporterSteps = [
    {
      icon: (
        <Car className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />
      ),
      title: "1. Post Your Trip",
      description:
        "List your upcoming journey, destination, and available space.",
    },
    {
      icon: (
        <Package className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />
      ),
      title: "2. Approve Bookings",
      description: "Review and approve booking requests from senders.",
    },
    {
      icon: (
        <Zap className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />
      ),
      title: "3. Drive & Earn",
      description:
        "Complete your trip as usual and get paid securely after delivery.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-white dark:bg-slate-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            A Simpler Way to Ship
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Whether you&apos;re sending a package or driving a route, getting
            started is easy.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex justify-center border border-slate-200 dark:border-slate-800 rounded-full p-1 bg-slate-100 dark:bg-slate-900">
            <button
              onClick={() => setActiveTab("sender")}
              className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                activeTab === "sender"
                  ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-50"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              I&apos;m a Sender
            </button>
            <button
              onClick={() => setActiveTab("transporter")}
              className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                activeTab === "transporter"
                  ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-50"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              I&apos;m a Transporter
            </button>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {(activeTab === "sender" ? senderSteps : transporterSteps).map(
              (step, index) => (
                <div key={index}>
                  <div className="flex items-center justify-center h-20 w-20 mx-auto bg-slate-100 dark:bg-slate-800/50 rounded-full">
                    {step.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
