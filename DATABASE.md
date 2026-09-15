# Database setup — Labour Chowk

The app works **with or without** a database:

- **No `DATABASE_URL`** → it uses the bundled demo data. The build and deploy always succeed.
- **`DATABASE_URL` set** → it reads/writes a real PostgreSQL database via Prisma.

This means Vercel deploys will never fail because of the database. Add the connection
string whenever you're ready and the app becomes fully database-backed.

## 1. Get a Postgres database (pick one)

- **Vercel Postgres** — Vercel Dashboard → Storage → Create → Postgres. Copy the
  `DATABASE_URL` it generates (use the Prisma / pooled string).
- **Neon** — https://neon.tech → create project → copy the connection string.
- **Supabase** — https://supabase.com → Project → Settings → Database → connection string.

## 2. Add the environment variable

Locally, create a `.env` file (see `.env.example`):

```
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
```

On **Vercel**: Project → Settings → Environment Variables → add `DATABASE_URL`
(for Production, Preview and Development), then redeploy.

## 3. Create tables and seed data

```bash
npm install
npm run db:push     # creates all tables from prisma/schema.prisma
npm run db:seed     # loads the realistic demo workers, services, bookings, reviews
```

Optional: inspect data with `npm run db:studio`.

## 4. Deploy

Vercel runs `npm run build`, which runs `prisma generate` first (via the `build`
and `postinstall` scripts), so the client is always available. On Vercel, run the
migration/seed once from your machine (steps above) against the production database,
or add `prisma migrate deploy` to your pipeline.

## Data model

Defined in `prisma/schema.prisma`: `User`, `Worker`, `Service`, `City`, `Booking`,
`Review`, `Complaint`, with roles `CUSTOMER` / `WORKER` / `ADMIN` and enums for
availability, verification, pricing model and booking status.

All reads go through `src/lib/db.ts`, which transparently falls back to demo data
when no database is configured. Bookings created in the UI POST to `/api/bookings`.
