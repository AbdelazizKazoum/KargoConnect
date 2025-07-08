"use client";

import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Box,
  Calendar,
  Camera,
  Car,
  Check,
  CheckCircle,
  CircleDollarSign,
  Edit,
  FileText,
  Handshake,
  MapPin,
  MoreHorizontal,
  Package,
  PlusCircle,
  Search,
  Settings,
  Share2,
  Star,
  Trash2,
  Truck,
  User,
  View,
  X,
} from "lucide-react";
import React, { useState, useMemo, useEffect, useRef } from "react";

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
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
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

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// --- Mock Data ---
const transporterData = {
  name: "Youssef B.",
  email: "youssef.b@email.com",
  avatarUrl: "https://i.pravatar.cc/150?u=youssef",
  coverUrl:
    "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop",
  rating: 4.9,
  tripsCompleted: 23,
  totalEarnings: 3450,
  memberSince: "Jan 2023",
  verified: true,
  vehicle: {
    name: "Renault Clio",
    type: "Sedan",
    licensePlate: "123-A-45",
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
    {
      id: 3,
      author: "Layla E.",
      rating: 4,
      comment: "Good service, arrived on time.",
    },
  ],
  trips: [
    {
      id: 1,
      origin: "Casablanca",
      destination: "Marrakech",
      date: "2025-07-15",
      status: "Completed",
      earnings: 150,
    },
    {
      id: 2,
      origin: "Rabat",
      destination: "Tangier",
      date: "2025-07-20",
      status: "Upcoming",
      earnings: 120,
    },
    {
      id: 3,
      origin: "Fes",
      destination: "Ifrane",
      date: "2025-08-01",
      status: "Upcoming",
      earnings: 90,
    },
    {
      id: 4,
      origin: "Agadir",
      destination: "Marrakech",
      date: "2025-06-30",
      status: "Completed",
      earnings: 200,
    },
    {
      id: 5,
      origin: "Casablanca",
      destination: "Fes",
      date: "2025-08-05",
      status: "Upcoming",
      earnings: 130,
    },
  ],
  offers: [
    {
      id: 1,
      packageType: "Artwork",
      origin: "Tangier",
      destination: "Casablanca",
      offer: 180,
      status: "Pending",
    },
    {
      id: 2,
      packageType: "Small Box",
      origin: "Fes",
      destination: "Meknes",
      offer: 60,
      status: "Accepted",
    },
    {
      id: 3,
      packageType: "Documents",
      origin: "Rabat",
      destination: "Kenitra",
      offer: 40,
      status: "Declined",
    },
    {
      id: 4,
      packageType: "Electronics",
      origin: "Marrakech",
      destination: "Agadir",
      offer: 110,
      status: "Pending",
    },
  ],
  bookings: [
    {
      id: 1,
      sender: "Fatima Z.",
      packageType: "2 large boxes",
      origin: "Rabat",
      destination: "Tangier",
      date: "2025-07-20",
      status: "Confirmed",
    },
    {
      id: 2,
      sender: "Amina K.",
      packageType: "Small Box",
      origin: "Fes",
      destination: "Ifrane",
      date: "2025-08-01",
      status: "Pending Approval",
    },
    {
      id: 3,
      sender: "Omar C.",
      packageType: "Suitcase",
      origin: "Casablanca",
      destination: "Fes",
      date: "2025-08-05",
      status: "Confirmed",
    },
  ],
};

// --- Child Components ---

