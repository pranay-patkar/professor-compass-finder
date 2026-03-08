import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Professor } from "@/data/types";
import { GitCompareArrows, User, BookOpen, Flame, Sparkles } from "lucide-react";
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
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in border-border/60"
      onClick={() => navigate(`/professor/${professor.id}`)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-navy flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {professor.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-foreground leading-tight">{professor.name}</h3>
              <Badge variant="secondary" className="mt-1 text-xs font-medium">
                {professor.department}
              </Badge>
            </div>
          </div>
          {showCompare && onCompareToggle && (
            <Button
              variant={isCompareSelected ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle(professor.id);
              }}
            >
              <GitCompareArrows className="h-3.5 w-3.5 mr-1" />
              {isCompareSelected ? "Selected" : "Compare"}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {professor.subjects.slice(0, 3).map((subject) => (
            <span
              key={subject}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
            >
              {subject}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={professor.averageRating} size={14} />
          <span className="text-sm font-semibold text-foreground">{professor.averageRating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({professor.totalReviews})</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <Flame className="h-3.5 w-3.5 text-difficulty" />
            <div>
              <div className="text-muted-foreground">Difficulty</div>
              <div className="font-semibold text-difficulty">{professor.averageDifficulty.toFixed(1)}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-engagement" />
            <div>
              <div className="text-muted-foreground">Engagement</div>
              <div className="font-semibold text-engagement">{professor.engagementScore.toFixed(1)}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            <div>
              <div className="text-muted-foreground">Style</div>
              <div className="font-medium text-foreground truncate">{professor.teachingStyle.split("-")[0]}</div>
            </div>
          </div>
        </div>

        {professor.yearsOfExperience && (
          <div className="mt-3 pt-3 border-t flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            {professor.yearsOfExperience} years of experience
          </div>
        )}
      </CardContent>
    </Card>
  );
}
