import Link from "next/link";
import { DEMO_SHOP, DEMO_SHOWROOM, formatNaira } from "@/lib/store";

export default function ShowroomPage({
  params,
}: {
  params: { slug: string };
}) {
  const shop = params.slug === DEMO_SHOP.slug ? DEMO_SHOP : null;

  if (!shop) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-sm text-muted">Showroom not found.</p>
        <Link href="/" className="btn-secondary mt-4 inline-flex">
          Home
        </Link>
      </div>
    );
  }

  const wa = `https://wa.me/${shop.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi ${shop.name}, I saw your showroom and I want to order.`
  )}`;

  return (
    <div className="min-h-screen pb-24">
      <header className="relative overflow-hidden bg-[#0f1419] text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: shop.coverImage ? `url(${shop.coverImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0f1419]" />
        <div className="relative mx-auto max-w-3xl px-4 pb-10 pt-10 text-center">
          {shop.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={shop.logo}
              alt={shop.name}
              className="mx-auto h-20 w-20 rounded-2xl object-cover ring-2 ring-white/25 shadow-2xl"
            />
          ) : (
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-accent text-2xl font-bold">
              {shop.name.charAt(0)}
            </div>
          )}
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            Showroom
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{shop.name}</h1>
          <p className="mt-2 text-sm text-white/70">{shop.tagline}</p>
          <p className="mt-1 text-sm text-white/50">{shop.address}</p>
          <a
            href={wa}
            className="btn-primary mt-6 inline-flex px-6 py-3 shadow-lg shadow-accent/30"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp to order
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {DEMO_SHOWROOM.map((item) => (
            <article
              key={item.id}
              className="card-solid group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
                    {item.category}
                  </p>
                  <h2 className="text-sm font-semibold text-white">{item.title}</h2>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-accent">{formatNaira(item.price)}</p>
                {item.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{item.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/track" className="btn-secondary">
            Track an order
          </Link>
          <p className="mt-4 text-xs text-muted">
            Powered by Tailor OS Lite ·{" "}
            <Link href="/desk" className="underline underline-offset-2">
              Open desk
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