const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="bg-secondary/50 p-3 rounded-lg text-center flex-1">
    <div className="text-primary mx-auto h-6 w-6 mb-1">{icon}</div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-base font-bold">{value}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses =
    "px-2 py-0.5 text-xs font-semibold rounded-full inline-flex items-center gap-1.5";
  const statusConfig: {
    [key: string]: { icon: React.ReactNode; classes: string };
  } = {
    Completed: {
      icon: <CheckCircle className="h-3 w-3" />,
      classes:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    },
    Upcoming: {
      icon: <Calendar className="h-3 w-3" />,
      classes:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    },
    Pending: {
      icon: <Bell className="h-3 w-3" />,
      classes:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    },
    Accepted: {
      icon: <Handshake className="h-3 w-3" />,
      classes:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    },
    Declined: {
      icon: <X className="h-3 w-3" />,
      classes: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    },
    Confirmed: {
      icon: <Check className="h-3 w-3" />,
      classes: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300",
    },
    "Pending Approval": {
      icon: <AlertTriangle className="h-3 w-3" />,
      classes:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    },
  };
  const config = statusConfig[status] || {
    icon: null,
    classes: "bg-secondary text-secondary-foreground",
  };
  return (
    <div className={`${baseClasses} ${config.classes}`}>
      {config.icon}
      {status}
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-end space-x-2 p-4">
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

const AccountSettingsView = ({ user }: { user: typeof transporterData }) => (
  <form className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue={user.name} />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue={user.email} />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="avatar">Profile Picture</Label>
        <Input id="avatar" type="file" />
      </div>
    </div>
    <div className="border-t pt-8">
      <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="vehicleName">Vehicle Name</Label>
          <Input id="vehicleName" defaultValue={user.vehicle.name} />
        </div>
        <div>
          <Label htmlFor="licensePlate">License Plate</Label>
          <Input id="licensePlate" defaultValue={user.vehicle.licensePlate} />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="vehiclePhotos">Vehicle Photos</Label>
        <Input id="vehiclePhotos" type="file" multiple />
      </div>
    </div>
    <div className="flex justify-end gap-2 pt-4">
      <Button variant="outline" type="button">
        Discard
      </Button>
      <Button>Update Settings</Button>
    </div>
  </form>
);

const ActionMenu = ({ onAction }: { onAction: (action: string) => void }) => (
  <div className="bg-card border rounded-md shadow-lg w-32">
    <button
      onClick={() => onAction("view")}
      className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-accent"
    >
      <View className="mr-2 h-4 w-4" /> View
    </button>
    <button
      onClick={() => onAction("edit")}
      className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-accent"
    >
      <Edit className="mr-2 h-4 w-4" /> Edit
    </button>
    <button
      onClick={() => onAction("delete")}
      className="flex items-center w-full px-3 py-2 text-sm text-left text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="mr-2 h-4 w-4" /> Delete
    </button>
  </div>
);

const TripsView = ({ trips }: { trips: typeof transporterData.trips }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 5;
  const paginatedTrips = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return trips.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [trips, currentPage]);
  const totalPages = Math.ceil(trips.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold">My Posted Trips</h3>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search trips..." className="pl-9" />
          </div>
          <Button size="sm" className="flex-shrink-0">
            <PlusCircle className="mr-2 h-4 w-4" /> Post New Trip
          </Button>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedTrips.map((trip) => (
          <div
            key={trip.id}
            className="bg-secondary/50 rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {trip.origin}{" "}
                <ArrowRight className="h-4 w-4 text-muted-foreground" />{" "}
                {trip.destination}
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-2 -mr-2"
                  onClick={() =>
                    setOpenMenuId(openMenuId === trip.id ? null : trip.id)
                  }
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                {openMenuId === trip.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-full right-0 z-10 mt-1"
                  >
                    <ActionMenu
                      onAction={(action) => {
                        alert(`${action} trip ${trip.id}`);
                        setOpenMenuId(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Date: {trip.date}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Earnings: {trip.earnings} MAD
              </span>
              <StatusBadge status={trip.status} />
            </div>
          </div>
        ))}
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr className="text-left">
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-2/5">
                  Route
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  Date
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  Earnings
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedTrips.map((trip) => (
                <tr key={trip.id}>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-semibold text-foreground">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{trip.origin}</span>{" "}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />{" "}
                      <span>{trip.destination}</span>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {trip.date}
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {trip.earnings} MAD
                  </td>
                  <td className="p-3">
                    <StatusBadge status={trip.status} />
                  </td>
                  <td className="p-3 text-right relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setOpenMenuId(openMenuId === trip.id ? null : trip.id)
                      }
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    {openMenuId === trip.id && (
                      <div
                        ref={menuRef}
                        className="absolute top-full right-0 z-10 mt-1"
                      >
                        <ActionMenu
                          onAction={(action) => {
                            alert(`${action} trip ${trip.id}`);
                            setOpenMenuId(null);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const OffersView = ({ offers }: { offers: typeof transporterData.offers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 5;
  const paginatedOffers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return offers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [offers, currentPage]);
  const totalPages = Math.ceil(offers.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">My Sent Offers</h3>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search offers..." className="pl-9" />
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-secondary/50 rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="font-semibold text-foreground flex items-center gap-2">
                <Box className="h-4 w-4 text-primary" />
                {offer.packageType}
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-2 -mr-2"
                  onClick={() =>
                    setOpenMenuId(openMenuId === offer.id ? null : offer.id)
                  }
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                {openMenuId === offer.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-full right-0 z-10 mt-1"
                  >
                    <ActionMenu
                      onAction={(action) => {
                        alert(`${action} offer ${offer.id}`);
                        setOpenMenuId(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {offer.origin} to {offer.destination}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Offer: {offer.offer} MAD
              </span>
              <StatusBadge status={offer.status} />
            </div>
          </div>
        ))}
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr className="text-left">
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-1/4">
                  Package
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-1/4">
                  Route
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  Your Offer
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedOffers.map((offer) => (
                <tr key={offer.id}>
                  <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-primary" />
                      {offer.packageType}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {offer.origin} to {offer.destination}
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {offer.offer} MAD
                  </td>
                  <td className="p-3">
                    <StatusBadge status={offer.status} />
                  </td>
                  <td className="p-3 text-right relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setOpenMenuId(openMenuId === offer.id ? null : offer.id)
                      }
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    {openMenuId === offer.id && (
                      <div
                        ref={menuRef}
                        className="absolute top-full right-0 z-10 mt-1"
                      >
                        <ActionMenu
                          onAction={(action) => {
                            alert(`${action} offer ${offer.id}`);
                            setOpenMenuId(null);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const BookingsView = ({
  bookings,
}: {
  bookings: typeof transporterData.bookings;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 5;
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return bookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [bookings, currentPage]);
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Incoming Bookings</h3>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-secondary/50 rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="font-semibold text-foreground flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                {booking.packageType}
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-2 -mr-2"
                  onClick={() =>
                    setOpenMenuId(openMenuId === booking.id ? null : booking.id)
                  }
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                {openMenuId === booking.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-full right-0 z-10 mt-1"
                  >
                    <ActionMenu
                      onAction={(action) => {
                        alert(`${action} booking ${booking.id}`);
                        setOpenMenuId(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Sender: {booking.sender}
            </div>
            <div className="text-sm text-muted-foreground">
              {booking.origin} to {booking.destination}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{booking.date}</span>
              <StatusBadge status={booking.status} />
            </div>
          </div>
        ))}
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr className="text-left">
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-1/4">
                  Package
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  Sender
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-1/4">
                  Route
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      {booking.packageType}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {booking.sender}
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {booking.origin} to {booking.destination}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="p-3 text-right relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === booking.id ? null : booking.id
                        )
                      }
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    {openMenuId === booking.id && (
                      <div
                        ref={menuRef}
                        className="absolute top-full right-0 z-10 mt-1"
                      >
                        <ActionMenu
                          onAction={(action) => {
                            alert(`${action} booking ${booking.id}`);
                            setOpenMenuId(null);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

const RateTransporterView = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
      <div>
        <Label>Your Rating</Label>
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
        <Label htmlFor="comment">Your Comment</Label>
        <Textarea id="comment" placeholder="Share your experience..." />
      </div>
      <Button className="w-full">Submit Review</Button>
    </div>
  );
};

const PublicProfileView = ({ user }: { user: typeof transporterData }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
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
            <p className="text-right font-medium mt-1">- {review.author}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Completed Trips</h3>
      <div className="border rounded-xl overflow-hidden">
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
              <div className="text-muted-foreground text-right">
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

// --- Main Page Component ---

type DashboardTab = "settings" | "trips" | "offers" | "bookings";

const TransporterDashboardPage = ({
  isOwnerView = true,
}: {
  isOwnerView?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("settings");
  const [coverUrl, setCoverUrl] = useState(transporterData.coverUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navItems = [
    { id: "settings", label: "Account Settings" },
    { id: "trips", label: "My Trips" },
    { id: "offers", label: "My Offers" },
    { id: "bookings", label: "Bookings" },
  ];

  const handleChangeCoverClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverUrl(URL.createObjectURL(file));
    }
  };

  const renderContent = () => {
    if (!isOwnerView) {
      return <PublicProfileView user={transporterData} />;
    }

    switch (activeTab) {
      case "settings":
        return <AccountSettingsView user={transporterData} />;
      case "trips":
        return <TripsView trips={transporterData.trips} />;
      case "offers":
        return <OffersView offers={transporterData.offers} />;
      case "bookings":
        return <BookingsView bookings={transporterData.bookings} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-secondary/50 min-h-screen pt-16">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Image */}
        <div className="h-48 md:h-64 rounded-xl bg-card border relative">
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover rounded-xl"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
          {isOwnerView && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={handleChangeCoverClick}
            >
              <Camera className="mr-2 h-4 w-4" />
              Change Cover
            </Button>
          )}
        </div>

        <div className="w-full lg:w-[95%] mx-auto">
          <div className="relative -mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Profile Sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="bg-card p-6 rounded-xl border shadow-sm text-center sticky top-24">
                <img
                  src={transporterData.avatarUrl}
                  alt={transporterData.name}
                  className="h-24 w-24 rounded-full mx-auto border-4 border-background"
                />
                <h2 className="font-bold text-xl mt-3">
                  {transporterData.name}
                </h2>
                <p className="text-sm text-muted-foreground">Transporter</p>
                {transporterData.verified && (
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    <span>Identity Verified</span>
                  </div>
                )}
                <div className="mt-4 flex justify-center gap-2 text-sm">
                  <StatItem
                    icon={<Star className="h-full w-full" />}
                    label="Rating"
                    value={transporterData.rating}
                  />
                  <StatItem
                    icon={<Truck className="h-full w-full" />}
                    label="Trips"
                    value={transporterData.tripsCompleted}
                  />
                  {isOwnerView && (
                    <StatItem
                      icon={<CircleDollarSign className="h-full w-full" />}
                      label="Earnings"
                      value={`${transporterData.totalEarnings}`}
                    />
                  )}
                </div>
                {isOwnerView ? (
                  <Button variant="outline" className="w-full mt-6">
                    View Public Profile
                  </Button>
                ) : (
                  <Button className="w-full mt-6">Send a Message</Button>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              <div className="bg-card border rounded-xl shadow-sm">
                {isOwnerView && (
                  <nav className="flex flex-wrap items-center border-b px-2">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as DashboardTab)}
                        className={`px-4 py-3 text-sm font-medium transition-colors relative border-b-2 ${
                          activeTab === item.id
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                )}
                <div className="p-6">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- App component to demonstrate both modes ---
export default function App() {
  const [isOwner, setIsOwner] = useState(true);

  return (
    <div className="bg-background">
      <TransporterDashboardPage isOwnerView={isOwner} />
    </div>
  );
}
