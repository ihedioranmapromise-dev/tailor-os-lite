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
    <div className="min-h-screen pb-20">
      <header className="border-b border-line bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Showroom
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{shop.name}</h1>
          <p className="mt-1 text-sm text-muted">{shop.tagline}</p>
          <p className="mt-1 text-sm text-muted">{shop.address}</p>
          <a href={wa} className="btn-primary mt-5 inline-flex" target="_blank" rel="noreferrer">
            WhatsApp to order
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {DEMO_SHOWROOM.map((item) => (
            <article key={item.id} className="card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                  {item.category}
                </p>
                <h2 className="mt-0.5 text-sm font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-accent">{formatNaira(item.price)}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Powered by Tailor OS Lite ·{" "}
          <Link href="/desk" className="underline">
            Open desk demo
          </Link>
        </p>
      </main>
    </div>
  );
}
