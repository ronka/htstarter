"use client";

import { useEffect, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { techOptions, getTechnologyStyle } from "@/lib/technologies";
import { useQueryState } from "nuqs";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useQueryState("q");

  const [selectedFilters, setSelectedFilters] = useQueryState("filters", {
    defaultValue: [] as string[],
    parse: (value) => (value ? value.split(",").filter(Boolean) : []),
    serialize: (value) => (value.length > 0 ? value.join(",") : ""),
  });

  const availableFilters = techOptions.map((tech) => tech.name);
  const [isSearching, setIsSearching] = useState(false);

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is now handled automatically through URL state
    // The search query and filters are already in the URL
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            חפש פרויקטים מדהימים
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            גלה פרויקטים חדשניים וטכנולוגיות מתקדמות
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Main Search Bar */}
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <Input
                  type="text"
                  placeholder="חפש פרויקטים, טכנולוגיות, או מפתחים..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 text-lg pr-12 pl-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              {/* Filters Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-700">
                    סנן לפי טכנולוגיה:
                  </h3>
                  {selectedFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 ml-1" />
                      נקה סינון
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableFilters.map((filter) => {
                    const techStyle = getTechnologyStyle(filter);
                    const isSelected = selectedFilters.includes(filter);
                    return (
                      <Badge
                        key={filter}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer transition-all border ${
                          isSelected
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : techStyle.color
                        }`}
                        onClick={() => handleFilterToggle(filter)}
                      >
                        {techStyle.emoji && (
                          <span className="ml-1">{techStyle.emoji}</span>
                        )}
                        {filter}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
                >
                  <Search className="h-5 w-5 ml-2" />
                  חפש פרויקטים
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results Placeholder */}
        {(searchQuery || selectedFilters.length > 0) && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {searchQuery
                  ? `תוצאות חיפוש עבור "${searchQuery}"`
                  : "פרויקטים מסוננים"}
              </h2>
              <p className="text-gray-600">
                {selectedFilters.length > 0 &&
                  `עם סינון: ${selectedFilters.join(", ")}`}
              </p>
            </div>

            {isSearching ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">מחפש פרויקטים...</p>
              </div>
            ) : (
              /* Placeholder for search results */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card
                    key={item}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        <div className="flex gap-2">
                          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && selectedFilters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              התחל לחפש פרויקטים
            </h3>
            <p className="text-gray-500">
              השתמש בסרגל החיפוש למעלה כדי למצוא פרויקטים מעניינים
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
