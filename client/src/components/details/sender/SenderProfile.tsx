import { CheckCircle, Star, User } from "lucide-react";
import Avatar from "../Avatar";
import { useTranslations } from "next-intl";
import { demandDetails } from "@/db/data";

const SenderProfile = ({ sender }: { sender: typeof demandDetails.sender }) => {
  const t = useTranslations("details.sender");
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-bold">{t("aboutSender")}</h2>
      <div className="flex items-center gap-4">
        <Avatar
          src={sender.avatarUrl}
          alt={sender.name}
          fallback={<User className="h-6 w-6 text-muted-foreground" />}
        />
        <div>
          <h3 className="font-bold text-lg">{sender.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>
              {sender.rating} ({sender.shipments} shipments)
            </span>
          </div>
        </div>
      </div>
      {sender.verified && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          <span>{t("identityVerified")}</span>
        </div>
      )}
      <div>
        <h4 className="font-semibold mb-3">{t("recentReviews")}</h4>
        <div className="space-y-4">
          {sender.reviews.map((review) => (
            <div key={review.id} className="text-sm">
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
              <p className="text-right font-medium mt-1">- {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SenderProfile;
