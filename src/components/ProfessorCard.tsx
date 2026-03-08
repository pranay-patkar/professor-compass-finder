import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingBar } from "@/components/RatingBar";
import { Professor } from "@/data/types";
import { GitCompareArrows } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfessorCardProps {
  professor: Professor;
  isCompareSelected?: boolean;
  onCompareToggle?: (id: string) => void;
  showCompare?: boolean;
}

export function ProfessorCard({ professor, isCompareSelected, onCompareToggle, showCompare = true }: ProfessorCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer bg-card border-2 border-foreground shadow-[3px_3px_0_hsl(var(--foreground))] hover:shadow-[1px_1px_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 animate-fade-in"
      onClick={() => navigate(`/professor/${professor.id}`)}
    >
      <div className="p-3">
        {/* Top row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 border-2 border-foreground bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              {professor.avatar}
            </div>
            <div>
              <h3 className="font-bold text-foreground text-xs uppercase leading-tight tracking-wide">{professor.name}</h3>
              <span className="text-2xs text-muted-foreground uppercase tracking-wider">{professor.department}</span>
            </div>
          </div>
          {showCompare && onCompareToggle && (
            <Button
              variant={isCompareSelected ? "default" : "outline"}
              size="sm"
              className="h-6 text-2xs px-2 uppercase tracking-wider border-2"
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle(professor.id);
              }}
            >
              <GitCompareArrows className="h-3 w-3 mr-0.5" />
              {isCompareSelected ? "✓" : "CMP"}
            </Button>
          )}
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1 mb-2">
          {professor.subjects.slice(0, 3).map((subject) => (
            <span
              key={subject}
              className="text-2xs px-1.5 py-0 border border-border text-muted-foreground uppercase tracking-wider"
            >
              {subject}
            </span>
          ))}
        </div>

        {/* Ratings as bars */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xs uppercase tracking-wider text-muted-foreground w-14">Rating</span>
            <div className="flex-1">
              <RatingBar value={professor.averageRating} color="quality" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xs uppercase tracking-wider text-muted-foreground w-14">Diff.</span>
            <div className="flex-1">
              <RatingBar value={professor.averageDifficulty} color="difficulty" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xs uppercase tracking-wider text-muted-foreground w-14">Engage</span>
            <div className="flex-1">
              <RatingBar value={professor.engagementScore} color="engagement" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-2xs text-muted-foreground uppercase tracking-wider">
          <span>{professor.totalReviews} reviews</span>
          <span>{professor.teachingStyle}</span>
          {professor.yearsOfExperience && (
            <span>{professor.yearsOfExperience}yr exp</span>
          )}
        </div>
      </div>
    </div>
  );
}
