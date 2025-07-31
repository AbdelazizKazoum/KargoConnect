"use client";
import AccountSettingsView from "@/components/profile/transporter/AccountSettingsView";
import BookingsView from "@/components/profile/transporter/BookingsView";
import OffersView from "@/components/profile/transporter/OffersView";
import PublicProfileView from "@/components/profile/transporter/PublicProfileView";
import TripsView from "@/components/profile/transporter/TripsView";
import { Button } from "@/components/ui";
import StatItem from "@/components/ui/StatItem";
import { transporterData } from "@/db/data";
import {
  Camera,
  CheckCircle,
  CircleDollarSign,
  Star,
  Truck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

type DashboardTab = "settings" | "trips" | "offers" | "bookings";

const TransporterDashboardPage = ({
  isOwnerView = true,
}: {
  isOwnerView?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("settings");
  const [coverUrl, setCoverUrl] = useState(transporterData.coverUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverUrl(URL.createObjectURL(file));
    }
  };

  const renderContent = () => {
    if (!isOwnerView) {
      return <PublicProfileView user={transporterData} />;
    }

    switch (activeTab) {
      case "settings":
        return <AccountSettingsView user={transporterData} />;
      case "trips":
        return <TripsView trips={transporterData.trips} />;
      case "offers":
        return <OffersView offers={transporterData.offers} />;
      case "bookings":
        return <BookingsView bookings={transporterData.bookings} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-secondary/50 min-h-screen pt-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-48 md:h-64 rounded-xl bg-card border relative">
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover rounded-xl"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
          {isOwnerView && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={handleChangeCoverClick}
            >
              <Camera className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
              {t("changeCover")}
            </Button>
          )}
        </div>

        <div className="w-full lg:w-[95%] mx-auto">
          <div className="relative -mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="bg-card p-6 rounded-xl border shadow-sm text-center sticky top-24">
                <img
                  src={transporterData.avatarUrl}
                  alt={transporterData.name}
                  className="h-24 w-24 rounded-full mx-auto border-4 border-background"
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
                  {isOwnerView && (
                    <StatItem
                      icon={<CircleDollarSign className="h-full w-full" />}
                      label={t("stats.earnings")}
                      value={`${transporterData.totalEarnings}`}
                    />
                  )}
                </div>
                {isOwnerView ? (
                  <Button variant="outline" className="w-full mt-6">
                    {t("viewPublicProfile")}
                  </Button>
                ) : (
                  <Button className="w-full mt-6">{t("sendMessage")}</Button>
                )}
              </div>
            </aside>

            <div className="lg:col-span-8 xl:col-span-9 space-y-6 w-full">
              <div className="bg-card border rounded-xl shadow-sm w-full">
                {isOwnerView && (
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
                )}
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
