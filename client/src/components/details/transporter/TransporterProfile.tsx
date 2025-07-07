"use client";
import { CheckCircle, Star, User } from "lucide-react";
import ImageModal from "./ImageModal";
import { useState } from "react";
import { tripDetails } from "@/db/data";
import { useTranslations } from "next-intl";
import Avatar from "@/components/ui/Avatar";

const TransporterProfile = ({
  transporter,
}: {
  transporter: typeof tripDetails.transporter;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = useTranslations("details.transporter");

  return (
    <>
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-bold">{t("aboutTransporter")}</h2>
        <div className="flex items-center gap-4">
          <Avatar
            src={transporter.avatarUrl}
            alt={transporter.name}
            fallback={<User className="h-6 w-6 text-muted-foreground" />}
          />
          <div>
            <h3 className="font-bold text-lg">{transporter.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>
                {transporter.rating} ({transporter.trips} trips)
              </span>
            </div>
          </div>
        </div>
        {transporter.verified && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <CheckCircle className="h-4 w-4" />
            <span>{t("identityVerified")}</span>
          </div>
        )}
        <div>
          <h4 className="font-semibold mb-2">
            {t("vehicle")}: {transporter.vehicle.name}
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {transporter.vehicle.photoUrls.map((url, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(url)}
                className="border rounded-lg overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
              >
                <img
                  src={url}
                  alt={`${transporter.vehicle.name} view ${index + 1}`}
                  className="w-full h-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("recentReviews")}</h4>
          <div className="space-y-4">
            {transporter.reviews.map((review) => (
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
    </>
  );
};

export default TransporterProfile;
