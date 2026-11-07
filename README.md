# LearnHub

A learning platform where **teachers** publish courses, **students** learn from them, pass an exam, and receive a **verifiable certificate**.

> Status: in development. Documentation is written alongside the code in [`/docs`](./docs).

## Features

- **Roles:** Student, Teacher and Admin (user management, course moderation)
- **Courses:** Draft -> Published -> Unpublished, with ordered lessons (Markdown + optional video link)
- **Learning:** enrollment and lesson progress tracking
- **Exams:** single-choice questions, server-side grading, retry with cooldown
- **Certificates:** PDF with a unique verification code
- **Auth:** ASP.NET Core Identity, JWT access token + rotating refresh token

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, Axios, TanStack Query |
| Backend | ASP.NET Core Web API (controllers + services), EF Core |
| Database | PostgreSQL |
| Infrastructure | Docker, Docker Compose, GitHub Actions |

## Project structure

```
learnhub/
├── docs/               # Requirements, architecture, ADRs
├── src/
│   ├── LearnHub.Api/   # ASP.NET Core API
│   └── learnhub-web/   # React app
├── docker/             # Dockerfiles
├── docker-compose.yml        # Development: PostgreSQL only
└── docker-compose.prod.yml   # Full stack: db + api + web
```

## Getting started

### Prerequisites

- [Docker](https://www.docker.com/)
- [.NET SDK](https://dotnet.microsoft.com/download) (for development)
- [Node.js](https://nodejs.org/) (for development)

## Documentation

- [Requirements](./docs/01-requirements.md)
- [Architecture decisions](./docs/adr/)

## Roadmap

- [x] Requirements and architecture decisions
- [ ] Database design
- [ ] API design
- [ ] Authentication
- [ ] Courses and lessons
- [ ] Exams and certificates
- [ ] Admin panel
- [ ] CI pipeline

## License

MIT
