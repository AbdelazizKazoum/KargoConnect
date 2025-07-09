const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="bg-secondary/50 p-3 rounded-lg text-center flex-1">
    <div className="text-primary mx-auto h-6 w-6 mb-1">{icon}</div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-base font-bold">{value}</p>
  </div>
);

export default StatItem;
