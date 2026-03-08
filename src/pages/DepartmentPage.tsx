import { useParams, useNavigate } from "react-router-dom";
import { departments, getTopRatedByDepartment, getProfessorsByDepartment } from "@/data/professors";
import { Department } from "@/data/types";
import { ProfessorCard } from "@/components/ProfessorCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Users } from "lucide-react";

export default function DepartmentPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const dept = decodeURIComponent(name || "") as Department;

  if (!departments.includes(dept)) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <p className="text-muted-foreground">Department not found.</p>
      </div>
    );
  }

  const allProfs = getProfessorsByDepartment(dept);
  const topRated = getTopRatedByDepartment(dept, 3);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">{dept}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          <Users className="inline h-4 w-4 mr-1" />
          {allProfs.length} professors
        </p>
      </div>

      {topRated.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-quality" />
            <h2 className="text-lg font-semibold text-foreground">Top Rated</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topRated.map(p => (
              <ProfessorCard key={p.id} professor={p} showCompare={false} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">All Professors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProfs.map(p => (
            <ProfessorCard key={p.id} professor={p} showCompare={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
