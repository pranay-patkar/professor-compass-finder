import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Professor, AcademicYear, AttendancePolicy } from "@/data/types";
import { academicYearLabels } from "@/data/professors";
import { useToast } from "@/hooks/use-toast";

const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
const attendancePolicies: AttendancePolicy[] = ["Strict", "Moderate", "Chill"];
const yearKeys: AcademicYear[] = ["FE", "SE", "TE", "BE"];

interface RatingFormProps {
  professor: Professor;
}

export function RatingForm({ professor }: RatingFormProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    course: "",
    year: "" as AcademicYear | "",
    semester: "",
    grade: "",
    attendance: "" as AttendancePolicy | "",
    rating: 3,
    difficulty: 3,
    engagement: 3,
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.course || !form.year || !form.semester || !form.attendance) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    toast({ title: "Review submitted!", description: `Your review for ${professor.name} has been recorded.` });
    setOpen(false);
    setForm({ course: "", year: "", semester: "", grade: "", attendance: "", rating: 3, difficulty: 3, engagement: 3, comment: "" });
  };

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="w-full mt-4 uppercase tracking-wider text-xs border-2 border-foreground bg-primary text-primary-foreground hover:bg-primary/90 rounded-none shadow-[3px_3px_0_hsl(var(--foreground))] hover:shadow-[1px_1px_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      >
        Rate this Professor
      </Button>
    );
  }

  return (
    <div className="mt-4 border-2 border-foreground bg-card p-4">
      <h3 className="font-display text-xs uppercase tracking-wider mb-3">Submit a Rating</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-2xs uppercase tracking-widest font-bold">Course *</Label>
            <Select value={form.course} onValueChange={v => setForm(f => ({ ...f, course: v }))}>
              <SelectTrigger className="h-8 text-xs mt-1 border-2 border-foreground rounded-none"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent className="border-2 border-foreground rounded-none">
                {professor.subjects.map(s => <SelectItem key={s} value={s} className="text-xs uppercase">{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-2xs uppercase tracking-widest font-bold">Year *</Label>
            <Select value={form.year} onValueChange={v => setForm(f => ({ ...f, year: v as AcademicYear }))}>
              <SelectTrigger className="h-8 text-xs mt-1 border-2 border-foreground rounded-none"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent className="border-2 border-foreground rounded-none">
                {yearKeys.map(y => <SelectItem key={y} value={y} className="text-xs uppercase">{academicYearLabels[y]}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-2xs uppercase tracking-widest font-bold">Semester *</Label>
            <Input
              className="h-8 text-xs mt-1 border-2 border-foreground rounded-none"
              placeholder="e.g., Fall 2024"
              value={form.semester}
              onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-2xs uppercase tracking-widest font-bold">Grade (opt.)</Label>
            <Select value={form.grade} onValueChange={v => setForm(f => ({ ...f, grade: v }))}>
              <SelectTrigger className="h-8 text-xs mt-1 border-2 border-foreground rounded-none"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent className="border-2 border-foreground rounded-none">
                {grades.map(g => <SelectItem key={g} value={g} className="text-xs">{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-2xs uppercase tracking-widest font-bold">Attendance *</Label>
          <div className="flex gap-1 mt-1">
            {attendancePolicies.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => setForm(f => ({ ...f, attendance: a }))}
                className={`flex-1 py-1.5 text-2xs uppercase tracking-wider border-2 transition-all ${
                  form.attendance === a
                    ? "border-foreground bg-foreground text-background font-bold"
                    : "border-border text-muted-foreground hover:border-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {[
            { key: "rating", label: "Rating", color: "text-primary" },
            { key: "difficulty", label: "Difficulty", color: "text-accent" },
            { key: "engagement", label: "Engagement", color: "text-engagement" },
          ].map(({ key, label, color }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-0.5">
                <Label className="text-2xs uppercase tracking-widest font-bold">{label}</Label>
                <span className={`text-xs font-bold tabular-nums ${color}`}>{form[key as keyof typeof form]}/5</span>
              </div>
              <Slider
                value={[form[key as keyof typeof form] as number]}
                min={1}
                max={5}
                step={1}
                onValueChange={([v]) => setForm(f => ({ ...f, [key]: v }))}
              />
            </div>
          ))}
        </div>

        <div>
          <Label className="text-2xs uppercase tracking-widest font-bold">Comment</Label>
          <Textarea
            className="mt-1 text-xs border-2 border-foreground rounded-none"
            placeholder="Share your experience..."
            value={form.comment}
            onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1 uppercase tracking-wider text-xs border-2 rounded-none shadow-[3px_3px_0_hsl(var(--foreground))] hover:shadow-[1px_1px_0_hsl(var(--foreground))] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} className="uppercase tracking-wider text-xs border-2 border-foreground rounded-none">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
