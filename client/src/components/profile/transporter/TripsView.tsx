import Pagination from "@/components/Pagination";
import ActionMenu from "../ActionMenu";
import {
  ArrowRight,
  MapPin,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui";
import StatusBadge from "./StatusBadge";
import Input from "@/components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { transporterData } from "@/db/data";

const TripsView = ({ trips }: { trips: typeof transporterData.trips }) => {
  const t = useTranslations("profile.transporter.trips");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 5;
  const paginatedTrips = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return trips.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [trips, currentPage]);
  const totalPages = Math.ceil(trips.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 w-full">
        <h3 className="text-lg font-semibold">{t("title")}</h3>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="ltr:pl-9 rtl:pr-9 w-full"
            />
          </div>
          <Button size="sm" className="flex-shrink-0">
            <PlusCircle className="ltr:mr-2 rtl:ml-2 h-4 w-4" />{" "}
            {t("newTripButton")}
          </Button>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 w-full">
        {paginatedTrips.map((trip) => (
          <div
            key={trip.id}
            className="bg-secondary/50 rounded-lg p-4 space-y-3 w-full"
          >
            <div className="flex justify-between items-start w-full">
              <div className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {trip.origin}{" "}
                <ArrowRight className="h-4 w-4 text-muted-foreground" />{" "}
                {trip.destination}
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-2 -mr-2"
                  onClick={() =>
                    setOpenMenuId(openMenuId === trip.id ? null : trip.id)
                  }
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                {openMenuId === trip.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-full ltr:right-0 rtl:left-0 z-50 mt-1"
                  >
                    <ActionMenu
                      onAction={(action) => {
                        alert(`${action} trip ${trip.id}`);
                        setOpenMenuId(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Date: {trip.date}
            </div>
            <div className="flex justify-between items-center text-sm w-full">
              <span className="text-muted-foreground">
                Earnings: {trip.earnings} MAD
              </span>
              <StatusBadge status={trip.status} />
            </div>
          </div>
        ))}
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-xl w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm min-w-full">
            <thead className="bg-secondary/50">
              <tr className="ltr:text-left rtl:text-right">
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-2/5">
                  {t("table.route")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.date")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.earnings")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.status")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedTrips.map((trip) => (
                <tr key={trip.id}>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-semibold text-foreground">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{trip.origin}</span>{" "}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />{" "}
                      <span>{trip.destination}</span>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {trip.date}
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {trip.earnings} MAD
                  </td>
                  <td className="p-3">
                    <StatusBadge status={trip.status} />
                  </td>
                  <td className="p-3 ltr:text-right rtl:text-left relative">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          setOpenMenuId(openMenuId === trip.id ? null : trip.id)
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      {openMenuId === trip.id && (
                        <div
                          ref={menuRef}
                          className="absolute top-full ltr:right-0 rtl:left-0 z-50 mt-1"
                        >
                          <ActionMenu
                            onAction={(action) => {
                              alert(`${action} trip ${trip.id}`);
                              setOpenMenuId(null);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TripsView;
