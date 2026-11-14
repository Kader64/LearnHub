// EXAMPLE DATA ONLY. This file just feeds the visual components.

import type { CourseCoverData } from "../components/CourseCover";

export type CourseStatus = "Draft" | "Published" | "Unpublished" | "Suspended";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

// Course extends CourseCoverData (coverType, coverGradient, coverIcon, thumbnailUrl),
// so a course can be passed straight to <CourseCover cover={course} />.
export interface Course extends CourseCoverData {
  id: string;
  title: string;
  description: string;
  category: string;
  level: CourseLevel;
  teacher: string;
  lessons: number;
  students: number;
  status: CourseStatus;
}

// EXAMPLE: courses (GET /api/courses)
export const courses: Course[] = [
  {
    id: "c1",
    title: "Introduction to C# and .NET",
    description: "Learn the fundamentals of C# and the .NET platform and write your first console applications.",
    category: "Programming",
    level: "Beginner",
    teacher: "Jan Nowak",
    lessons: 12,
    students: 248,
    status: "Published",
    coverType: "Gradient",
    coverGradient: "teal",
    coverIcon: "code",
    thumbnailUrl: null,
  },
  {
    id: "c2",
    title: "React and TypeScript from Scratch",
    description: "Build modern user interfaces with React, hooks and strict TypeScript typing.",
    category: "Web Development",
    level: "Intermediate",
    teacher: "Maria Wiśniewska",
    lessons: 18,
    students: 412,
    status: "Published",
    coverType: "Gradient",
    coverGradient: "ocean",
    coverIcon: "code",
    thumbnailUrl: null,
  },
  {
    id: "c3",
    title: "SQL and PostgreSQL Essentials",
    description: "Design relational schemas, write queries and understand indexes and transactions.",
    category: "Databases",
    level: "Beginner",
    teacher: "Jan Nowak",
    lessons: 10,
    students: 187,
    status: "Published",
    coverType: "Gradient",
    coverGradient: "forest",
    coverIcon: "database",
    thumbnailUrl: null,
  },
  {
    id: "c4",
    title: "Docker for Developers",
    description: "Containerize applications and run a full stack locally with Docker Compose.",
    category: "DevOps",
    level: "Intermediate",
    teacher: "Piotr Zieliński",
    lessons: 9,
    students: 0,
    status: "Draft",
    coverType: "Gradient",
    coverGradient: "amber",
    coverIcon: "science",
    thumbnailUrl: null,
  },
  {
    id: "c5",
    title: "Clean Architecture in ASP.NET Core",
    description: "Structure larger APIs with layers, services and clear boundaries.",
    category: "Programming",
    level: "Advanced",
    teacher: "Maria Wiśniewska",
    lessons: 15,
    students: 64,
    status: "Published",
    coverType: "Gradient",
    coverGradient: "grape",
    coverIcon: "code",
    thumbnailUrl: null,
  },
  {
    id: "c6",
    title: "UX Design Basics",
    description: "Understand users, wireframes and usability testing in a few practical lessons.",
    category: "Design",
    level: "Beginner",
    teacher: "Anna Kowalska",
    lessons: 8,
    students: 53,
    status: "Suspended",
    coverType: "Gradient",
    coverGradient: "sunset",
    coverIcon: "palette",
    thumbnailUrl: null,
  },
];

// EXAMPLE: lessons of one course (GET /api/courses/{id}/lessons)
// videoUrl is null for text-only lessons.
export const lessons = [
  { id: "l1", order: 1, title: "What is .NET?", duration: "8 min", completed: true, videoUrl: "https://example.com/video/what-is-dotnet" as string | null },
  { id: "l2", order: 2, title: "Setting up your environment", duration: "12 min", completed: true, videoUrl: null as string | null },
  { id: "l3", order: 3, title: "Variables and data types", duration: "15 min", completed: false, videoUrl: "https://example.com/video/variables" as string | null },
  { id: "l4", order: 4, title: "Control flow", duration: "14 min", completed: false, videoUrl: null as string | null },
  { id: "l5", order: 5, title: "Methods and classes", duration: "20 min", completed: false, videoUrl: "https://example.com/video/methods" as string | null },
];

