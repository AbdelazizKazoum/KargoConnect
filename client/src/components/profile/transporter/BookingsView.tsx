import Pagination from "@/components/Pagination";
import ActionMenu from "../ActionMenu";
import { MoreHorizontal, Package } from "lucide-react";
import { Button } from "@/components/ui";
import StatusBadge from "./StatusBadge";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { transporterData } from "@/db/data";

const BookingsView = ({
  bookings,
}: {
  bookings: typeof transporterData.bookings;
}) => {
  const t = useTranslations("profile.transporter.bookings");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 5;
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return bookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [bookings, currentPage]);
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

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
      <h3 className="text-lg font-semibold mb-4">{t("title")}</h3>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 w-full">
        {paginatedBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-secondary/50 rounded-lg p-4 space-y-3 w-full"
          >
            <div className="flex justify-between items-start w-full">
              <div className="font-semibold text-foreground flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                {booking.packageType}
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-2 -mr-2"
                  onClick={() =>
                    setOpenMenuId(openMenuId === booking.id ? null : booking.id)
                  }
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                {openMenuId === booking.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-full ltr:right-0 rtl:left-0 z-50 mt-1"
                  >
                    <ActionMenu
                      onAction={(action) => {
                        alert(`${action} booking ${booking.id}`);
                        setOpenMenuId(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Sender: {booking.sender}
            </div>
            <div className="text-sm text-muted-foreground">
              {booking.origin} to {booking.destination}
            </div>
            <div className="flex justify-between items-center text-sm w-full">
              <span className="text-muted-foreground">{booking.date}</span>
              <StatusBadge status={booking.status} />
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
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-1/4">
                  {t("table.package")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.sender")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-1/4">
                  {t("table.route")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.status")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="p-3 font-semibold text-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      {booking.packageType}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {booking.sender}
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {booking.origin} to {booking.destination}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="p-3 ltr:text-right rtl:text-left">
                    <div className="">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === booking.id ? null : booking.id
                          )
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      {openMenuId === booking.id && (
                        <div
                          ref={menuRef}
                          className="absolute ltr:right-0 rtl:left-0 z-50 mt-1"
                        >
                          <ActionMenu
                            onAction={(action) => {
                              alert(`${action} booking ${booking.id}`);
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

export default BookingsView;
