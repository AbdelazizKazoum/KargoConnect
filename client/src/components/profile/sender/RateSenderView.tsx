import { Button } from "@/components/ui";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/Textarea";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const RateSenderView = () => {
  const t = useTranslations("profile.sender.public.rating");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">{t("title")}</h3>
      <div>
        <Label>{t("yourRating")}</Label>
        <div className="flex items-center gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="comment">{t("yourComment")}</Label>
        <Textarea id="comment" placeholder={t("commentPlaceholder")} />
      </div>
      <Button className="w-full">{t("submitButton")}</Button>
    </div>
  );
};

export default RateSenderView;
