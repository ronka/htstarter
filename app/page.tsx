"use client";

import { useState } from "react";
import FilterBar from "@/components/FilterBar";
import ProjectList from "@/components/ProjectList";
import Sidebar from "@/components/Sidebar";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterBar
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        activeCategory={activeCategory}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ProjectList
              category={
                activeCategory === "All"
                  ? undefined
                  : activeCategory.toLowerCase()
              }
              search={searchQuery}
            />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
