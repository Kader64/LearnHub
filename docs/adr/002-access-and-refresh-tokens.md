# ADR-002: Access token + refresh token

Status: Accepted

## Context
LearnHub is a SPA (React) talking to a stateless .NET API. Users should stay
signed in for days without keeping long-lived credentials exposed.

## Decision
- Short-lived JWT access token (15 minutes), sent as `Authorization: Bearer`.
- Long-lived refresh token (7 days), stored in the database.
- Refresh tokens are rotated: every refresh issues a new one and invalidates the old one.
- Only a hash of the refresh token is stored, never the raw value.
- Logout revokes the refresh token.

## Consequences
+ A stolen access token is useful for only a few minutes.
+ Sessions can be revoked server-side (e.g. when an Admin disables a user).
- Adds a `RefreshTokens` table and an Axios interceptor on the frontend
  that refreshes automatically on a 401.

## Open question
Where does the frontend keep the refresh token (httpOnly cookie vs. memory/localStorage)?