// EXAMPLE: categories (GET /api/categories)
export const categories = [
  { id: "k1", name: "Programming", courses: 2 },
  { id: "k2", name: "Web Development", courses: 1 },
  { id: "k3", name: "Databases", courses: 1 },
  { id: "k4", name: "DevOps", courses: 1 },
  { id: "k5", name: "Design", courses: 1 },
  { id: "k6", name: "Data Science", courses: 0 }, // no courses, so it can be deleted
];

// EXAMPLE: exam questions. Only the teacher DTO has the correct answer (index in `answers`).
// The student exam view never receives it.
export const examQuestions = [
  {
    id: "q1",
    text: "Which keyword declares a constant in C#?",
    answers: ["const", "final", "static", "readonly var"],
    correct: 0,
  },
  {
    id: "q2",
    text: "What does the dotnet CLI command `dotnet run` do?",
    answers: ["Builds and runs the project", "Publishes the project", "Creates a new solution"],
    correct: 0,
  },
  {
    id: "q3",
    text: "Which type stores true or false values?",
    answers: ["int", "bool", "char", "decimal"],
    correct: 1,
  },
];

// EXAMPLE: certificates (GET /api/certificates)
export const certificates = [
  { code: "LH-7K2M-9QXD", student: "Anna Kowalska", course: "Introduction to C# and .NET", teacher: "Jan Nowak", date: "12 Oct 2026", score: 92, status: "Valid" },
  { code: "LH-4HTR-W8ND", student: "Ewa Lis", course: "React and TypeScript from Scratch", teacher: "Maria Wiśniewska", date: "03 Nov 2026", score: 85, status: "Valid" },
  { code: "LH-B2XQ-5MFC", student: "Piotr Zieliński", course: "SQL and PostgreSQL Essentials", teacher: "Jan Nowak", date: "28 Sep 2026", score: 74, status: "Revoked" },
];

// EXAMPLE: users (GET /api/admin/users)
export const users = [
  { id: "u1", name: "Anna Kowalska", email: "anna@example.com", role: "Student", courses: 0, enrollments: 4, certificates: 2, active: true },
  { id: "u2", name: "Jan Nowak", email: "jan@example.com", role: "Teacher", courses: 2, enrollments: 1, certificates: 0, active: true },
  { id: "u3", name: "Maria Wiśniewska", email: "maria@example.com", role: "Teacher", courses: 2, enrollments: 3, certificates: 1, active: true },
  { id: "u4", name: "Piotr Zieliński", email: "piotr@example.com", role: "Student", courses: 0, enrollments: 2, certificates: 0, active: false },
  { id: "u5", name: "Ewa Lis", email: "ewa@example.com", role: "Student", courses: 0, enrollments: 6, certificates: 5, active: true },
  { id: "u6", name: "Site Admin", email: "admin@learnhub.example", role: "Admin", courses: 0, enrollments: 0, certificates: 0, active: true },
];

// EXAMPLE: audit log entries (GET /api/admin/audit)
export const auditLog = [
  { id: "a1", time: "08 Nov 2026, 10:42", actor: "Site Admin", action: "CourseSuspended", target: "Course: UX Design Basics", details: "Reason: copied content" },
  { id: "a2", time: "07 Nov 2026, 16:05", actor: "Site Admin", action: "UserDisabled", target: "User: Piotr Zieliński", details: "-" },
  { id: "a3", time: "05 Nov 2026, 09:12", actor: "Site Admin", action: "CertificateRevoked", target: "Certificate: LH-B2XQ-5MFC", details: "Reason: cheating" },
  { id: "a4", time: "02 Nov 2026, 14:30", actor: "Site Admin", action: "UserRoleChanged", target: "User: Maria Wiśniewska", details: "Student → Teacher" },
  { id: "a5", time: "30 Oct 2026, 11:00", actor: "Site Admin", action: "CategoryCreated", target: "Category: Data Science", details: "-" },
];