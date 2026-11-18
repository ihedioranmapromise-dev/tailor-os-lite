"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEMO_SHOP } from "@/lib/store";
import {
  DEFAULT_BRAND,
  FONT_LABELS,
  LAYOUT_LABELS,
  fileToDataUrl,
  getBrand,
  saveBrand,
  type BrandKit,
  type FontPair,
  type LayoutPreset,
} from "@/lib/brand";
import { getSession } from "@/lib/session";

export default function SettingsPage() {
  const s = DEMO_SHOP;
  const [tab, setTab] = useState<"brand" | "shop" | "owner">("brand");
  const [saved, setSaved] = useState(false);
  const [brand, setBrand] = useState<BrandKit>(DEFAULT_BRAND);

  const [name, setName] = useState(s.name);
  const [phone, setPhone] = useState(s.phone);
  const [whatsapp, setWhatsapp] = useState(s.whatsapp || "");
  const [email, setEmail] = useState(s.email || "");
  const [address, setAddress] = useState(s.address);
  const [city, setCity] = useState(s.city || "");
  const [tagline, setTagline] = useState(s.tagline || "");
  const [about, setAbout] = useState(s.about || "");
  const [ownerName, setOwnerName] = useState(s.owner.fullName);
  const [ownerTitle, setOwnerTitle] = useState(s.owner.title || "");
  const [ownerBio, setOwnerBio] = useState(s.owner.bio || "");

  useEffect(() => {
    const b = getBrand();
    setBrand(b);
    const sess = getSession();
    if (sess?.shopName) setName(sess.shopName);
    if (b.shopName) setName(b.shopName);
    if (b.tagline) setTagline(b.tagline);
    if (b.whatsapp) setWhatsapp(b.whatsapp);
  }, []);

  async function onFile(
    key: "logoDataUrl" | "coverDataUrl" | "ownerPhotoDataUrl",
    file: File | null
  ) {
    if (!file) return;
    if (file.size > 2_500_000) {
      alert("Keep under ~2.5MB for this demo.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setBrand((prev) => ({ ...prev, [key]: dataUrl }));
  }

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    const next: BrandKit = {
      ...brand,
      shopName: name,
      tagline,
      whatsapp,
    };
    saveBrand(next);
    setBrand(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tabs = [
    { id: "brand" as const, label: "Brand" },
    { id: "shop" as const, label: "Business" },
    { id: "owner" as const, label: "Owner" },
  ];

  const logo = brand.logoDataUrl || s.logo;
  const cover = brand.coverDataUrl || s.coverImage;
  const ownerPhoto = brand.ownerPhotoDataUrl || s.owner.photo;

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-10 border-b border-white/50 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/admin" className="btn-ghost text-sm">
            ← Admin
          </Link>
          <span className="text-sm font-semibold">Shop settings</span>
          <Link href={`/s/atelier-noir`} className="btn-ghost text-xs">
            Preview
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <div className="card overflow-hidden mb-5">
          <div
            className="h-24"
            style={{
              backgroundColor: brand.primary,
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
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white ring-4 ring-white"
                style={{ backgroundColor: brand.primary }}
              >
                {name.charAt(0)}
              </div>
            )}
            <div className="pb-1 min-w-0">
              <p className="truncate text-base font-semibold">{name}</p>
              <p className="truncate text-xs text-muted">{tagline}</p>
            </div>
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
                  ? "text-white shadow-sm"
                  : "text-muted hover:text-ink"
              }`}
              style={tab === t.id ? { backgroundColor: brand.primary } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={onSave} className="card-solid space-y-4 p-5">
          {tab === "brand" && (
            <>
              <p className="text-xs text-muted">
                Your client site colours, type, and layout — file upload, not URL paste.
              </p>
              <div>
                <label className="label">Logo (upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-accentSoft file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent"
                  onChange={(e) => onFile("logoDataUrl", e.target.files?.[0] || null)}
                />
              </div>
              <div>
                <label className="label">Cover image (upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-accentSoft file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent"
                  onChange={(e) => onFile("coverDataUrl", e.target.files?.[0] || null)}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label">Primary</label>
                  <input
                    type="color"
                    className="h-11 w-full cursor-pointer rounded-xl border border-line"
                    value={brand.primary}
                    onChange={(e) => setBrand({ ...brand, primary: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Soft</label>
                  <input
                    type="color"
                    className="h-11 w-full cursor-pointer rounded-xl border border-line"
                    value={brand.accentSoft}
                    onChange={(e) => setBrand({ ...brand, accentSoft: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Page bg</label>
                  <input
                    type="color"
                    className="h-11 w-full cursor-pointer rounded-xl border border-line"
                    value={brand.background}
                    onChange={(e) => setBrand({ ...brand, background: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label">Font pair</label>
                <select
                  className="input"
                  value={brand.font}
                  onChange={(e) =>
                    setBrand({ ...brand, font: e.target.value as FontPair })
                  }
                >
                  {(Object.keys(FONT_LABELS) as FontPair[]).map((k) => (
                    <option key={k} value={k}>
                      {FONT_LABELS[k]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Layout preset</label>
                <select
                  className="input"
                  value={brand.layout}
                  onChange={(e) =>
                    setBrand({ ...brand, layout: e.target.value as LayoutPreset })
                  }
                >
                  {(Object.keys(LAYOUT_LABELS) as LayoutPreset[]).map((k) => (
                    <option key={k} value={k}>
                      {LAYOUT_LABELS[k]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Tagline</label>
                <input
                  className="input"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>
            </>
          )}

          {tab === "shop" && (
            <>
              <div>
                <label className="label">Trading name</label>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Phone</label>
                  <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="label">WhatsApp</label>
                  <input
                    className="input"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Address</label>
                <input
                  className="input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="label">City</label>
                <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <label className="label">About</label>
                <textarea
                  className="input min-h-[80px] resize-y"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </>
          )}

          {tab === "owner" && (
            <>
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
                <label className="label">Owner photo (upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-accentSoft file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent"
                  onChange={(e) =>
                    onFile("ownerPhotoDataUrl", e.target.files?.[0] || null)
                  }
                />
              </div>
              <div>
                <label className="label">Full name</label>
                <input
                  className="input"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Title</label>
                <input
                  className="input"
                  value={ownerTitle}
                  onChange={(e) => setOwnerTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Bio</label>
                <textarea
                  className="input min-h-[80px] resize-y"
                  value={ownerBio}
                  onChange={(e) => setOwnerBio(e.target.value)}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary w-full py-3">
            {saved ? "Saved in this browser" : "Save brand & shop"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted">
          Demo stores brand in this device. Production: cloud per shop + real file storage.
        </p>
      </main>
    </div>
  );
}
