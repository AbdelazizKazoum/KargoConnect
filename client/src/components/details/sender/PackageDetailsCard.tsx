import { demandDetails } from "@/db/data";
import { Box, Weight } from "lucide-react";
import { useTranslations } from "next-intl";

const PackageDetailsCard = ({
  pkg,
}: {
  pkg: typeof demandDetails.packageDetails;
}) => {
  const t = useTranslations("details.demand");

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-bold">{t("packageDetails")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={pkg.photoUrl}
            alt={pkg.type}
            className="rounded-lg w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x400/e2e8f0/64748b?text=Package";
            }}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Box className="h-5 w-5 text-primary" />{" "}
            <span className="font-semibold">{pkg.type}</span>
          </div>
          <div className="flex items-center gap-3">
            <Weight className="h-5 w-5 text-primary" />{" "}
            <span className="text-muted-foreground">
              {pkg.weight}, {pkg.dimensions}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{pkg.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsCard;
