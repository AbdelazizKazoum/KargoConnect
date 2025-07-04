"use client";

import {
  ArrowLeft,
  ArrowRight,
  Package,
  Search as SearchIcon,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";

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

// --- Mock Data ---
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
  {
    id: 4,
    transporter: {
      name: "Amina K.",
      avatarUrl: "https://i.pravatar.cc/150?u=amina2",
      rating: 4.7,
      trips: 8,
    },
    origin: "Casablanca",
    destination: "Marrakech",
    date: "July 15, 2024",
    price: "140 MAD",
    capacity: "1 large suitcase",
    vehicle: "Hatchback",
  },
  {
    id: 5,
    transporter: {
      name: "Omar S.",
      avatarUrl: "https://i.pravatar.cc/150?u=omar",
      rating: 4.9,
      trips: 31,
    },
    origin: "Casablanca",
    destination: "Marrakech",
    date: "July 15, 2024",
    price: "160 MAD",
    capacity: "Backseat space",
    vehicle: "Crossover",
  },
];

const mockDemands = [
  {
    id: 1,
    sender: {
      name: "Amina K.",
      avatarUrl: "https://i.pravatar.cc/150?u=amina",
      rating: 5.0,
      shipments: 5,
    },
    origin: "Fes",
    destination: "Meknes",
    date: "Flexible",
    budget: "70 MAD",
    package: { type: "Small Box", details: "30x30x30cm, ~2kg" },
  },
  {
    id: 2,
    sender: {
      name: "Karim S.",
      avatarUrl: "https://i.pravatar.cc/150?u=karim",
      rating: 4.9,
      shipments: 12,
    },
    origin: "Tangier",
    destination: "Casablanca",
    date: "July 20, 2024",
    budget: "200 MAD",
    package: { type: "Artwork", details: "Fragile, 100x80cm canvas" },
  },
  {
    id: 3,
    sender: {
      name: "Layla E.",
      avatarUrl: "https://i.pravatar.cc/150?u=layla",
      rating: 5.0,
      shipments: 2,
    },
    origin: "Marrakech",
    destination: "Ouarzazate",
    date: "July 22, 2024",
    budget: "100 MAD",
    package: { type: "Luggage", details: "1 large suitcase" },
  },
  {
    id: 4,
    sender: {
      name: "Samir T.",
      avatarUrl: "https://i.pravatar.cc/150?u=samir",
      rating: 4.8,
      shipments: 8,
    },
    origin: "Fes",
    destination: "Meknes",
    date: "Flexible",
    budget: "60 MAD",
    package: { type: "Documents", details: "A4 Envelope" },
  },
  {
    id: 5,
    sender: {
      name: "Nadia F.",
      avatarUrl: "https://i.pravatar.cc/150?u=nadia",
      rating: 5.0,
      shipments: 3,
    },
    origin: "Fes",
    destination: "Meknes",
    date: "Flexible",
    budget: "90 MAD",
    package: { type: "Laptop Bag", details: "Standard size, ~3kg" },
  },
];

// --- Child Components (Separation of Concerns) ---

const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="relative h-64 md:h-80 flex items-center justify-center">
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/search_page.jpg"
        alt="Abstract gradient background"
        fill
        className="object-cover"
        priority
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            "https://placehold.co/2070x320/1e293b/ffffff?text=KargoConnect";
        }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-900/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent"></div>
    </div>
    <div className="relative z-10 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-200">
        {subtitle}
      </p>
    </div>
  </div>
);

