"use client";
import { ArrowRight, Package, Truck, Bike } from "lucide-react";
import React from "react";
import { Button } from "../ui";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* Background Video */}
        <video
          src="/videos/hero_video1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
          Ship Smarter, Drive Fuller.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-200">
          Connect with drivers already heading your way. Send anything, from a
          small package to a bike, at a fraction of the cost.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* This button now uses the 'default' variant, which is mapped to your primary red color. */}
          <Button size="lg" className="w-full sm:w-auto">
            Find a Ride for Your Package <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {/* This button is styled as an outline button suitable for a dark background. */}
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 hover:text-white"
          >
            Become a Transporter
          </Button>
        </div>
        <div className="mt-8 text-slate-300 flex items-center justify-center space-x-4">
          <Package size={20} /> <Truck size={20} /> <Bike size={20} />{" "}
          <span>And more...</span>
        </div>
      </div>
    </section>
  );
}
