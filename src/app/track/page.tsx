"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { findOrder } from "@/lib/store";

export default function TrackPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const order = findOrder(code);
    if (!order) {
      setError("No order found for that code. Try TO-2026-0142");
      return;
    }
    router.push(`/status/${order.id}`);
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/50 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <Link href="/" className="btn-ghost text-sm">
            ← Home
          </Link>
          <span className="text-sm font-semibold">Track your order</span>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-[#0d3d30] text-white shadow-lg">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Enter tracking code</h1>
          <p className="mt-2 text-sm text-muted">
            Your tailor sent a code like <span className="font-mono text-ink">TO-2026-0142</span>
          </p>
        </div>

        <form onSubmit={onSubmit} className="card mt-8 space-y-4 p-6">
          <div>
            <label className="label" htmlFor="code">
              Order code
            </label>
            <input
              id="code"
              className="input font-mono text-center text-base tracking-wide"
              placeholder="TO-2026-0142"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
            />
          </div>
          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full py-3">
            View progress
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Demo codes: TO-2026-0142 · TO-2026-0140 · TO-2026-0138
        </p>
      </main>
    </div>
  );
}
