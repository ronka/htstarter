import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  activeCategory: string;
}

const categories = [
  { name: "All", label: "הכל", color: "bg-gray-100 text-gray-700" },
  { name: "chef", label: "שף", color: "bg-red-100 text-red-700", icon: "🧑‍🍳" },
  {
    name: "convex",
    label: "קונבקס",
    color: "bg-orange-100 text-orange-700",
    icon: "🟠",
  },
  {
    name: "lovable",
    label: "מקסים",
    color: "bg-blue-100 text-blue-700",
    icon: "💙",
  },
  {
    name: "tempo",
    label: "טמפו",
    color: "bg-gray-100 text-gray-700",
    icon: "⏱️",
  },
  {
    name: "cursor",
    label: "קרסור",
    color: "bg-purple-100 text-purple-700",
    icon: "🖱️",
  },
  {
    name: "bolt",
    label: "בזק",
    color: "bg-yellow-100 text-yellow-700",
    icon: "⚡",
  },
  {
    name: "replit",
    label: "רפליט",
    color: "bg-green-100 text-green-700",
    icon: "🔄",
  },
  { name: "v0", label: "v0", color: "bg-gray-100 text-gray-700", icon: "v0" },
  {
    name: "windsurf",
    label: "וינדסרף",
    color: "bg-cyan-100 text-cyan-700",
    icon: "🏄",
  },
  {
    name: "base44",
    label: "בסיס44",
    color: "bg-orange-200 text-orange-800",
    icon: "🟧",
  },
];

const FilterBar = ({
  onSearch,
  onCategoryFilter,
  activeCategory,
}: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="חפש..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 pl-4 w-64"
              />
            </form>

            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>כל הקטגוריות</option>
            </select>

            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>כל הזמנים</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-end">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryFilter(category.name)}
              className={`whitespace-nowrap text-xs ${
                activeCategory === category.name
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : `${category.color} border hover:bg-opacity-80`
              }`}
            >
              {category.icon && <span className="ml-1">{category.icon}</span>}
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
