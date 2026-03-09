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
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-muted-foreground text-sm">Professor not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 animate-fade-in">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm rounded-lg text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
      </Button>

      {/* Header */}
      <div className="flex items-start gap-6 mb-8 glass rounded-2xl p-6">
        <div className="h-16 w-16 rounded-2xl gradient-navy flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0 shadow-lg">
          {professor.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-serif text-2xl font-bold text-foreground">{professor.name}</h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full gradient-gold text-accent-foreground font-semibold shadow-sm">{professor.department}</span>
            {professor.academicYears.map(y => (
              <span key={y} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">{y}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {professor.subjects.map(s => (
              <span key={s} className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Rating", value: professor.averageRating, color: "quality" as const },
          { label: "Difficulty", value: professor.averageDifficulty, color: "difficulty" as const },
          { label: "Engagement", value: professor.engagementScore, color: "engagement" as const },
          { label: "Experience", value: professor.yearsOfExperience ?? 0, color: "muted" as const, suffix: "yr", max: 25 },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-xl p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">{stat.label}</div>
            <div className="text-2xl font-bold tabular-nums font-serif">{stat.suffix ? `${stat.value}${stat.suffix}` : stat.value.toFixed(1)}</div>
            {!stat.suffix && <div className="mt-2"><RatingBar value={stat.value as number} color={stat.color} size="sm" showValue={false} /></div>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-6 bg-muted/50 rounded-xl p-1 h-auto">
          <TabsTrigger value="overview" className="rounded-lg text-sm px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-lg text-sm px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Reviews ({professor.totalReviews})</TabsTrigger>
          <TabsTrigger value="subjects" className="rounded-lg text-sm px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-serif text-lg font-bold mb-4">About</h2>
            <div className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold block mb-1">Teaching Style</span>
                <p className="font-medium">{professor.teachingStyle}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold block mb-1">Academic Years</span>
                <p className="font-medium">{professor.academicYears.join(", ")}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold block mb-1">Total Reviews</span>
                <p className="font-medium tabular-nums">{professor.totalReviews}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold block mb-1">Primary Subjects</span>
                <p className="font-medium">{professor.subjects.join(", ")}</p>
              </div>
            </div>
            <RatingForm professor={professor} />
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-4">
            {professor.reviews.map(review => (
              <div key={review.id} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-semibold text-sm">{review.studentName}</span>
                    <span className="text-muted-foreground text-xs ml-2">{review.course} · {review.semester}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-md">{review.year}</span>
                    {review.gradeReceived && <span className="text-xs gradient-gold text-accent-foreground px-2 py-0.5 rounded-md font-semibold">{review.gradeReceived}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Rating:</span>
                    <span className="text-sm font-bold tabular-nums text-quality">{review.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-difficulty" />
                    <span className="text-sm font-bold tabular-nums text-difficulty">{review.difficulty}/5</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {review.attendancePolicy}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects">
          <div className="glass rounded-2xl overflow-hidden">
            {professor.subjects.map((subject, i) => {
              const subReviews = professor.reviews.filter(r => r.course === subject);
              const avgRating = subReviews.length > 0 ? subReviews.reduce((a, r) => a + r.rating, 0) / subReviews.length : 0;
              return (
                <div key={subject} className={`flex items-center justify-between px-5 py-4 ${i < professor.subjects.length - 1 ? 'border-b border-border/50' : ''}`}>
                  <div>
                    <span className="font-serif font-bold text-sm">{subject}</span>
                    <span className="text-xs text-muted-foreground ml-2">({subReviews.length} reviews)</span>
                  </div>
                  {subReviews.length > 0 && (
                    <div className="w-36">
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
