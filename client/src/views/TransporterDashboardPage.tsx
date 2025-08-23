"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Camera,
  CheckCircle,
  CircleDollarSign,
  Star,
  Truck,
} from "lucide-react";

import AccountSettingsView from "@/components/profile/transporter/AccountSettingsView";
import BookingsView from "@/components/profile/transporter/BookingsView";
import OffersView from "@/components/profile/transporter/OffersView";
import TripsView from "@/components/profile/transporter/TripsView";
import StatItem from "@/components/ui/StatItem";
import { Button } from "@/components/ui";
import { transporterData } from "@/db/data";
import Image from "next/image";
import { PrivateProfile } from "@/types/user";
import { useUserStore } from "@/stores/userStore";
import { toast } from "react-toastify";
type DashboardTab = "settings" | "trips" | "offers" | "bookings";

const TransporterDashboardPage = ({ user }: { user: PrivateProfile }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("settings");
  const [coverUrl, setCoverUrl] = useState(
    user.coverUrl || transporterData.coverUrl
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setCover } = useUserStore();
  const t = useTranslations("profile.transporter");

  const navItems = [
    { id: "settings", label: t("nav.settings") },
    { id: "trips", label: t("nav.trips") },
    { id: "offers", label: t("nav.offers") },
    { id: "bookings", label: t("nav.bookings") },
  ];

  const handleChangeCoverClick = () => {
    fileInputRef.current?.click();
  };

  const handleCoverChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    setCoverUrl(URL.createObjectURL(file));

    // Prepare FormData
    const formData = new FormData();
    formData.append("cover", file);

    try {
      await setCover(user.id, formData);
      // Optional: If backend returns updated user with coverUrl
      // if (updatedUser?.coverUrl) {
      //   setCoverUrl(updatedUser.coverUrl);
      // }
    } catch (error) {
      toast.error(t("error.coverUpdateFailed"));
      console.error("Error updating cover:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "settings":
        return <AccountSettingsView user={user} />;
      case "trips":
        return <TripsView trips={user.trips} />;
      case "offers":
        return <OffersView offers={user.demands} />;
      case "bookings":
        return <BookingsView bookings={user.bookings} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-secondary/50 min-h-screen pt-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover */}
        <div className="h-48 md:h-64 rounded-xl bg-card border relative">
          <Image
            src={coverUrl || "/default-cover.jpg"}
            alt="Cover"
            fill
            className="w-full h-full object-cover rounded-xl"
            style={{ objectFit: "cover", borderRadius: "inherit" }}
            priority
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCoverChange}
            className="hidden"
            accept="image/*"
          />
          <div className="absolute inset-0 bg-black/20 rounded-xl" />
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4"
            onClick={handleChangeCoverClick}
          >
            <Camera className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
            {t("changeCover")}
          </Button>
        </div>

        {/* Content */}
        <div className="w-full lg:w-[95%] mx-auto">
          <div className="relative -mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="bg-card p-6 rounded-xl border shadow-sm text-center sticky top-24">
                <Image
                  src={user.image || "/default-avatar.jpg"}
                  alt={user.firstName || "مستخدم"}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full mx-auto border-4 border-background"
                  priority
                />
                <h2 className="font-bold text-xl mt-3">
                  {transporterData.name}
                </h2>
                <p className="text-sm text-muted-foreground">{t("role")}</p>

                {transporterData.verified && (
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    <span>{t("verified")}</span>
                  </div>
                )}

                <div className="mt-4 flex justify-center gap-2 text-sm">
                  <StatItem
                    icon={<Star className="h-full w-full" />}
                    label={t("stats.rating")}
                    value={transporterData.rating}
                  />
                  <StatItem
                    icon={<Truck className="h-full w-full" />}
                    label={t("stats.trips")}
                    value={transporterData.tripsCompleted}
                  />
                  <StatItem
                    icon={<CircleDollarSign className="h-full w-full" />}
                    label={t("stats.earnings")}
                    value={`${transporterData.totalEarnings}`}
                  />
                </div>

                <Button variant="outline" className="w-full mt-6">
                  {t("viewPublicProfile")}
                </Button>
              </div>
            </aside>

            {/* Main Panel */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6 w-full">
              <div className="bg-card border rounded-xl shadow-sm w-full">
                {/* Navigation Tabs */}
                <nav className="flex flex-wrap items-center border-b px-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as DashboardTab)}
                      className={`px-4 py-3 text-sm font-medium transition-colors relative border-b-2 ${
                        activeTab === item.id
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Tab Content */}
                <div className="p-6 w-full">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransporterDashboardPage;
