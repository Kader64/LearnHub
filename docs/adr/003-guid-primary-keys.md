# ADR-003: Guid primary keys

Status: Accepted

## Context
IDs appear in API URLs and are exposed to the client. Sequential integers
reveal how many records exist and are easy to enumerate.

## Decision
- All entities use `Guid` primary keys (PostgreSQL `uuid`).
- Identity uses `IdentityUser<Guid>` and `IdentityRole<Guid>`
  (`AppUser : IdentityUser<Guid>`, `AppRole : IdentityRole<Guid>`).
  
## Consequences
+ IDs are non-guessable and the API uses one ID per entity.
- Larger than `int`, and less readable when debugging.
- Authorization checks are still required on every endpoint. Guids are not a security control.