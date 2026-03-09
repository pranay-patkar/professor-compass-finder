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
      className="group cursor-pointer glass rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in"
      onClick={() => navigate(`/professor/${professor.id}`)}
    >
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl gradient-navy flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
              {professor.avatar}
            </div>
            <div>
              <h3 className="font-serif font-bold text-foreground text-base leading-tight">{professor.name}</h3>
              <span className="text-xs text-muted-foreground">{professor.department}</span>
            </div>
          </div>
          {showCompare && onCompareToggle && (
            <Button
              variant={isCompareSelected ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs px-3 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle(professor.id);
              }}
            >
              <GitCompareArrows className="h-3.5 w-3.5 mr-1" />
              {isCompareSelected ? "✓" : "Compare"}
            </Button>
          )}
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {professor.subjects.slice(0, 3).map((subject) => (
            <span
              key={subject}
              className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
            >
              {subject}
            </span>
          ))}
        </div>

        {/* Ratings */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-16 font-medium">Quality</span>
            <div className="flex-1">
              <RatingBar value={professor.averageRating} color="quality" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-16 font-medium">Difficulty</span>
            <div className="flex-1">
              <RatingBar value={professor.averageDifficulty} color="difficulty" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-16 font-medium">Engage</span>
            <div className="flex-1">
              <RatingBar value={professor.engagementScore} color="engagement" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">{professor.totalReviews} reviews</span>
          <span className="bg-accent/10 text-accent-foreground px-2 py-0.5 rounded-md text-xs font-medium">{professor.teachingStyle}</span>
          {professor.yearsOfExperience && (
            <span>{professor.yearsOfExperience}yr exp</span>
          )}
        </div>
      </div>
    </div>
  );
}
