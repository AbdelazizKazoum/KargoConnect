"use client";

import { Menu, Moon, Ship, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Header() {
  const t = useTranslations("header");
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: t("howItWorks"), href: "#how-it-works" },
    { name: t("features"), href: "#features" },
    { name: t("testimonials"), href: "#testimonials" },
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-sm dark:shadow-md dark:shadow-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Ship className="h-7 w-7 text-primary" />
              <span className="text-lg md:text-xl font-bold text-foreground">
                KargoConnect
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Link href="/signup">
                  <Button variant="ghost">{t("login")}</Button>
                </Link>
                <Link href="/signup">
                  <Button>{t("signup")}</Button>
                </Link>
              </div>

              <LanguageSwitcher />

              <Button onClick={toggleTheme} variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <div className="md:hidden">
                <Button
                  onClick={() => setIsMenuOpen(true)}
                  variant="ghost"
                  size="icon"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <div
          className={`absolute top-0 ltr:right-0 rtl:left-0 h-full w-4/5 max-w-sm bg-background shadow-xl transition-transform duration-300 transform ${
            isMenuOpen
              ? "ltr:translate-x-0 rtl:-translate-x-0"
              : "ltr:translate-x-full rtl:-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold text-lg">{t("menu")}</span>
            <Button
              onClick={() => setIsMenuOpen(false)}
              variant="ghost"
              size="icon"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className=" text-lg font-medium text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <div className="border-t pt-6 flex flex-col space-y-3">
              <Link href="/signup">
                <Button variant="outline">{t("login")}</Button>
              </Link>
              <Link href="/signup">
                <Button>{t("signup")}</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
