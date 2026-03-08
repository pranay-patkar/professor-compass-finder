import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { professors } from "@/data/professors";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Flame, Sparkles, Star, BookOpen, User } from "lucide-react";

interface CompareModalProps {
  ids: string[];
  onClose: () => void;
}

export function CompareModal({ ids, onClose }: CompareModalProps) {
  const profs = ids.map(id => professors.find(p => p.id === id)!).filter(Boolean);
  if (profs.length < 2) return null;

  const rows: { label: string; icon: React.ReactNode; render: (p: typeof profs[0]) => React.ReactNode }[] = [
    {
      label: "Department",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      render: p => <Badge variant="secondary">{p.department}</Badge>,
    },
    {
      label: "Overall Rating",
      icon: <Star className="h-4 w-4 text-quality" />,
      render: p => (
        <div className="flex items-center gap-2">
          <StarRating rating={p.averageRating} size={14} />
          <span className="font-semibold">{p.averageRating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      label: "Difficulty",
      icon: <Flame className="h-4 w-4 text-difficulty" />,
      render: p => <span className="font-semibold text-difficulty">{p.averageDifficulty.toFixed(1)} / 5</span>,
    },
    {
      label: "Engagement",
      icon: <Sparkles className="h-4 w-4 text-engagement" />,
      render: p => <span className="font-semibold text-engagement">{p.engagementScore.toFixed(1)} / 5</span>,
    },
    {
      label: "Teaching Style",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      render: p => <span>{p.teachingStyle}</span>,
    },
    {
      label: "Subjects",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      render: p => (
        <div className="flex flex-wrap gap-1">
          {p.subjects.map(s => (
            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s}</span>
          ))}
        </div>
      ),
    },
    {
      label: "Experience",
      icon: <User className="h-4 w-4 text-muted-foreground" />,
      render: p => <span>{p.yearsOfExperience ? `${p.yearsOfExperience} years` : "N/A"}</span>,
    },
    {
      label: "Total Reviews",
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
      render: p => <span className="font-semibold">{p.totalReviews}</span>,
    },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Compare Professors</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 pr-4 text-muted-foreground font-medium w-36">Metric</th>
                {profs.map(p => (
                  <th key={p.id} className="text-left py-3 px-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-navy flex items-center justify-center text-primary-foreground text-xs font-semibold">
                        {p.avatar}
                      </div>
                      {p.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.label} className="border-b last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {row.icon}
                      {row.label}
                    </div>
                  </td>
                  {profs.map(p => (
                    <td key={p.id} className="py-3 px-4">{row.render(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
