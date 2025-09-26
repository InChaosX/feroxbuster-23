import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { CyberButton } from "@/components/CyberButton";
import { CyberTextarea } from "@/components/CyberInput";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Upload, 
  Database, 
  Edit3,
  Check
} from "lucide-react";
import { DEFAULT_WORDLISTS, WordlistCategory } from "@/data/wordlists";

interface WordlistManagerProps {
  wordlist: string;
  onWordlistChange: (value: string) => void;
}

export function WordlistManager({ wordlist, onWordlistChange }: WordlistManagerProps) {
  const [activeTab, setActiveTab] = useState("manual");
  const [selectedDefault, setSelectedDefault] = useState<WordlistCategory | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onWordlistChange(content);
        setActiveTab("manual");
      };
      reader.readAsText(file);
    }
  };

  const handleDefaultSelect = (category: WordlistCategory) => {
    const paths = DEFAULT_WORDLISTS[category];
    onWordlistChange(paths.join('\n'));
    setSelectedDefault(category);
    setActiveTab("manual");
  };

  return (
    <Card className="bg-black/50 border-primary/30 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-mono uppercase tracking-wider text-primary">
          Wordlist Configuration
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-black/30">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Manual
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="defaults" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Defaults
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <CyberTextarea
            label="Wordlist Paths"
            icon={<Edit3 className="w-4 h-4" />}
            placeholder="Enter paths (one per line)&#10;admin&#10;login&#10;dashboard&#10;config&#10;backup"
            value={wordlist}
            onChange={(e) => onWordlistChange(e.target.value)}
            rows={10}
          />
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>Lines: {wordlist.split('\n').filter(line => line.trim()).length}</span>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="text-center p-8 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 transition-colors">
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-primary font-mono mb-4">Upload wordlist.txt file</p>
            <CyberButton
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Choose File
            </CyberButton>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.list"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </TabsContent>

        <TabsContent value="defaults" className="space-y-4">
          <div className="grid gap-3">
            {Object.entries(DEFAULT_WORDLISTS).map(([category, paths]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-accent text-accent">
                      {category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">
                      {paths.length} paths
                    </span>
                  </div>
                  <CyberButton
                    variant={selectedDefault === category ? "success" : "primary"}
                    size="sm"
                    onClick={() => handleDefaultSelect(category as WordlistCategory)}
                    className="flex items-center gap-2"
                  >
                    {selectedDefault === category ? (
                      <>
                        <Check className="w-3 h-3" />
                        Selected
                      </>
                    ) : (
                      "Use This"
                    )}
                  </CyberButton>
                </div>
                <div className="text-xs text-muted-foreground font-mono pl-2 border-l border-primary/20">
                  {paths.slice(0, 3).join(", ")}
                  {paths.length > 3 && `, +${paths.length - 3} more...`}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}