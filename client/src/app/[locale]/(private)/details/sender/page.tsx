"use client";

import {
  ArrowRight,
  Box,
  Calendar,
  CheckCircle,
  ChevronDown,
  Info,
  MapPin,
  MessageSquare,
  Send,
  Shield,
  Sparkles,
  Star,
  User,
  Weight,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

// --- Reusable UI Components (Theme-aware) ---

const Button = ({
  variant = "default",
  size,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost";
  size?: "lg" | "default" | "sm" | "icon";
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    lg: "h-11 rounded-md px-8",
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };
  return (
    <button
      className={`${baseStyles} ${sizes[size || "default"]} ${
        variants[variant]
      } ${className}`}
      {...props}
    />
  );
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Avatar = ({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: React.ReactNode;
}) => (
  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
    {src ? (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    ) : (
      fallback
    )}
  </div>
);

// --- Mock Data for the Details Page ---
const demandDetails = {
  id: 2,
  sender: {
    name: "Karim S.",
    avatarUrl: "https://i.pravatar.cc/150?u=karim",
    rating: 4.9,
    shipments: 12,
    verified: true,
    reviews: [
      {
        id: 1,
        author: "Youssef B.",
        rating: 5,
        comment:
          "Karim was very clear with his instructions and the package was ready on time. Great sender!",
      },
      {
        id: 2,
        author: "Fatima Z.",
        rating: 5,
        comment: "Smooth transaction. Would happily transport for Karim again.",
      },
    ],
  },
  origin: "Tangier",
  destination: "Casablanca",
  date: "July 20, 2024",
  budget: 200,
  packageDetails: {
    type: "Artwork",
    weight: "approx. 10kg",
    dimensions: "100x80cm",
    description:
      "A framed canvas painting. It is fragile and must be handled with care. Should be kept upright.",
    photoUrl:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=800&auto=format&fit=crop",
  },
  initialChat: [
    {
      id: 1,
      author: "You",
      message:
        "Hi Karim, I can transport your artwork to Casablanca. Is the pickup time flexible?",
    },
    {
      id: 2,
      author: "Karim S.",
      message:
        "Hi! Yes, I am available most of the day on the 20th. Let me know what works for you.",
    },
  ],
};

// --- Child Components for Details Page ---

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

const OfferBox = ({ budget }: { budget: number }) => {
  const t = useTranslations("details.demand");
  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-bold">{t("makeOffer")}</h2>
      <div className="text-sm">
        <p className="text-muted-foreground">{t("senderBudget")}</p>

        <p className="text-2xl font-bold text-primary">
          {budget.toFixed(2)} MAD
        </p>
      </div>
      <div>
        <label htmlFor="offer-price" className="text-sm font-medium">
          {t("yourOffer")}
        </label>
        <Input
          id="offer-price"
          type="number"
          placeholder="e.g., 180"
          className="mt-1"
        />
      </div>
      <Button size="lg" className="w-full">
        {t("submitOffer")} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <div className="text-xs text-muted-foreground flex gap-2">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <span>{t("offerNote")}</span>
      </div>
    </div>
  );
};

const ChatBox = ({
  initialChat,
}: {
  initialChat: typeof demandDetails.initialChat;
}) => {
  const [messages, setMessages] = useState(initialChat);
  const [newMessage, setNewMessage] = useState("");

  const t = useTranslations("details.demand");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      author: "You",
      message: newMessage.trim(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        {t("chatWithSender")}
      </h2>
      <div className="bg-card border rounded-xl shadow-sm h-96 flex flex-col">
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.author === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.author === "You"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-secondary rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="p-2 border-t bg-background"
        >
          <div className="relative">
            <Input
              placeholder={t("typeMessage")}
              className="pr-12"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute top-1/2 -translate-y-1/2 right-1 h-8 w-8"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

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

// --- Main Page Component ---

export default function DemandDetailsPage() {
  const t = useTranslations("details.demand");

  return (
    <div className="bg-background min-h-screen pt-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Info Section */}
            <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold flex items-center flex-wrap gap-x-3 gap-y-1">
                    <span>{demandDetails.origin}</span>
                    <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{demandDetails.destination}</span>
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {t("reviewAndOffer")}
                  </p>
                </div>
                <div className="text-sm font-semibold bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full flex items-center gap-2 flex-shrink-0">
                  <Calendar className="h-4 w-4" />
                  {demandDetails.date}
                </div>
              </div>

              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground/50" />
                <p className="ml-4 text-muted-foreground">
                  {t("routePlaceholder")}
                </p>
              </div>
            </div>

            <PackageDetailsCard pkg={demandDetails.packageDetails} />

            <ChatBox initialChat={demandDetails.initialChat} />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
            <OfferBox budget={demandDetails.budget} />
            <SenderProfile sender={demandDetails.sender} />
          </div>
        </div>
      </main>
    </div>
  );
}
