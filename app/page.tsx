"use client";

import { useState } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProjectList from "@/components/ProjectList";
import Sidebar from "@/components/Sidebar";
import { mockProjects } from "@/data/mockData";

export default function HomePage() {
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProjects(mockProjects);
      return;
    }

    const filtered = mockProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(query.toLowerCase())
        )
    );
    setFilteredProjects(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProjects(mockProjects);
    } else {
      const filtered = mockProjects.filter(
        (project) => project.category === category
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <FilterBar
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        activeCategory={activeCategory}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ProjectList projects={filteredProjects} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
