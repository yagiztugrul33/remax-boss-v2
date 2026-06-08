"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * RE/MAX BOSS sohbet asistanı UI — FEATURE FLAG arkasında.
 *
 * - NEXT_PUBLIC_AI_ASSISTANT_ENABLED === "true" değilse component HİÇ
 *   render olmaz (null döner). Sitede buton/pencere görünmez.
 * - Konum: sol-alt (FloatingActions sağ-alt'ta — WhatsApp + scrollTop ile
 *   ÇAKIŞMA YOK).
 * - Mobil: tam-alt-ekran pencere; desktop: 24rem genişlikte köşe pencere.
 * - Hata durumu nazik mesaj + gerçek iletişim bilgisi.
 * - Animasyon: hover/focus transition'lar dışında sürekli loop YOK
 *   (titreme önlemi — Hero deseniyle tutarlı). "Yazıyor..." spinner
 *   küçük ve sade.
 */

const FLAG_ENABLED =
  process.env.NEXT_PUBLIC_AI_ASSISTANT_ENABLED === "true";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Merhaba! RE/MAX BOSS asistanıyım. Hizmetlerimiz, ekibimiz, kampanyamız veya genel emlak süreçleri hakkında sorularınızı yanıtlayabilirim. Nasıl yardımcı olabilirim?",
};

const SUGGESTIONS = [
  "Hizmetleriniz neler?",
  "Ev satmak istiyorum, süreç nasıl?",
  "Değerleme nasıl yapılır?",
];

const MAX_INPUT_LEN = 1500;
const RATE_LIMIT_MS = 2000;

export default function AiChat() {
  if (!FLAG_ENABLED) return null;
  return <AiChatInner />;
}

function AiChatInner() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Rate limit cooldown — Date.now() çağırmak yerine timer flag ile
  // (React purity rule'una takılmamak için).
  const cooldownRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Açıldığında en alta scroll + input'a focus
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open, messages]);

  // ESC ile kapat
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    if (trimmed.length > MAX_INPUT_LEN) {
      setError(`Mesaj en fazla ${MAX_INPUT_LEN} karakter olabilir.`);
      return;
    }
    // Rate limit (client tarafı — basit, ek koruma)
    if (cooldownRef.current) {
      setError("Çok hızlı gönderdiniz. Lütfen birkaç saniye bekleyin.");
      return;
    }
    cooldownRef.current = true;
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, RATE_LIMIT_MS);

    setError(null);
    // Welcome mesajı API'ye gitmez (sadece UI)
    const apiHistory = messages.filter((m) => m !== WELCOME);
    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [...apiHistory, { role: "user", content: trimmed }],
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok) {
        throw new Error(data?.error || "Yanıt alınamadı.");
      }
      const reply = (data.reply || "Yanıt alınamadı.").trim();
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : "Bağlantı sorunu oluştu.";
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `${msg} Doğrudan iletişim: +90 312 598 00 00 · info@remaxboss.com.tr · veya /iletisim`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* ── Yüzen buton (sol-alt — FloatingActions sağ-alt ile çakışmıyor) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Sohbet asistanını aç"
          className="fixed bottom-4 start-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-remax-red text-white shadow-elevated border border-white/10 hover:bg-remax-red-hover active:scale-95 transition-transform safe-bottom"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
        </button>
      )}

      {/* ── Sohbet penceresi */}
      {open && (
        <div
          role="dialog"
          aria-label="RE/MAX BOSS sohbet asistanı"
          aria-modal="false"
          className={cn(
            "fixed z-[60] bg-white shadow-elevated border border-line flex flex-col overflow-hidden",
            // Mobil: tam-alt-ekran (üstte navbar görünür kalsın diye top-16)
            "inset-x-0 bottom-0 top-16 rounded-t-3xl",
            // Desktop: sol-alt köşe pencere
            "sm:inset-auto sm:bottom-4 sm:start-4 sm:top-auto sm:w-[24rem] sm:h-[34rem] sm:rounded-3xl",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-navy-900 text-white px-4 py-3 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-remax-red flex-shrink-0">
                <MessageCircle className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <div className="font-display font-bold text-sm leading-tight">
                  RE/MAX BOSS Asistan
                </div>
                <div className="text-[11px] text-white/65 leading-tight">
                  Bilgi & yönlendirme
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sohbeti kapat"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          {/* Mesaj akışı */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-mist px-3 py-4 space-y-3"
            aria-live="polite"
            aria-busy={busy}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words",
                    m.role === "user"
                      ? "bg-remax-red text-white rounded-tr-sm"
                      : "bg-white text-navy border border-line rounded-tl-sm",
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className="bg-white text-navy/60 border border-line rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm inline-flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                  Yazıyor…
                </div>
              </div>
            )}

            {/* Hızlı öneriler — sadece karşılama mesajı tekken */}
            {messages.length === 1 && !busy && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="text-xs rounded-full border border-line bg-white text-navy px-3 py-1.5 hover:bg-remax-red hover:text-white hover:border-remax-red transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hata bandı */}
          {error && (
            <div
              role="alert"
              className="flex-shrink-0 bg-red-50 border-t border-red-200 text-red-700 text-xs px-3 py-2"
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="flex-shrink-0 border-t border-line bg-white px-3 py-2.5 flex items-end gap-2 safe-bottom"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Sorunuzu yazın…"
              maxLength={MAX_INPUT_LEN}
              aria-label="Mesajınız"
              className="flex-1 resize-none rounded-xl border border-line bg-mist px-3 py-2 text-sm text-navy outline-none focus:border-remax-red focus:ring-2 focus:ring-remax-red/15 transition-colors min-h-[2.5rem] max-h-24"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Mesajı gönder"
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-remax-red text-white hover:bg-remax-red-hover disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Send className="h-4 w-4" aria-hidden />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
