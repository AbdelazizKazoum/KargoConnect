import { Button } from "@/components/ui";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { senderData } from "@/db/data";
import { useTranslations } from "next-intl";

const AccountSettingsView = ({ user }: { user: typeof senderData }) => {
  const t = useTranslations("profile.sender.settings");
  return (
    <form className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {t("personalInfo.title")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">{t("personalInfo.name")}</Label>
            <Input id="name" defaultValue={user.name} />
          </div>
          <div>
            <Label htmlFor="email">{t("personalInfo.email")}</Label>
            <Input id="email" type="email" defaultValue={user.email} />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="avatar">{t("personalInfo.picture")}</Label>
          <Input id="avatar" type="file" />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" type="button">
          {t("buttons.discard")}
        </Button>
        <Button>{t("buttons.update")}</Button>
      </div>
    </form>
  );
};

export default AccountSettingsView;
