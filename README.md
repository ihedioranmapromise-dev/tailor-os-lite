# Tailor OS Lite

Production desk + branded client mini-site for sewing / fashion houses.

## Demo flow (vision)

1. **Sign up / login** (`/signup`, `/login`) — email + password → your space
2. **Admin** (`/admin`) — hub: desk, brand, public site
3. **Settings** (`/settings`) — logo/cover/owner **file upload**, colours, font, layout preset, business fields
4. **Desk** (`/desk`) — queue, advance stages, open job, **upload stage media from phone**
5. **Client site** (`/s/atelier-noir`) — showroom
6. **Track / status** — order code timeline

Demo auth and brand use **localStorage** (this browser only). Production needs real auth, DB, and object storage.

Live: https://tailor-os-lite.vercel.app/
