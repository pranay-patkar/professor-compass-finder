import { useParams, useNavigate } from "react-router-dom";
import { professors } from "@/data/professors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { RatingForm } from "@/components/RatingForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flame, Sparkles, Star, BookOpen, User, Calendar } from "lucide-react";

export default function ProfessorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const professor = professors.find(p => p.id === id);

  if (!professor) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <p className="text-muted-foreground">Professor not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Button>

      {/* Header */}
      <div className="flex items-start gap-5 mb-6">
        <div className="h-16 w-16 rounded-full bg-navy flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
          {professor.avatar}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{professor.name}</h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="secondary" className="font-medium">{professor.department}</Badge>
            {professor.academicYears.map(y => (
              <Badge key={y} variant="outline" className="text-xs">{y}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {professor.subjects.map(s => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-quality/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-quality" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Rating</div>
              <div className="text-lg font-bold text-foreground">{professor.averageRating.toFixed(1)}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-difficulty/10 flex items-center justify-center">
              <Flame className="h-5 w-5 text-difficulty" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Difficulty</div>
              <div className="text-lg font-bold text-difficulty">{professor.averageDifficulty.toFixed(1)}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-engagement/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-engagement" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Engagement</div>
              <div className="text-lg font-bold text-engagement">{professor.engagementScore.toFixed(1)}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Experience</div>
              <div className="text-lg font-bold text-foreground">{professor.yearsOfExperience ?? "N/A"} {professor.yearsOfExperience ? "yrs" : ""}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({professor.totalReviews})</TabsTrigger>
          <TabsTrigger value="subjects">Subject History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Teaching Style</span>
                  <p className="font-medium mt-0.5">{professor.teachingStyle}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Academic Years</span>
                  <p className="font-medium mt-0.5">{professor.academicYears.join(", ")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Reviews</span>
                  <p className="font-medium mt-0.5">{professor.totalReviews}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Primary Subjects</span>
                  <p className="font-medium mt-0.5">{professor.subjects.join(", ")}</p>
                </div>
              </div>
              <RatingForm professor={professor} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-3">
            {professor.reviews.map(review => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-semibold text-sm">{review.studentName}</span>
                      <span className="text-muted-foreground text-xs ml-2">{review.course} · {review.semester}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline">{review.year}</Badge>
                      {review.gradeReceived && <Badge variant="secondary">{review.gradeReceived}</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <StarRating rating={review.rating} size={12} />
                      <span className="text-xs font-medium">{review.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Flame className="h-3 w-3 text-difficulty" />
                      <span className="text-difficulty font-medium">{review.difficulty}/5</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {review.attendancePolicy}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {professor.subjects.map(subject => {
                  const subReviews = professor.reviews.filter(r => r.course === subject);
                  return (
                    <div key={subject} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <span className="font-medium text-sm">{subject}</span>
                        <span className="text-xs text-muted-foreground ml-2">({subReviews.length} reviews)</span>
                      </div>
                      {subReviews.length > 0 && (
                        <StarRating
                          rating={subReviews.reduce((a, r) => a + r.rating, 0) / subReviews.length}
                          size={12}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
