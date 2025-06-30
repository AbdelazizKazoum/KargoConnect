"use client";
import React, {
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ElementType,
  useState,
  useEffect,
  useRef,
} from "react";

import {
  ArrowRight,
  Bike,
  Car,
  Feather,
  Globe,
  LogIn,
  MapPin,
  Menu,
  Moon,
  Package,
  Search,
  Shield,
  Ship,
  Star,
  Sun,
  Truck,
  Users,
  X,
  Zap,
} from "lucide-react";

// --- Multi-language Content ---
const content = {
  en: {
    dir: "ltr",
    nav: {
      howItWorks: "How It Works",
      features: "Features",
      testimonials: "Testimonials",
    },
    auth: { login: "Log In", signup: "Sign Up" },
    hero: {
      title: "Ship Smarter, Drive Fuller.",
      subtitle:
        "Connect with drivers already heading your way. Send anything, from a small package to a bike, at a fraction of the cost.",
      findButton: "Find a Ride for Your Package",
      becomeButton: "Become a Transporter",
      andMore: "And more...",
    },
    howItWorks: {
      title: "A Simpler Way to Ship",
      subtitle:
        "Whether you're sending a package or driving a route, getting started is easy.",
      senderTab: "I'm a Sender",
      transporterTab: "I'm a Transporter",
      senderSteps: [
        {
          title: "1. Find a Trip",
          description:
            "Search for transporters heading to your desired destination.",
        },
        {
          title: "2. Book Your Space",
          description:
            "Send a booking request with your package details and wait for approval.",
        },
        {
          title: "3. Track Your Delivery",
          description:
            "Coordinate with your transporter and track your package in real-time.",
        },
      ],
      transporterSteps: [
        {
          title: "1. Post Your Trip",
          description:
            "List your upcoming journey, destination, and available space.",
        },
        {
          title: "2. Approve Bookings",
          description: "Review and approve booking requests from senders.",
        },
        {
          title: "3. Drive & Earn",
          description:
            "Complete your trip as usual and get paid securely after delivery.",
        },
      ],
    },
    features: {
      title: "Why Choose KargoConnect?",
      subtitle:
        "We're building a more efficient, affordable, and community-driven logistics network.",
      list: [
        {
          title: "Up to 50% Cheaper",
          description:
            "Senders save money by utilizing space in vehicles already on the road.",
        },
        {
          title: "Earn On Your Way",
          description:
            "Transporters can monetize their empty vehicle space, turning routine trips into profitable journeys.",
        },
        {
          title: "Community-Driven",
          description:
            "Built on trust, our platform connects you with a community of verified users.",
        },
        {
          title: "Secure & Transparent",
          description:
            "With secure escrow payments and a two-way review system, every transaction is protected.",
        },
      ],
    },
    testimonials: {
      title: "Trusted by our Community",
      subtitle: "Real stories from the people connecting through our platform.",
      list: [
        {
          name: "Amina K.",
          role: "Sender",
          quote:
            "KargoConnect was a lifesaver! I needed to send a gift to my family in another city, and it was so much cheaper and faster than the post office.",
        },
        {
          name: "Youssef B.",
          role: "Transporter",
          quote:
            "I drive from Casablanca to Marrakech every week for work. Now, I cover my fuel costs and make extra money by carrying packages. The app is super easy to use.",
        },
      ],
    },
    cta: {
      title: "Ready to Join the Revolution?",
      subtitle:
        "Sign up today and start shipping or earning. It's free to join!",
      button: "Get Started Today",
    },
    footer: { terms: "Terms", privacy: "Privacy", contact: "Contact" },
  },
  fr: {
    dir: "ltr",
    nav: {
      howItWorks: "Comment ça marche",
      features: "Fonctionnalités",
      testimonials: "Témoignages",
    },
    auth: { login: "Se Connecter", signup: "S'inscrire" },
    hero: {
      title: "Expédiez Mieux, Roulez Plein.",
      subtitle:
        "Connectez-vous avec des conducteurs qui vont déjà dans votre direction. Envoyez n'importe quoi, à une fraction du coût.",
      findButton: "Trouver un Trajet pour votre Colis",
      becomeButton: "Devenir Transporteur",
      andMore: "Et plus...",
    },
    howItWorks: {
      title: "Une Façon Plus Simple d'Expédier",
      subtitle:
        "Que vous envoyiez un colis ou que vous conduisiez, démarrer est facile.",
      senderTab: "Je suis Expéditeur",
      transporterTab: "Je suis Transporteur",
      senderSteps: [
        {
          title: "1. Trouvez un Trajet",
          description:
            "Recherchez des transporteurs se dirigeant vers votre destination.",
        },
        {
          title: "2. Réservez Votre Espace",
          description:
            "Envoyez une demande de réservation avec les détails de votre colis.",
        },
        {
          title: "3. Suivez Votre Livraison",
          description:
            "Coordonnez-vous avec votre transporteur et suivez votre colis en temps réel.",
        },
      ],
      transporterSteps: [
        {
          title: "1. Publiez Votre Trajet",
          description: "Annoncez votre prochain voyage et l'espace disponible.",
        },
        {
          title: "2. Approuvez les Réservations",
          description: "Examinez et approuvez les demandes des expéditeurs.",
        },
        {
          title: "3. Conduisez & Gagnez",
          description:
            "Effectuez votre trajet et soyez payé en toute sécurité après la livraison.",
        },
      ],
    },
    features: {
      title: "Pourquoi Choisir KargoConnect?",
      subtitle:
        "Nous bâtissons un réseau logistique plus efficace, abordable et communautaire.",
      list: [
        {
          title: "Jusqu'à 50% Moins Cher",
          description:
            "Les expéditeurs économisent en utilisant l'espace dans des véhicules déjà en route.",
        },
        {
          title: "Gagnez sur Votre Trajet",
          description:
            "Les transporteurs peuvent monétiser leur espace vide, transformant les trajets en voyages rentables.",
        },
        {
          title: "Basé sur la Communauté",
          description:
            "Construite sur la confiance, notre plateforme vous connecte avec des utilisateurs vérifiés.",
        },
        {
          title: "Sécurisé & Transparent",
          description:
            "Avec des paiements séquestres sécurisés et un système d'évaluation, chaque transaction est protégée.",
        },
      ],
    },
    testimonials: {
      title: "Approuvé par notre Communauté",
      subtitle:
        "Des histoires vraies de personnes qui se connectent via notre plateforme.",
      list: [
        {
          name: "Amina K.",
          role: "Expéditrice",
          quote:
            "KargoConnect m'a sauvé la vie ! C'était beaucoup moins cher et plus rapide que la poste.",
        },
        {
          name: "Youssef B.",
          role: "Transporteur",
          quote:
            "Je conduis de Casablanca à Marrakech chaque semaine. Maintenant, je couvre mes frais de carburant et je gagne de l'argent en plus.",
        },
      ],
    },
    cta: {
      title: "Prêt à Rejoindre la Révolution ?",
      subtitle:
        "Inscrivez-vous aujourd'hui et commencez à expédier ou à gagner. L'inscription est gratuite !",
      button: "Commencer Aujourd'hui",
    },
    footer: {
      terms: "Conditions",
      privacy: "Confidentialité",
      contact: "Contact",
    },
  },
  ar: {
    dir: "rtl",
    nav: {
      howItWorks: "كيف يعمل",
      features: "الميزات",
      testimonials: "الشهادات",
    },
    auth: { login: "تسجيل الدخول", signup: "إنشاء حساب" },
    hero: {
      title: "اشحن أذكى، سافر أملأ.",
      subtitle:
        "تواصل مع سائقين متجهين بالفعل في طريقك. أرسل أي شيء، من طرد صغير إلى دراجة، بجزء بسيط من التكلفة.",
      findButton: "ابحث عن رحلة لطردك",
      becomeButton: "كن ناقلاً",
      andMore: "والمزيد...",
    },
    howItWorks: {
      title: "طريقة أبسط للشحن",
      subtitle: "سواء كنت ترسل طردًا أو تقود في رحلة، فإن البدء سهل.",
      senderTab: "أنا المرسل",
      transporterTab: "أنا الناقل",
      senderSteps: [
        {
          title: "١. ابحث عن رحلة",
          description: "ابحث عن ناقلين متجهين إلى وجهتك المطلوبة.",
        },
        {
          title: "٢. احجز مساحتك",
          description: "أرسل طلب حجز مع تفاصيل طردك وانتظر الموافقة.",
        },
        {
          title: "٣. تتبع توصيلك",
          description: "نسق مع الناقل وتتبع طردك في الوقت الفعلي.",
        },
      ],
      transporterSteps: [
        {
          title: "١. انشر رحلتك",
          description: "أعلن عن رحلتك القادمة وجهتك والمساحة المتاحة.",
        },
        {
          title: "٢. وافق على الحجوزات",
          description: "راجع ووافق على طلبات الحجز من المرسلين.",
        },
        {
          title: "٣. قُد واكسب",
          description:
            "أكمل رحلتك كالمعتاد واحصل على أموالك بأمان بعد التسليم.",
        },
      ],
    },
    features: {
      title: "لماذا تختار كارغو كونيكت؟",
      subtitle:
        "نحن نبني شبكة لوجستية أكثر كفاءة وبأسعار معقولة وموجهة نحو المجتمع.",
      list: [
        {
          title: "أرخص بنسبة تصل إلى 50٪",
          description:
            "يوفر المرسلون المال عن طريق استخدام المساحة في المركبات الموجودة بالفعل على الطريق.",
        },
        {
          title: "اكسب في طريقك",
          description:
            "يمكن للناقلين تحقيق الدخل من مساحة مركباتهم الفارغة، وتحويل الرحلات الروتينية إلى رحلات مربحة.",
        },
        {
          title: "مدفوع بالمجتمع",
          description:
            "مبنية على الثقة، تربطك منصتنا بمجتمع من المستخدمين المعتمدين.",
        },
        {
          title: "آمن وشفاف",
          description:
            "مع مدفوعات الضمان الآمنة ونظام المراجعة المتبادل، كل معاملة محمية.",
        },
      ],
    },
    testimonials: {
      title: "موثوق به من قبل مجتمعنا",
      subtitle: "قصص حقيقية من الأشخاص الذين يتواصلون عبر منصتنا.",
      list: [
        {
          name: "أمينة ك.",
          role: "مرسلة",
          quote:
            "كارغو كونيكت كان منقذاً! كنت بحاجة لإرسال هدية لعائلتي في مدينة أخرى، وكان أرخص وأسرع بكثير من مكتب البريد.",
        },
        {
          name: "يوسف ب.",
          role: "ناقل",
          quote:
            "أقود من الدار البيضاء إلى مراكش كل أسبوع للعمل. الآن، أغطي تكاليف الوقود وأجني أموالاً إضافية.",
        },
      ],
    },
    cta: {
      title: "هل أنت مستعد للانضمام إلى الثورة؟",
      subtitle: "سجل اليوم وابدأ في الشحن أو الكسب. الانضمام مجاني!",
      button: "ابدأ اليوم",
    },
    footer: { terms: "الشروط", privacy: "الخصوصية", contact: "اتصل بنا" },
  },
};

