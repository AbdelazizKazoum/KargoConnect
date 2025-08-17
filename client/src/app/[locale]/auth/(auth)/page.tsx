"use client";

import Image from "next/image";
import { Ship } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginView from "@/views/auth/LoginView";
import SignupView from "@/views/auth/SignupView";
import { useAuthStore } from "@/stores/authStore"; // Make sure this path is correct

// Define the possible views for the authentication page
type AuthView = "signup" | "login" | "completeProfile";

// A simple loading spinner component to show while checking the session
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default function AuthFlow() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setFormData = useAuthStore((state) => state.setFormData);

  const [view, setView] = useState<AuthView>("signup");

  useEffect(() => {
    // While the session status is loading, we don't need to do anything.
    if (status === "loading") {
      return;
    }

    // Handle authenticated users
    if (status === "authenticated") {
      const user = session?.user;

      // If the user's profile is already complete, they shouldn't be on this page.
      // Redirect them to the application's home page.
      if (user?.isProfileComplete) {
        router.push("/");
        return;
      }

      // If the profile is incomplete, we initialize the registration store
      // with their existing data and set the view to "completeProfile".
      if (user) {
        setFormData({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
        setView("completeProfile");
      }
    } else {
      // For unauthenticated users, the view is controlled by the URL hash (#login or #signup).
      const handleHashChange = () => {
        if (window.location.hash === "#login") {
          setView("login");
        } else {
          setView("signup");
        }
      };
      handleHashChange(); // Set initial view
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, [status, session, router, setFormData]);

  // Function to switch between login and signup views for unauthenticated users
  const switchView = (newView: "role_select" | "login" | "signup") => {
    window.location.hash = newView;
  };

  const getImageForState = () => {
    return "/images/signup_transporter.jpg";
  };

  // Render a full-screen loading state while session is being determined
  if (status === "loading") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mt-[64px] pt-16 lg:pt-0 lg:grid lg:grid-cols-2">
      {/* Left side with background image and branding */}
      <div className="hidden lg:flex relative bg-slate-100 max-h-screen items-center justify-center">
        <Image
          src={getImageForState()}
          alt="KargoConnect background"
          className="h-full w-full object-cover transition-all duration-500"
          width={1080}
          height={1920}
          style={{ objectPosition: "center" }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://placehold.co/1080x1920/1e293b/ffffff?text=KargoConnect";
          }}
        />
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

      {/* Right side with the authentication forms */}
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto w-full max-w-md space-y-6">
          {/* View for users who need to complete their profile */}
          {view === "completeProfile" && session?.user && (
            <div>
              <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
                Welcome,{" "}
                <span className="text-primary">
                  {session.user.firstName} {session.user.lastName}!
                </span>
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Please complete your account registration to continue.
              </p>
              <div className="mt-6">
                {/* The SignupView will handle the rest of the registration. */}
                {/* We pass a prop to hide the "switch to login" link. */}
                <SignupView setView={() => {}} isCompletingProfile={true} />
              </div>
            </div>
          )}

          {/* Show login/signup only if the user is not authenticated */}
          {status === "unauthenticated" && (
            <>
              {view === "login" ? (
                <LoginView setView={switchView} />
              ) : (
                <SignupView setView={switchView} isCompletingProfile={false} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
