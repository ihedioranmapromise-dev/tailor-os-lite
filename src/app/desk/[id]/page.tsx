"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  DEMO_ORDERS,
  STAGES,
  formatNaira,
  type Order,
  type Stage,
} from "@/lib/store";

export default function JobPage() {
  const params = useParams();
  const id = String(params.id || "");
  const initial = useMemo(() => DEMO_ORDERS.find((o) => o.id === id), [id]);
  const [order, setOrder] = useState<Order | undefined>(initial);
  const [copied, setCopied] = useState(false);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-sm text-muted">Order not found.</p>
        <Link href="/desk" className="btn-secondary mt-4 inline-flex">
          Back to desk
        </Link>
      </div>
    );
  }

  function advance() {
    setOrder((o) => {
      if (!o) return o;
      const i = STAGES.indexOf(o.stage);
      if (i < 0 || i >= STAGES.length - 1) return o;
      return { ...o, stage: STAGES[i + 1] as Stage };
    });
  }

  async function copyLink() {
    const url = `${window.location.origin}/status/${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const m = order.measurements;

  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/desk" className="text-sm font-medium text-muted">
            ← Desk
          </Link>
          <span className="font-mono text-xs text-muted">{order.id}</span>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 px-4 py-6">
        <div className="card p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold">
                {order.clientFirstName} · {order.style}
              </h1>
              <p className="mt-1 text-sm text-muted">{order.clientPhone}</p>
            </div>
            <span className="rounded-full bg-accentSoft px-2.5 py-1 text-xs font-semibold text-accent">
              {order.stage}
            </span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs text-muted">Due</dt>
              <dd className="font-medium">{order.dueDate}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Price</dt>
              <dd className="font-medium">{formatNaira(order.price)}</dd>
            </div>
          </dl>
          {order.note && (
            <p className="mt-3 rounded-xl bg-paper px-3 py-2 text-sm text-muted">{order.note}</p>
          )}
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold">Measurements</h2>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            {Object.entries(m).map(([k, v]) =>
              v ? (
                <div key={k} className="rounded-lg bg-paper px-2 py-2">
                  <p className="text-[10px] uppercase text-muted">{k}</p>
                  <p className="font-medium">{v}</p>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold">Stage media</h2>
          <p className="mt-1 text-xs text-muted">
            Photos or short video clips attached to stages (demo placeholders).
          </p>
          <div className="mt-3 space-y-3">
            {STAGES.map((stage) => {
              const media = order.mediaByStage[stage];
              if (!media?.length) return null;
              return (
                <div key={stage}>
                  <p className="text-xs font-semibold text-muted">{stage}</p>
                  <div className="mt-1.5 flex gap-2 overflow-x-auto">
                    {media.map((item, i) => (
                      <div key={i} className="shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={item.caption || stage}
                          className="h-24 w-32 rounded-lg object-cover"
                        />
                        {item.caption && (
                          <p className="mt-1 text-[11px] text-muted">{item.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {!Object.values(order.mediaByStage).some((x) => x?.length) && (
              <p className="text-sm text-muted">No media on this order yet.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" className="btn-primary flex-1" onClick={advance} disabled={order.stage === "Delivered"}>
            Advance stage
          </button>
          <button type="button" className="btn-secondary flex-1" onClick={copyLink}>
            {copied ? "Link copied" : "Copy status link"}
          </button>
        </div>
        <Link href={`/status/${order.id}`} className="btn-secondary flex w-full justify-center">
          Open client view
        </Link>
      </main>
    </div>
  );
}
