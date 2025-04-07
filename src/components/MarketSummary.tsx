
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

interface MarketSummaryProps {
  marketData: {
    indexName: string;
    value: number;
    change: number;
    changePercent: number;
  }[];
}

const MarketSummary: React.FC<MarketSummaryProps> = ({ marketData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {marketData.map((market) => (
        <Card key={market.indexName}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {market.indexName}
            </CardTitle>
            {market.change >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-positive" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-negative" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {market.value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div
              className={`text-xs ${
                market.change >= 0 ? "text-positive" : "text-negative"
              } flex items-center gap-1`}
            >
              <Activity className="h-3 w-3" />
              <span>
                {market.change >= 0 ? "+" : ""}
                {market.change.toFixed(2)} ({market.changePercent.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MarketSummary;
