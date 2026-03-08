import { Professor, Review, Department } from "./types";

const reviews: Review[] = [
  { id: "r1", professorId: "p1", studentName: "Aarav S.", course: "Data Structures", year: "SE", semester: "Fall 2024", gradeReceived: "A", attendancePolicy: "Moderate", rating: 5, difficulty: 3, engagement: 5, comment: "Brilliant teacher. Makes complex topics intuitive with real-world examples.", date: "2024-12-01" },
  { id: "r2", professorId: "p1", studentName: "Priya M.", course: "Algorithms", year: "TE", semester: "Spring 2024", attendancePolicy: "Moderate", rating: 4, difficulty: 4, engagement: 4, comment: "Challenging but rewarding. Office hours are incredibly helpful.", date: "2024-05-15" },
  { id: "r3", professorId: "p1", studentName: "Rohan K.", course: "Data Structures", year: "SE", semester: "Fall 2023", gradeReceived: "B+", attendancePolicy: "Moderate", rating: 5, difficulty: 3, engagement: 5, comment: "One of the best professors in the department. Highly engaging lectures.", date: "2023-12-10" },
  { id: "r4", professorId: "p2", studentName: "Sneha D.", course: "Database Systems", year: "TE", semester: "Fall 2024", gradeReceived: "A-", attendancePolicy: "Strict", rating: 4, difficulty: 2, engagement: 4, comment: "Very organized lectures. Provides excellent study materials.", date: "2024-11-20" },
  { id: "r5", professorId: "p2", studentName: "Vikram J.", course: "Web Development", year: "SE", semester: "Spring 2024", attendancePolicy: "Strict", rating: 3, difficulty: 2, engagement: 3, comment: "Good content but strict attendance can be frustrating.", date: "2024-05-01" },
  { id: "r6", professorId: "p3", studentName: "Ananya R.", course: "Thermodynamics", year: "SE", semester: "Fall 2024", gradeReceived: "B", attendancePolicy: "Moderate", rating: 4, difficulty: 4, engagement: 4, comment: "Tough subject but Dr. Kulkarni makes it approachable with practical demos.", date: "2024-11-15" },
  { id: "r7", professorId: "p3", studentName: "Manish T.", course: "Fluid Mechanics", year: "TE", semester: "Spring 2024", attendancePolicy: "Moderate", rating: 5, difficulty: 5, engagement: 5, comment: "Incredibly passionate about teaching. Lab sessions are the highlight.", date: "2024-04-20" },
  { id: "r8", professorId: "p4", studentName: "Kavya N.", course: "Digital Electronics", year: "SE", semester: "Fall 2024", gradeReceived: "A", attendancePolicy: "Chill", rating: 5, difficulty: 3, engagement: 5, comment: "Fantastic professor! Makes digital circuits fun with hands-on projects.", date: "2024-12-05" },
  { id: "r9", professorId: "p5", studentName: "Arjun P.", course: "Structural Analysis", year: "TE", semester: "Fall 2024", attendancePolicy: "Strict", rating: 3, difficulty: 4, engagement: 3, comment: "Knowledgeable but lectures can be dry. Exams are tough.", date: "2024-11-28" },
  { id: "r10", professorId: "p5", studentName: "Divya L.", course: "Structural Analysis", year: "TE", semester: "Spring 2024", gradeReceived: "B+", attendancePolicy: "Strict", rating: 3, difficulty: 5, engagement: 2, comment: "Very strict grading. Material is dense.", date: "2024-05-10" },
  { id: "r11", professorId: "p6", studentName: "Meera V.", course: "English Literature", year: "FE", semester: "Fall 2024", gradeReceived: "A", attendancePolicy: "Chill", rating: 5, difficulty: 1, engagement: 5, comment: "Dr. Iyer makes every class feel like a discussion, not a lecture. Wonderful!", date: "2024-12-02" },
  { id: "r12", professorId: "p7", studentName: "Nikhil G.", course: "Linear Algebra", year: "FE", semester: "Fall 2024", gradeReceived: "B", attendancePolicy: "Moderate", rating: 4, difficulty: 4, engagement: 4, comment: "Very clear explanations. Problem sets are challenging but fair.", date: "2024-11-25" },
  { id: "r13", professorId: "p8", studentName: "Sonal B.", course: "Quantum Physics", year: "TE", semester: "Fall 2024", attendancePolicy: "Moderate", rating: 4, difficulty: 5, engagement: 4, comment: "Mind-bending subject taught brilliantly. Expect to study hard.", date: "2024-12-08" },
  { id: "r14", professorId: "p9", studentName: "Tanvi C.", course: "Machine Learning", year: "BE", semester: "Fall 2024", gradeReceived: "A", attendancePolicy: "Chill", rating: 5, difficulty: 4, engagement: 5, comment: "Industry-relevant projects. Best ML course I've taken.", date: "2024-12-10" },
  { id: "r15", professorId: "p9", studentName: "Harsh W.", course: "Machine Learning", year: "BE", semester: "Spring 2024", attendancePolicy: "Chill", rating: 5, difficulty: 3, engagement: 5, comment: "Prof. Deshmukh is a gem. Hands-on Kaggle competitions as assignments!", date: "2024-05-20" },
  { id: "r16", professorId: "p10", studentName: "Aditi F.", course: "Control Systems", year: "TE", semester: "Fall 2024", gradeReceived: "A-", attendancePolicy: "Moderate", rating: 4, difficulty: 3, engagement: 4, comment: "Solid teaching with MATLAB labs. Well-structured course.", date: "2024-11-30" },
];

