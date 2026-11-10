# Tailor OS Lite

Multi-tenant, mobile-first order desk for tailors.

- **Desk** — queue, job cards, advance stage, copy status link
- **Status tracker** — client-facing stages + optional photo/video per stage
- **Showroom** — public portfolio with WhatsApp CTA
- **Shop settings** — name, phone, address (demo read-only)

## Demo paths

- `/` — product landing
- `/desk` — owner desk
- `/desk/TO-2026-0142` — job card
- `/status/TO-2026-0142` — client status tracker
- `/s/aba-craft-atelier` — showroom
- `/settings` — shop setup fields

## Stack

Next.js 14 · TypeScript · Tailwind · in-memory demo data

## Run

```bash
npm install
npm run dev
```

Deploy on Vercel: import this repo.
