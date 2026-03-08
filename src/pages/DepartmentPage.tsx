import { useParams, useNavigate } from "react-router-dom";
import { departments, getTopRatedByDepartment, getProfessorsByDepartment } from "@/data/professors";
import { Department } from "@/data/types";
import { ProfessorCard } from "@/components/ProfessorCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Users } from "lucide-react";

export default function DepartmentPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const dept = decodeURIComponent(name || "") as Department;

  if (!departments.includes(dept)) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3rem)]">
        <p className="text-muted-foreground text-xs uppercase tracking-wider">Department not found.</p>
      </div>
    );
  }

  const allProfs = getProfessorsByDepartment(dept);
  const topRated = getTopRatedByDepartment(dept, 3);

  return (
    <div className="max-w-5xl mx-auto p-4 animate-fade-in">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-3 text-2xs uppercase tracking-wider border-2 border-foreground h-7 px-2"
      >
        <ArrowLeft className="h-3 w-3 mr-1" /> Back
      </Button>

      <div className="mb-6 border-2 border-foreground bg-card p-4 shadow-[4px_4px_0_hsl(var(--foreground))]">
        <h1 className="font-display text-lg text-foreground uppercase tracking-wide">{dept}</h1>
        <p className="text-2xs text-muted-foreground uppercase tracking-wider mt-0.5">
          <Users className="inline h-3.5 w-3.5 mr-1" />
          {allProfs.length} professors
        </p>
      </div>

      {topRated.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4 text-primary" />
            <h2 className="font-display text-sm text-foreground uppercase tracking-wide">Top Rated</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {topRated.map(p => (
              <ProfessorCard key={p.id} professor={p} showCompare={false} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-display text-sm text-foreground uppercase tracking-wide mb-3">All Professors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allProfs.map(p => (
            <ProfessorCard key={p.id} professor={p} showCompare={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