export const professors: Professor[] = [
  {
    id: "p1", name: "Dr. Rajesh Sharma", avatar: "RS",
    department: "Computer Science", subjects: ["Data Structures", "Algorithms", "Programming in C"],
    yearsOfExperience: 15, teachingStyle: "Practical-Heavy", academicYears: ["SE", "TE"],
    averageRating: 4.7, averageDifficulty: 3.3, engagementScore: 4.7, totalReviews: 3,
    reviews: reviews.filter(r => r.professorId === "p1"),
  },
  {
    id: "p2", name: "Prof. Meena Patil", avatar: "MP",
    department: "Computer Science", subjects: ["Database Systems", "Web Development", "Software Engineering"],
    yearsOfExperience: 10, teachingStyle: "Theory-Heavy", academicYears: ["SE", "TE"],
    averageRating: 3.5, averageDifficulty: 2.0, engagementScore: 3.5, totalReviews: 2,
    reviews: reviews.filter(r => r.professorId === "p2"),
  },
  {
    id: "p3", name: "Dr. Anil Kulkarni", avatar: "AK",
    department: "Mechanical Engineering", subjects: ["Thermodynamics", "Fluid Mechanics", "Heat Transfer"],
    yearsOfExperience: 20, teachingStyle: "Practical-Heavy", academicYears: ["SE", "TE", "BE"],
    averageRating: 4.5, averageDifficulty: 4.5, engagementScore: 4.5, totalReviews: 2,
    reviews: reviews.filter(r => r.professorId === "p3"),
  },
  {
    id: "p4", name: "Prof. Sunita Joshi", avatar: "SJ",
    department: "Electronics", subjects: ["Digital Electronics", "Microprocessors", "VLSI Design"],
    yearsOfExperience: 12, teachingStyle: "Project-Based", academicYears: ["SE", "TE"],
    averageRating: 5.0, averageDifficulty: 3.0, engagementScore: 5.0, totalReviews: 1,
    reviews: reviews.filter(r => r.professorId === "p4"),
  },
  {
    id: "p5", name: "Dr. Vikrant Mehta", avatar: "VM",
    department: "Civil Engineering", subjects: ["Structural Analysis", "Concrete Design", "Geotechnical Engineering"],
    yearsOfExperience: 18, teachingStyle: "Theory-Heavy", academicYears: ["TE", "BE"],
    averageRating: 3.0, averageDifficulty: 4.5, engagementScore: 2.5, totalReviews: 2,
    reviews: reviews.filter(r => r.professorId === "p5"),
  },
  {
    id: "p6", name: "Dr. Lakshmi Iyer", avatar: "LI",
    department: "Humanities", subjects: ["English Literature", "Communication Skills", "Philosophy"],
    yearsOfExperience: 8, teachingStyle: "Mixed", academicYears: ["FE", "SE"],
    averageRating: 5.0, averageDifficulty: 1.0, engagementScore: 5.0, totalReviews: 1,
    reviews: reviews.filter(r => r.professorId === "p6"),
  },
  {
    id: "p7", name: "Prof. Suresh Nair", avatar: "SN",
    department: "Mathematics", subjects: ["Linear Algebra", "Calculus", "Discrete Mathematics"],
    yearsOfExperience: 14, teachingStyle: "Theory-Heavy", academicYears: ["FE", "SE"],
    averageRating: 4.0, averageDifficulty: 4.0, engagementScore: 4.0, totalReviews: 1,
    reviews: reviews.filter(r => r.professorId === "p7"),
  },
  {
    id: "p8", name: "Dr. Priya Banerjee", avatar: "PB",
    department: "Physics", subjects: ["Quantum Physics", "Optics", "Electromagnetism"],
    yearsOfExperience: 11, teachingStyle: "Mixed", academicYears: ["FE", "SE", "TE"],
    averageRating: 4.0, averageDifficulty: 5.0, engagementScore: 4.0, totalReviews: 1,
    reviews: reviews.filter(r => r.professorId === "p8"),
  },
  {
    id: "p9", name: "Prof. Amit Deshmukh", avatar: "AD",
    department: "Computer Science", subjects: ["Machine Learning", "Artificial Intelligence", "Deep Learning"],
    yearsOfExperience: 7, teachingStyle: "Project-Based", academicYears: ["TE", "BE"],
    averageRating: 5.0, averageDifficulty: 3.5, engagementScore: 5.0, totalReviews: 2,
    reviews: reviews.filter(r => r.professorId === "p9"),
  },
  {
    id: "p10", name: "Dr. Neha Gupta", avatar: "NG",
    department: "Electronics", subjects: ["Control Systems", "Signal Processing", "Embedded Systems"],
    yearsOfExperience: 9, teachingStyle: "Practical-Heavy", academicYears: ["TE", "BE"],
    averageRating: 4.0, averageDifficulty: 3.0, engagementScore: 4.0, totalReviews: 1,
    reviews: reviews.filter(r => r.professorId === "p10"),
  },
];

export const departments: Department[] = [
  "Computer Science", "Mechanical Engineering", "Electronics",
  "Civil Engineering", "Humanities", "Mathematics", "Physics",
];

export const academicYearLabels: Record<string, string> = {
  FE: "First Year (FE)",
  SE: "Second Year (SE)",
  TE: "Third Year (TE)",
  BE: "Final Year (BE)",
};

export function getProfessorsByDepartment(dept: Department): Professor[] {
  return professors.filter(p => p.department === dept);
}

export function getTopRatedByDepartment(dept: Department, limit = 5): Professor[] {
  return getProfessorsByDepartment(dept)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, limit);
}
