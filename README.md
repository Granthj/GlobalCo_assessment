# Job Board

A minimal job board application where applicants can browse open roles and apply, and employers can post new listings. Built as a technical assessment project, developed with AI-assisted tooling (Claude) for scaffolding, debugging, and this documentation, deployed end-to-end via CI/CD to Vercel.

**Live app:** https://frontend-theta-liart-83.vercel.app/
**Backend health check:** https://backend-eight-lime-64.vercel.app/api/health
**Repository:** https://github.com/Granthj/GlobalCo_assessment

## Overview

The application lets anyone browse job postings and apply without creating an account. Posting a new job is gated behind a shared admin key rather than full user authentication — a deliberate scope decision to keep the project focused within the assessment timeline while still preventing open write access.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router |
| Backend | Node.js, Express.js |
| ORM | Sequelize |
| Database | PostgreSQL (hosted on Neon) |
| Deployment | Vercel (separate projects for frontend and backend) |
| CI/CD | GitHub Actions |

**Why Postgres over MySQL:** the project was originally scoped around MySQL, but Vercel does not provide a managed database service. Neon (serverless Postgres) was used instead since it integrates cleanly with Vercel's serverless functions, so Sequelize is configured with the `postgres` dialect rather than `mysql`.

## Architecture

```
GlobalCo_assessment/
├── Backend/
│   ├── Models/          Sequelize models (Job, Application)
│   ├── Controllers/     request handlers
│   ├── Routes/          Express route definitions
│   ├── Utils/db.js      Sequelize connection instance
│   └── app.js           Express app entry point
├── Frontend/
│   ├── api/
│   │   └── client.js     all frontend API calls
│   └── src/
│       ├── Component/   JobList, JobDetail, PostJob
│       ├── App.jsx       routing
│       └── main.jsx      React entry point
└── .github/workflows/   CI/CD pipeline definitions
```

Frontend and backend are deployed as **two separate Vercel projects**, each with its own CI/CD pipeline, rather than a single combined deployment. This keeps the two independently deployable and avoids coupling frontend build failures to backend deploys or vice versa.

## Data Model

**Jobs**
| Field | Type |
|---|---|
| id | INTEGER, primary key |
| title | STRING |
| company | STRING |
| location | STRING |
| description | TEXT |
| createdAt | DATE |

**Applications**
| Field | Type |
|---|---|
| id | INTEGER, primary key |
| jobId | INTEGER, foreign key → Jobs.id |
| applicantName | STRING |
| applicantEmail | STRING |
| resumeLink | STRING |
| createdAt | DATE |

A job has many applications; an application belongs to one job (`onDelete: CASCADE`, so applications are removed if their job is deleted).

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | none | health check |
| GET | `/api/jobs` | none | list all jobs |
| GET | `/api/jobs/:id` | none | get a single job |
| POST | `/api/jobs` | `x-admin-key` header | create a job |
| POST | `/api/applications` | none | submit an application |
| GET | `/api/applications/job/:jobId` | none | list applications for a job |

## Frontend Routes

| Path | Page | Description |
|---|---|---|
| `/` | Job list | browse all open roles |
| `/jobs/:id` | Job detail | view a role and apply |
| `/post` | Post a job | create a new listing (requires admin key) |

## CI/CD Pipeline

Two GitHub Actions workflows run on push to `main` — one for the frontend, one for the backend — each deploying to its respective Vercel project using the Vercel CLI/action, authenticated with a Vercel token, org ID, and project ID stored as separate GitHub repository secrets per project.

Pipeline steps:
1. Checkout code
2. Install dependencies
3. Build (frontend) / verify (backend)
4. Deploy to Vercel production via `vercel-args: '--prod'`

## Environment Variables

**Backend**
```
DATABASE_URL=<neon postgres connection string>
ADMIN_KEY=123
```

**Deployment secrets (GitHub Actions, per project)**
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

## Local Development

**Backend**
```bash
cd Backend
npm install
# create a .env file with the variables listed above
npm start
```

**Frontend**
```bash
cd Frontend
npm install
npm run dev
```

## Design Decisions & Scope

- **No full authentication** — a shared admin key gates job creation instead of employer accounts, since applicant/employer login flows were out of scope for the assessment timeframe. Applying to a job remains fully open, matching how most public job boards behave.
- **Postgres instead of MySQL** — switched to match Vercel's serverless-friendly database options (Neon), since Vercel has no native database offering.
- **Separate deployments** — frontend and backend are deployed and versioned independently, each with its own pipeline, rather than a single monorepo deployment.

## Possible Next Steps

- Replace the shared admin key with real employer accounts
- Add pagination and search/filtering to the job list
- Support resume file uploads instead of a link-only field
