import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { professors } from "@/data/professors";
import { RatingBar } from "@/components/RatingBar";

interface CompareModalProps {
  ids: string[];
  onClose: () => void;
}

export function CompareModal({ ids, onClose }: CompareModalProps) {
  const profs = ids.map(id => professors.find(p => p.id === id)!).filter(Boolean);
  if (profs.length < 2) return null;

  const rows: { label: string; render: (p: typeof profs[0]) => React.ReactNode }[] = [
    {
      label: "Department",
      render: p => <span className="text-sm bg-muted px-2.5 py-1 rounded-lg">{p.department}</span>,
    },
    {
      label: "Rating",
      render: p => <RatingBar value={p.averageRating} color="quality" size="md" />,
    },
    {
      label: "Difficulty",
      render: p => <RatingBar value={p.averageDifficulty} color="difficulty" size="md" />,
    },
    {
      label: "Engagement",
      render: p => <RatingBar value={p.engagementScore} color="engagement" size="md" />,
    },
    {
      label: "Style",
      render: p => <span className="text-sm">{p.teachingStyle}</span>,
    },
    {
      label: "Subjects",
      render: p => (
        <div className="flex flex-wrap gap-1.5">
          {p.subjects.map(s => (
            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s}</span>
          ))}
        </div>
      ),
    },
    {
      label: "Experience",
      render: p => <span className="text-sm font-semibold tabular-nums">{p.yearsOfExperience ? `${p.yearsOfExperience} years` : "N/A"}</span>,
    },
    {
      label: "Reviews",
      render: p => <span className="text-sm font-semibold tabular-nums">{p.totalReviews}</span>,
    },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl glass-strong border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Compare Professors</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 text-xs uppercase tracking-wide text-muted-foreground font-semibold w-28">Metric</th>
                {profs.map(p => (
                  <th key={p.id} className="text-left py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl gradient-navy flex items-center justify-center text-primary-foreground text-xs font-bold shadow-sm">
                        {p.avatar}
                      </div>
                      <span className="font-serif font-bold text-sm">{p.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.label} className="border-b border-border/50 last:border-0">
                  <td className="py-3 pr-4">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">{row.label}</span>
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
