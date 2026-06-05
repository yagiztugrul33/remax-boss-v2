import type { Metadata } from "next";
import { Shield } from "lucide-react";
import Eyebrow from "@/components/ui/eyebrow";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Giriş",
  description: "RE/MAX BOSS yönetim paneli girişi.",
  robots: { index: false, follow: false },
};

/**
 * Sadece login. Kayıt linki / "hesabın yok mu?" akışı YOK.
 * Hesaplar Supabase Dashboard'dan elle oluşturulur.
 */
export default function LoginPage() {
  return (
    <section className="relative isolate bg-navy-900 text-white overflow-hidden min-h-[calc(100vh-200px)] flex items-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-32 -end-20 w-[24rem] h-[24rem] rounded-full bg-remax-red/20 blur-3xl -z-10"
      />

      <div className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-remax-red/15 border border-remax-red/30 text-remax-red mb-6">
              <Shield className="h-6 w-6" aria-hidden />
            </div>
            <Eyebrow tone="white" className="text-white/70">
              Yönetim Paneli
            </Eyebrow>
            <h1 className="mt-4 font-display text-display-lg text-balance">
              <span className="accent-mark">Admin</span> girişi.
            </h1>
            <p className="mt-4 text-white/65 leading-relaxed">
              Yalnızca yetkili ofis kullanıcıları için. Hesabınız Supabase
              üzerinden tanımlanır.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-navy-700/50 backdrop-blur p-6 md:p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
