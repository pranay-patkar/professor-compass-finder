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
        className="w-full mt-6 rounded-xl h-11 text-sm font-semibold gradient-gold text-accent-foreground border-0 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      >
        Rate this Professor
      </Button>
    );
  }

  return (
    <div className="mt-6 glass rounded-xl p-5">
      <h3 className="font-serif text-lg font-bold mb-4">Submit a Rating</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Course *</Label>
            <Select value={form.course} onValueChange={v => setForm(f => ({ ...f, course: v }))}>
              <SelectTrigger className="h-10 text-sm mt-1.5 rounded-lg"><SelectValue placeholder="Select course" /></SelectTrigger>
              <SelectContent className="rounded-xl">
                {professor.subjects.map(s => <SelectItem key={s} value={s} className="text-sm">{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Year *</Label>
            <Select value={form.year} onValueChange={v => setForm(f => ({ ...f, year: v as AcademicYear }))}>
              <SelectTrigger className="h-10 text-sm mt-1.5 rounded-lg"><SelectValue placeholder="Select year" /></SelectTrigger>
              <SelectContent className="rounded-xl">
                {yearKeys.map(y => <SelectItem key={y} value={y} className="text-sm">{academicYearLabels[y]}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Semester *</Label>
            <Input
              className="h-10 text-sm mt-1.5 rounded-lg"
              placeholder="e.g., Fall 2024"
              value={form.semester}
              onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Grade (opt.)</Label>
            <Select value={form.grade} onValueChange={v => setForm(f => ({ ...f, grade: v }))}>
              <SelectTrigger className="h-10 text-sm mt-1.5 rounded-lg"><SelectValue placeholder="Select grade" /></SelectTrigger>
              <SelectContent className="rounded-xl">
                {grades.map(g => <SelectItem key={g} value={g} className="text-sm">{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Attendance *</Label>
          <div className="flex gap-2 mt-1.5">
            {attendancePolicies.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => setForm(f => ({ ...f, attendance: a }))}
                className={`flex-1 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  form.attendance === a
                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {[
            { key: "rating", label: "Rating", color: "text-quality" },
            { key: "difficulty", label: "Difficulty", color: "text-difficulty" },
            { key: "engagement", label: "Engagement", color: "text-engagement" },
          ].map(({ key, label, color }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
                <span className={`text-sm font-bold tabular-nums ${color}`}>{form[key as keyof typeof form]}/5</span>
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
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Comment</Label>
          <Textarea
            className="mt-1.5 text-sm rounded-lg"
            placeholder="Share your experience..."
            value={form.comment}
            onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
            rows={3}
          />
        </div>

        <div className="flex gap-3 pt-1">
          <Button type="submit" className="flex-1 rounded-xl h-10 text-sm font-semibold gradient-gold text-accent-foreground border-0 shadow-md hover:shadow-lg transition-all">
            Submit Review
          </Button>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl h-10 text-sm px-6">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
