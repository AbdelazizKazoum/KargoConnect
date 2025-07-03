"use client";

import Image from "next/image";
import { ArrowLeft, Eye, EyeOff, Package, Ship, Truck } from "lucide-react";
import React, { useState, useEffect } from "react";

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

// --- Main Authentication Flow Component ---

type AuthView = "role_select" | "signup" | "login";
type UserRole = "sender" | "transporter" | null;

export default function AuthFlow() {
  const [view, setView] = useState<AuthView>("role_select");
  const [role, setRole] = useState<UserRole>(null);
  const [step, setStep] = useState(1);

  // Handle hash changes for login/signup
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#login") {
        setView("login");
      } else if (window.location.hash === "#signup") {
        setView("signup");
      } else {
        setView("role_select");
      }
    };

    handleHashChange(); // Set initial view based on hash

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // When switching views, update the hash
  const switchView = (newView: AuthView) => {
    if (newView === "login") {
      window.location.hash = "#login";
    } else if (newView === "signup") {
      window.location.hash = "#signup";
    } else {
      window.location.hash = "";
    }
    setView(newView);
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    switchView("signup");
    setStep(1);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setView("role_select");
      setRole(null);
    }
  };

  const getImageForState = () => {
    if (view === "signup" && role === "sender")
      return "/images/signup_sender.jpg";
    if (view === "signup" && role === "transporter")
      return "/images/signup_transporter.jpg";
    return "/images/signup_transporter.jpg";
  };

  const renderContent = () => {
    if (view === "login") {
      return <LoginView setView={switchView} />;
    }
    if (view === "signup") {
      return (
        <SignupView
          role={role}
          step={step}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          setView={switchView}
        />
      );
    }
    return (
      <RoleSelectionView
        handleRoleSelect={handleRoleSelect}
        setView={switchView}
      />
    );
  };

  return (
    <div className="w-full min-h-screen pt-16 lg:pt-0 lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-slate-100 max-h-screen items-center justify-center">
        <Image
          src={getImageForState()}
          alt="KargoConnect background"
          className="h-full w-full object-cover transition-all duration-500"
          width={1080}
          height={1920}
          style={{ objectPosition: "center" }}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://placehold.co/1080x1920/1e293b/ffffff?text=KargoConnect";
          }}
        />
        {/* Subtle dark overlay for readability, not hiding the image */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <Ship className="h-14 w-14 text-primary drop-shadow-lg" />
          <span className="mt-4 text-3xl font-extrabold text-white drop-shadow-lg tracking-tight">
            KargoConnect
          </span>
          <span className="mt-2 text-lg text-slate-200 font-medium drop-shadow">
            Smart, Social Shipping
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto w-full max-w-md space-y-6">
          {/* <div className="text-center lg:text-left">
            <a
              href="#"
              className="inline-flex items-center space-x-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            >
              <Ship className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                KargoConnect
              </span>
            </a>
          </div> */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components for Each View ---

const RoleSelectionView = ({
  handleRoleSelect,
  setView,
}: {
  handleRoleSelect: (role: UserRole) => void;
  setView: (view: AuthView) => void;
}) => (
  <div className="space-y-6">
    <div className="text-center lg:text-left">
      <h1 className="text-3xl font-bold tracking-tight">Join us</h1>
      <p className="text-muted-foreground mt-2">
        First, tell us what you&apos;d like to do.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <button
        onClick={() => handleRoleSelect("sender")}
        className="group text-left p-4 flex items-center gap-4 border border-input rounded-lg hover:border-primary hover:bg-accent transition-all"
      >
        <div className="flex-shrink-0 bg-secondary p-3 rounded-md">
          <Package className="h-6 w-6 text-secondary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-base">I&apos;m a Sender</h3>
          <p className="text-sm text-muted-foreground">
            I want to ship packages affordably.
          </p>
        </div>
      </button>
      <button
        onClick={() => handleRoleSelect("transporter")}
        className="group text-left p-4 flex items-center gap-4 border border-input rounded-lg hover:border-primary hover:bg-accent transition-all"
      >
        <div className="flex-shrink-0 bg-secondary p-3 rounded-md">
          <Truck className="h-6 w-6 text-secondary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-base">I&apos;m a Transporter</h3>
          <p className="text-sm text-muted-foreground">
            I want to earn money while driving.
          </p>
        </div>
      </button>
    </div>
    <p className="text-center text-sm">
      Already have an account?{" "}
      <button
        onClick={() => setView("login")}
        className="font-semibold text-primary hover:underline"
      >
        Log In
      </button>
    </p>
  </div>
);

const SignupView = ({
  role,
  step,
  handleNextStep,
  handlePrevStep,
  setView,
}: {
  role: UserRole;
  step: number;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  setView: (view: AuthView) => void;
}) => {
  const totalSteps = role === "transporter" ? 3 : 2;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          onClick={handlePrevStep}
          variant="ghost"
          size="icon"
          className="mr-2 h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">
            {role} Signup
          </h1>
          <p className="text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button onClick={handleNextStep} className="w-full">
            Continue
          </Button>
        </div>
      )}

      {step === 2 && role === "transporter" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <select
              id="vehicleType"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option>Select a vehicle...</option>
              <option>Car (Sedan, SUV)</option>
              <option>Van</option>
              <option>Pickup Truck</option>
              <option>Motorcycle / Scooter</option>
            </select>
          </div>
          <div>
            <Label htmlFor="capacity">Available Capacity</Label>
            <Input
              id="capacity"
              type="text"
              placeholder="e.g., Trunk space for 2 boxes"
            />
          </div>
          <Button onClick={handleNextStep} className="w-full">
            Next Step
          </Button>
        </div>
      )}

      {((step === 2 && role === "sender") ||
        (step === 3 && role === "transporter")) && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="profilePicture">Profile Picture</Label>
            <Input id="profilePicture" type="file" className="pt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              A clear photo helps build trust.
            </p>
          </div>
          <Button onClick={() => alert("Signup Complete!")} className="w-full">
            Complete Signup
          </Button>
        </div>
      )}

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <button
          onClick={() => setView("login")}
          className="font-semibold text-primary hover:underline"
        >
          Log In
        </button>
      </p>
    </div>
  );
};

const LoginView = ({ setView }: { setView: (view: AuthView) => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">
          Log in to access your dashboard.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-full"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <Button className="w-full">Log In</Button>
      </div>
      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => setView("role_select")}
          className="font-semibold text-primary hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};
