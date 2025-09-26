import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const cyberButtonVariants = cva(
  "relative overflow-hidden font-mono uppercase tracking-wider transition-all duration-300 hover:scale-105",
  {
    variants: {
      variant: {
        primary: "bg-transparent border-2 border-primary text-primary hover:text-primary-foreground hover:shadow-glow",
        accent: "bg-transparent border-2 border-accent text-accent hover:text-accent-foreground hover:shadow-glow-accent",
        success: "bg-transparent border-2 border-cyber-green text-cyber-green hover:text-background hover:shadow-glow-green",
        danger: "bg-transparent border-2 border-destructive text-destructive hover:text-destructive-foreground hover:shadow-[0_0_20px_hsl(var(--destructive)/0.5)]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-sm",
        lg: "h-12 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface CyberButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {}

const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <Button
        className={cn(cyberButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-current opacity-0 transition-opacity duration-300 hover:opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-700 hover:translate-x-full" />
      </Button>
    );
  }
);

CyberButton.displayName = "CyberButton";

export { CyberButton, cyberButtonVariants };