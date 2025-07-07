"use client";

import { ArrowRight, Calendar, MapPin } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import { tripDetails } from "@/db/data";
import BookingBox from "@/components/details/transporter/BookingBox";
import TransporterProfile from "@/components/details/transporter/TransporterProfile";
import ChatBox from "@/components/chat/ChatBox";

// --- Main Page Component ---

export default function TripDetailsPage() {
  const t = useTranslations("details.transporter");

  return (
    <div className="bg-background min-h-screen pt-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Info Section */}
            <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div dir="" className="">
                  <h1
                    dir="ltr"
                    className="text-3xl font-bold flex items-center flex-wrap gap-x-3 gap-y-1"
                  >
                    <span>{tripDetails.origin}</span>
                    <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{tripDetails.destination}</span>
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {t("reviewTrip")}
                  </p>
                </div>
                <div className="text-sm font-semibold bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full flex items-center gap-2 flex-shrink-0">
                  <Calendar className="h-4 w-4" />
                  {tripDetails.date}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground/50" />
                <p className="ml-4 text-muted-foreground">
                  {t("routeMapPlaceholder")}
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">{t("schedule")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="font-semibold text-base">
                      {t("pickupWindow")}
                    </p>
                    <p className="text-muted-foreground text-lg">
                      {tripDetails.pickupWindow}
                    </p>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="font-semibold text-base">
                      {t("deliveryWindow")}
                    </p>
                    <p className="text-muted-foreground text-lg">
                      {tripDetails.deliveryWindow}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Box */}
            <ChatBox
              initialChat={tripDetails.initialChat}
              currentUser="You"
              title={t("chatWithTransporter")}
            />
          </div>
          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
            <BookingBox
              price={tripDetails.price}
              fee={tripDetails.platformFee}
              total={tripDetails.totalPrice}
            />
            <TransporterProfile transporter={tripDetails.transporter} />
          </div>
        </div>
      </main>
    </div>
  );
}
