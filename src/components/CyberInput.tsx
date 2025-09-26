import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Zap } from "lucide-react";

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

interface CyberTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
}

const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, label, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label className="text-sm font-mono uppercase tracking-wider text-primary flex items-center gap-2">
            {icon && <span className="text-accent">{icon}</span>}
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            className={cn(
              "bg-black/30 border-primary/30 text-primary placeholder:text-muted-foreground font-mono",
              "focus:border-primary focus:ring-primary/50 focus:shadow-glow transition-all duration-300",
              "hover:border-primary/50 hover:shadow-glow/50",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none rounded" />
        </div>
      </div>
    );
  }
);

const CyberTextarea = forwardRef<HTMLTextAreaElement, CyberTextareaProps>(
  ({ className, label, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label className="text-sm font-mono uppercase tracking-wider text-primary flex items-center gap-2">
            {icon && <span className="text-accent">{icon}</span>}
            {label}
          </Label>
        )}
        <div className="relative">
          <Textarea
            className={cn(
              "bg-black/30 border-primary/30 text-primary placeholder:text-muted-foreground font-mono min-h-32",
              "focus:border-primary focus:ring-primary/50 focus:shadow-glow transition-all duration-300",
              "hover:border-primary/50 hover:shadow-glow/50 terminal-scroll",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none rounded" />
        </div>
      </div>
    );
  }
);

CyberInput.displayName = "CyberInput";
CyberTextarea.displayName = "CyberTextarea";

export { CyberInput, CyberTextarea };