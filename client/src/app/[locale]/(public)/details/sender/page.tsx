"use client";

import ChatBox from "@/components/chat/ChatBox";
import OfferBox from "@/components/details/sender/OfferBox";
import PackageDetailsCard from "@/components/details/sender/PackageDetailsCard";
import SenderProfile from "@/components/details/sender/SenderProfile";
import { demandDetails } from "@/db/data";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function DemandDetailsPage() {
  const t = useTranslations("details.demand");

  return (
    <div className="bg-background min-h-screen pt-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Info Section */}
            <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1
                    dir="ltr"
                    className="text-3xl font-bold flex items-center flex-wrap gap-x-3 gap-y-1"
                  >
                    <span>{demandDetails.origin}</span>
                    <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{demandDetails.destination}</span>
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {t("reviewAndOffer")}
                  </p>
                </div>
                <div className="text-sm font-semibold bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full flex items-center gap-2 flex-shrink-0">
                  <Calendar className="h-4 w-4" />
                  {demandDetails.date}
                </div>
              </div>

              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground/50" />
                <p className="ml-4 text-muted-foreground">
                  {t("routePlaceholder")}
                </p>
              </div>
            </div>

            <PackageDetailsCard pkg={demandDetails.packageDetails} />

            <ChatBox
              initialChat={demandDetails.initialChat}
              currentUser="You"
              title={t("chatWithSender")}
            />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
            <OfferBox budget={demandDetails.budget} />
            <SenderProfile sender={demandDetails.sender} />
          </div>
        </div>
      </main>
    </div>
  );
}
