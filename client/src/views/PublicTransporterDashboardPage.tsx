// views/TransporterDashboardPage.tsx

import PublicProfileView from "@/components/profile/transporter/PublicProfileView";
import StatItem from "@/components/ui/StatItem";
import { Button } from "@/components/ui";
import { CheckCircle, Star, Truck } from "lucide-react";
import { PublicProfile } from "@/types/user";
import Image from "next/image";

type TransporterDashboardPageProps = {
  user: PublicProfile;
};

const PublicTransporterDashboardPage = ({
  user,
}: TransporterDashboardPageProps) => {
  return (
    <div className="bg-secondary/50 min-h-screen pt-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-48 md:h-64 rounded-xl bg-card border relative">
          {user.coverUrl ? (
            <Image
              src={user.coverUrl}
              alt="Cover"
              fill
              className="object-cover rounded-xl"
              style={{ borderRadius: "inherit" }}
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
              No Cover Image
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
        </div>

        <div className="w-full lg:w-[95%] mx-auto">
          <div className="relative -mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="bg-card p-6 rounded-xl border shadow-sm text-center sticky top-24">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.username || "User Avatar"}
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-full mx-auto border-4 border-background"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full mx-auto border-4 border-background bg-muted text-muted-foreground flex items-center justify-center">
                    N/A
                  </div>
                )}

                <h2 className="font-bold text-xl mt-3">{user.username}</h2>
                <p className="text-sm text-muted-foreground">Transporteur</p>

                {user.verified && (
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    <span>Vérifié</span>
                  </div>
                )}

                <div className="mt-4 flex justify-center gap-2 text-sm">
                  <StatItem
                    icon={<Star className="h-full w-full" />}
                    label="Note"
                    value={user.rating ?? "N/A"}
                  />
                  <StatItem
                    icon={<Truck className="h-full w-full" />}
                    label="Trajets"
                    value={"N/A"}
                  />
                </div>

                <Button className="w-full mt-6">
                  Contacter le transporteur
                </Button>
              </div>
            </aside>

            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              <div className="bg-card border rounded-xl shadow-sm p-6">
                <PublicProfileView user={user} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicTransporterDashboardPage;
