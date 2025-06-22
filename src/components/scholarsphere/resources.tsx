"use client";

import React, { useState, useMemo } from "react";
import { ResourceCard } from "./resource-card";
import { mockResources, branches, resourceTypes } from "@/lib/data";
import type { Resource } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "../ui/separator";

const years = ["All", "1", "2", "3", "4"];
const semesters = ["All", "1", "2", "3", "4", "5", "6", "7", "8"];

const AdPlaceholder = ({ className }: { className?: string }) => (
  <Card className={`flex items-center justify-center h-24 bg-secondary border-dashed ${className}`}>
    <p className="text-muted-foreground text-sm">Ad Space (e.g., Google AdSense)</p>
    {/* Google AdSense code can be inserted here */}
  </Card>
);


export function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const filteredResources = useMemo(() => {
    return mockResources.filter((resource: Resource) => {
      const searchMatch =
        searchTerm === "" ||
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.desc.toLowerCase().includes(searchTerm.toLowerCase());

      const yearMatch = selectedYear === "All" || resource.year === parseInt(selectedYear, 10);
      const semesterMatch = selectedSemester === "All" || resource.semester === parseInt(selectedSemester, 10);
      const branchMatch = selectedBranch === "All" || resource.branch === selectedBranch;
      const typeMatch = selectedType === "All" || resource.type === selectedType;

      return searchMatch && yearMatch && semesterMatch && branchMatch && typeMatch;
    });
  }, [searchTerm, selectedYear, selectedSemester, selectedBranch, selectedType]);

  return (
    <section id="resources" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Find Your Study Materials
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Use the filters to narrow down your search and find exactly what you need.
            </p>
        </div>
        
        <Card className="p-4 md:p-6 mt-8 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="relative sm:col-span-2 lg:col-span-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>{years.map(y => <SelectItem key={y} value={y}>Year: {y}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger><SelectValue placeholder="Semester" /></SelectTrigger>
                    <SelectContent>{semesters.map(s => <SelectItem key={s} value={s}>Semester: {s}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger><SelectValue placeholder="Branch" /></SelectTrigger>
                    <SelectContent>{["All", ...branches].map(b => <SelectItem key={b} value={b}>Branch: {b}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>{["All", ...resourceTypes].map(t => <SelectItem key={t} value={t}>Type: {t}</SelectItem>)}</SelectContent>
                </Select>
            </div>
        </Card>

        <Separator className="my-8" />

        <AdPlaceholder className="mb-8" />

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No resources found. Try adjusting your filters.</p>
          </div>
        )}

        <AdPlaceholder className="mt-8" />
      </div>
    </section>
  );
}
