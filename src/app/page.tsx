import Link from "next/link";
import { DEMO_SHOP } from "@/lib/store";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/50 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[#0d3d30] text-sm font-bold text-white shadow-md">
              T
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight">Tailor OS Lite</p>
              <p className="text-[10px] text-muted">Your space · Desk · Client site</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-ghost text-xs hidden sm:inline-flex">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary text-xs sm:text-sm">
              Get your space
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accentSoft/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Login · Brand · Desk · Client site
            </p>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Sign in. Own your space. Your clients see your brand — not a generic tool.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Email + password opens your admin. Upload logo and photos, set colours and
              layout, run the production desk, share one public link. Mobile-first for the
              floor and for WhatsApp clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary px-5 py-3">
                Create your space
              </Link>
              <Link href="/login" className="btn-secondary px-5 py-3">
                Sign in
              </Link>
              <Link href={`/s/${DEMO_SHOP.slug}`} className="btn-ghost">
                Sample client site →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/10 via-transparent to-ink/5 blur-2xl" />
            <div className="card relative overflow-hidden p-1">
              <div className="rounded-[1.15rem] bg-gradient-to-b from-[#0f1419] to-[#1a2e28] p-6 text-white sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  After login
                </p>
                <p className="mt-2 text-lg font-semibold">Admin → Brand → Desk → /s/your-shop</p>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  <li>· File upload for logo & stage photos (not URL paste)</li>
                  <li>· Colours · font pair · layout preset</li>
                  <li>· Order queue with stage timeline</li>
                  <li>· Client track + showroom under your name</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Your space only",
              d: "Sign up with email and password. Desk and brand live in your admin — not a shared guestbook.",
            },
            {
              t: "Mini website",
              d: "Public showroom and track pages wear your logo and colours. Clients never need an app.",
            },
            {
              t: "Production desk",
              d: "Stages, measurements, status links, photo uploads per stage — built for phone.",
            },
          ].map((x) => (
            <div key={x.t} className="card-solid p-5 transition hover:shadow-lg">
              <h2 className="text-sm font-semibold text-ink">{x.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted">
          Demo walkthrough also:{" "}
          <Link href="/desk" className="text-accent font-medium">
            sample desk
          </Link>{" "}
          ·{" "}
          <Link href="/status/TO-2026-0142" className="text-accent font-medium">
            sample status
          </Link>
        </p>
      </main>
    </div>
  );
}
