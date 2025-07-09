import { Edit, Trash2, View } from "lucide-react";
import { useTranslations } from "next-intl";

const ActionMenu = ({ onAction }: { onAction: (action: string) => void }) => {
  const t = useTranslations("profile.sender.actions");
  return (
    <div className="bg-card border rounded-md shadow-lg w-32">
      <button
        onClick={() => onAction("view")}
        className="flex items-center w-full px-3 py-2 text-sm ltr:text-left rtl:text-right hover:bg-accent"
      >
        <View className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t("view")}
      </button>
      <button
        onClick={() => onAction("edit")}
        className="flex items-center w-full px-3 py-2 text-sm ltr:text-left rtl:text-right hover:bg-accent"
      >
        <Edit className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t("edit")}
      </button>
      <button
        onClick={() => onAction("delete")}
        className="flex items-center w-full px-3 py-2 text-sm ltr:text-left rtl:text-right text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t("delete")}
      </button>
    </div>
  );
};

export default ActionMenu;
