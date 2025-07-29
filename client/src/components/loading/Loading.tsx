"use client";

import { Truck } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <>
      <style jsx>{`
        .progress-bar {
          width: 100%;
          height: 4px;
          background-color: hsl(var(--secondary));
          border-radius: 9999px;
          overflow: hidden;
        }
        .progress-bar-inner {
          width: 100%;
          height: 100%;
          background-color: hsl(var(--primary));
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
