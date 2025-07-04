"use client";

import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle,
  ChevronDown,
  Info,
  MapPin,
  MessageSquare,
  Send,
  Shield,
  Star,
  User,
  X,
} from "lucide-react";
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
const tripDetails = {
  id: 1,
  transporter: {
    name: "Youssef B.",
    avatarUrl: "https://i.pravatar.cc/150?u=youssef",
    rating: 4.9,
    trips: 23,
    verified: true,
    vehicle: {
      name: "Renault Clio",
      type: "Sedan",
      photoUrls: [
        "/images/vehicles/clio1.jpg",
        "/images/vehicles/clio2.jpg",
        "/images/vehicles/clio3.jpg",
      ],
    },
    reviews: [
      {
        id: 1,
        author: "Amina K.",
        rating: 5,
        comment:
          "Excellent communication and very punctual. My package arrived in perfect condition. Highly recommended!",
      },
      {
        id: 2,
        author: "Karim S.",
        rating: 5,
        comment:
          "Youssef is a true professional. Very friendly and reliable. Will definitely use his service again.",
      },
    ],
  },
  origin: "Casablanca",
  destination: "Marrakech",
  date: "July 15, 2024",
  pickupWindow: "9:00 AM - 11:00 AM",
  deliveryWindow: "3:00 PM - 5:00 PM",
  price: 150,
  platformFee: 15,
  totalPrice: 165,
  packageDetails: {
    type: "Small Box",
    weight: "approx. 2kg",
    dimensions: "30x30x30cm",
  },
  initialChat: [
    {
      id: 1,
      author: "You",
      message:
        "Hi Youssef, just confirming the pickup address. Is it near the main train station?",
    },
    {
      id: 2,
      author: "Youssef B.",
      message:
        "Hi! Yes, exactly. I will be there around 10 AM. I will message you when I am 15 minutes away.",
    },
  ],
};

// --- Child Components for Details Page ---

const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
    onClick={onClose}
  >
    <div
      className="relative max-w-4xl max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={src}
        alt="Vehicle full view"
        className="w-full h-full object-contain rounded-lg"
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute -top-2 -right-2 bg-background/50 hover:bg-background h-9 w-9"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  </div>
);

const TransporterProfile = ({
  transporter,
}: {
  transporter: typeof tripDetails.transporter;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-bold">About Your Transporter</h2>
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
            <span>Identity Verified</span>
          </div>
        )}
        <div>
          <h4 className="font-semibold mb-2">
            Vehicle: {transporter.vehicle.name}
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
          <h4 className="font-semibold mb-3">Recent Reviews</h4>
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

const BookingBox = ({
  price,
  fee,
  total,
}: {
  price: number;
  fee: number;
  total: number;
}) => (
  <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
    <h2 className="text-xl font-bold">Confirm Your Booking</h2>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Trip price</span>
        <span>{price.toFixed(2)} MAD</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Platform fee</span>
        <span>{fee.toFixed(2)} MAD</span>
      </div>
      <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
        <span>Total</span>
        <span>{total.toFixed(2)} MAD</span>
      </div>
    </div>
    <div className="text-xs text-muted-foreground flex gap-2">
      <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
      <span>
        Your payment is held securely until the delivery is confirmed.
      </span>
    </div>
    <Button size="lg" className="w-full">
      Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const ChatBox = ({
  initialChat,
}: {
  initialChat: typeof tripDetails.initialChat;
}) => {
  const [messages, setMessages] = useState(initialChat);
  const [newMessage, setNewMessage] = useState("");

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
    // In a real app, you would emit this message via WebSockets here.
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        Chat with Transporter
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
              placeholder="Type your message..."
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

// --- Main Page Component ---

export default function TripDetailsPage() {
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
                    <span>{tripDetails.origin}</span>
                    <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{tripDetails.destination}</span>
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Review the trip details and book your spot.
                  </p>
                </div>
                <div className="text-sm font-semibold bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full flex items-center gap-2 flex-shrink-0">
                  <Calendar className="h-4 w-4" />
                  {tripDetails.date}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground/50" />
                <p className="ml-4 text-muted-foreground">
                  Route map would be displayed here
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="font-semibold text-base">Pickup Window</p>
                    <p className="text-muted-foreground text-lg">
                      {tripDetails.pickupWindow}
                    </p>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="font-semibold text-base">
                      Est. Delivery Window
                    </p>
                    <p className="text-muted-foreground text-lg">
                      {tripDetails.deliveryWindow}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Box */}
            <ChatBox initialChat={tripDetails.initialChat} />
          </div>

          {/* Sidebar (Right Column) */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
            <BookingBox
              price={tripDetails.price}
              fee={tripDetails.platformFee}
              total={tripDetails.totalPrice}
            />
            <TransporterProfile transporter={tripDetails.transporter} />
          </div>
        </div>
      </main>
    </div>
  );
}
