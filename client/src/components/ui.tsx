import React, {
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ElementType,
} from "react";

export type ButtonProps = {
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

export const Button = ({
  variant = "default",
  size,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost";
  size?: "lg" | "default" | "sm" | "icon";
}) => {
  const baseStyles =
    " cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    lg: "h-11 rounded-md px-8",
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size || "default"]} ${
        variants[variant]
      } ${className}`}
      {...props}
    />
  );
};

export type CardProps = {
  className?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = {
  className?: string;
  as?: ElementType;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export const Card: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div
    className={`rounded-xl border bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-50 ${className}`}
    {...props}
  >
    {children}
  </div>
);
export const CardHeader: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);
export const CardTitle: React.FC<CardTitleProps> = ({
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
export const CardDescription: React.FC<CardProps> = ({
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
export const CardContent: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);
