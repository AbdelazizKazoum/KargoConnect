import { ArrowRight, Sparkles, Star, X } from "lucide-react";
import { Button } from "../ui";
import Image from "next/image";
import { mockDemands } from "@/db/data";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DemandCard = ({ demand }: { demand: (typeof mockDemands)[0] }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const router = useRouter();
  // const locale = useLocale();

  const handleEnhanceDescription = async () => {
    setIsLoading(true);
    const prompt = `Generate a more detailed and appealing description for a package listing. Base it on the following information:
        - Package Type: ${demand.package.type}
        - Details: ${demand.package.details}
        - Example: "One medium-sized, securely taped cardboard box containing books. Approximate weight: 5-7kg. Easy to handle and fits in most standard car trunks."
        Make it a single paragraph.`;

    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        setDescription(result.candidates[0].content.parts[0].text);
      } else {
        setDescription("Could not generate description.");
      }
    } catch (error) {
      console.error("Error fetching description:", error);
      setDescription("Error generating description.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border bg-card text-card-foreground rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row">
      <div className="p-4 md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r">
        <Image
          src={demand.sender.avatarUrl}
          alt={demand.sender.name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full mb-3 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/80x80/e2e8f0/64748b?text=User";
          }}
        />
        <h3 className="font-bold text-lg">{demand.sender.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>
            {demand.sender.rating} ({demand.sender.shipments} shipments)
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-grow space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-bold text-lg">{demand.origin}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground mx-4" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-bold text-lg">{demand.destination}</p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t border-b py-2">
            <p>
              <span className="font-semibold">Package:</span>{" "}
              {demand.package.type}
            </p>
            <p>{demand.package.details}</p>
          </div>
          {description && (
            <div className="p-3 rounded-md bg-secondary/50 text-sm text-secondary-foreground relative">
              <button
                onClick={() => setDescription("")}
                className="absolute top-1 right-1"
              >
                <X className="h-4 w-4" />
              </button>
              {description}
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => router.push(`details/sender`)}
            className="w-full"
          >
            Make Offer ({demand.budget})
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleEnhanceDescription}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span className="sr-only">Enhanced Description</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemandCard;
