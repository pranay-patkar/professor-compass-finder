import { useState, useMemo } from "react";
import { professors } from "@/data/professors";
import { FilterState } from "@/data/types";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProfessorCard } from "@/components/ProfessorCard";
import { CompareModal } from "@/components/CompareModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, GitCompareArrows } from "lucide-react";

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>({
    departments: [],
    academicYears: [],
    ratingThreshold: 0,
    teachingStyle: "All",
  });
  const [search, setSearch] = useState("");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    return professors.filter(p => {
      if (filters.departments.length && !filters.departments.includes(p.department)) return false;
      if (filters.academicYears.length && !p.academicYears.some(y => filters.academicYears.includes(y))) return false;
      if (filters.ratingThreshold > 0 && p.averageRating < filters.ratingThreshold) return false;
      if (filters.teachingStyle !== "All" && p.teachingStyle !== filters.teachingStyle) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
  }, [filters, search]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      <FilterSidebar filters={filters} onChange={setFilters} />

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display text-lg text-foreground uppercase tracking-wide">Explore Professors</h1>
              <p className="text-2xs text-muted-foreground uppercase tracking-wider mt-0.5">{filtered.length} results</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search name or subject..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-7 w-64 h-8 text-xs border-2 border-foreground rounded-none bg-card"
                />
              </div>
              {compareIds.length === 2 && (
                <Button
                  onClick={() => setShowCompare(true)}
                  className="h-8 text-xs uppercase tracking-wider border-2"
                >
                  <GitCompareArrows className="h-3.5 w-3.5 mr-1" />
                  Compare
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map(p => (
              <ProfessorCard
                key={p.id}
                professor={p}
                isCompareSelected={compareIds.includes(p.id)}
                onCompareToggle={toggleCompare}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="font-display text-sm uppercase">No matches found</p>
              <p className="text-2xs mt-1 uppercase tracking-wider">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </main>

      {showCompare && (
        <CompareModal
          ids={compareIds}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
