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
      label: "Dept",
      render: p => <span className="text-2xs uppercase tracking-wider border border-border px-1.5 py-0.5">{p.department}</span>,
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
      render: p => <span className="text-xs uppercase tracking-wide">{p.teachingStyle}</span>,
    },
    {
      label: "Subjects",
      render: p => (
        <div className="flex flex-wrap gap-1">
          {p.subjects.map(s => (
            <span key={s} className="text-2xs px-1.5 py-0 border border-border uppercase tracking-wider">{s}</span>
          ))}
        </div>
      ),
    },
    {
      label: "Experience",
      render: p => <span className="text-xs font-bold tabular-nums">{p.yearsOfExperience ? `${p.yearsOfExperience}yr` : "N/A"}</span>,
    },
    {
      label: "Reviews",
      render: p => <span className="text-xs font-bold tabular-nums">{p.totalReviews}</span>,
    },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-2 border-foreground rounded-none shadow-[6px_6px_0_hsl(var(--foreground))]">
        <DialogHeader>
          <DialogTitle className="font-display text-sm uppercase tracking-wider">Compare Professors</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="text-left py-2 pr-3 text-2xs uppercase tracking-widest text-muted-foreground font-bold w-28">Metric</th>
                {profs.map(p => (
                  <th key={p.id} className="text-left py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 border-2 border-foreground bg-primary flex items-center justify-center text-primary-foreground text-2xs font-bold">
                        {p.avatar}
                      </div>
                      <span className="font-bold uppercase tracking-wide text-2xs">{p.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="py-2 pr-3">
                    <span className="text-2xs uppercase tracking-widest text-muted-foreground font-bold">{row.label}</span>
                  </td>
                  {profs.map(p => (
                    <td key={p.id} className="py-2 px-3">{row.render(p)}</td>
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
