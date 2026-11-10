import Link from "next/link";
import { DEMO_ORDERS, DEMO_SHOP, STAGES, stageIndex } from "@/lib/store";

export default function StatusPage({
  params,
}: {
  params: { id: string };
}) {
  const order = DEMO_ORDERS.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-sm text-muted">We could not find that order.</p>
        <Link href="/" className="btn-secondary mt-4 inline-flex">
          Home
        </Link>
      </div>
    );
  }

  const current = stageIndex(order.stage);

  return (
    <div className="min-h-screen bg-paper pb-16">
      <header className="border-b border-line bg-white">
        <div className="mx-auto max-w-md px-4 py-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Order status
          </p>
          <h1 className="mt-1 text-lg font-semibold">{DEMO_SHOP.name}</h1>
          <p className="text-sm text-muted">{DEMO_SHOP.tagline}</p>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-6">
        <div className="card p-5 text-center">
          <p className="font-mono text-xs text-muted">{order.id}</p>
          <p className="mt-1 text-base font-semibold">
            {order.clientFirstName} · {order.style}
          </p>
          <p className="mt-2 inline-flex rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold text-accent">
            {order.stage}
          </p>
          {order.note && current >= 0 && (
            <p className="mt-3 text-sm text-muted">{order.note}</p>
          )}
        </div>

        <ol className="relative mt-8 space-y-0 border-l-2 border-line ml-3">
          {STAGES.map((stage, i) => {
            const done = i < current;
            const active = i === current;
            const media = order.mediaByStage[stage] || [];
            return (
              <li key={stage} className="relative pb-8 pl-6 last:pb-0">
                <span
                  className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 ${
                    done || active
                      ? "border-accent bg-accent"
                      : "border-line bg-white"
                  }`}
                />
                <p
                  className={`text-sm font-semibold ${
                    active ? "text-accent" : done ? "text-ink" : "text-muted"
                  }`}
                >
                  {stage}
                </p>
                {media.length > 0 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {media.map((item, mi) => (
                      <div key={mi} className="shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={item.caption || stage}
                          className="h-28 w-40 rounded-xl object-cover border border-line"
                        />
                        {item.caption && (
                          <p className="mt-1 text-[11px] text-muted">{item.caption}</p>
                        )}
                        {item.type === "video" && (
                          <p className="text-[10px] font-medium text-accent">Video clip</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-center text-xs text-muted">
          Questions? WhatsApp {DEMO_SHOP.phone}
        </p>
      </main>
    </div>
  );
}
