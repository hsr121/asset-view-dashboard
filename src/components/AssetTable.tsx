
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MoreHorizontal, AlertCircle } from "lucide-react";
import { Asset } from "@/services/assetService";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AssetTableProps {
  assets: Asset[];
  isLoading: boolean;
}

type SortField = keyof Asset | null;
type SortDirection = "asc" | "desc";

const AssetTable: React.FC<AssetTableProps> = ({ assets, isLoading }) => {
  const [sortField, setSortField] = useState<SortField>("symbol");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    if (!sortField) return 0;
    
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA === fieldB) return 0;
    
    const comparison = fieldA < fieldB ? -1 : 1;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2
    }).format(value / 100);
  };

  const formatLargeNumber = (value: number): string => {
    if (value === 0) return '—';
    if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T';
    if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(2) + 'K';
    return value.toString();
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === "asc" 
      ? <ChevronUp className="ml-1 h-4 w-4" /> 
      : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading assets...</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort("symbol")}
            >
              <div className="flex items-center">
                Symbol {renderSortIcon("symbol")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Name {renderSortIcon("name")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center justify-end">
                Price {renderSortIcon("price")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort("changePercent")}
            >
              <div className="flex items-center justify-end">
                Change % {renderSortIcon("changePercent")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort("loanToValue")}
            >
              <div className="flex items-center justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        LTV {renderSortIcon("loanToValue")}
                        <AlertCircle className="ml-1 h-3 w-3 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Loan To Value Ratio
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort("volume")}
            >
              <div className="flex items-center justify-end">
                Volume {renderSortIcon("volume")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort("marketCap")}
            >
              <div className="flex items-center justify-end">
                Market Cap {renderSortIcon("marketCap")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer text-right"
              onClick={() => handleSort("rating")}
            >
              <div className="flex items-center justify-end">
                Rating {renderSortIcon("rating")}
              </div>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground py-10">
                No assets found
              </TableCell>
            </TableRow>
          ) : (
            sortedAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.symbol}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell className="text-right">{formatCurrency(asset.price)}</TableCell>
                <TableCell className={`text-right ${asset.changePercent >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                  {(asset.loanToValue * 100).toFixed(0)}%
                </TableCell>
                <TableCell className="text-right">{formatLargeNumber(asset.volume)}</TableCell>
                <TableCell className="text-right">{formatLargeNumber(asset.marketCap)}</TableCell>
                <TableCell className={`text-right ${
                  asset.rating === 'A' ? 'text-positive' :
                  asset.rating === 'D' ? 'text-negative' : ''
                }`}>
                  {asset.rating}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(asset.symbol)}>
                        Copy Symbol
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
                      <DropdownMenuItem>Trade</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetTable;
