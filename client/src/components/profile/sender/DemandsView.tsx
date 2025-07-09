import { Box, MoreHorizontal, PlusCircle, Search } from "lucide-react";
import ActionMenu from "../ActionMenu";
import Pagination from "../../Pagination";
import { Button } from "@/components/ui";
import StatusBadge from "./StatusBadge";
import Input from "@/components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { senderData } from "@/db/data";

const DemandsView = ({ demands }: { demands: typeof senderData.demands }) => {
  const t = useTranslations("profile.sender.demands");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 5;
  const paginatedDemands = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return demands.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [demands, currentPage]);
  const totalPages = Math.ceil(demands.length / ITEMS_PER_PAGE);

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
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold">{t("title")}</h3>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              className="ltr:pl-9 rtl:pr-9"
            />
          </div>
          <Button size="sm" className="flex-shrink-0">
            <PlusCircle className="ltr:mr-2 rtl:ml-2 h-4 w-4" />{" "}
            {t("newDemandButton")}
          </Button>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedDemands.map((demand) => (
          <div
            key={demand.id}
            className="bg-secondary/50 rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="font-semibold text-foreground flex items-center gap-2">
                <Box className="h-4 w-4 text-primary" />
                {demand.packageType}
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-2 -mr-2"
                  onClick={() =>
                    setOpenMenuId(openMenuId === demand.id ? null : demand.id)
                  }
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                {openMenuId === demand.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-full ltr:right-0 rtl:left-0 z-10 mt-1"
                  >
                    <ActionMenu
                      onAction={(action) => {
                        alert(`${action} demand ${demand.id}`);
                        setOpenMenuId(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {demand.origin} to {demand.destination}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{demand.date}</span>
              <StatusBadge status={demand.status} />
            </div>
          </div>
        ))}
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50">
              <tr className="ltr:text-left rtl:text-right">
                <th className="p-3 font-semibold text-xs uppercase tracking-wider w-2/5">
                  {t("table.package")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.route")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.date")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.offers")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider">
                  {t("table.status")}
                </th>
                <th className="p-3 font-semibold text-xs uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedDemands.map((demand) => (
                <tr key={demand.id}>
                  <td className="p-3 whitespace-nowrap font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-primary" />
                      {demand.packageType}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {demand.origin} to {demand.destination}
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">
                    {demand.date}
                  </td>
                  <td className="p-3 text-muted-foreground">{demand.offers}</td>
                  <td className="p-3">
                    <StatusBadge status={demand.status} />
                  </td>
                  <td className="p-3 ltr:text-right rtl:text-left relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === demand.id ? null : demand.id
                        )
                      }
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    {openMenuId === demand.id && (
                      <div
                        ref={menuRef}
                        className="absolute top-full ltr:right-0 rtl:left-0 z-10 mt-1"
                      >
                        <ActionMenu
                          onAction={(action) => {
                            alert(`${action} demand ${demand.id}`);
                            setOpenMenuId(null);
                          }}
                        />
                      </div>
                    )}
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

export default DemandsView;
