import { ArrowRight, MapPin, Star } from "lucide-react";
import RateTransporterView from "./RateTransporterView";
import { useTranslations } from "next-intl";
import { transporterData } from "@/db/data";

const PublicProfileView = ({ user }: { user: typeof transporterData }) => {
  const t = useTranslations("profile.transporter.public");
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("reviewsTitle")}</h3>
        <div className="space-y-4">
          {user.reviews.map((review) => (
            <div
              key={review.id}
              className="text-sm border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center mb-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-muted-foreground italic">
                &quot;{review.comment}&quot;
              </p>
              <p className="ltr:text-right rtl:text-left font-medium mt-1">
                - {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">{t("tripsTitle")}</h3>
        <div className="border rounded-xl overflow-hidden w-full">
          {user.trips
            .filter((t) => t.status === "Completed")
            .map((trip) => (
              <div
                key={trip.id}
                className="grid grid-cols-2 p-4 items-center border-t text-sm"
              >
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {trip.origin}{" "}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />{" "}
                  {trip.destination}
                </div>
                <div className="text-muted-foreground ltr:text-right rtl:text-left">
                  {trip.date}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="border-t pt-6">
        <RateTransporterView />
      </div>
    </div>
  );
};

export default PublicProfileView;
