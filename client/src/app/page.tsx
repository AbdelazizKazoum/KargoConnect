"use client";
import React, {
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ElementType,
  useState,
} from "react";

import {
  ArrowRight,
  Bike,
  Car,
  // ChevronDown,
  Feather,
  LogIn,
  MapPin,
  Package,
  Search,
  Shield,
  Ship,
  Star,
  Truck,
  Users,
  Zap,
} from "lucide-react";

// Button Props
type ButtonProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// shadcn/ui-like Button Component
const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    outline:
      "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
    link: "text-slate-900 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Props
type CardProps = {
  className?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

// shadcn/ui-like Card Component
const Card: React.FC<CardProps> = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-xl border bg-white text-slate-900 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

type CardTitleProps = {
  className?: string;
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

const CardTitle: React.FC<CardTitleProps> = ({
  className = "",
  as = "h3",
  children,
  ...props
}) => {
  const Component = as as ElementType;
  return (
    <Component
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const CardDescription: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <p className={`text-sm text-slate-500 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState("sender");

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-slate-900" />,
      title: "Up to 50% Cheaper",
      description:
        "Senders save money by utilizing space in vehicles already on the road. A cost-effective alternative to traditional shipping.",
    },
    {
      icon: <Feather className="w-8 h-8 text-slate-900" />,
      title: "Earn On Your Way",
      description:
        "Transporters can monetize their empty vehicle space, turning routine trips into profitable journeys.",
    },
    {
      icon: <Users className="w-8 h-8 text-slate-900" />,
      title: "Community-Driven",
      description:
        "Built on trust, our platform connects you with a community of verified users, all sharing a common goal.",
    },
    {
      icon: <Shield className="w-8 h-8 text-slate-900" />,
      title: "Secure & Transparent",
      description:
        "With secure escrow payments and a two-way review system, every transaction is protected and transparent.",
    },
  ];

  const howItWorksSender = [
    {
      icon: <Search className="w-10 h-10 mx-auto text-slate-500" />,
      title: "1. Find a Trip",
      description:
        "Search for transporters heading to your desired destination.",
    },
    {
      icon: <Package className="w-10 h-10 mx-auto text-slate-500" />,
      title: "2. Book Your Space",
      description:
        "Send a booking request with your package details and wait for approval.",
    },
    {
      icon: <MapPin className="w-10 h-10 mx-auto text-slate-500" />,
      title: "3. Track Your Delivery",
      description:
        "Coordinate with your transporter and track your package in real-time.",
    },
  ];

  const howItWorksTransporter = [
    {
      icon: <Car className="w-10 h-10 mx-auto text-slate-500" />,
      title: "1. Post Your Trip",
      description:
        "List your upcoming journey, destination, and available space.",
    },
    {
      icon: <Package className="w-10 h-10 mx-auto text-slate-500" />,
      title: "2. Approve Bookings",
      description: "Review and approve booking requests from senders.",
    },
    {
      icon: <Zap className="w-10 h-10 mx-auto text-slate-500" />,
      title: "3. Drive & Earn",
      description:
        "Complete your trip as usual and get paid securely after delivery.",
    },
  ];

  const testimonials = [
    {
      name: "Amina K.",
      role: "Sender",
      quote:
        "KargoConnect was a lifesaver! I needed to send a gift to my family in another city, and it was so much cheaper and faster than the post office. The transporter was lovely!",
      stars: 5,
    },
    {
      name: "Youssef B.",
      role: "Transporter",
      quote:
        "I drive from Casablanca to Marrakech every week for work. Now, I cover my fuel costs and make extra money by carrying packages. The app is super easy to use.",
      stars: 5,
    },
  ];

  return (
    <div className="bg-white font-sans text-slate-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Ship className="h-7 w-7 text-slate-900" />
              <span className="text-2xl font-bold text-slate-900">
                KargoConnect
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden sm:inline-flex">
                <LogIn className="mr-2 h-4 w-4" /> Log In
              </Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-slate-900">
              Ship Smarter, Drive Fuller.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600">
              Connect with drivers already heading your way. Send anything, from
              a small package to a bike, at a fraction of the cost.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Find a Ride for Your Package{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white"
              >
                Become a Transporter
              </Button>
            </div>
            <div className="mt-8 text-slate-500 flex items-center justify-center space-x-4">
              <Package size={20} />
              <Truck size={20} />
              <Bike size={20} />
              <span>And more...</span>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                A Simpler Way to Ship
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                Whether you&apos;re sending a package or driving a route,
                getting started is easy.
              </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="flex justify-center border border-slate-200 rounded-full p-1 bg-slate-100">
                <button
                  onClick={() => setActiveTab("sender")}
                  className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                    activeTab === "sender"
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-600"
                  }`}
                >
                  I&apos;m a Sender
                </button>
                <button
                  onClick={() => setActiveTab("transporter")}
                  className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                    activeTab === "transporter"
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-600"
                  }`}
                >
                  I&apos;m a Transporter
                </button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
                {(activeTab === "sender"
                  ? howItWorksSender
                  : howItWorksTransporter
                ).map((step, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-center h-20 w-20 mx-auto bg-slate-100 rounded-full">
                      {step.icon}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-slate-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Why Choose KargoConnect?
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                We&apos;re building a more efficient, affordable, and
                community-driven logistics network.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-slate-100 p-3 rounded-full">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle as="h3" className="text-xl">
                      {feature.title}
                    </CardTitle>
                    <p className="mt-2 text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Trusted by our Community
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                Real stories from the people connecting through our platform.
              </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-slate-700 italic">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <footer className="mt-4">
                      <p className="font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {testimonial.role}
                      </p>
                    </footer>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to Join the Revolution?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
              Sign up today and start shipping or earning. It&apos;s free to
              join!
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                variant="default"
                className="bg-white text-slate-900 hover:bg-slate-200"
              >
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} KargoConnect. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-slate-900">
                Terms
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900">
                Privacy
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
