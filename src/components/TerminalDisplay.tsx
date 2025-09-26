import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ScanResult {
  status: number;
  path: string;
  fullUrl: string;
  timestamp: string;
}

interface TerminalDisplayProps {
  results: ScanResult[];
  isScanning: boolean;
  className?: string;
}

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return "text-cyber-green";
  if (status >= 300 && status < 400) return "text-cyber-yellow";
  if (status >= 400 && status < 500) return "text-cyber-pink";
  if (status >= 500) return "text-destructive";
  return "text-muted-foreground";
};

export function TerminalDisplay({ results, isScanning, className }: TerminalDisplayProps) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [results]);

  return (
    <Card className={cn("bg-black/50 border-primary/30 backdrop-blur-sm", className)}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <div className="w-3 h-3 bg-cyber-yellow rounded-full"></div>
            <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
          </div>
          <span className="text-sm font-mono text-muted-foreground">dirhuntr.terminal</span>
          {isScanning && (
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-primary">SCANNING...</span>
            </div>
          )}
        </div>
        
        <div 
          ref={terminalRef}
          className="h-64 overflow-y-auto terminal-scroll font-mono text-sm space-y-1 p-2 bg-background/50 rounded border border-primary/20"
        >
          {results.length === 0 && !isScanning && (
            <div className="text-muted-foreground">
              <span className="text-primary">dirhuntr@cyber:~$</span> Waiting for scan to start...
            </div>
          )}
          
          {results.map((result, index) => (
            <div key={index} className="flex items-center gap-4 hover:bg-primary/5 px-2 py-1 rounded group">
              <span className="text-muted-foreground text-xs">
                {result.timestamp}
              </span>
              <span className={cn("font-bold w-12", getStatusColor(result.status))}>
                {result.status}
              </span>
              <a 
                href={result.fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors cursor-pointer flex-1 font-mono text-sm group-hover:underline"
              >
                {result.fullUrl}
              </a>
            </div>
          ))}
          
          {isScanning && (
            <div className="text-primary flex items-center gap-2">
              <span>dirhuntr@cyber:~$</span>
              <span className="typing">Enumerating directories</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}