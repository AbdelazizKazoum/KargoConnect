"use client";

import { Menu, Moon, Ship, Sun, X, UserCircle, LogOut } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "../ui";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react"; // Import signOut

type LinkItem = {
  name: string;
  href: string;
};

type HeaderProps = {
  state: "public" | "auth" | "private";
  additionalLinksForRoot?: LinkItem[]; // shown on root when authenticated
  user?: Session["user"] | null; // user session for public state
};

export default function Header({
  state,
  additionalLinksForRoot = [],
  user,
}: HeaderProps) {
  const effectiveState = user ? "private" : state;

  const t = useTranslations("header");
  const locale = useLocale();
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const publicLinks: LinkItem[] = [
    { name: t("howItWorks"), href: "#how-it-works" },
    { name: t("features"), href: "#features" },
    { name: t("testimonials"), href: "#testimonials" },
  ];

  const privateLinks: LinkItem[] = [
    { name: t("dashboard"), href: `/${locale}/dashboard` },
    { name: t("myAccount"), href: `/${locale}/account` },
  ];

  const rootAuthExtraLinks = additionalLinksForRoot;

  const getNavLinks = () => {
    if (effectiveState === "private" && rootAuthExtraLinks.length > 0) {
      return [...publicLinks, ...rootAuthExtraLinks];
    }
    if (effectiveState === "private") return privateLinks;
    if (effectiveState === "public") return publicLinks;
    return [];
  };

  const navLinks = getNavLinks();

  const handleSignOut = () => {
    // This will trigger the NextAuth sign-out process
    signOut({ callbackUrl: `/${locale}/auth` });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-sm dark:shadow-md dark:shadow-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
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
              {effectiveState === "public" && (
                <div className="hidden md:flex items-center gap-2">
                  <Link href={`/${locale}/auth#login`}>
                    <Button variant="ghost">{t("login")}</Button>
                  </Link>
                  <Link href={`/${locale}/auth`}>
                    <Button>{t("signup")}</Button>
                  </Link>
                </div>
              )}

              {/* User Dropdown */}
              {effectiveState === "private" && (
                <div className="relative" ref={dropdownRef}>
                  <Button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User profile picture"}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <UserCircle className="h-6 w-6" />
                    )}
                  </Button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div className="flex items-center px-4 py-3 border-b border-border">
                          {user?.image && (
                            <div className="flex-shrink-0">
                              <img
                                src={user.image}
                                alt={user.name || "User profile picture"}
                                className="h-10 w-10 rounded-full"
                              />
                            </div>
                          )}
                          <div className={user?.image ? "ml-3" : ""}>
                            <p className="text-sm font-semibold text-foreground truncate">
                              {user?.name || "User"}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="py-1">
                          <Link
                            href={`/${locale}/profile`}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                          >
                            <span>{t("profile")}</span>
                          </Link>
                          {privateLinks.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
                            >
                              {/* You can add icons for other links too if you want */}
                              {link.name}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-border">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-muted"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>{t("signOut")}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

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

      {/* Mobile menu */}
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
                className="text-lg font-medium text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </a>
            ))}

            {effectiveState === "public" && (
              <div className="border-t pt-6 flex flex-col space-y-3">
                <Link href={`/${locale}/auth#login`}>
                  <Button variant="outline">{t("login")}</Button>
                </Link>
                <Link href={`/${locale}/auth`}>
                  <Button>{t("signup")}</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
