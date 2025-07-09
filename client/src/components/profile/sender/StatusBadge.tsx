import { Bell, Calendar, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const StatusBadge = ({ status }: { status: string }) => {
  const t = useTranslations("profile.sender.status");
  const baseClasses =
    "px-2 py-0.5 text-xs font-semibold rounded-full inline-flex items-center gap-1.5";
  const statusConfig: {
    [key: string]: { icon: React.ReactNode; classes: string };
  } = {
    Completed: {
      icon: <CheckCircle className="h-3 w-3" />,
      classes:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    },
    Upcoming: {
      icon: <Calendar className="h-3 w-3" />,
      classes:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    },
    Active: {
      icon: <Bell className="h-3 w-3" />,
      classes:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    },
  };
  const config = statusConfig[status] || {
    icon: null,
    classes: "bg-secondary text-secondary-foreground",
  };
  return (
    <div className={`${baseClasses} ${config.classes}`}>
      {config.icon}
      {t(status.replace(/\s+/g, ""))}
    </div>
  );
};

export default StatusBadge;
