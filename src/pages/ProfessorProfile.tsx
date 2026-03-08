import { useParams, useNavigate } from "react-router-dom";
import { professors } from "@/data/professors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingBar } from "@/components/RatingBar";
import { RatingForm } from "@/components/RatingForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flame, Calendar } from "lucide-react";

export default function ProfessorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const professor = professors.find(p => p.id === id);

  if (!professor) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3rem)]">
        <p className="text-muted-foreground text-xs uppercase tracking-wider">Professor not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-3 text-2xs uppercase tracking-wider border-2 border-foreground h-7 px-2"
      >
        <ArrowLeft className="h-3 w-3 mr-1" /> Back
      </Button>

      {/* Header */}
      <div className="flex items-start gap-4 mb-4 border-2 border-foreground bg-card p-4 shadow-[4px_4px_0_hsl(var(--foreground))]">
        <div className="h-14 w-14 border-2 border-foreground bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
          {professor.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-lg text-foreground uppercase tracking-wide">{professor.name}</h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-2xs px-1.5 py-0.5 border-2 border-foreground bg-foreground text-background uppercase tracking-wider font-bold">{professor.department}</span>
            {professor.academicYears.map(y => (
              <span key={y} className="text-2xs px-1.5 py-0.5 border border-border uppercase tracking-wider">{y}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {professor.subjects.map(s => (
              <span key={s} className="text-2xs px-1.5 py-0 border border-border text-muted-foreground uppercase tracking-wider">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {[
          { label: "Rating", value: professor.averageRating, color: "quality" as const },
          { label: "Difficulty", value: professor.averageDifficulty, color: "difficulty" as const },
          { label: "Engagement", value: professor.engagementScore, color: "engagement" as const },
          { label: "Experience", value: professor.yearsOfExperience ?? 0, color: "muted" as const, suffix: "yr", max: 25 },
        ].map(stat => (
          <div key={stat.label} className="border-2 border-foreground bg-card p-3">
            <div className="text-2xs uppercase tracking-widest text-muted-foreground font-bold mb-1">{stat.label}</div>
            <div className="text-lg font-bold tabular-nums">{stat.suffix ? `${stat.value}${stat.suffix}` : stat.value.toFixed(1)}</div>
            {!stat.suffix && <RatingBar value={stat.value as number} color={stat.color} size="sm" showValue={false} />}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-3 bg-transparent border-2 border-foreground rounded-none p-0 h-auto">
          <TabsTrigger value="overview" className="rounded-none text-2xs uppercase tracking-widest px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none">Overview</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none text-2xs uppercase tracking-widest px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none">Reviews ({professor.totalReviews})</TabsTrigger>
          <TabsTrigger value="subjects" className="rounded-none text-2xs uppercase tracking-widest px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="border-2 border-foreground bg-card p-4">
            <h2 className="font-display text-xs uppercase tracking-wider mb-3">About</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-2xs uppercase tracking-widest text-muted-foreground font-bold block">Teaching Style</span>
                <p className="font-bold mt-0.5 uppercase">{professor.teachingStyle}</p>
              </div>
              <div>
                <span className="text-2xs uppercase tracking-widest text-muted-foreground font-bold block">Academic Years</span>
                <p className="font-bold mt-0.5">{professor.academicYears.join(", ")}</p>
              </div>
              <div>
                <span className="text-2xs uppercase tracking-widest text-muted-foreground font-bold block">Total Reviews</span>
                <p className="font-bold mt-0.5 tabular-nums">{professor.totalReviews}</p>
              </div>
              <div>
                <span className="text-2xs uppercase tracking-widest text-muted-foreground font-bold block">Primary Subjects</span>
                <p className="font-bold mt-0.5">{professor.subjects.join(", ")}</p>
              </div>
            </div>
            <RatingForm professor={professor} />
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-2">
            {professor.reviews.map(review => (
              <div key={review.id} className="border-2 border-foreground bg-card p-3">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <span className="font-bold text-xs uppercase">{review.studentName}</span>
                    <span className="text-muted-foreground text-2xs ml-2 uppercase tracking-wider">{review.course} · {review.semester}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xs border border-border px-1.5 py-0 uppercase tracking-wider">{review.year}</span>
                    {review.gradeReceived && <span className="text-2xs border-2 border-foreground px-1.5 py-0 font-bold">{review.gradeReceived}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xs uppercase tracking-wider text-muted-foreground">Rat:</span>
                    <span className="text-xs font-bold tabular-nums">{review.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-accent" />
                    <span className="text-xs font-bold tabular-nums text-accent">{review.difficulty}/5</span>
                  </div>
                  <div className="flex items-center gap-1 text-2xs text-muted-foreground uppercase tracking-wider">
                    <Calendar className="h-3 w-3" />
                    {review.attendancePolicy}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects">
          <div className="border-2 border-foreground bg-card">
            {professor.subjects.map((subject, i) => {
              const subReviews = professor.reviews.filter(r => r.course === subject);
              const avgRating = subReviews.length > 0 ? subReviews.reduce((a, r) => a + r.rating, 0) / subReviews.length : 0;
              return (
                <div key={subject} className={`flex items-center justify-between px-3 py-2 ${i < professor.subjects.length - 1 ? 'border-b-2 border-border' : ''}`}>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wide">{subject}</span>
                    <span className="text-2xs text-muted-foreground ml-2 uppercase tracking-wider">({subReviews.length} reviews)</span>
                  </div>
                  {subReviews.length > 0 && (
                    <div className="w-32">
                      <RatingBar value={avgRating} color="quality" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
