import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Professor, AcademicYear, AttendancePolicy } from "@/data/types";
import { academicYearLabels } from "@/data/professors";
import { useToast } from "@/hooks/use-toast";
import { Star, Flame, Sparkles } from "lucide-react";

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
      <Button onClick={() => setOpen(true)} className="w-full mt-4">
        Rate this Professor
      </Button>
    );
  }

  return (
    <Card className="mt-4 border-quality/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Submit a Rating</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Course/Subject *</Label>
              <Select value={form.course} onValueChange={v => setForm(f => ({ ...f, course: v }))}>
                <SelectTrigger className="h-9 text-sm mt-1"><SelectValue placeholder="Select course" /></SelectTrigger>
                <SelectContent>
                  {professor.subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Year/Semester *</Label>
              <Select value={form.year} onValueChange={v => setForm(f => ({ ...f, year: v as AcademicYear }))}>
                <SelectTrigger className="h-9 text-sm mt-1"><SelectValue placeholder="Select year" /></SelectTrigger>
                <SelectContent>
                  {yearKeys.map(y => <SelectItem key={y} value={y}>{academicYearLabels[y]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Semester *</Label>
              <Input
                className="h-9 text-sm mt-1"
                placeholder="e.g., Fall 2024"
                value={form.semester}
                onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-xs">Grade Received (optional)</Label>
              <Select value={form.grade} onValueChange={v => setForm(f => ({ ...f, grade: v }))}>
                <SelectTrigger className="h-9 text-sm mt-1"><SelectValue placeholder="Select grade" /></SelectTrigger>
                <SelectContent>
                  {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs">Attendance Policy *</Label>
            <Select value={form.attendance} onValueChange={v => setForm(f => ({ ...f, attendance: v as AttendancePolicy }))}>
              <SelectTrigger className="h-9 text-sm mt-1"><SelectValue placeholder="Select policy" /></SelectTrigger>
              <SelectContent>
                {attendancePolicies.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-3.5 w-3.5 text-quality" />
                <Label className="text-xs">Overall Rating: {form.rating}/5</Label>
              </div>
              <Slider value={[form.rating]} min={1} max={5} step={1} onValueChange={([v]) => setForm(f => ({ ...f, rating: v }))} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-3.5 w-3.5 text-difficulty" />
                <Label className="text-xs">Difficulty: {form.difficulty}/5</Label>
              </div>
              <Slider value={[form.difficulty]} min={1} max={5} step={1} onValueChange={([v]) => setForm(f => ({ ...f, difficulty: v }))} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-engagement" />
                <Label className="text-xs">Engagement: {form.engagement}/5</Label>
              </div>
              <Slider value={[form.engagement]} min={1} max={5} step={1} onValueChange={([v]) => setForm(f => ({ ...f, engagement: v }))} />
            </div>
          </div>

          <div>
            <Label className="text-xs">Comment</Label>
            <Textarea
              className="mt-1 text-sm"
              placeholder="Share your experience..."
              value={form.comment}
              onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Submit Review</Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
