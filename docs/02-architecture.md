# LearnHub: Architecture

Status: Draft

## 1. Overview

- One SPA, one API, one database. No microservices, no message queues.
- The API is stateless. All state is in PostgreSQL, so it can scale horizontally later.
- The browser sees a single origin: the API is reached through `/api`, so no CORS
  configuration is needed and the refresh cookie is first-party (ADR-005).

## 2. Architecture decisions

| ADR | Decision |
|---|---|
| 001 | ASP.NET Core Identity with JWT |
| 002 | Access token (15 min) + rotating refresh token (7 days) |
| 003 | Guid primary keys (UUIDv7 preferred) |
| 004 | EF Core code-first with migrations |
| 005 | Refresh token in an httpOnly cookie, access token in memory |
| 006 | Request validation approach (pending) |

## 3. Runtime topology

| Mode | Database | API | Frontend |
|---|---|---|---|
| Development | Docker (`docker-compose.yml`) | native, `dotnet watch` | native, `npm run dev` with proxy to the API |
| Production / demo | Docker | Docker | Docker (nginx: static files + `/api` proxy) |

Configuration comes from environment variables (`.env` locally, never committed).
`.env.example` documents every key.


## 4. Backend

### 4.1 Layers (single project, `LearnHub.Api`)

```
HTTP request
  → Middleware   (exception handling, rate limiting, authentication)
  → Controller   (HTTP only: bind, authorize, call service, map result to status code)
  → Service      (business rules, transactions, resource authorization)
  → AppDbContext (EF Core, PostgreSQL)
```

### 4.2 Folder layout

```
LearnHub.Api/
├── Controllers/
├── Services/          # grouped by feature once it grows: Services/Courses/...
├── Entities/
├── Dtos/              # grouped by feature
├── Data/              # AppDbContext, Configurations/, Migrations/, Seed/
├── Validators/        # depends on the validation decision
├── Middleware/        # ExceptionHandlingMiddleware
├── Extensions/        # service registration, keeps Program.cs short
├── Program.cs
└── appsettings.json
```

### 4.3 Services

| Service | Responsibility |
|---|---|
| AuthService, TokenService | register, login, refresh with rotation and reuse detection, logout, JWT creation |
| CourseService | CRUD, publish/unpublish validation, browsing and filtering |
| LessonService | CRUD, reordering, video URL validation |
| EnrollmentService | enroll, list my courses, lesson completion, progress |
| ExamService | teacher side: manage exam settings, questions and answers, archive rules |
| AttemptService | student side: start, save answer, submit, grading, attempt limit, expiry |
| CertificateService | issue on pass, verify by code, revoke |
| CertificatePdfGenerator | QuestPDF rendering from the certificate record |
| AdminService | list and disable users, change roles, moderate courses and certificates |

### 4.4 Authorization

| Policy | Allowed roles |
|---|---|
| `CanLearn` | Student, Teacher |
| `CanTeach` | Teacher |
| `AdminOnly` | Admin |

- Controllers use `[Authorize(Policy = ...)]`.
- Resource ownership is checked in the service. When a user shouldn't know a
  resource exists, the API returns **404**, not 403.
- A deactivated user (`IsActive = false`) is rejected at login and at refresh.
  Existing access tokens expire within 15 minutes.
- Guids are not a security control. Every endpoint checks authorization.

### 4.5 Authentication flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant A as API
    B->>A: POST /api/auth/login (email, password)
    A-->>B: 200 {accessToken} + Set-Cookie refresh (httpOnly)
    B->>A: GET /api/... (Authorization: Bearer access)
    A-->>B: 401 (access token expired)
    B->>A: POST /api/auth/refresh (cookie sent automatically)
    A-->>B: 200 {accessToken} + new refresh cookie (old one revoked)
    B->>A: retry original request
```

Token details (ADR-002, ADR-005):
- Access token: JWT, 15 minutes, `Authorization: Bearer`, kept in memory only.
- Refresh token: random value, 7 days. Only its SHA-256 hash is stored.
  Cookie flags: `HttpOnly; Secure; SameSite=Strict; Path=/api/auth`.
- Every refresh rotates the token (new token issued, old one revoked and linked
  through `ReplacedByTokenId`).
- **Reuse detection:** if a revoked token is presented outside a ~10 second grace
  window, the whole rotation chain for that user is revoked and the user must log in again.
- Logout revokes the token and clears the cookie.
- Disabling a user revokes all of their refresh tokens.

### 4.6 Attempt flow (exam)

```mermaid
sequenceDiagram
    participant B as Browser
    participant A as API
    B->>A: POST /api/exams/{courseId}/attempts (start)
    Note over A: One transaction: lessons completed? attempt limit not reached?<br/>no open attempt? create attempt + AttemptAnswer rows
    A-->>B: 201 attemptId, expiresAt, shuffled questions (no isCorrect)
    B->>A: PUT /api/attempts/{id}/answers/{questionId} (save answer)
    B->>A: POST /api/attempts/{id}/submit
    Note over A: One transaction: check expiry, grade, set score/passed,<br/>issue certificate if first pass
    A-->>B: 200 {scorePercent, passed, passMarkPercent}
