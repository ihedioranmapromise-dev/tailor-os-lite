"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMO_SHOP } from "@/lib/store";

export default function SettingsPage() {
  const [name, setName] = useState(DEMO_SHOP.name);
  const [phone, setPhone] = useState(DEMO_SHOP.phone);
  const [address, setAddress] = useState(DEMO_SHOP.address);
  const [tagline, setTagline] = useState(DEMO_SHOP.tagline || "");
  const [logo, setLogo] = useState(DEMO_SHOP.logo || "");
  const [saved, setSaved] = useState(false);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-10 border-b border-white/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/desk" className="btn-ghost text-sm">
            ← Desk
          </Link>
          <span className="text-sm font-semibold">Shop settings</span>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-5 px-4 py-6">
        <div className="card overflow-hidden">
          <div
            className="h-28 bg-gradient-to-br from-[#0f1419] to-accent"
            style={{
              backgroundImage: DEMO_SHOP.coverImage
                ? `linear-gradient(to bottom, rgba(15,20,25,0.4), rgba(15,20,25,0.85)), url(${DEMO_SHOP.coverImage})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="-mt-10 flex flex-col items-center px-5 pb-5">
            <div className="relative">
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  alt="Logo"
                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-white ring-4 ring-white shadow-lg">
                  {name.charAt(0) || "S"}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-muted shadow">
                Logo
              </span>
            </div>
            <p className="mt-3 text-lg font-semibold">{name || "Shop name"}</p>
            <p className="text-sm text-muted">{tagline || "Your tagline"}</p>
          </div>
        </div>

        <form onSubmit={onSave} className="card-solid space-y-4 p-5">
          <div>
            <label className="label">Shop name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="label">Logo image URL</label>
            <input
              className="input text-xs"
              placeholder="https://… (upload wiring in production)"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
            <p className="mt-1 text-[11px] text-muted">
              Demo uses a URL. Production will use direct upload.
            </p>
          </div>
          <div>
            <label className="label">Phone (WhatsApp)</label>
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="label">Address / area</label>
            <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label className="label">Tagline</label>
            <input className="input" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </div>
          <div>
            <label className="label">Public showroom path</label>
            <input
              className="input font-mono text-xs"
              readOnly
              value={`/s/${DEMO_SHOP.slug}`}
            />
          </div>
          <button type="submit" className="btn-primary w-full py-3">
            {saved ? "Saved (demo)" : "Save changes"}
          </button>
        </form>

        <p className="text-center text-xs text-muted">
          These fields drive logo, name, and contact on status pages and showroom.
        </p>
      </main>
    </div>
  );
}