const SearchForm = ({
  onSearch,
  isSearching,
  onSmartSearch,
  isSmartSearching,
  smartQuery,
  setSmartQuery,
  searchMode,
  setSearchMode,
  from,
  setFrom,
  to,
  setTo,
  date,
  setDate,
}: {
  onSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
  onSmartSearch: () => void;
  isSmartSearching: boolean;
  smartQuery: string;
  setSmartQuery: (q: string) => void;
  searchMode: "trips" | "demands";
  setSearchMode: (mode: "trips" | "demands") => void;
  from: string;
  setFrom: (v: string) => void;
  to: string;
  setTo: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
}) => (
  <div className="-mt-16 relative z-20">
    <div className="bg-card text-card-foreground p-4 sm:p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
      {/* Search Mode Toggle */}
      <div className="mb-4 bg-secondary p-1 rounded-full flex">
        <button
          onClick={() => setSearchMode("trips")}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all ${
            searchMode === "trips"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Find a Transporter
        </button>
        <button
          onClick={() => setSearchMode("demands")}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all ${
            searchMode === "demands"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Find a Package
        </button>
      </div>

      <div className="relative mb-4">
        <Input
          id="smart-search"
          placeholder="✨ Or just tell us what you need... e.g., 'Send a guitar from Rabat to Agadir this weekend'"
          value={smartQuery}
          onChange={(e) => setSmartQuery(e.target.value)}
          className="pl-4 pr-12 h-11"
        />
        <Button
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 right-1 h-9 w-9"
          onClick={onSmartSearch}
          disabled={isSmartSearching || !smartQuery}
        >
          {isSmartSearching ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          ) : (
            <Sparkles className="h-5 w-5" />
          )}
        </Button>
      </div>
      <form onSubmit={onSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              placeholder="e.g., Casablanca"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              placeholder="e.g., Marrakech"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
);

const SkeletonCard = () => (
  <div className="border bg-card text-card-foreground rounded-lg shadow-sm flex flex-col md:flex-row animate-pulse">
    <div className="p-4 md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r">
      <div className="h-20 w-20 rounded-full bg-muted mb-3"></div>
      <div className="h-5 w-24 bg-muted rounded-md mb-2"></div>
      <div className="h-4 w-32 bg-muted rounded-md"></div>
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <div className="flex-grow space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center w-1/3">
            <div className="h-4 w-12 bg-muted rounded-md mx-auto mb-1"></div>
            <div className="h-6 w-20 bg-muted rounded-md mx-auto"></div>
          </div>
          <div className="h-5 w-5 bg-muted rounded-full mx-4"></div>
          <div className="text-center w-1/3">
            <div className="h-4 w-8 bg-muted rounded-md mx-auto mb-1"></div>
            <div className="h-6 w-24 bg-muted rounded-md mx-auto"></div>
          </div>
        </div>
        <div className="space-y-2 border-t border-b py-2">
          <div className="h-4 w-1/2 bg-muted rounded-md mx-auto"></div>
          <div className="h-4 w-2/3 bg-muted rounded-md mx-auto"></div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-11 w-full bg-muted rounded-md"></div>
        <div className="h-11 w-11 bg-muted rounded-md"></div>
      </div>
    </div>
  </div>
);

const TripCard = ({ trip }: { trip: (typeof mockTrips)[0] }) => {
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handleGetSummary = async () => {
    setIsSummaryLoading(true);
    const prompt = `Summarize the following trip details in a single, friendly sentence for a user looking to ship a package:
        - Transporter: ${trip.transporter.name} (Rating: ${trip.transporter.rating} stars from ${trip.transporter.trips} trips)
        - Route: From ${trip.origin} to ${trip.destination}
        - Date: ${trip.date}
        - Vehicle: ${trip.vehicle} with ${trip.capacity}
        Example: Youssef B., a highly-rated transporter, is driving his Sedan from Casablanca to Marrakech on July 15th with trunk space available.`;

    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = ""; // Provided by environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        setSummary(result.candidates[0].content.parts[0].text);
      } else {
        setSummary("Could not generate summary.");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Error generating summary.");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  return (
    <div className="border bg-card text-card-foreground rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row">
      <div className="p-4 md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r">
        <Image
          src={trip.transporter.avatarUrl}
          alt={trip.transporter.name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full mb-3 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/80x80/e2e8f0/64748b?text=User";
          }}
        />
        <h3 className="font-bold text-lg">{trip.transporter.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>
            {trip.transporter.rating} ({trip.transporter.trips} trips)
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{trip.vehicle}</p>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-grow space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-bold text-lg">{trip.origin}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground mx-4" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-bold text-lg">{trip.destination}</p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t border-b py-2">
            <p>
              <span className="font-semibold">Date:</span> {trip.date}
            </p>
            <p>
              <span className="font-semibold">Capacity:</span> {trip.capacity}
            </p>
          </div>
          {summary && (
            <div className="p-3 rounded-md bg-secondary/50 text-sm text-secondary-foreground relative">
              <button
                onClick={() => setSummary("")}
                className="absolute top-1 right-1"
              >
                <X className="h-4 w-4" />
              </button>
              {summary}
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="w-full">View & Book ({trip.price})</Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleGetSummary}
            disabled={isSummaryLoading}
          >
            {isSummaryLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span className="sr-only">Quick Summary</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const DemandCard = ({ demand }: { demand: (typeof mockDemands)[0] }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEnhanceDescription = async () => {
    setIsLoading(true);
    const prompt = `Generate a more detailed and appealing description for a package listing. Base it on the following information:
        - Package Type: ${demand.package.type}
        - Details: ${demand.package.details}
        - Example: "One medium-sized, securely taped cardboard box containing books. Approximate weight: 5-7kg. Easy to handle and fits in most standard car trunks."
        Make it a single paragraph.`;

    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        setDescription(result.candidates[0].content.parts[0].text);
      } else {
        setDescription("Could not generate description.");
      }
    } catch (error) {
      console.error("Error fetching description:", error);
      setDescription("Error generating description.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border bg-card text-card-foreground rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row">
      <div className="p-4 md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r">
        <Image
          src={demand.sender.avatarUrl}
          alt={demand.sender.name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full mb-3 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/80x80/e2e8f0/64748b?text=User";
          }}
        />
        <h3 className="font-bold text-lg">{demand.sender.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>
            {demand.sender.rating} ({demand.sender.shipments} shipments)
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-grow space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-bold text-lg">{demand.origin}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground mx-4" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-bold text-lg">{demand.destination}</p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t border-b py-2">
            <p>
              <span className="font-semibold">Package:</span>{" "}
              {demand.package.type}
            </p>
            <p>{demand.package.details}</p>
          </div>
          {description && (
            <div className="p-3 rounded-md bg-secondary/50 text-sm text-secondary-foreground relative">
              <button
                onClick={() => setDescription("")}
                className="absolute top-1 right-1"
              >
                <X className="h-4 w-4" />
              </button>
              {description}
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="w-full">Make Offer ({demand.budget})</Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleEnhanceDescription}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span className="sr-only">Enhanced Description</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

// --- Main Page Component ---

export default function SearchTripsPage() {
  // --- State ---
  const [searchMode, setSearchMode] = useState<"trips" | "demands">("trips");
  const [isSearching, setIsSearching] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [allResults, setAllResults] = useState<
    ((typeof mockTrips)[0] | (typeof mockDemands)[0])[]
  >([]);
  const [smartQuery, setSmartQuery] = useState("");
  const [isSmartSearching, setIsSmartSearching] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // --- Handle hash on load ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "sender") {
        setSearchMode("trips");
      } else if (hash === "transporter") {
        setSearchMode("demands");
      }
    }
  }, []);

  // Memoized pagination calculation
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allResults.slice(startIndex, endIndex);
  }, [allResults, currentPage]);

  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setAllResults([]);
    setCurrentPage(1);
    setTimeout(() => {
      setAllResults(searchMode === "trips" ? mockTrips : mockDemands);
      setIsSearching(false);
    }, 1000);
  };

  const handleSetSearchMode = (mode: "trips" | "demands") => {
    setSearchMode(mode);
    setAllResults([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setIsPaginating(true);
    // For server-side pagination, you would make an API call here.
    // e.g., fetch(`/api/trips?page=${page}&limit=${ITEMS_PER_PAGE}`)
    // For this simulation, we just show a loader.
    setTimeout(() => {
      setCurrentPage(page);
      setIsPaginating(false);
      window.scrollTo(0, 0); // Scroll to top on page change
    }, 500);
  };

  const handleSmartSearch = async () => {
    setIsSmartSearching(true);
    const prompt = `From the following user query, extract the origin city, destination city, and a date in YYYY-MM-DD format. Today's date is ${new Date().toLocaleDateString(
      "en-CA"
    )}. If a field is not mentioned, return null for it.
      Query: "${smartQuery}"
      Return a JSON object with the keys "origin", "destination", and "date".`;

    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              origin: { type: "STRING" },
              destination: { type: "STRING" },
              date: { type: "STRING" },
            },
          },
        },
      };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        const parsedJson = JSON.parse(
          result.candidates[0].content.parts[0].text
        );
        setFrom(parsedJson.origin || "");
        setTo(parsedJson.destination || "");
        setDate(parsedJson.date || "");
      }
    } catch (error) {
      console.error("Smart search failed:", error);
    } finally {
      setIsSmartSearching(false);
    }
  };

  const pageConfig = {
    trips: {
      title: "Find a Ride for Your Package",
      subtitle: "Enter your route and discover transporters heading your way.",
      resultsTitle: "Available Trips",
      emptyStateIcon: (
        <Truck className="mx-auto h-16 w-16 text-muted-foreground/50" />
      ),
      emptyStateTitle: "Find your perfect transporter",
      emptyStateSubtitle: "Enter your details above to see available trips.",
    },
    demands: {
      title: "Find a Package to Transport",
      subtitle: "Discover packages that need to be delivered along your route.",
      resultsTitle: "Available Packages",
      emptyStateIcon: (
        <Package className="mx-auto h-16 w-16 text-muted-foreground/50" />
      ),
      emptyStateTitle: "Find a package for your trip",
      emptyStateSubtitle: "Enter a route to see packages you can transport.",
    },
  };

  const currentConfig = pageConfig[searchMode];

  return (
    <div className="bg-background min-h-screen flex flex-col pt-16">
      <PageHeader
        title={currentConfig.title}
        subtitle={currentConfig.subtitle}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24 flex-grow">
        <SearchForm
          onSearch={handleSearch}
          isSearching={isSearching}
          onSmartSearch={handleSmartSearch}
          isSmartSearching={isSmartSearching}
          smartQuery={smartQuery}
          setSmartQuery={setSmartQuery}
          searchMode={searchMode}
          setSearchMode={handleSetSearchMode}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          date={date}
          setDate={setDate}
        />

        <div className="mt-12 max-w-4xl mx-auto">
          {isSearching ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Searching...</h2>
              {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : allResults.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">
                {currentConfig.resultsTitle}
              </h2>
              {isPaginating
                ? [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : searchMode === "trips"
                ? paginatedResults.map((trip) => (
                    <TripCard
                      key={`trip-${trip.id}`}
                      trip={trip as (typeof mockTrips)[0]}
                    />
                  ))
                : paginatedResults.map((demand) => (
                    <DemandCard
                      key={`demand-${demand.id}`}
                      demand={demand as (typeof mockDemands)[0]}
                    />
                  ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={isPaginating}
              />
            </div>
          ) : (
            <div className="text-center py-16">
              {currentConfig.emptyStateIcon}
              <h3 className="mt-4 text-xl font-semibold">
                {currentConfig.emptyStateTitle}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {currentConfig.emptyStateSubtitle}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
