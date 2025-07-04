import { ArrowRight, Sparkles, Star, X } from "lucide-react";
import { Button } from "../ui";
import Image from "next/image";
import { useState } from "react";

const TripCard = ({ trip }: { trip: (typeof mockTrips)[0] }) => {
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handleGetSummary = async () => {
    setIsSummaryLoading(true);
    const prompt = `Summarize the following trip details in a single, friendly sentence for a user looking to ship a package:
        - Transporter: ${trip.transporter.name} (Rating: ${trip.transporter.rating} stars from ${trip.transporter.trips} trips)
        - Route: From ${trip.origin} to ${trip.destination}
        - Date: ${trip.date}
        - Vehicle: ${trip.vehicle} with ${trip.capacity}
        Example: Youssef B., a highly-rated transporter, is driving his Sedan from Casablanca to Marrakech on July 15th with trunk space available.`;

    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = ""; // Provided by environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        setSummary(result.candidates[0].content.parts[0].text);
      } else {
        setSummary("Could not generate summary.");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Error generating summary.");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  return (
    <div className="border bg-card text-card-foreground rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row">
      <div className="p-4 md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r">
        <Image
          src={trip.transporter.avatarUrl}
          alt={trip.transporter.name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full mb-3 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/80x80/e2e8f0/64748b?text=User";
          }}
        />
        <h3 className="font-bold text-lg">{trip.transporter.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>
            {trip.transporter.rating} ({trip.transporter.trips} trips)
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{trip.vehicle}</p>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-grow space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-bold text-lg">{trip.origin}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground mx-4" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-bold text-lg">{trip.destination}</p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t border-b py-2">
            <p>
              <span className="font-semibold">Date:</span> {trip.date}
            </p>
            <p>
              <span className="font-semibold">Capacity:</span> {trip.capacity}
            </p>
          </div>
          {summary && (
            <div className="p-3 rounded-md bg-secondary/50 text-sm text-secondary-foreground relative">
              <button
                onClick={() => setSummary("")}
                className="absolute top-1 right-1"
              >
                <X className="h-4 w-4" />
              </button>
              {summary}
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="w-full">View & Book ({trip.price})</Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleGetSummary}
            disabled={isSummaryLoading}
          >
            {isSummaryLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span className="sr-only">Quick Summary</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
