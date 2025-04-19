
import React from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  withPulse?: boolean;
  withHoverScale?: boolean;
  children: React.ReactNode;
}

const CTAButton = ({
  variant = "primary",
  size = "md",
  withPulse = false,
  withHoverScale = true,
  className,
  children,
  ...props
}: CTAButtonProps) => {
  const baseStyles = "font-sans font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-eco-primary text-white hover:bg-eco-dark",
    secondary: "bg-eco-secondary text-white hover:bg-eco-primary",
    accent: "bg-eco-accent text-white hover:brightness-110",
  };
  
  const sizeStyles = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };
  
  const pulseStyle = withPulse ? "animate-pulse-green" : "";
  const hoverScaleStyle = withHoverScale ? "hover:scale-105 active:scale-95" : "";
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        pulseStyle,
        hoverScaleStyle,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CTAButton;
