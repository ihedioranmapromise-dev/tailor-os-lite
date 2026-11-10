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

  const waNum = (shop.whatsapp || shop.phone).replace(/\D/g, "");
  const wa = `https://wa.me/${waNum}?text=${encodeURIComponent(
    `Hi ${shop.name}, I saw your showroom and I want to order.`
  )}`;

  return (
    <div className="min-h-screen pb-24">
      <header className="relative overflow-hidden bg-[#0f1419] text-white">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: shop.coverImage ? `url(${shop.coverImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-[#0f1419]" />
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
          <p className="mt-1 text-sm text-white/50">
            {[shop.address, shop.city].filter(Boolean).join(" · ")}
          </p>
          {shop.specialties && shop.specialties.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {shop.specialties.map((sp) => (
                <span
                  key={sp}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90"
                >
                  {sp}
                </span>
              ))}
            </div>
          )}
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

      {/* Trust strip */}
      <section className="border-b border-line bg-white/80">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 px-4 py-5 text-center sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            {shop.owner.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.owner.photo}
                alt={shop.owner.fullName}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-accentSoft"
              />
            ) : null}
            <div>
              <p className="text-sm font-semibold">{shop.owner.fullName}</p>
              <p className="text-xs text-muted">{shop.owner.title}</p>
            </div>
          </div>
          <div className="flex gap-6 text-xs text-muted">
            {shop.yearsInBusiness && (
              <div>
                <p className="text-lg font-semibold text-ink">{shop.yearsInBusiness}+</p>
                <p>Years</p>
              </div>
            )}
            {shop.workingHours && (
              <div className="max-w-[9rem]">
                <p className="font-semibold text-ink">Hours</p>
                <p>{shop.workingHours}</p>
              </div>
            )}
          </div>
        </div>
        {shop.about && (
          <p className="mx-auto max-w-3xl border-t border-line px-4 py-4 text-center text-sm leading-relaxed text-muted">
            {shop.about}
          </p>
        )}
      </section>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Selected work
        </h2>
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3 pt-10">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
                    {item.category}
                  </p>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
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
            {shop.email && <span>{shop.email} · </span>}
            Powered by Tailor OS Lite
          </p>
        </div>
      </main>
    </div>
  );
}
