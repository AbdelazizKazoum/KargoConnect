// views/SenderDashboardPage.tsx

import PublicProfileView from "@/components/profile/sender/PublicProfileView";
import StatItem from "@/components/ui/StatItem";
import { CheckCircle, Package, Star } from "lucide-react";
import { Button } from "@/components/ui";
import { PublicProfile } from "@/types/user";

type SenderDashboardPageProps = {
  user: PublicProfile;
};

const SenderDashboardPage = ({ user }: SenderDashboardPageProps) => {
  return (
    <div className="bg-secondary/50 min-h-screen pt-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-48 md:h-64 rounded-xl bg-card border relative">
          {user.coverUrl ? (
            <img
              src={user.coverUrl}
              alt="Cover"
              className="w-full h-full object-cover rounded-xl"
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
                  <img
                    src={user.image}
                    alt={user.username}
                    className="h-24 w-24 rounded-full mx-auto border-4 border-background"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full mx-auto border-4 border-background bg-muted text-muted-foreground flex items-center justify-center">
                    N/A
                  </div>
                )}

                <h2 className="font-bold text-xl mt-3">{user.username}</h2>
                <p className="text-sm text-muted-foreground">Expéditeur</p>

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
                    icon={<Package className="h-full w-full" />}
                    label="Colis envoyés"
                    value={"N/A"}
                  />
                </div>

                <Button className="w-full mt-6">
                  Contacter l&apos;expéditeur
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

export default SenderDashboardPage;
