import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const t = useTranslations("profile.sender.pagination");
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-end space-x-2 p-4">
      <span className="text-sm text-muted-foreground">
        {t("page", { currentPage, totalPages })}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t("previous")}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t("next")}
      </Button>
    </div>
  );
};

export default Pagination;
