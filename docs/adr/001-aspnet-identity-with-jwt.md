# ADR-001: Use ASP.NET Core Identity with JWT

Status: Accepted

## Context
LearnHub needs registration, login, password handling and role-based access
(Student, Teacher, Admin). Authentication is security-critical and not part of
the project's unique domain.

## Decision
- Use ASP.NET Core Identity for users, roles and password hashing.
- Register with `AddIdentityCore<AppUser>()` and `AddRoles<IdentityRole>()`
  (no Razor UI, since this is an API).
- `AppUser` extends `IdentityUser` with `FullName` and `CreatedAt`.
- Issue JWTs from our own `TokenService`.
- Authorize with roles and policies.
- Seed the Admin account from environment variables.

## Alternatives considered
- Custom auth: more work, higher risk of security mistakes, no benefit for this project.

## Consequences
+ Secure password hashing, lockout and password rules out of the box.
+ Standard, well-documented approach.
- We still write `AuthController`, `TokenService` and the refresh token logic.