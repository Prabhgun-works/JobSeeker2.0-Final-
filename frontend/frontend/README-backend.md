# JobSeeker 2.0 - Backend (Lean)

Quick-start:

1. Copy `.env.example` to `.env` and set values.

   cp .env.example .env

2. Install dependencies:

   npm install

3. Start in dev:

   npm run dev

Notes:
- DB access uses Knex; set DATABASE_URL in .env before wiring migrations.
- Uploads are stored in ./uploads (local). Keep uploads out of git.
