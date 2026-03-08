export type Department = 
  | "Computer Science"
  | "Mechanical Engineering"
  | "Electronics"
  | "Civil Engineering"
  | "Humanities"
  | "Mathematics"
  | "Physics";

export type AcademicYear = "FE" | "SE" | "TE" | "BE";

export type TeachingStyle = "Practical-Heavy" | "Theory-Heavy" | "Project-Based" | "Mixed";

export type AttendancePolicy = "Strict" | "Moderate" | "Chill";

export interface Professor {
  id: string;
  name: string;
  avatar: string;
  department: Department;
  subjects: string[];
  yearsOfExperience?: number;
  teachingStyle: TeachingStyle;
  academicYears: AcademicYear[];
  averageRating: number;
  averageDifficulty: number;
  engagementScore: number;
  totalReviews: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  professorId: string;
  studentName: string;
  course: string;
  year: AcademicYear;
  semester: string;
  gradeReceived?: string;
  attendancePolicy: AttendancePolicy;
  rating: number;
  difficulty: number;
  engagement: number;
  comment: string;
  date: string;
}

export interface FilterState {
  departments: Department[];
  academicYears: AcademicYear[];
  ratingThreshold: number;
  teachingStyle: TeachingStyle | "All";
}
