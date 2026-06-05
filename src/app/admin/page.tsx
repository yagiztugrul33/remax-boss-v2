import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut, Building2, Mail, Info } from "lucide-react";
import Section from "@/components/ui/section";
import Eyebrow from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  description: "RE/MAX BOSS yönetim paneli.",
  robots: { index: false, follow: false },
};

// Auth state runtime'da kontrol edildiğinden statik prerender yok.
export const dynamic = "force-dynamic";

/** Server action — Supabase session'ını sonlandır + /login'e dön. */
async function signOutAction() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function AdminHomePage() {
  // Server-side guard: getUser() oturum yoksa null döner.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  // Allowlist guard — "login olmuş olmak" yetmez, email server-side
  // ADMIN_EMAILS listesinde olmak ZORUNLU. Yabancı oturum → /login.
  if (!isAdminEmail(user.email)) {
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <>
      {/* HERO — admin selamlama */}
      <section className="relative isolate bg-navy-900 text-white overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-end">
            <div>
              <Eyebrow tone="white" className="text-white/70">
                Yönetim Paneli
              </Eyebrow>
              <h1 className="mt-5 font-display text-display-lg text-balance">
                Hoş geldin, <span className="accent-mark">{user.email}.</span>
              </h1>
              <p className="mt-5 text-white/70 max-w-xl leading-relaxed">
                Bu panel ilan, danışman ve içerik yönetimini tek yerden
                sağlayacak. Şu an iskelet aşamasında.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-navy-700/50 backdrop-blur p-5">
              <div className="text-eyebrow font-display text-white/55">
                Oturum
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-remax-red" aria-hidden />
                <span className="font-medium truncate">{user.email}</span>
              </div>
              <form action={signOutAction} className="mt-4">
                <button
                  type="submit"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white/10 hover:bg-white/15 text-white h-10 px-4 w-full text-sm font-semibold",
                  )}
                >
                  <LogOut className="h-4 w-4 me-2" />
                  Çıkış Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* İSKELET — dürüst placeholder kart */}
      <Section tone="mist" density="normal">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
          <div>
            <Eyebrow tone="red">Modüller</Eyebrow>
            <h2 className="mt-4 font-display text-display text-navy text-balance">
              Yönetim henüz yapım aşamasında.
            </h2>
            <p className="mt-4 text-navy/65 leading-relaxed">
              Bu aşamada panel yalnızca kimliği doğrular. Yazma ve içerik
              yönetimi sonraki adımda eklenecek.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-navy/20 bg-white p-7">
            <div className="inline-flex items-center gap-2 text-eyebrow font-display text-navy/40">
              <Info className="h-3.5 w-3.5" aria-hidden />
              İçerik Yakında
            </div>
            <div className="mt-5 flex items-start gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-remax-red-soft text-remax-red flex-shrink-0">
                <Building2 className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-xl">
                  İlan Yönetimi
                </h3>
                <p className="mt-2 text-navy/65 leading-relaxed">
                  İlan oluşturma, düzenleme, yayınlama/taslak akışı ve görsel
                  yükleme bu modülden yönetilecek. Sonraki adımda devreye
                  girer; bu fazda hiçbir yazma işlemi yapılamaz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
