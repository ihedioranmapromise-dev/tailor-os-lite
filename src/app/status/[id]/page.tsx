import Link from "next/link";
import {
  DEMO_ORDERS,
  DEMO_SHOP,
  STAGES,
  stageIndex,
  type MediaItem,
} from "@/lib/store";

function MediaBlock({ items }: { items: MediaItem[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
      {items.map((item, mi) => (
        <div key={mi} className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.url}
            alt={item.caption || "Stage media"}
            className="h-32 w-44 rounded-xl object-cover ring-1 ring-black/5 shadow-md"
          />
          {item.type === "video" && (
            <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Clip
            </span>
          )}
          {item.caption && (
            <p className="mt-1 max-w-[11rem] text-[11px] text-muted">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}

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
        <Link href="/track" className="btn-primary mt-4 inline-flex">
          Enter tracking code
        </Link>
      </div>
    );
  }

  const current = stageIndex(order.stage);
  const progress = ((current + 1) / STAGES.length) * 100;
  const wa = (DEMO_SHOP.whatsapp || DEMO_SHOP.phone).replace(/\D/g, "");

  return (
    <div className="min-h-screen pb-16">
      <header className="relative overflow-hidden border-b border-white/40 bg-[#0f1419] text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: DEMO_SHOP.coverImage
              ? `url(${DEMO_SHOP.coverImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#0f1419]" />
        <div className="relative mx-auto max-w-md px-4 pb-8 pt-6 text-center">
          <div className="flex justify-center">
            {DEMO_SHOP.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={DEMO_SHOP.logo}
                alt={DEMO_SHOP.name}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-xl"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-xl font-bold">
                {DEMO_SHOP.name.charAt(0)}
              </div>
            )}
          </div>
          <h1 className="mt-3 text-xl font-semibold">{DEMO_SHOP.name}</h1>
          <p className="text-sm text-white/60">{DEMO_SHOP.tagline}</p>
          <p className="mt-3 font-mono text-xs tracking-wide text-white/50">{order.id}</p>
          <p className="mt-1 text-lg font-semibold">
            {order.clientFirstName} · {order.style}
          </p>
          <div className="mx-auto mt-4 h-1.5 max-w-xs overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-emerald-300">{order.stage}</p>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-6">
        {order.note && (
          <div className="card mb-6 border-accent/20 bg-accentSoft/50 p-4 text-sm text-accent">
            {order.note}
          </div>
        )}

        <ol className="relative ml-2 space-y-0 border-l-2 border-[#e5e1db]">
          {STAGES.map((stage, i) => {
            const done = i < current;
            const active = i === current;
            const media = order.mediaByStage[stage] || [];
            return (
              <li key={stage} className="relative pb-8 pl-7 last:pb-2">
                <span
                  className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 ${
                    active
                      ? "stage-dot-active"
                      : done
                        ? "stage-dot-done"
                        : "stage-dot-todo"
                  }`}
                />
                <p
                  className={`text-sm font-semibold ${
                    active ? "text-accent" : done ? "text-ink" : "text-muted"
                  }`}
                >
                  {stage}
                  {active && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-accent">
                      Now
                    </span>
                  )}
                </p>
                <MediaBlock items={media} />
              </li>
            );
          })}
        </ol>

        {/* Owner trust */}
        <div className="card-solid mt-2 mb-4 flex items-center gap-3 p-4">
          {DEMO_SHOP.owner.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={DEMO_SHOP.owner.photo}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : null}
          <div>
            <p className="text-sm font-semibold">{DEMO_SHOP.owner.fullName}</p>
            <p className="text-xs text-muted">{DEMO_SHOP.owner.title}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/${wa}`}
            className="btn-primary w-full py-3"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp the shop
          </a>
          <Link href="/track" className="btn-secondary w-full justify-center">
            Track another order
          </Link>
        </div>
      </main>
    </div>
  );
}
