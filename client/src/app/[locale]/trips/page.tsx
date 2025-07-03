"use client";

import {
  ArrowRight,
  Calendar,
  Car,
  MapPin,
  Package,
  Search as SearchIcon,
  Star,
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

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
));
Label.displayName = "Label";

// --- Mock Data for Search Results ---
const mockTrips = [
  {
    id: 1,
    transporter: {
      name: "Youssef B.",
      avatarUrl: "https://i.pravatar.cc/150?u=youssef",
      rating: 4.9,
      trips: 23,
    },
    origin: "Casablanca",
    destination: "Marrakech",
    date: "July 15, 2024",
    price: "150 MAD",
    capacity: "Trunk space available",
    vehicle: "Sedan",
  },
  {
    id: 2,
    transporter: {
      name: "Fatima Z.",
      avatarUrl: "https://i.pravatar.cc/150?u=fatima",
      rating: 5.0,
      trips: 15,
    },
    origin: "Rabat",
    destination: "Tangier",
    date: "July 16, 2024",
    price: "120 MAD",
    capacity: "2 large boxes",
    vehicle: "SUV",
  },
  {
    id: 3,
    transporter: {
      name: "Mehdi A.",
      avatarUrl: "https://i.pravatar.cc/150?u=mehdi",
      rating: 4.8,
      trips: 41,
    },
    origin: "Agadir",
    destination: "Essaouira",
    date: "July 18, 2024",
    price: "80 MAD",
    capacity: "Full pickup bed",
    vehicle: "Pickup Truck",
  },
];

// --- Page Components ---

const TripCard = ({ trip }: { trip: (typeof mockTrips)[0] }) => (
  <div className="border bg-card text-card-foreground rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="p-4 border-b">
      <div className="flex items-center gap-4">
        <img
          src={trip.transporter.avatarUrl}
          alt={trip.transporter.name}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg">{trip.transporter.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>
              {trip.transporter.rating} ({trip.transporter.trips} trips)
            </span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="font-bold text-primary text-xl">{trip.price}</p>
          <p className="text-xs text-muted-foreground">Total Price</p>
        </div>
      </div>
    </div>
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{trip.date}</span>
      </div>
      <div className="flex items-start gap-3">
        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
        <div>
          <p>
            <span className="font-semibold">From:</span> {trip.origin}
          </p>
          <p>
            <span className="font-semibold">To:</span> {trip.destination}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Car className="h-4 w-4 text-muted-foreground" />
        <span>
          {trip.capacity} in {trip.vehicle}
        </span>
      </div>
    </div>
    <div className="p-4 bg-secondary/50">
      <Button className="w-full">
        View Details & Book <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default function SearchTripsPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<typeof mockTrips>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockTrips);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="bg-background">
      {/* Page Header with Background Image */}
      <div className="relative pt-16 h-64 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"
            alt="Abstract gradient background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Find a Ride for Your Package
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Enter your route and discover transporters heading your way.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Search Form Card */}
        <div className="-mt-16 relative z-20">
          <div className="bg-card text-card-foreground p-4 sm:p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <Label htmlFor="from">From</Label>
                  <Input id="from" placeholder="e.g., Casablanca" />
                </div>
                <div>
                  <Label htmlFor="to">To</Label>
                  <Input id="to" placeholder="e.g., Marrakech" />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    "Searching..."
                  ) : (
                    <>
                      <SearchIcon className="mr-2 h-5 w-5" /> Search
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Search Results */}
        <div className="mt-12 max-w-4xl mx-auto">
          {results.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Available Trips</h2>
              {results.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-xl font-semibold">
                Find your perfect trip
              </h3>
              <p className="mt-2 text-muted-foreground">
                Enter your details above to see available transporters.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
