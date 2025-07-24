"use client";

import { Suspense } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { techOptions, getTechnologyStyle } from "@/lib/technologies";
import { useQueryState } from "nuqs";
import { useSearchProjects } from "@/hooks/use-search-projects";
import { SearchProjectCard } from "@/components/SearchProjectCard";
import { useDebounce } from "@/hooks/use-debounce";
import { useState } from "react";

const sortOptions = [
  {
    value: "createdAt-desc",
    label: "חדש ביותר",
    description: "לפי תאריך יצירה (חדש)",
  },
  {
    value: "createdAt-asc",
    label: "ישן ביותר",
    description: "לפי תאריך יצירה (ישן)",
  },
  {
    value: "votes-desc",
    label: "הכי פופולרי",
    description: "לפי הצבעות (גבוה)",
  },
  {
    value: "votes-asc",
    label: "הכי פחות פופולרי",
    description: "לפי הצבעות (נמוך)",
  },
  { value: "title-asc", label: "א-ב", description: "לפי שם (א-ב)" },
  { value: "title-desc", label: "ת-א", description: "לפי שם (ת-א)" },
];

// Filters Component
function FiltersSection({
  availableFilters,
  selectedFilters,
  onFilterToggle,
  onClearFilters,
}: {
  availableFilters: string[];
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  onClearFilters: () => void;
}) {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const initialFilterCount = 15;
  const displayedFilters = showAllFilters
    ? availableFilters
    : availableFilters.slice(0, initialFilterCount);
  const hasMoreFilters = availableFilters.length > initialFilterCount;

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="font-semibold text-gray-700">סנן לפי טכנולוגיה:</h3>
        {selectedFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4 ml-1" />
            נקה סינון
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {displayedFilters.map((filter) => {
          const techStyle = getTechnologyStyle(filter);
          const isSelected = selectedFilters.includes(filter);
          return (
            <Badge
              key={filter}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all border ${
                isSelected
                  ? "bg-blue-600 hover:bg-blue-700 text-white scale-125"
                  : techStyle.color
              }`}
              onClick={() => onFilterToggle(filter)}
            >
              {techStyle.emoji && (
                <span className="ml-1">{techStyle.emoji}</span>
              )}
              {filter}
            </Badge>
          );
        })}
      </div>

      {hasMoreFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAllFilters(!showAllFilters)}
          className="mt-2"
        >
          {showAllFilters ? (
            <>
              <ChevronDown className="h-4 w-4 ml-1 rotate-180" />
              הצג פחות
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 ml-1" />
              הצג עוד ({availableFilters.length - initialFilterCount} נוספים)
            </>
          )}
        </Button>
      )}
    </div>
  );
}

// Search Content Component (uses useQueryState)
function SearchContent() {
  const [searchQuery, setSearchQuery] = useQueryState("q");

  const [selectedFilters, setSelectedFilters] = useQueryState("filters", {
    defaultValue: [] as string[],
    parse: (value) => (value ? value.split(",").filter(Boolean) : []),
    serialize: (value) => (value.length > 0 ? value.join(",") : ""),
  });

  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => parseInt(value) || 1,
    serialize: (value) => value.toString(),
  });

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
    parse: (value) => value || "createdAt",
    serialize: (value) => value,
  });

  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
    parse: (value) => value || "desc",
    serialize: (value) => value,
  });

  const availableFilters = techOptions.map((tech) => tech.name);

  // Use the search hook
  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchProjects({
    q: searchQuery || undefined,
    filters: selectedFilters,
    page: currentPage,
    limit: 12,
    sortBy: sortBy as "createdAt" | "votes" | "title",
    sortOrder: sortOrder as "asc" | "desc",
  });

  // Track if user is currently typing (for debounce indicator)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isTyping = searchQuery !== debouncedSearchQuery;

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is now handled automatically through URL state
    // The search query and filters are already in the URL
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-") as [
      "createdAt" | "votes" | "title",
      "asc" | "desc"
    ];
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get current sort option value
  const currentSortValue = `${sortBy}-${sortOrder}`;

  // Generate pagination items
  const generatePaginationItems = () => {
    if (!searchResults?.pagination) return [];

    const { page, totalPages } = searchResults.pagination;
    const items = [];

    // Always show first page
    if (page > 1) {
      items.push(1);
    }

    // Show ellipsis if there's a gap
    if (page > 3) {
      items.push("ellipsis-start");
    }

    // Show pages around current page
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        items.push(i);
      }
    }

    // Show ellipsis if there's a gap
    if (page < totalPages - 2) {
      items.push("ellipsis-end");
    }

    // Always show last page
    if (page < totalPages) {
      items.push(totalPages);
    }

    return items;
  };

  return (
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
                className={`h-14 text-lg pr-12 pl-4 border-2 transition-all ${
                  isTyping
                    ? "border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
              />
              {isTyping && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Filters and Sort Section */}
            <div className="flex flex-col gap-4">
              {/* Filters Section */}
              <FiltersSection
                availableFilters={availableFilters}
                selectedFilters={selectedFilters}
                onFilterToggle={handleFilterToggle}
                onClearFilters={clearFilters}
              />

              {/* Sort Section */}
              <div className="lg:w-64 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  מיון:
                </label>
                <Select
                  value={currentSortValue}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs text-gray-500">
                            {option.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
            <div className="text-gray-600">
              {searchResults?.pagination && (
                <p>
                  נמצאו {searchResults.pagination.total} פרויקטים
                  {selectedFilters.length > 0 &&
                    ` עם סינון: ${selectedFilters.join(", ")}`}
                </p>
              )}
            </div>
          </div>

          {isTyping ? (
            <div className="text-center py-8">
              <div className="inline-block animate-pulse rounded-full h-8 w-8 bg-gray-300"></div>
              <p className="mt-2 text-gray-600">מקליד...</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">מחפש פרויקטים...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">שגיאה בחיפוש פרויקטים</p>
            </div>
          ) : searchResults?.data && searchResults.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.data.map((project) => (
                  <SearchProjectCard
                    key={project.id}
                    id={project.id.toString()}
                    title={project.title}
                    description={project.description}
                    image={project.image || "/placeholder.svg"}
                    author={{
                      name: project.author.name,
                      avatar: project.author.avatar || "",
                      id: project.author.id,
                    }}
                    technologies={project.technologies || []}
                    totalVotes={project.votes}
                  />
                ))}
              </div>

              {/* Pagination */}
              {searchResults.pagination &&
                searchResults.pagination.totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination>
                      <PaginationContent>
                        {/* Previous Button */}
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) {
                                handlePageChange(currentPage - 1);
                              }
                            }}
                            className={
                              currentPage <= 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>

                        {/* Page Numbers */}
                        {generatePaginationItems().map((item, index) => (
                          <PaginationItem key={index}>
                            {item === "ellipsis-start" ||
                            item === "ellipsis-end" ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(item as number);
                                }}
                                isActive={currentPage === item}
                              >
                                {item}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}

                        {/* Next Button */}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (
                                currentPage <
                                searchResults.pagination.totalPages
                              ) {
                                handlePageChange(currentPage + 1);
                              }
                            }}
                            className={
                              currentPage >= searchResults.pagination.totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>

                    {/* Page Info */}
                    <div className="text-center mt-4 text-sm text-gray-600">
                      עמוד {currentPage} מתוך{" "}
                      {searchResults.pagination.totalPages}
                      {" • "}
                      {searchResults.pagination.total} פרויקטים בסך הכל
                    </div>
                  </div>
                )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">לא נמצאו פרויקטים</p>
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
  );
}

// Loading component for Suspense fallback
function SearchLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            חפש פרויקטים מדהימים
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            גלה פרויקטים חדשניים וטכנולוגיות מתקדמות
          </p>
        </div>

        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">טוען...</p>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
