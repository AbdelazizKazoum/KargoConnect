import { Star } from "lucide-react";
import RateSenderView from "./RateSenderView";
import { useTranslations } from "next-intl";
import { senderData } from "@/db/data";

const PublicProfileView = ({ user }: { user: typeof senderData }) => {
  const t = useTranslations("profile.sender.public");
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("reviewsTitle")}</h3>
        <div className="space-y-4">
          {senderData.reviews.map((review) => (
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
        <RateSenderView />
      </div>
    </div>
  );
};

export default PublicProfileView;
