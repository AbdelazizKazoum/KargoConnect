"use client";

import { Car, MapPin, Package, Search, Zap } from "lucide-react";
import { JSX, useState } from "react";
import { useTranslations } from "next-intl";

type Step = {
  title: string;
  description: string;
};

export default function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const [activeTab, setActiveTab] = useState("sender");

  const senderSteps = t.raw("senderSteps");
  const transporterSteps = t.raw("transporterSteps");

  const icons = [
    <Search
      key="search"
      className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400"
    />,
    <Package
      key="package"
      className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400"
    />,
    <MapPin
      key="mappin"
      className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400"
    />,
  ];
  const transporterIcons = [
    <Car
      key="car"
      className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400"
    />,
    <Package
      key="package"
      className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400"
    />,
    <Zap
      key="zap"
      className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400"
    />,
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-white dark:bg-slate-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            {t("subtitle")}
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex justify-center border border-slate-200 dark:border-slate-800 rounded-full p-1 bg-slate-100 dark:bg-slate-900">
            <button
              onClick={() => setActiveTab("sender")}
              className={` cursor-pointer w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                activeTab === "sender"
                  ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-50"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {t("sender")}
            </button>
            <button
              onClick={() => setActiveTab("transporter")}
              className={` cursor-pointer w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                activeTab === "transporter"
                  ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-50"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {t("transporter")}
            </button>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {(activeTab === "sender" ? senderSteps : transporterSteps).map(
              (step: Step, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-center h-20 w-20 mx-auto bg-slate-100 dark:bg-slate-800/50 rounded-full">
                    {
                      (activeTab === "sender" ? icons : transporterIcons)[
                        index
                      ] as JSX.Element
                    }
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
