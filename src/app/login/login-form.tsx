"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

/**
 * Admin girişi — yalnızca SignIn. Public signup YOK
 * (Supabase tarafında da "Enable Signups" kapalı olmalı).
 * Hesaplar Dashboard'dan elle oluşturulur.
 */
export default function LoginForm() {
  const router = useRouter();
  const ids = { email: useId(), pass: useId() };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) {
        // Dürüst, kullanıcı-numarası vermeyen mesaj.
        setError("Giriş başarısız. E-posta veya parola yanlış.");
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/30 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor={ids.email}
          className="block text-sm font-semibold text-white mb-1.5"
        >
          E-posta
        </label>
        <input
          id={ids.email}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@remaxboss.com.tr"
          className={inputClass}
        />
      </div>
      <div>
        <label
          htmlFor={ids.pass}
          className="block text-sm font-semibold text-white mb-1.5"
        >
          Parola
        </label>
        <input
          id={ids.pass}
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-remax-red/15 border border-remax-red/30 p-3 text-sm text-white"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-remax-red" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          buttonVariants({ size: "lg" }),
          "bg-remax-red hover:bg-remax-red-hover text-white h-12 px-6 w-full text-sm font-semibold tracking-wide shadow-[var(--shadow-glow-red)] disabled:opacity-60 disabled:cursor-not-allowed",
        )}
      >
        <LogIn className="h-4 w-4 me-2" />
        {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
    </form>
  );
}
