import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilterState, Department, AcademicYear, TeachingStyle } from "@/data/types";
import { departments, academicYearLabels } from "@/data/professors";
import { Filter, RotateCcw } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const teachingStyles: (TeachingStyle | "All")[] = ["All", "Practical-Heavy", "Theory-Heavy", "Project-Based", "Mixed"];
const yearKeys: AcademicYear[] = ["FE", "SE", "TE", "BE"];

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleDept = (dept: Department) => {
    const next = filters.departments.includes(dept)
      ? filters.departments.filter(d => d !== dept)
      : [...filters.departments, dept];
    onChange({ ...filters, departments: next });
  };

  const toggleYear = (year: AcademicYear) => {
    const next = filters.academicYears.includes(year)
      ? filters.academicYears.filter(y => y !== year)
      : [...filters.academicYears, year];
    onChange({ ...filters, academicYears: next });
  };

  const reset = () =>
    onChange({ departments: [], academicYears: [], ratingThreshold: 0, teachingStyle: "All" });

  return (
    <aside className="w-72 shrink-0 border-r bg-card p-5 space-y-6 overflow-y-auto h-[calc(100vh-3.5rem)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <Filter className="h-4 w-4" />
          Filters
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="text-xs text-muted-foreground h-7">
          <RotateCcw className="h-3 w-3 mr-1" /> Reset
        </Button>
      </div>

      <Separator />

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Department
        </Label>
        <div className="space-y-2">
          {departments.map(dept => (
            <label key={dept} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox
                checked={filters.departments.includes(dept)}
                onCheckedChange={() => toggleDept(dept)}
              />
              <span>{dept}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Academic Year
        </Label>
        <div className="space-y-2">
          {yearKeys.map(year => (
            <label key={year} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox
                checked={filters.academicYears.includes(year)}
                onCheckedChange={() => toggleYear(year)}
              />
              <span>{academicYearLabels[year]}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Minimum Rating: {filters.ratingThreshold > 0 ? `${filters.ratingThreshold}+` : "Any"}
        </Label>
        <Slider
          value={[filters.ratingThreshold]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={([v]) => onChange({ ...filters, ratingThreshold: v })}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Any</span>
          <span>5.0</span>
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Teaching Style
        </Label>
        <Select
          value={filters.teachingStyle}
          onValueChange={(v) => onChange({ ...filters, teachingStyle: v as TeachingStyle | "All" })}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {teachingStyles.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
