# LearnHub: Database design

Status: Draft
Database: PostgreSQL
ORM: EF Core (Npgsql), code-first with migrations (see ADR-004)

## 1. Conventions
- Primary keys: `Guid` (PostgreSQL `uuid`), preferably UUIDv7 (see ADR-003).
- Timestamps: `timestamptz`, always UTC, named `CreatedAt`, `UpdatedAt`, etc.
- Enums are stored as strings (readable in SQL, safe to reorder in code).
- Table and column names are snake_case in PostgreSQL (`EFCore.NamingConventions`),
  PascalCase in C#.
- `Order` columns are integers starting at 1. Reordering is normalized by the
  service, so there is no unique constraint on order (it would make swaps painful).
- The entities and Fluent API configuration are the source of truth. This document
  is the human-readable design, and migrations implement it.

## 2. Entity relationships

WIP

## 3. Tables

### 3.1 AppUser (`AspNetUsers`, extends Identity)
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | `AppUser : IdentityUser<Guid>` |
| FullName | varchar(100) | required |
| CreatedAt | timestamptz | |
| IsActive | bool | default true. Admin can disable a user, and disabling revokes their refresh tokens |
| *(Identity columns)* | | Email, UserName, PasswordHash, lockout fields, etc. |

Roles (`Student`, `Teacher`, `Admin`) live in Identity's `AspNetRoles` and
`AspNetUserRoles` (`AppRole : IdentityRole<Guid>`).

### 3.2 RefreshToken
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| UserId | uuid FK → AppUser | cascade delete |
| TokenHash | varchar(64) | unique, SHA-256 of the raw token |
| CreatedAt | timestamptz | |
| ExpiresAt | timestamptz | |
| RevokedAt | timestamptz null | |
| ReplacedByTokenId | uuid null | rotation chain, used to detect reuse of an old token |

Index: `UserId`.

### 3.3 Category
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| Name | varchar(60) | unique |

Seeded with a small list. Managed by Admin later.

### 3.4 Course
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| TeacherId | uuid FK → AppUser | restrict delete |
| CategoryId | uuid FK → Category | restrict delete |
| Title | varchar(150) | required |
| Description | varchar(2000) | required |
| ThumbnailUrl | varchar(500) null | external URL, see open items |
| Level | varchar(20) | Beginner / Intermediate / Advanced |
| Status | varchar(20) | Draft / Published / Unpublished |
| CreatedAt, UpdatedAt | timestamptz | |
| PublishedAt | timestamptz null | |

Indexes: `(Status, CategoryId)` for browsing, `TeacherId` for "my courses".

### 3.5 Lesson
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| CourseId | uuid FK → Course | cascade delete |
| Title | varchar(150) | required |
| Order | int | |
| Content | text | Markdown body |
| VideoUrl | varchar(300) null | host allowlist validated in the API |

Index: `(CourseId, Order)`.

### 3.6 Enrollment
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| StudentId | uuid FK → AppUser | restrict delete |
| CourseId | uuid FK → Course | restrict delete |
| EnrolledAt | timestamptz | |

Unique: `(StudentId, CourseId)`.

### 3.7 LessonProgress
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| EnrollmentId | uuid FK → Enrollment | cascade delete |
| LessonId | uuid FK → Lesson | cascade delete |
| CompletedAt | timestamptz | a row exists = lesson completed |

Unique: `(EnrollmentId, LessonId)`.
Exam unlock rule: number of progress rows = number of lessons in the course.

### 3.8 Exam
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| CourseId | uuid FK → Course | **unique** (one exam per course), cascade delete |
| PassMarkPercent | int | check 50-100, default 70 |
| TimeLimitMinutes | int null | check > 0 |
| MaxAttempts | int null | null = unlimited. Check >= 1 when not null |

### 3.9 Question
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| ExamId | uuid FK → Exam | cascade delete |
| Text | varchar(1000) | required |
| Order | int | |
| IsArchived | bool | default false. Archived questions are excluded from new attempts |

### 3.10 Answer
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| QuestionId | uuid FK → Question | cascade delete |
| Text | varchar(500) | required |
| IsCorrect | bool | never exposed in student DTOs |
| Order | int | |
| IsArchived | bool | default false |

Partial unique index on `(QuestionId) WHERE IsCorrect = true AND IsArchived = false`:
at most one active correct answer per question. Archived answers may keep
`IsCorrect = true` as history. "At least one" and "2-6 active answers" are checked
by the service at publish time.

