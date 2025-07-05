"use client";

import { Package, Truck } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { mockTrips, mockDemands } from "@/db/data";
import { useTranslations } from "next-intl";
import TripCard from "@/components/search/TripCard";
import SkeletonCard from "@/components/search/SkeletonCard";
import SearchForm from "@/components/search/SearchForm";
import DemandCard from "@/components/search/DemandCard";
import PageHeader from "@/components/search/PageHeader";
import Pagination from "@/components/search/Pagination";

// --- Child Components (Separation of Concerns) ---

// --- Main Page Component ---

export default function SearchTripsPage() {
  const t = useTranslations("search");

  // --- State ---
  const [searchMode, setSearchMode] = useState<"trips" | "demands">("trips");
  const [isSearching, setIsSearching] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [allResults, setAllResults] = useState<
    ((typeof mockTrips)[0] | (typeof mockDemands)[0])[]
  >([]);
  const [smartQuery, setSmartQuery] = useState("");
  const [isSmartSearching, setIsSmartSearching] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // --- Handle hash on load ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "sender") {
        setSearchMode("trips");
      } else if (hash === "transporter") {
        setSearchMode("demands");
      }
    }
  }, []);

  // Memoized pagination calculation
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allResults.slice(startIndex, endIndex);
  }, [allResults, currentPage]);

  const totalPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setAllResults([]);
    setCurrentPage(1);
    setTimeout(() => {
      setAllResults(searchMode === "trips" ? mockTrips : mockDemands);
      setIsSearching(false);
    }, 1000);
  };

  const handleSetSearchMode = (mode: "trips" | "demands") => {
    setSearchMode(mode);
    setAllResults([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setIsPaginating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsPaginating(false);
      window.scrollTo(0, 0);
    }, 500);
  };

  const handleSmartSearch = async () => {
    setIsSmartSearching(true);
    const prompt = `From the following user query, extract the origin city, destination city, and a date in YYYY-MM-DD format. Today's date is ${new Date().toLocaleDateString(
      "en-CA"
    )}. If a field is not mentioned, return null for it.
      Query: "${smartQuery}"
      Return a JSON object with the keys "origin", "destination", and "date".`;

    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              origin: { type: "STRING" },
              destination: { type: "STRING" },
              date: { type: "STRING" },
            },
          },
        },
      };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        const parsedJson = JSON.parse(
          result.candidates[0].content.parts[0].text
        );
        setFrom(parsedJson.origin || "");
        setTo(parsedJson.destination || "");
        setDate(parsedJson.date || "");
      }
    } catch (error) {
      console.error("Smart search failed:", error);
    } finally {
      setIsSmartSearching(false);
    }
  };

  const pageConfig = {
    trips: {
      title: t("findRideTitle"),
      subtitle: t("findRideSubtitle"),
      resultsTitle: t("availableTrips"),
      emptyStateIcon: (
        <Truck className="mx-auto h-16 w-16 text-muted-foreground/50" />
      ),
      emptyStateTitle: t("findTransporterTitle"),
      emptyStateSubtitle: t("findTransporterSubtitle"),
    },
    demands: {
      title: t("findPackageTitle"),
      subtitle: t("findPackageSubtitle"),
      resultsTitle: t("availablePackages"),
      emptyStateIcon: (
        <Package className="mx-auto h-16 w-16 text-muted-foreground/50" />
      ),
      emptyStateTitle: t("findPackageTitle2"),
      emptyStateSubtitle: t("findPackageSubtitle2"),
    },
  };

  const currentConfig = pageConfig[searchMode];

  return (
    <div className="bg-background min-h-screen flex flex-col pt-16">
      <PageHeader
        title={currentConfig.title}
        subtitle={currentConfig.subtitle}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24 flex-grow">
        <SearchForm
          onSearch={handleSearch}
          isSearching={isSearching}
          onSmartSearch={handleSmartSearch}
          isSmartSearching={isSmartSearching}
          smartQuery={smartQuery}
          setSmartQuery={setSmartQuery}
          searchMode={searchMode}
          setSearchMode={handleSetSearchMode}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          date={date}
          setDate={setDate}
          t={t}
        />

        <div className="mt-12 max-w-4xl mx-auto">
          {isSearching ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t("searching")}</h2>
              {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : allResults.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">
                {currentConfig.resultsTitle}
              </h2>
              {isPaginating
                ? [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : searchMode === "trips"
                ? paginatedResults.map((trip) => (
                    <TripCard
                      key={`trip-${trip.id}`}
                      trip={trip as (typeof mockTrips)[0]}
                    />
                  ))
                : paginatedResults.map((demand) => (
                    <DemandCard
                      key={`demand-${demand.id}`}
                      demand={demand as (typeof mockDemands)[0]}
                    />
                  ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={isPaginating}
              />
            </div>
          ) : (
            <div className="text-center py-16">
              {currentConfig.emptyStateIcon}
              <h3 className="mt-4 text-xl font-semibold">
                {currentConfig.emptyStateTitle}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {currentConfig.emptyStateSubtitle}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
