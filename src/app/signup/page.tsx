"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setSession, slugify } from "@/lib/session";
import { DEFAULT_BRAND, saveBrand } from "@/lib/brand";

export default function SignupPage() {
  const router = useRouter();
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!shopName.trim() || !email.trim() || password.length < 4) {
      setError("Shop name, email, and password (min 4) required.");
      return;
    }
    const slug = slugify(shopName);
    setSession({ email: email.trim(), shopName: shopName.trim(), slug });
    saveBrand({ ...DEFAULT_BRAND, shopName: shopName.trim() });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-lg font-bold text-white shadow-lg">
            T
          </span>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">Create your space</h1>
          <p className="mt-1 text-sm text-muted">
            Your desk + branded client site — starts empty, yours alone
          </p>
        </div>
        <form onSubmit={onSubmit} className="card-solid space-y-4 p-5">
          <div>
            <label className="label">Shop name</label>
            <input
              className="input"
              placeholder="e.g. Kamsu Garments"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
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
              placeholder="Min 4 characters (demo)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full py-3">
            Create space & continue
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          Already have a space?{" "}
          <Link href="/login" className="font-semibold text-accent">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