### 3.11 ExamAttempt
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| EnrollmentId | uuid FK → Enrollment | restrict delete |
| ExamId | uuid FK → Exam | restrict delete |
| Status | varchar(20) | InProgress / Submitted / Expired |
| StartedAt | timestamptz | |
| ExpiresAt | timestamptz null | StartedAt + time limit, fixed at start |
| SubmittedAt | timestamptz null | |
| ShuffleSeed | int | question and answer order is derived from it, so a page refresh does not reshuffle |
| PassMarkPercent | int | snapshot of the exam's pass mark at start |
| ScorePercent | numeric(5,2) null | set on submit |
| Passed | bool null | set on submit |

Indexes:
- `(EnrollmentId, ExamId)` to count a student's attempts against `MaxAttempts`.
- Partial unique index on `(EnrollmentId) WHERE Status = 'InProgress'`, so a student
  can have only one open attempt at a time.

### 3.12 AttemptAnswer
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| AttemptId | uuid FK → ExamAttempt | cascade delete |
| QuestionId | uuid FK → Question | restrict delete |
| SelectedAnswerId | uuid null FK → Answer | null = unanswered. Restrict delete |

Unique: `(AttemptId, QuestionId)`.

Rows are created **when the attempt starts**, one per active question, with
`SelectedAnswerId = null`, and filled in as the student answers. This fixes the
question set of an attempt at start time, so teacher edits during an attempt
don't change it.

Grading rule: score = correct selections among the attempt's rows, divided by the
row count. It doesn't depend on the current state of the exam.

### 3.13 Certificate
| Column | Type | Notes |
|---|---|---|
| Id | uuid PK | |
| Code | varchar(12) | unique, e.g. `LH-7K2M-9QXD` |
| StudentId | uuid FK → AppUser | restrict delete |
| CourseId | uuid FK → Course | restrict delete |
| AttemptId | uuid FK → ExamAttempt | the passing attempt, restrict delete |
| StudentName | varchar(100) | snapshot at issue time |
| CourseTitle | varchar(150) | snapshot at issue time |
| TeacherName | varchar(100) | snapshot at issue time |
| ScorePercent | numeric(5,2) | snapshot at issue time |
| IssuedAt | timestamptz | |
| RevokedAt | timestamptz null | |
| RevokedByUserId | uuid null FK → AppUser | the Admin who revoked |
| RevocationReason | varchar(300) null | |

Unique: `Code`, and `(StudentId, CourseId)`.

Code generation: cryptographically random, 8 characters from a 32-character
alphabet without look-alike characters (no `0/O`, `1/I/L`), formatted as
`LH-XXXX-XXXX`. That gives about 10^12 combinations, which makes guessing
impractical alongside rate limiting.

## 4. Delete rules
- The content tree (Course → Lesson, Exam → Question → Answer) uses **cascade**.
- Anything that records student activity (Enrollment, ExamAttempt, AttemptAnswer,
  Certificate) uses **restrict**, so history can't be lost by accident.
- A course can be hard-deleted only while it is Draft and has no enrollments.
  Otherwise it is Unpublished, never deleted.
- A user is deactivated (`IsActive = false`), not deleted, once they own
  courses, enrollments or certificates.

## 4b. Editing exams that have attempts
- Text typos in questions and answers can be edited in place.
- A question or answer referenced by any `AttemptAnswer` is **never hard-deleted**.
  "Delete" sets `IsArchived = true`.
- Questions or answers with no attempts can be hard-deleted.
- Archived items are excluded from new attempts and from publish validation
  (at least 1 active question, 2-6 active answers per question, exactly one
  active correct answer).
- An attempt in progress is graded against the questions it started with, even if
  they were archived meanwhile.
- Past scores are never recalculated. `ScorePercent`, `Passed` and the certificate
  snapshot stay as issued.
- An edit to a Published course is rejected if it would leave the exam invalid.

## 5. Integrity rules: database vs. service

| Rule | Enforced by |
|---|---|
| One enrollment per student per course | DB unique index |
| One certificate per student per course | DB unique index |
| One exam per course | DB unique index |
| At most one active correct answer per question | DB partial unique index |
| At most one open attempt per enrollment | DB partial unique index |
| Pass mark 50-100, time limit > 0 | DB check constraints |
| 2-6 active answers, exactly one correct, at least 1 question | Service (at publish) |
| Exam unlocked only after all lessons are completed | Service |
| Attempt count below `MaxAttempts` (when set) | Service, inside the start-attempt transaction |
| Time limit on submit | Service (compares to `ExpiresAt`) |
| Video URL host allowlist | API validation |

## 6. EF Core implementation notes
- Partial unique indexes: `HasIndex(...).IsUnique().HasFilter(...)`.
- Check constraints: `ToTable(t => t.HasCheckConstraint(...))`.
- Enum-to-string: `HasConversion<string>()`.
- snake_case: `UseSnakeCaseNamingConvention()`.
- Migrations are applied automatically at startup in development only.
  In production they run as a separate step (EF migrations bundle).

## 7. Open items
- Thumbnail source (no uploads in the MVP, so an external URL, or none).