# Labour Chowk

**Har Kaam Ke Liye, Sahi Insaan.** — Find trusted workers near you. Get the job done right.

Labour Chowk is a modern Indian service marketplace that connects customers with nearby
skilled workers — electricians, plumbers, carpenters, painters, masons, AC technicians,
cleaners, drivers and more. This repository contains a complete, production-quality frontend
built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS**.

## Tech stack

- **Next.js 15** (App Router, React 19, Server Components + selective client components)
- **TypeScript** (strict)
- **Tailwind CSS** with a custom brand design system
- Fonts: **Inter** + **Manrope** via `next/font`
- No heavy UI/icon libraries — custom SVG icon set keeps the bundle small

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## What's included

### Public / customer
- **Homepage** — hero + search, popular services, nearby workers, trust, how it works,
  for-workers, safety, testimonials, location discovery.
- **Find Workers** (`/find-workers`) — filters (service, distance, rating, experience,
  price, availability, verified), sorting, desktop sidebar + mobile bottom-sheet filters.
- **Worker profile** (`/worker/[id]`) — about, skills, work photos, reviews with rating
  distribution, availability, service area, sticky booking rail.
- **Booking flow** (`/book/[id]`) — 7-step wizard ending in a confirmation with a unique
  booking ID (e.g. `LC-2026-000124`).
- **Services** (`/services`, `/services/[slug]`) — SEO-friendly service pages with
  JSON-LD, city links and related services.
- **How It Works**, **auth** (`/login`, `/signup`) with phone/OTP + email and role toggle.
- Info & legal pages: about, contact, careers, press, help, safety, privacy, terms,
  cancellation.

### Dashboards
- **Customer dashboard** (`/dashboard`) — overview, bookings (status tabs), saved workers,
  reviews, messages, payments, profile, help.
- **Worker dashboard** (`/worker/dashboard`) — job requests (accept/decline), bookings,
  calendar, earnings, reviews, profile, settings + a 7-step **onboarding** flow.
- **Admin panel** (`/admin`) — metrics, workers, customers, bookings management (status
  transitions), services, verification queue, review moderation, complaints, payments,
  analytics, settings.

## Data & architecture

All demo data lives in `src/data/` and is typed by the domain model in `src/lib/types.ts`
(Users, Workers, Customers, Services, Skills, Locations, Bookings, Reviews, Payments,
Messages, Notifications, Verification, Complaints). Query helpers in `src/lib/queries.ts`
sit between the UI and the data so the mock layer can later be swapped for a real backend/API
without changing components. Roles: `CUSTOMER`, `WORKER`, `ADMIN`.

> This is a frontend product build with realistic mock data. Authentication, payments and
> document handling are simulated in the UI and intended to be wired to a secure backend.

## SEO & performance

- Per-page metadata, Open Graph, `robots.ts` and `sitemap.ts`.
- Static generation for service and worker pages.
- Lazy-loaded, remote-optimised images; skeletons; restrained animations.
