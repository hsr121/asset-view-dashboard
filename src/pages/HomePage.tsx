
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AssetTable from "@/components/AssetTable";
import AssetCategories from "@/components/AssetCategories";
import MarketSummary from "@/components/MarketSummary";
import { Asset, fetchAssets, fetchAssetsByCategory } from "@/services/assetService";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const HomePage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Asset["category"] | "all">("all");

  // Market indices data for the summary cards
  const marketIndices = [
    {
      indexName: "S&P 500",
      value: 5218.50,
      change: 23.45,
      changePercent: 0.45,
    },
    {
      indexName: "Dow Jones",
      value: 38765.32,
      change: -45.67,
      changePercent: -0.12,
    },
    {
      indexName: "Nasdaq",
      value: 16340.87,
      change: 82.23,
      changePercent: 0.51,
    },
  ];

  // Category counts for filtering
  const categories = [
    { category: "stock" as const, label: "Stocks", count: 0 },
    { category: "bond" as const, label: "Bonds", count: 0 },
    { category: "commodity" as const, label: "Commodities", count: 0 },
    { category: "crypto" as const, label: "Crypto", count: 0 },
    { category: "forex" as const, label: "Forex", count: 0 },
  ];

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAssets();
        setAssets(data);
        setFilteredAssets(data);
      } catch (err) {
        setError("Failed to load assets. Please try again.");
        console.error("Error loading assets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    const filterAssets = async () => {
      setIsLoading(true);
      try {
        if (activeCategory === "all") {
          setFilteredAssets(assets);
        } else {
          const data = await fetchAssetsByCategory(activeCategory);
          setFilteredAssets(data);
        }
      } catch (err) {
        console.error("Error filtering assets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    filterAssets();
  }, [activeCategory, assets]);

  // Calculate category counts
  const categoryCounts = categories.map(category => ({
    ...category,
    count: assets.filter(asset => asset.category === category.category).length
  }));

  const handleCategoryChange = (category: Asset["category"] | "all") => {
    setActiveCategory(category);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Market Dashboard</h1>
      
      <MarketSummary marketData={marketIndices} />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Asset Overview</CardTitle>
          <CardDescription>
            Current market data and loan-to-value ratios for various financial assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssetCategories 
            categories={categoryCounts}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <AssetTable assets={filteredAssets} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
