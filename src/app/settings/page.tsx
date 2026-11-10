import Link from "next/link";
import { DEMO_SHOP } from "@/lib/store";

export default function SettingsPage() {
  return (
    <div className="min-h-screen pb-16">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <Link href="/desk" className="text-sm font-medium text-muted">
            ← Desk
          </Link>
          <span className="text-sm font-semibold">Shop settings</span>
          <span className="w-10" />
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 px-4 py-6">
        <p className="text-sm text-muted">
          Setup fields the frontend displays on status pages and showroom. Demo is
          read-only.
        </p>

        <div className="card space-y-4 p-5">
          <div>
            <label className="label">Shop name</label>
            <input className="input" defaultValue={DEMO_SHOP.name} readOnly />
          </div>
          <div>
            <label className="label">Phone (WhatsApp)</label>
            <input className="input" defaultValue={DEMO_SHOP.phone} readOnly />
          </div>
          <div>
            <label className="label">Address / area</label>
            <input className="input" defaultValue={DEMO_SHOP.address} readOnly />
          </div>
          <div>
            <label className="label">Tagline</label>
            <input className="input" defaultValue={DEMO_SHOP.tagline} readOnly />
          </div>
          <div>
            <label className="label">Public showroom URL</label>
            <input
              className="input font-mono text-xs"
              defaultValue={`/s/${DEMO_SHOP.slug}`}
              readOnly
            />
          </div>
        </div>

        <p className="text-xs text-muted">
          In production this is editable on first login and anytime under Settings.
          Logo upload belongs here too.
        </p>
      </main>
    </div>
  );
}