// --- Component Types ---
type ButtonProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
type CardProps = {
  className?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
type CardTitleProps = {
  className?: string;
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

// --- UI Components with Dark Mode ---
const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800";
  const variants = {
    default:
      "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
    destructive:
      "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
    outline:
      "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
    ghost:
      "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
    link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card: React.FC<CardProps> = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-xl border bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-50 ${className}`}
    {...props}
  >
    {children}
  </div>
);
const CardHeader: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);
const CardTitle: React.FC<CardTitleProps> = ({
  className = "",
  as = "h3",
  children,
  ...props
}) => {
  const Component = as;
  return (
    <Component
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
const CardDescription: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <p
    className={`text-sm text-slate-500 dark:text-slate-400 ${className}`}
    {...props}
  >
    {children}
  </p>
);
const CardContent: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// --- Main App Component ---
export default function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en");
  const [activeTab, setActiveTab] = useState("sender");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = content[language];

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.dir = t.dir;
  }, [theme, t.dir]);

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

  const navLinks = [
    { name: t.nav.howItWorks, href: "#how-it-works" },
    { name: t.nav.features, href: "#features" },
    { name: t.nav.testimonials, href: "#testimonials" },
  ];
  const featureIcons = [
    <Zap className="w-8 h-8 text-slate-900 dark:text-slate-50" />,
    <Feather className="w-8 h-8 text-slate-900 dark:text-slate-50" />,
    <Users className="w-8 h-8 text-slate-900 dark:text-slate-50" />,
    <Shield className="w-8 h-8 text-slate-900 dark:text-slate-50" />,
  ];
  const senderIcons = [
    <Search className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />,
    <Package className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />,
    <MapPin className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />,
  ];
  const transporterIcons = [
    <Car className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />,
    <Package className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />,
    <Zap className="w-10 h-10 mx-auto text-slate-500 dark:text-slate-400" />,
  ];

  return (
    <div className="bg-white dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-sm dark:shadow-md dark:shadow-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <Ship className="h-7 w-7 text-slate-900 dark:text-slate-50" />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                KargoConnect
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost">{t.auth.login}</Button>
                <Button>{t.auth.signup}</Button>
              </div>

              {/* Language and Theme Toggles */}
              <div className="relative" ref={langDropdownRef}>
                <Button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  variant="ghost"
                  size="icon"
                >
                  <Globe className="h-5 w-5" />
                </Button>
                {isLangDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => handleSetLanguage("en")}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleSetLanguage("fr")}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        Français
                      </button>
                      <button
                        onClick={() => handleSetLanguage("ar")}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
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

              {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-slate-950 shadow-xl transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
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
                className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50"
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col space-y-3">
              <Button variant="outline">{t.auth.login}</Button>
              <Button>{t.auth.signup}</Button>
            </div>
          </nav>
        </div>
      </div>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-200/40 dark:bg-grid-slate-800/40 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:[mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50">
              {t.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                {t.hero.findButton} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white dark:bg-slate-950"
              >
                {t.hero.becomeButton}
              </Button>
            </div>
            <div className="mt-8 text-slate-500 dark:text-slate-400 flex items-center justify-center space-x-4">
              <Package size={20} /> <Truck size={20} /> <Bike size={20} />{" "}
              <span>{t.hero.andMore}</span>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-16 md:py-24 bg-white dark:bg-slate-950"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {t.howItWorks.title}
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                {t.howItWorks.subtitle}
              </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="flex justify-center border border-slate-200 dark:border-slate-800 rounded-full p-1 bg-slate-100 dark:bg-slate-900">
                <button
                  onClick={() => setActiveTab("sender")}
                  className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                    activeTab === "sender"
                      ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-50"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {t.howItWorks.senderTab}
                </button>
                <button
                  onClick={() => setActiveTab("transporter")}
                  className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                    activeTab === "transporter"
                      ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-slate-50"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {t.howItWorks.transporterTab}
                </button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
                {(activeTab === "sender"
                  ? t.howItWorks.senderSteps
                  : t.howItWorks.transporterSteps
                ).map((step, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-center h-20 w-20 mx-auto bg-slate-100 dark:bg-slate-800/50 rounded-full">
                      {activeTab === "sender"
                        ? senderIcons[index]
                        : transporterIcons[index]}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {t.features.title}
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                {t.features.subtitle}
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.features.list.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-slate-100 dark:bg-slate-800/50 p-3 rounded-full">
                      {featureIcons[index]}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle as="h3" className="text-xl">
                      {feature.title}
                    </CardTitle>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-16 md:py-24 bg-white dark:bg-slate-950"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {t.testimonials.title}
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                {t.testimonials.subtitle}
              </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.testimonials.list.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-slate-700 dark:text-slate-300 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <footer className="mt-4">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    </footer>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-slate-900 dark:bg-black text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-50">
              {t.cta.title}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300 dark:text-slate-400">
              {t.cta.subtitle}
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-200 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900"
              >
                {t.cta.button} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} KargoConnect. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
              >
                {t.footer.terms}
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
              >
                {t.footer.privacy}
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
              >
                {t.footer.contact}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
