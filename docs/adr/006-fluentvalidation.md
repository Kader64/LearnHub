# ADR-006: FluentValidation for request validation

Status: Accepted

## Context
Requests need shape checks (required, length, format) and some rules that are
awkward as attributes (video host allowlist, 2-6 answers, pass mark range).

## Decision
- One validator class per request DTO, in `Validators/` (grouped by feature).
- Use `FluentValidation.DependencyInjectionExtensions` and register all validators
  from the assembly with `AddValidatorsFromAssemblyContaining<Program>()`.
- Validation runs **automatically** through a small endpoint filter / action filter,
  not manually in each controller. Failures throw `ValidationException`, which the
  global middleware turns into a 400 ProblemDetails with a field-to-messages dictionary.
- Validators check only what can be decided from the request itself (shape, ranges,
  allowlists). Rules that need the database (attempt limit, ownership, "exam is
  valid to publish", unique email) stay in services.
- DB-level limits (max lengths, check constraints) must match validator rules, so the
  user gets a clean 400 and never a database exception.

## Consequences
+ DTOs stay clean, and rules are readable and unit-testable in isolation.
+ Consistent error format for the frontend.
- One extra NuGet package and a `Validators/` folder.
- Rules can drift from DB constraints, so the lengths in `03-database.md` are the
  reference for both.
- The official package for automatic ASP.NET validation was deprecated, so we wire
  the filter ourselves instead of using `FluentValidation.AspNetCore`.