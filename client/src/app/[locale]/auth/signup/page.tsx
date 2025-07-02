"use client";

import {
  ArrowLeft,
  Car,
  Eye,
  EyeOff,
  Package,
  Ship,
  Truck,
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

// --- Main Authentication Flow Component ---

type AuthView = "role_select" | "signup" | "login";
type UserRole = "sender" | "transporter" | null;

export default function AuthFlow() {
  const [view, setView] = useState<AuthView>("role_select");
  const [role, setRole] = useState<UserRole>(null);
  const [step, setStep] = useState(1);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView("signup");
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
      return "https://images.unsplash.com/photo-1615899486509-86a0e6c35c81?q=80&w=1887&auto=format&fit=crop";
    if (view === "signup" && role === "transporter")
      return "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1887&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1586528116311-06924119295f?q=80&w=2070&auto=format&fit=crop";
  };

  const renderContent = () => {
    if (view === "login") {
      return <LoginView setView={setView} />;
    }
    if (view === "signup") {
      return (
        <SignupView
          role={role}
          step={step}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          setView={setView}
        />
      );
    }
    return (
      <RoleSelectionView
        handleRoleSelect={handleRoleSelect}
        setView={setView}
      />
    );
  };

  return (
    <div className="w-full min-h-screen pt-16 lg:pt-0 lg:grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-slate-100 max-h-screen">
        <img
          src={getImageForState()}
          alt="KargoConnect background"
          className="h-full w-full object-cover transition-all duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://placehold.co/1080x1920/1e293b/ffffff?text=KargoConnect";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/10 to-transparent dark:from-background/70 dark:via-background/30 dark:to-transparent"></div>
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <a
              href="#"
              className="inline-flex items-center space-x-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            >
              <Ship className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                KargoConnect
              </span>
            </a>
          </div>
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
          <h3 className="font-semibold text-base">I'm a Sender</h3>
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
          <h3 className="font-semibold text-base">I'm a Transporter</h3>
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
