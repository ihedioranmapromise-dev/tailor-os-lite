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
              <p className="text-[10px] text-muted">Order desk · Status · Showroom</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/track" className="btn-ghost text-xs hidden sm:inline-flex">
              Track order
            </Link>
            <Link href="/desk" className="btn-secondary text-xs sm:text-sm">
              Demo desk
            </Link>
            <Link href={`/s/${DEMO_SHOP.slug}`} className="btn-primary text-xs sm:text-sm">
              Showroom
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accentSoft/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Multi-tenant · Mobile-first
            </p>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              The calm order desk for tailors who already live on WhatsApp.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Clients track real stages — cutting, sewing, pressing — with photos and short
              clips. You run one clear queue. Your showroom looks like a brand, not a chat
              archive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/desk" className="btn-primary px-5 py-3">
                Open the desk
              </Link>
              <Link href="/track" className="btn-secondary px-5 py-3">
                Track with code
              </Link>
              <Link href="/status/TO-2026-0142" className="btn-ghost">
                Sample status →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/10 via-transparent to-ink/5 blur-2xl" />
            <div className="card relative overflow-hidden p-1">
              <div className="rounded-[1.15rem] bg-gradient-to-b from-[#0f1419] to-[#1a2e28] p-6 text-white sm:p-8">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={DEMO_SHOP.logo}
                    alt=""
                    className="h-12 w-12 rounded-xl object-cover ring-2 ring-white/20"
                  />
                  <div>
                    <p className="text-sm font-semibold">{DEMO_SHOP.name}</p>
                    <p className="text-xs text-white/60">{DEMO_SHOP.tagline}</p>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                    Live order
                  </p>
                  <p className="mt-1 font-mono text-sm">TO-2026-0142</p>
                  <p className="mt-2 text-lg font-semibold">Chinedu · Senator</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-emerald-300">Sewing in progress</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {["Received", "Cut", "Sew", "Press", "Ready"].map((s, i) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full ${
                        i <= 2 ? "bg-emerald-400" : "bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Track with a code",
              d: "Client enters TO-2026-0142 and sees the full stage timeline — no app install.",
            },
            {
              t: "Photos + short video",
              d: "Up to two pictures and one clip per stage. Progress you can see, not just read.",
            },
            {
              t: "Showroom that sells",
              d: "Portfolio with your logo, pieces, prices, and a WhatsApp order button.",
            },
          ].map((x) => (
            <div key={x.t} className="card-solid p-5 transition hover:shadow-lg">
              <h2 className="text-sm font-semibold text-ink">{x.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
