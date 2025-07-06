const Avatar = ({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: React.ReactNode;
}) => (
  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
    {src ? (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    ) : (
      fallback
    )}
  </div>
);

export default Avatar;
