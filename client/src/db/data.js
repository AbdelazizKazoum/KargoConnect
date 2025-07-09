export const mockTrips = [
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

export const mockDemands = [
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

export const tripDetails = {
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

export const demandDetails = {
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

export // --- Mock Data ---
const senderData = {
  name: "Amina K.",
  email: "amina.k@email.com",
  avatarUrl: "https://i.pravatar.cc/150?u=amina",
  coverUrl:
    "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2070&auto=format&fit=crop",
  rating: 5.0,
  packagesSent: 12,
  totalSpent: 1240,
  memberSince: "Mar 2023",
  verified: true,
  reviews: [
    {
      id: 1,
      author: "Youssef B.",
      rating: 5,
      comment:
        "Amina is a great sender! Package was ready on time and communication was excellent.",
    },
    {
      id: 2,
      author: "Fatima Z.",
      rating: 5,
      comment: "Very reliable and friendly. A pleasure to work with.",
    },
  ],
  demands: [
    {
      id: 1,
      packageType: "Small Box",
      origin: "Fes",
      destination: "Meknes",
      date: "2025-07-25",
      status: "Active",
      offers: 3,
    },
    {
      id: 2,
      packageType: "Documents",
      origin: "Rabat",
      destination: "Kenitra",
      date: "2025-07-28",
      status: "Active",
      offers: 1,
    },
    {
      id: 3,
      packageType: "Laptop",
      origin: "Casablanca",
      destination: "Rabat",
      date: "2025-07-18",
      status: "Completed",
      offers: 1,
    },
  ],
  bookings: [
    {
      id: 1,
      transporter: "Youssef B.",
      packageType: "Laptop",
      origin: "Casablanca",
      destination: "Rabat",
      date: "2025-07-18",
      status: "Completed",
      price: 80,
    },
    {
      id: 2,
      transporter: "Mehdi A.",
      packageType: "Gift Basket",
      origin: "Marrakech",
      destination: "Agadir",
      date: "2025-08-02",
      status: "Upcoming",
      price: 120,
    },
  ],
};

export // --- Mock Data ---
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
