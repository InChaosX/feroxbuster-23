import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CyberButton } from "@/components/CyberButton";
import { CyberInput } from "@/components/CyberInput";
import { TerminalDisplay } from "@/components/TerminalDisplay";
import { ConfigPanel } from "@/components/ConfigPanel";
import { WordlistManager } from "@/components/WordlistManager";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Square, 
  Target, 
  FileText, 
  Shield, 
  Activity,
  Zap,
  Search
} from "lucide-react";
import cyberHero from "@/assets/cyber-hero.jpg";

interface ScanResult {
  status: number;
  path: string;
  fullUrl: string;
  timestamp: string;
}

const Index = () => {
  const [target, setTarget] = useState("");
  const [wordlist, setWordlist] = useState("");
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [concurrency, setConcurrency] = useState(10);
  const [timeoutValue, setTimeoutValue] = useState(5);
  const [scanStats, setScanStats] = useState({
    total: 0,
    completed: 0,
    found: 0
  });

  // Mock scanning simulation
  const mockScanResults = [
    { status: 200, path: "/admin" },
    { status: 200, path: "/dashboard" },
    { status: 401, path: "/secret" },
    { status: 403, path: "/config.php" },
    { status: 404, path: "/hidden" },
    { status: 200, path: "/backup" },
    { status: 500, path: "/error" },
    { status: 301, path: "/redirect" },
    { status: 200, path: "/uploads" },
    { status: 403, path: "/private" },
  ];

  const handleStart = async () => {
    if (!target || !wordlist) return;
    
    setIsScanning(true);
    setResults([]);
    
    const paths = wordlist.split('\n').filter(line => line.trim());
    setScanStats({ total: paths.length, completed: 0, found: 0 });
    
    // Simulate scanning with realistic timing
    for (let i = 0; i < Math.min(paths.length, 10); i++) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      const mockResult = mockScanResults[i % mockScanResults.length];
      const path = paths[i] || mockResult.path;
      const newResult: ScanResult = {
        status: mockResult.status,
        path: path,
        fullUrl: `${target.replace(/\/$/, '')}/${path.replace(/^\//, '')}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setResults(prev => [...prev, newResult]);
      setScanStats(prev => ({
        ...prev,
        completed: prev.completed + 1,
        found: prev.found + (newResult.status < 400 ? 1 : 0)
      }));
    }
    
    setIsScanning(false);
  };

  const handleStop = () => {
    setIsScanning(false);
  };

  const isFormValid = target.trim() && wordlist.trim();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>

      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src={cyberHero}
          alt="Cyberpunk background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary pulse-glow" />
            <h1 className="text-4xl md:text-8xl font-mono font-bold bg-gradient-cyber bg-clip-text text-transparent">
              feroxbuster
            </h1>

            <Shield className="w-8 h-8 text-primary pulse-glow" />
          </div>
          <h2>feroxbuster is a tool designed to perform Forced Browsing</h2>
          <p className="text-xs text-muted-foreground font-mono">
            Advanced Directory Enumeration Tool
          </p>

          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="outline" className="border-primary text-primary">
              v2.0.1
            </Badge>
            <Badge variant="outline" className="border-accent text-accent">
              CYBERPUNK EDITION
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/50 border-primary/30 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-mono uppercase tracking-wider text-primary">
                  Target Configuration
                </h2>
              </div>

              <div className="space-y-6">
                <CyberInput
                  label="Target URL"
                  icon={<Target className="w-4 h-4" />}
                  placeholder="https://example.com"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                />
              </div>
            </Card>

            {/* Controls */}
            <Card className="bg-black/50 border-primary/30 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CyberButton
                    variant="success"
                    onClick={handleStart}
                    disabled={!isFormValid || isScanning}
                    className="flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    {isScanning ? "SCANNING..." : "START SCAN"}
                  </CyberButton>

                  {isScanning && (
                    <CyberButton
                      variant="danger"
                      onClick={handleStop}
                      className="flex items-center gap-2"
                    >
                      <Square className="w-4 h-4" />
                      STOP
                    </CyberButton>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm font-mono">
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4 text-cyber-yellow" />
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="text-primary">
                      {scanStats.completed}/{scanStats.total}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Search className="w-4 h-4 text-cyber-green" />
                    <span className="text-muted-foreground">Found:</span>
                    <span className="text-cyber-green">{scanStats.found}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Wordlist Manager */}
          <div>
            <WordlistManager
              wordlist={wordlist}
              onWordlistChange={setWordlist}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-3">
            <ConfigPanel
              concurrency={concurrency}
              timeout={timeoutValue}
              onConcurrencyChange={setConcurrency}
              onTimeoutChange={setTimeoutValue}
            />
          </div>
        </div>

        {/* Terminal Display */}
        <TerminalDisplay
          results={results}
          isScanning={isScanning}
          className="mb-8"
        />

        {/* Footer */}
        <div className="text-center text-sm font-mono text-muted-foreground">
          <p>Built with ⚡ by cybersecurity enthusiasts</p>
          <p className="mt-1">
            Use responsibly and only on systems you own or have permission to
            test
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;