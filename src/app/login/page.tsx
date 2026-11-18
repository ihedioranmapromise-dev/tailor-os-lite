"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setSession, slugify } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 4) {
      setError("Email and password (min 4) required — demo accepts any.");
      return;
    }
    const shopName = email.split("@")[0].replace(/[._]/g, " ") || "My Atelier";
    setSession({
      email: email.trim(),
      shopName: shopName.replace(/\b\w/g, (c) => c.toUpperCase()),
      slug: slugify(shopName),
    });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-lg font-bold text-white shadow-lg">
            T
          </span>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">Enter your space</h1>
          <p className="mt-1 text-sm text-muted">
            Email + password · demo accepts any credentials
          </p>
        </div>
        <form onSubmit={onSubmit} className="card-solid space-y-4 p-5">
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              autoComplete="email"
              placeholder="you@shop.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full py-3">
            Open my desk
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          New shop?{" "}
          <Link href="/signup" className="font-semibold text-accent">
            Create space
          </Link>
        </p>
        <p className="mt-6 text-center">
          <Link href="/" className="text-xs text-muted hover:text-ink">
            ← Product home
          </Link>
        </p>
      </div>
    </div>
  );
}
