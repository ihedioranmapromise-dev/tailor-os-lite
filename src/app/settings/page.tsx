"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMO_SHOP } from "@/lib/store";

export default function SettingsPage() {
  const s = DEMO_SHOP;
  const [tab, setTab] = useState<"shop" | "owner" | "public">("shop");
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(s.name);
  const [legalName, setLegalName] = useState(s.legalName || "");
  const [phone, setPhone] = useState(s.phone);
  const [whatsapp, setWhatsapp] = useState(s.whatsapp || "");
  const [email, setEmail] = useState(s.email || "");
  const [address, setAddress] = useState(s.address);
  const [city, setCity] = useState(s.city || "");
  const [state, setState] = useState(s.state || "");
  const [hours, setHours] = useState(s.workingHours || "");
  const [tagline, setTagline] = useState(s.tagline || "");
  const [about, setAbout] = useState(s.about || "");
  const [years, setYears] = useState(s.yearsInBusiness || "");
  const [specialties, setSpecialties] = useState((s.specialties || []).join(", "));
  const [instagram, setInstagram] = useState(s.instagram || "");
  const [logo, setLogo] = useState(s.logo || "");
  const [cover, setCover] = useState(s.coverImage || "");

  const [ownerName, setOwnerName] = useState(s.owner.fullName);
  const [ownerTitle, setOwnerTitle] = useState(s.owner.title || "");
  const [ownerPhoto, setOwnerPhoto] = useState(s.owner.photo || "");
  const [ownerBio, setOwnerBio] = useState(s.owner.bio || "");

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tabs = [
    { id: "shop" as const, label: "Business" },
    { id: "owner" as const, label: "Owner profile" },
    { id: "public" as const, label: "Public face" },
  ];

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-10 border-b border-white/50 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/desk" className="btn-ghost text-sm">
            ← Desk
          </Link>
          <span className="text-sm font-semibold">Shop settings</span>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        {/* Trust preview card */}
        <div className="card overflow-hidden mb-5">
          <div
            className="h-24 bg-[#0f1419]"
            style={{
              backgroundImage: cover
                ? `linear-gradient(to bottom, rgba(15,20,25,0.35), rgba(15,20,25,0.9)), url(${cover})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="-mt-8 flex items-end gap-3 px-4 pb-4">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt=""
                className="h-16 w-16 rounded-2xl object-cover ring-4 ring-white shadow-lg"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-xl font-bold text-white ring-4 ring-white">
                {name.charAt(0)}
              </div>
            )}
            <div className="pb-1 min-w-0">
              <p className="truncate text-base font-semibold">{name}</p>
              <p className="truncate text-xs text-muted">{tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-line px-4 py-3">
            {ownerPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ownerPhoto}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-sm font-semibold">
                {ownerName.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{ownerName}</p>
              <p className="text-xs text-muted truncate">{ownerTitle}</p>
            </div>
            <span className="ml-auto rounded-full bg-accentSoft px-2 py-0.5 text-[10px] font-semibold text-accent">
              Trust profile
            </span>
          </div>
        </div>

        <div className="mb-4 flex gap-1 rounded-xl bg-white/70 p-1 border border-line">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-lg px-2 py-2 text-xs font-semibold transition ${
                tab === t.id
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={onSave} className="card-solid space-y-4 p-5">
          {tab === "shop" && (
            <>
              <p className="text-xs text-muted">
                Full business identity — what clients and partners expect from a real shop.
              </p>
              <div>
                <label className="label">Trading name</label>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="label">Legal / registered name</label>
                <input className="input" value={legalName} onChange={(e) => setLegalName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Phone</label>
                  <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="label">WhatsApp</label>
                  <input className="input" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="label">Street address</label>
                <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">City</label>
                  <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                  <label className="label">State</label>
                  <input className="input" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label">Working hours</label>
                <input className="input" value={hours} onChange={(e) => setHours(e.target.value)} />
              </div>
              <div>
                <label className="label">Years in business</label>
                <input className="input" value={years} onChange={(e) => setYears(e.target.value)} />
              </div>
              <div>
                <label className="label">Specialties (comma separated)</label>
                <input className="input" value={specialties} onChange={(e) => setSpecialties(e.target.value)} />
              </div>
            </>
          )}

          {tab === "owner" && (
            <>
              <p className="text-xs text-muted">
                Owner profile builds trust — clients buy from people, not only logos.
              </p>
              <div className="flex justify-center">
                {ownerPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ownerPhoto}
                    alt=""
                    className="h-24 w-24 rounded-full object-cover ring-4 ring-accentSoft"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-paper text-2xl font-semibold">
                    {ownerName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <label className="label">Full name</label>
                <input className="input" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
              </div>
              <div>
                <label className="label">Title / role</label>
                <input
                  className="input"
                  placeholder="Head tailor & founder"
                  value={ownerTitle}
                  onChange={(e) => setOwnerTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Photo URL</label>
                <input
                  className="input text-xs"
                  placeholder="Upload in production"
                  value={ownerPhoto}
                  onChange={(e) => setOwnerPhoto(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Short bio</label>
                <textarea
                  className="input min-h-[100px] resize-y"
                  value={ownerBio}
                  onChange={(e) => setOwnerBio(e.target.value)}
                />
              </div>
            </>
          )}

          {tab === "public" && (
            <>
              <p className="text-xs text-muted">
                What appears on status pages and showroom.
              </p>
              <div>
                <label className="label">Tagline</label>
                <input className="input" value={tagline} onChange={(e) => setTagline(e.target.value)} />
              </div>
              <div>
                <label className="label">About the shop</label>
                <textarea
                  className="input min-h-[100px] resize-y"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Logo URL</label>
                <input className="input text-xs" value={logo} onChange={(e) => setLogo(e.target.value)} />
              </div>
              <div>
                <label className="label">Cover image URL</label>
                <input className="input text-xs" value={cover} onChange={(e) => setCover(e.target.value)} />
              </div>
              <div>
                <label className="label">Instagram</label>
                <input className="input" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </div>
              <div>
                <label className="label">Showroom path</label>
                <input className="input font-mono text-xs" readOnly value={`/s/${s.slug}`} />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary w-full py-3">
            {saved ? "Saved (demo)" : "Save changes"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted">
          In production: file upload for logo, cover, and owner photo — not URLs only.
        </p>
      </main>
    </div>
  );
}
