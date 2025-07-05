import Image from "next/image";

const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="relative h-64 md:h-80 flex items-center justify-center">
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/search_page.jpg"
        alt="Abstract gradient background"
        fill
        className="object-cover"
        priority
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            "https://placehold.co/2070x320/1e293b/ffffff?text=KargoConnect";
        }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-900/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent"></div>
    </div>
    <div className="relative z-10 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-200">
        {subtitle}
      </p>
    </div>
  </div>
);

export default PageHeader;