```

Rules:
- **Start** runs in one transaction and checks: all lessons completed, no open
  attempt, and the attempt count is below `MaxAttempts` (when set). Every started
  attempt counts toward the limit, including Expired ones. Rows in `AttemptAnswer`
  are created for each active question, which fixes the question set.
- **Shuffle:** question and answer order are derived from `ShuffleSeed`, so a page
  refresh does not reshuffle.
- **Save answer** is allowed only while the attempt is `InProgress` and before `ExpiresAt`.
- **Submit** after `ExpiresAt` is rejected, and the attempt is stored as `Expired`
  (graded as submitted so far, or scored as failed, to be decided in the API doc).
- **Result visibility:** the submit response contains only score, pass/fail and the
  pass mark. Nothing at question level (see requirements, section 7).
- **Certificate:** issued inside the submit transaction on the first passing attempt.
  The unique `(StudentId, CourseId)` index prevents duplicates under concurrency.
- **Concurrency:** the partial unique index on open attempts blocks parallel starts,
  and the count check runs inside the start transaction.
- A student who already passed may retake the exam. The existing certificate is never replaced.

### 4.7 Error handling
- A global exception middleware converts exceptions into **RFC 9457 ProblemDetails**
  (`application/problem+json`).
- Services throw typed exceptions:

| Exception | HTTP status |
|---|---|
| `NotFoundException` | 404 |
| `ForbiddenException` | 403 |
| `ConflictException` | 409 |
| `ValidationException` | 400 (with field errors) |
| `BusinessRuleException` | 422 (e.g. "No attempts left", "Exam locked") |

- Unexpected errors return 500 with a generic message and a trace ID. Details go to the logs only.
- Validation errors return a field-to-messages dictionary, so the frontend can show them per field.

### 4.8 API conventions
- JSON, camelCase, ISO 8601 UTC dates, Guid IDs.
- REST-style routes under `/api`, for example `/api/courses/{id}/lessons`.
- Lists are paginated (`page`, `pageSize`, max 50) and return
  `{ items, page, pageSize, totalCount }`.
- Student-facing and teacher-facing exam DTOs are separate types.
  Only the teacher DTO contains `isCorrect`.
- Swagger/OpenAPI is enabled in development and acts as the live API reference.

### 4.9 Cross-cutting concerns

| Concern | Approach |
|---|---|
| Rate limiting | Built-in ASP.NET Core middleware. Strict on `/api/auth/*`, `/api/certificates/verify/*` and exam-start endpoints |
| Logging | Serilog, structured, to console. Never log passwords, tokens or answers |
| Health check | `/health` with a DB check, used by Docker Compose |
| Time | Services use `TimeProvider`, so expiry logic is testable |
| Transactions | Start attempt, submit attempt (with certificate issue) and refresh-token rotation each run in one transaction |
| Migrations | Applied automatically at startup in development only. In production they run as a one-off step (EF migrations bundle) |
| Seeding | Roles, categories and the Admin account, on startup. The Admin password comes from environment variables |
| Certificate PDF | QuestPDF, community license set at startup, rendered on demand from the certificate record |

## 5. Frontend

### 5.1 Structure (feature-based)

```
src/learnhub-web/src/
├── api/          # axios instance, interceptors, typed endpoint functions
├── app/          # router, providers (Auth, QueryClient), layouts
├── features/     # auth, courses, learning, exams, certificates, admin
│   └── <feature>/ { components, hooks, pages, api }
├── components/   # shared UI primitives (Button, Modal, Input...)
├── hooks/
├── lib/          # helpers (formatting, markdown rendering)
└── types/
```

### 5.2 Main routes

| Route | Access |
|---|---|
| `/`, `/courses`, `/courses/:id` | public |
| `/verify/:code` | public |
| `/login`, `/register` | public |
| `/my-learning`, `/learn/:courseId`, `/exam/:courseId`, `/certificates` | Student, Teacher |
| `/teach`, `/teach/courses/:id` | Teacher |
| `/admin/users`, `/admin/courses`, `/admin/certificates` | Admin |