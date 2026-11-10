import Link from "next/link";
import { DEMO_SHOP } from "@/lib/store";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
              T
            </span>
            <span className="text-sm font-semibold tracking-tight">Tailor OS Lite</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/desk" className="btn-secondary text-xs sm:text-sm">
              Open demo desk
            </Link>
            <Link href={`/s/${DEMO_SHOP.slug}`} className="btn-primary text-xs sm:text-sm">
              View showroom
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Multi-tenant · Mobile-first · Self-serve
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          The calm order desk for tailors who already live on WhatsApp.
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
          Orders stop disappearing in chat. Every client gets a status link with real stages —
          cutting, sewing, pressing — plus optional photos or a short video. Your best work
          lives in a clean showroom, not only in Instagram chaos.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/desk" className="btn-primary">
            Try the desk
          </Link>
          <Link href="/status/TO-2026-0142" className="btn-secondary">
            See client status tracker
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Status that beats chat",
              d: "Client opens one link and sees the stage of their cloth — with photo or short clip if you add one.",
            },
            {
              t: "Desk, not dashboard noise",
              d: "Today’s queue, job cards, measurements, advance status, copy link. Built for the phone.",
            },
            {
              t: "Showroom that sells",
              d: "Portfolio of finished work and pieces for sale. WhatsApp CTA. Your name on it.",
            },
          ].map((x) => (
            <div key={x.t} className="card p-5">
              <h2 className="text-sm font-semibold text-ink">{x.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted">
          Demo shop: <span className="font-medium text-ink">{DEMO_SHOP.name}</span> · Sample
          orders already loaded · No login required for this demo
        </p>
      </main>
    </div>
  );
}
