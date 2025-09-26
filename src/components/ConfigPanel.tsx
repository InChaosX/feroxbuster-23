import { Card } from "@/components/ui/card";
import { CyberInput } from "./CyberInput";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings, Zap, Clock } from "lucide-react";

interface ConfigPanelProps {
  concurrency: number;
  timeout: number;
  onConcurrencyChange: (value: number) => void;
  onTimeoutChange: (value: number) => void;
}

export function ConfigPanel({ 
  concurrency, 
  timeout, 
  onConcurrencyChange, 
  onTimeoutChange 
}: ConfigPanelProps) {
  return (
    <Card className="bg-black/50 border-accent/30 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-mono uppercase tracking-wider text-accent">
          Configuration
        </h3>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-mono uppercase tracking-wider text-primary flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyber-yellow" />
            Concurrency: {concurrency}
          </Label>
          <Slider
            value={[concurrency]}
            onValueChange={(value) => onConcurrencyChange(value[0])}
            max={100}
            min={1}
            step={1}
            className="cyber-slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>1</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label className="text-sm font-mono uppercase tracking-wider text-primary flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyber-pink" />
            Timeout: {timeout}s
          </Label>
          <Slider
            value={[timeout]}
            onValueChange={(value) => onTimeoutChange(value[0])}
            max={30}
            min={1}
            step={1}
            className="cyber-slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>1s</span>
            <span>15s</span>
            <span>30s</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-primary/20">
          <div className="text-xs font-mono text-muted-foreground space-y-1">
            <div>• Higher concurrency = faster scans</div>
            <div>• Lower timeout = quicker responses</div>
            <div>• Adjust based on target server capacity</div>
          </div>
        </div>
      </div>
    </Card>
  );
}