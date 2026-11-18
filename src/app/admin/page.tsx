"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSession, getSession, type Session } from "@/lib/session";
import { getBrand } from "@/lib/brand";

export default function AdminHome() {
  const router = useRouter();
  const [session, setS] = useState<Session | null>(null);
  const [slug, setSlug] = useState("atelier-noir");

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/login");
      return;
    }
    setS(s);
    setSlug(s.slug || "atelier-noir");
    const b = getBrand();
    if (b.shopName) setSlug(s.slug);
  }, [router]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted">
        Opening your space…
      </div>
    );
  }

  const cards = [
    {
      href: "/desk",
      title: "Production desk",
      d: "Orders, stages, advance jobs, client status links",
    },
    {
      href: "/settings",
      title: "Brand & shop",
      d: "Logo upload, colours, fonts, layout, business details",
    },
    {
      href: `/s/${slug}`,
      title: "Client website",
      d: "What customers see — showroom + track",
    },
    {
      href: "/track",
      title: "Track page",
      d: "Clients enter order code",
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-white/50 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div>
            <p className="text-[11px] font-medium text-muted">Your space</p>
            <p className="text-sm font-semibold">{session.shopName}</p>
          </div>
          <button
            type="button"
            className="btn-ghost text-xs"
            onClick={() => {
              clearSession();
              router.push("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <h1 className="text-xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-1 text-sm text-muted">
          Set your brand, run the desk, share your public link.
        </p>

        <div className="mt-6 space-y-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="card-solid block p-4 transition hover:shadow-md active:scale-[0.99]"
            >
              <p className="text-sm font-semibold text-ink">{c.title}</p>
              <p className="mt-1 text-xs text-muted">{c.d}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-line bg-white/80 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Public client link
          </p>
          <p className="mt-1 break-all font-mono text-xs text-ink">/s/{slug}</p>
          <p className="mt-2 text-xs text-muted">
            Demo: brand changes apply in this browser. Real product isolates each shop in the
            cloud.
          </p>
        </div>
      </main>
    </div>
  );
}
