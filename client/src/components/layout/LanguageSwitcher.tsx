"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui";
import { Link, usePathname } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("components");

  const languages = [
    { code: "en", name: t("localeSwitcher.english") },
    { code: "fr", name: t("localeSwitcher.french") },
    { code: "ar", name: t("localeSwitcher.arabic") },
  ];

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Set dir attribute on html root when locale changes
  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={langDropdownRef}>
      <Button
        onClick={() => setIsLangDropdownOpen((open) => !open)}
        variant="ghost"
        size="icon"
        aria-label={t("localeSwitcher.switchLanguage")}
      >
        <Globe className="h-5 w-5" />
      </Button>
      {isLangDropdownOpen && (
        <div className="absolute top-full ltr:right-0 rtl:left-0 mt-2 w-32 rounded-md shadow-lg bg-popover text-popover-foreground ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {languages.map(({ code, name }) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent ${
                  locale === code ? "font-bold" : ""
                }`}
                onClick={() => setIsLangDropdownOpen(false)}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
