# LearnHub: Requirements

Status: Draft (in progress)

## 1. Overview
LearnHub is a platform where teachers publish courses, students learn from them,
pass an exam, and receive a certificate.

## 2. Roles

| Role    | Can do |
|---------|--------|
| Student | Browse courses, enroll, complete lessons, take the exam, download certificate |
| Teacher | Everything a student can, plus create and manage their own courses, lessons and exams |
| Admin   | Manage users and roles, moderate or unpublish courses |

Rules:
- One account has one role, chosen at registration (Student or Teacher).
- Admin is seeded on startup from environment variables, never a public sign-up option.
- Teacher inheriting student abilities is handled with authorization policies
  (e.g. "CanEnroll" allows Student and Teacher), not with multiple roles.

## 3. Authentication
- ASP.NET Core Identity + JWT (see ADR-001)
- Short-lived access token + rotating refresh token (see ADR-002).

## 4. Main user flow
1. A teacher creates a course (title, description, lessons, exam) and publishes it.
2. A student enrolls in the course.
3. The student goes through the lessons and progress is tracked.
4. When all lessons are completed, the exam unlocks.
5. If the student reaches the pass mark, a certificate is generated
   (PDF with a unique verification code).

## 5. Course structure

```
Course
 ├── title, description, thumbnail, category, level
 ├── status: Draft → Published → Unpublished (by teacher or admin)
 ├── teacher (owner)
 └── Lessons (ordered)
      ├── title
      ├── order
      └── content
Exam (one per course)
 └── Questions → Answers
```

Rules:
- A course is visible to students only when Published.
- A course needs at least one lesson and a valid exam before it can be published.
- Only the owning teacher can edit a course. Admin can unpublish any course.
- Lessons are a flat ordered list in the MVP (sections/modules can come later).

## 6. Lesson content (MVP)
- A lesson has a title, an order, and a Markdown body.
- A lesson may have one optional video URL (YouTube or Vimeo).
- No file uploads in the MVP.

Implementation notes:
- Store only the URL in the database, never video files.
- Validate that the URL's host is on an allowlist (youtube.com, youtu.be, vimeo.com).
- Frontend renders Markdown with a sanitizing renderer, and embeds video via an
  iframe built from the parsed video ID, never from the raw URL.

## 7. Exam rules (MVP)

### Structure
```
Exam
 ├── passMarkPercent
 ├── maxAttempts          (optional, future)
 ├── timeLimitMinutes     (optional)
 └── Questions (ordered)
      ├── text
      └── Answers (text, isCorrect)
```

### Question type (confirmed)
- Single choice only: each question has 2-6 answers, exactly one is correct.

### Grading (confirmed)
- Graded on the server.
- Correct answers are never sent to the client before the attempt is submitted.
  Student-facing question DTOs have no `isCorrect` field.
- Score = correct answers / total questions, as a percentage.
- All questions have equal weight.

### Publish validation (confirmed)
- The exam has at least 1 question.
- Every question has 2-6 answers and exactly one marked correct.

### Exam settings (PROPOSED, awaiting confirmation)

| Setting | Proposed default |
|---------|------------------|
| Pass mark | 70%, set per exam by the teacher (range 0-100%) |
| Attempts | Unlimited, with a 10-minute cooldown between attempts |
| Time limit | Optional, per exam, enforced on the server |
| Question order | Shuffled per attempt (answers shuffled too) |
| Result shown | Score, pass/fail, which questions were wrong, but not the correct answers |
| Unlock rule | All lessons completed |

## 8. Certificate
TODO: not yet defined (contents, verification code, PDF generation).

## 9. Open questions
- Refresh token storage on the frontend (httpOnly cookie vs. memory/localStorage).
- Whether students see correct answers after a failed attempt.

## 10. Planned improvements
- Multiple choice and true/false questions
- File attachments for lessons (PDF, slides)
- Course sections/modules
- Teacher setting to reveal correct answers after an attempt