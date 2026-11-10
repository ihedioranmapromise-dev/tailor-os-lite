"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEMO_ORDERS,
  DEMO_SHOP,
  STAGES,
  formatNaira,
  type Order,
  type Stage,
} from "@/lib/store";

export default function DeskPage() {
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS);

  const sorted = useMemo(
    () =>
      [...orders].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    [orders]
  );

  function advance(id: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const i = STAGES.indexOf(o.stage);
        if (i < 0 || i >= STAGES.length - 1) return o;
        return { ...o, stage: STAGES[i + 1] as Stage };
      })
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs font-medium text-muted">Desk</p>
            <p className="text-sm font-semibold">{DEMO_SHOP.name}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/s/${DEMO_SHOP.slug}`} className="btn-secondary text-xs">
              Showroom
            </Link>
            <Link href="/settings" className="btn-secondary text-xs">
              Shop
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Today’s queue</h1>
            <p className="text-sm text-muted">{sorted.length} open jobs · sorted by due date</p>
          </div>
          <button type="button" className="btn-primary text-xs sm:text-sm" disabled>
            New order
          </button>
        </div>

        <div className="space-y-3">
          {sorted.map((o) => (
            <article key={o.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-mono text-muted">{o.id}</p>
                  <h2 className="mt-0.5 text-base font-semibold">
                    {o.clientFirstName} · {o.style}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Due {o.dueDate} · {formatNaira(o.price)}
                  </p>
                </div>
                <span className="rounded-full bg-accentSoft px-2.5 py-1 text-xs font-semibold text-accent">
                  {o.stage}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/desk/${o.id}`} className="btn-secondary text-xs">
                  Open job
                </Link>
                <Link href={`/status/${o.id}`} className="btn-secondary text-xs">
                  Client status
                </Link>
                <button
                  type="button"
                  className="btn-primary text-xs"
                  onClick={() => advance(o.id)}
                  disabled={o.stage === "Delivered"}
                >
                  Advance stage
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Demo only — changes stay in this browser session
        </p>
      </main>
    </div>
  );
}
