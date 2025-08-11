"use client";

import { Truck } from "lucide-react";
// import  { useState, useEffect } from "react";

export default function Loading() {
  // const [showLoader, setShowLoader] = useState(false);

  // useEffect(() => {
  //   // Set a timer to only show the loader if loading takes longer than 300ms.
  //   // This prevents a "flicker" on very fast page loads.
  //   const timer = setTimeout(() => {
  //     setShowLoader(true);
  //   }, 300);

  //   // Clean up the timer if the component unmounts before the timer fires.
  //   return () => clearTimeout(timer);
  // }, []);

  // // If showLoader is false, render nothing to avoid flicker.
  // if (!showLoader) {
  //   return null;
  // }

  return (
    <>
      <style jsx>{`
        .progress-bar {
          width: 100%;
          height: 4px;
          /* Use a hardcoded fallback color for the background */
          background-color: #f1f5f9; /* slate-100 */
          border-radius: 9999px;
          overflow: hidden;
        }
        .progress-bar-inner {
          width: 100%;
          height: 100%;
          /* Use a hardcoded fallback color for the progress indicator */
          background-color: #dc2626; /* red-600 */
          animation: progress-animation 2s infinite ease-in-out;
          transform-origin: left;
        }
        @keyframes progress-animation {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        /* Dark mode styles */
        :global(html.dark) .progress-bar {
          background-color: #334155; /* slate-700 */
        }
      `}</style>
      <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-6 w-64">
          <Truck className="h-16 w-16 text-primary animate-pulse" />
          <div className="progress-bar">
            <div className="progress-bar-inner"></div>
          </div>
          <p className="text-sm font-semibold text-muted-foreground tracking-widest uppercase animate-pulse">
            LOADING
          </p>
        </div>
      </div>
    </>
  );
}
