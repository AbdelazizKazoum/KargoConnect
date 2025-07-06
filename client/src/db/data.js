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
