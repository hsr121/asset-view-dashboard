
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AssetTable from "@/components/AssetTable";
import { Asset, searchAssets } from "@/services/assetService";
import { Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState<string>(initialQuery);
  const [searchResults, setSearchResults] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(!!initialQuery);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setIsSearched(true);
    
    try {
      const results = await searchAssets(query);
      setSearchResults(results);
      setSearchParams({ q: query });
    } catch (err) {
      setError("Failed to search assets. Please try again.");
      console.error("Error searching assets:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Search Assets</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Asset Search</CardTitle>
          <CardDescription>
            Search for assets by name or symbol
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by symbol or name..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isSearched && (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-medium">
                  {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{query}"
                </h3>
              </div>
              <AssetTable assets={searchResults} isLoading={isLoading} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchPage;
