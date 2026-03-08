import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { FilterState, Department, AcademicYear, TeachingStyle } from "@/data/types";
import { departments, academicYearLabels } from "@/data/professors";
import { RotateCcw } from "lucide-react";

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
    <aside className="w-64 shrink-0 border-r-3 border-foreground bg-card p-3 space-y-4 overflow-y-auto h-[calc(100vh-3rem)]">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs uppercase tracking-wider text-foreground">Filters</span>
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="text-2xs h-6 px-2 uppercase tracking-wider border-2"
        >
          <RotateCcw className="h-3 w-3 mr-0.5" /> Reset
        </Button>
      </div>

      <div className="border-t-2 border-foreground pt-3">
        <Label className="text-2xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
          Department
        </Label>
        <div className="space-y-1">
          {departments.map(dept => (
            <label key={dept} className="flex items-center gap-2 cursor-pointer text-xs hover:bg-muted px-1 py-0.5 transition-colors">
              <Checkbox
                checked={filters.departments.includes(dept)}
                onCheckedChange={() => toggleDept(dept)}
                className="border-2 border-foreground rounded-none"
              />
              <span className="uppercase tracking-wide text-2xs">{dept}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-foreground pt-3">
        <Label className="text-2xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
          Academic Year
        </Label>
        <div className="space-y-1">
          {yearKeys.map(year => (
            <label key={year} className="flex items-center gap-2 cursor-pointer text-xs hover:bg-muted px-1 py-0.5 transition-colors">
              <Checkbox
                checked={filters.academicYears.includes(year)}
                onCheckedChange={() => toggleYear(year)}
                className="border-2 border-foreground rounded-none"
              />
              <span className="uppercase tracking-wide text-2xs">{academicYearLabels[year]}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-foreground pt-3">
        <Label className="text-2xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
          Min Rating: {filters.ratingThreshold > 0 ? `${filters.ratingThreshold}+` : "Any"}
        </Label>
        <Slider
          value={[filters.ratingThreshold]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={([v]) => onChange({ ...filters, ratingThreshold: v })}
          className="mt-1"
        />
        <div className="flex justify-between text-2xs text-muted-foreground mt-1 uppercase">
          <span>Any</span>
          <span>5.0</span>
        </div>
      </div>

      <div className="border-t-2 border-foreground pt-3">
        <Label className="text-2xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
          Teaching Style
        </Label>
        <div className="space-y-0.5">
          {teachingStyles.map(s => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, teachingStyle: s as TeachingStyle | "All" })}
              className={`block w-full text-left px-2 py-1 text-2xs uppercase tracking-wider border-2 transition-colors ${
                filters.teachingStyle === s
                  ? "border-foreground bg-foreground text-background font-bold"
                  : "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
