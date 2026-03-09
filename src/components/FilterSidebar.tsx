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
    <aside className="w-72 shrink-0 border-r border-border bg-background/50 backdrop-blur-sm p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg font-bold text-foreground">Filters</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          className="text-xs h-8 px-3 rounded-lg text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>

      <div>
        <Label className="text-xs font-semibold text-muted-foreground mb-3 block uppercase tracking-wide">
          Department
        </Label>
        <div className="space-y-1.5">
          {departments.map(dept => (
            <label key={dept} className="flex items-center gap-2.5 cursor-pointer text-sm hover:bg-muted/50 px-2 py-1.5 rounded-lg transition-colors">
              <Checkbox
                checked={filters.departments.includes(dept)}
                onCheckedChange={() => toggleDept(dept)}
                className="rounded-md"
              />
              <span className="text-sm">{dept}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold text-muted-foreground mb-3 block uppercase tracking-wide">
          Academic Year
        </Label>
        <div className="space-y-1.5">
          {yearKeys.map(year => (
            <label key={year} className="flex items-center gap-2.5 cursor-pointer text-sm hover:bg-muted/50 px-2 py-1.5 rounded-lg transition-colors">
              <Checkbox
                checked={filters.academicYears.includes(year)}
                onCheckedChange={() => toggleYear(year)}
                className="rounded-md"
              />
              <span className="text-sm">{academicYearLabels[year]}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold text-muted-foreground mb-3 block uppercase tracking-wide">
          Min Rating: {filters.ratingThreshold > 0 ? `${filters.ratingThreshold}+` : "Any"}
        </Label>
        <Slider
          value={[filters.ratingThreshold]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={([v]) => onChange({ ...filters, ratingThreshold: v })}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Any</span>
          <span>5.0</span>
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold text-muted-foreground mb-3 block uppercase tracking-wide">
          Teaching Style
        </Label>
        <div className="space-y-1">
          {teachingStyles.map(s => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, teachingStyle: s as TeachingStyle | "All" })}
              className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                filters.teachingStyle === s
                  ? "bg-primary text-primary-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
