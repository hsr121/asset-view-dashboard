
import React from "react";
import { Button } from "@/components/ui/button";
import { Asset } from "@/services/assetService";

interface AssetCategoriesProps {
  categories: {
    category: Asset["category"];
    label: string;
    count: number;
  }[];
  activeCategory: Asset["category"] | "all";
  onCategoryChange: (category: Asset["category"] | "all") => void;
}

const AssetCategories: React.FC<AssetCategoriesProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.category}
          variant={activeCategory === category.category ? "default" : "outline"}
          onClick={() => onCategoryChange(category.category)}
          className="rounded-full"
        >
          {category.label} ({category.count})
        </Button>
      ))}
    </div>
  );
};

export default AssetCategories;
