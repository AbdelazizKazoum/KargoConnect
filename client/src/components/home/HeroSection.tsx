"use client";
import { ArrowRight, Package, Truck, Bike } from "lucide-react";
import { Button } from "../ui";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/40 dark:bg-grid-slate-800/40 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:[mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50">
          Ship Smarter, Drive Fuller.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
          Connect with drivers already heading your way. Send anything, from a
          small package to a bike, at a fraction of the cost.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" className="w-full sm:w-auto">
            Find a Ride for Your Package <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-white dark:bg-slate-950"
          >
            Become a Transporter
          </Button>
        </div>
        <div className="mt-8 text-slate-500 dark:text-slate-400 flex items-center justify-center space-x-4">
          <Package size={20} /> <Truck size={20} /> <Bike size={20} />{" "}
          <span>And more...</span>
        </div>
      </div>
    </section>
  );
}
