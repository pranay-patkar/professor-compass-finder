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
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-muted-foreground text-sm">Department not found.</p>
      </div>
    );
  }

  const allProfs = getProfessorsByDepartment(dept);
  const topRated = getTopRatedByDepartment(dept, 3);

  return (
    <div className="max-w-5xl mx-auto p-8 animate-fade-in">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm rounded-lg text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
      </Button>

      <div className="mb-10 glass rounded-2xl p-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">{dept}</h1>
        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          {allProfs.length} professors
        </p>
      </div>

      {topRated.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="h-5 w-5 text-accent" />
            <h2 className="font-serif text-xl font-bold text-foreground">Top Rated</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topRated.map(p => (
              <ProfessorCard key={p.id} professor={p} showCompare={false} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-serif text-xl font-bold text-foreground mb-5">All Professors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allProfs.map(p => (
            <ProfessorCard key={p.id} professor={p} showCompare={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
