# ADR-004: EF Core code-first with migrations

Status: Accepted

## Context
The database is designed from scratch together with the API.

## Decision
- Entities and Fluent API configuration in C# are the source of truth.
- Schema changes are made only through EF Core migrations, committed to Git.
- `docs/03-database.md` is the design document, and migrations implement it.
- Never edit the database by hand, and never edit a migration that is already in `main`.

## Consequences
+ Schema history is versioned with the code, and a fresh database is one command away.
+ Works naturally with Identity.
- Some PostgreSQL features (partial indexes, check constraints) need explicit configuration.
- Production migration needs a deliberate step (migration bundle), not auto-migrate.