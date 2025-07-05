import { SearchIcon, Sparkles } from "lucide-react";
import { Button } from "../ui";
import Input from "../ui/input";
import Label from "../ui/label";
import { useTranslations } from "next-intl";

const SearchForm = ({
  onSearch,
  isSearching,
  onSmartSearch,
  isSmartSearching,
  smartQuery,
  setSmartQuery,
  searchMode,
  setSearchMode,
  from,
  setFrom,
  to,
  setTo,
  date,
  setDate,
  t,
}: {
  onSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
  onSmartSearch: () => void;
  isSmartSearching: boolean;
  smartQuery: string;
  setSmartQuery: (q: string) => void;
  searchMode: "trips" | "demands";
  setSearchMode: (mode: "trips" | "demands") => void;
  from: string;
  setFrom: (v: string) => void;
  to: string;
  setTo: (v: string) => void;
  date: string;
  setDate: (v: string) => void;
  t: ReturnType<typeof useTranslations>;
}) => (
  <div className="-mt-16 relative z-20">
    <div className="bg-card text-card-foreground p-4 sm:p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
      {/* Search Mode Toggle */}
      <div className="mb-4 bg-secondary p-1 rounded-full flex">
        <button
          onClick={() => setSearchMode("trips")}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all ${
            searchMode === "trips"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {t("findTransporter")}
        </button>
        <button
          onClick={() => setSearchMode("demands")}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all ${
            searchMode === "demands"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {t("findPackage")}
        </button>
      </div>

      <div className="relative mb-4">
        <Input
          id="smart-search"
          placeholder={t("smartPlaceholder")}
          value={smartQuery}
          onChange={(e) => setSmartQuery(e.target.value)}
          className="pl-4 pr-12 h-11"
        />
        <Button
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 right-1 h-9 w-9"
          onClick={onSmartSearch}
          disabled={isSmartSearching || !smartQuery}
        >
          {isSmartSearching ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          ) : (
            <Sparkles className="h-5 w-5" />
          )}
        </Button>
      </div>
      <form onSubmit={onSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <Label htmlFor="from">{t("from")}</Label>
            <Input
              id="from"
              placeholder={t("fromPlaceholder")}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="to">{t("to")}</Label>
            <Input
              id="to"
              placeholder={t("toPlaceholder")}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="date">{t("date")}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSearching}
          >
            {isSearching ? (
              t("searching")
            ) : (
              <>
                <SearchIcon className="mr-2 h-5 w-5" /> {t("search")}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  </div>
);

export default SearchForm;
