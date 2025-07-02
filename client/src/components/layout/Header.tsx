"use client";

import { Globe, Menu, Moon, Ship, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui";

// This Button component is now theme-aware, using the semantic colors
// defined in your tailwind.config.js and CSS variables.

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.dir = language === "ar" ? "rtl" : "ltr";
  }, [theme, language]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

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
  }, [langDropdownRef]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleSetLanguage = (lang: "en" | "fr" | "ar") => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-sm dark:shadow-md dark:shadow-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <Ship className="h-7 w-7 text-primary" />
              <span className="text-lg md:text-xl font-bold text-foreground">
                KargoConnect
              </span>
            </a>

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
                <Button variant="ghost">Log In</Button>
                <Button>Sign Up</Button>
              </div>

              <div className="relative" ref={langDropdownRef}>
                <Button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  variant="ghost"
                  size="icon"
                >
                  <Globe className="h-5 w-5" />
                </Button>
                {isLangDropdownOpen && (
                  <div className="absolute top-full ltr:right-0 rtl:left-0 mt-2 w-32 rounded-md shadow-lg bg-popover text-popover-foreground ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => handleSetLanguage("en")}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent"
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleSetLanguage("fr")}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent"
                      >
                        Français
                      </button>
                      <button
                        onClick={() => handleSetLanguage("ar")}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent"
                      >
                        العربية
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
            <span className="font-bold text-lg">Menu</span>
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
              <Button variant="outline">Log In</Button>
              <Button>Sign Up</Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
