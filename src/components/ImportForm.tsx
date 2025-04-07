
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, Table, FileType, Download } from "lucide-react";

const ImportForm: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const [csvData, setCsvData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvData(text || "");
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Portfolio imported successfully",
        description: `${fileName || "Portfolio data"} has been imported.`,
      });
    }, 2000);
  };

  const handleDownloadTemplate = () => {
    // Create CSV template content
    const templateContent = "symbol,name,quantity,purchasePrice,purchaseDate\nAAPL,Apple Inc.,10,180.50,2023-01-15\nMSFT,Microsoft Corp.,5,350.20,2023-02-20";
    
    // Create blob and trigger download
    const blob = new Blob([templateContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Portfolio</CardTitle>
        <CardDescription>
          Import your portfolio data from a CSV file or paste it directly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="paste">Paste Data</TabsTrigger>
          </TabsList>
          <TabsContent value="file" className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-md cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {fileName ? fileName : "Click to upload or drag and drop"}
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Supported format: CSV
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs flex gap-1"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="h-3 w-3" />
                  Download Template
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="paste" className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Textarea
                placeholder="Paste your CSV data here..."
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Format: symbol,name,quantity,purchasePrice,purchaseDate
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          type="submit" 
          onClick={handleImport} 
          disabled={!fileName && !csvData || isLoading}
          className="flex gap-2"
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
          ) : (
            <Table className="h-4 w-4" />
          )}
          Import Portfolio
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImportForm;
