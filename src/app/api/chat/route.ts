import { NextRequest, NextResponse } from "next/server";
import {
  buildSystemPrompt,
  MAX_HISTORY,
  MAX_MESSAGE_LEN,
  MAX_OUTPUT_TOKENS,
  DEFAULT_MODEL,
} from "@/lib/ai-assistant";

/**
 * POST /api/chat — RE/MAX BOSS sohbet asistanı, Anthropic Claude proxy.
 *
 * GÜVENLİK / FEATURE FLAG (savunma katmanları):
 *  1) NEXT_PUBLIC_AI_ASSISTANT_ENABLED !== "true" → 503 (asistan kapalı).
 *  2) ANTHROPIC_API_KEY yoksa → 503 (yapılandırma eksik).
 *  3) Body > 8KB → 400.
 *  4) Geçmiş > MAX_HISTORY → kırpılır.
 *  5) Mesaj > MAX_MESSAGE_LEN → kırpılır.
 *  6) Anahtar SADECE server'da; client'a / response'a / hata mesajına sızmaz.
 *  7) System prompt SUNUCUDA — client değiştiremez.
 *  8) max_tokens MAX_OUTPUT_TOKENS ile sabit (maliyet koruması).
 *
 * Model override: ANTHROPIC_MODEL env (default: DEFAULT_MODEL).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IncomingMessage {
  role?: string;
  content?: unknown;
}

interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const BODY_LIMIT_BYTES = 8000;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest) {
  // 1) Feature flag
  if (process.env.NEXT_PUBLIC_AI_ASSISTANT_ENABLED !== "true") {
    return jsonError("Asistan şu an kapalı.", 503);
  }

  // 2) API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonError(
      "Asistan yapılandırılmamış. Lütfen ofisimizle iletişime geçin.",
      503,
    );
  }

  // 3) Body okuma + boyut limiti
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return jsonError("Geçersiz istek.", 400);
  }
  if (raw.length > BODY_LIMIT_BYTES) {
    return jsonError("Mesaj çok uzun.", 400);
  }

  let parsed: { messages?: IncomingMessage[] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    return jsonError("Geçersiz JSON.", 400);
  }

  if (!Array.isArray(parsed.messages) || parsed.messages.length === 0) {
    return jsonError("Mesaj listesi boş.", 400);
  }

  // 4 + 5) Sanitize: rol + içerik + uzunluk + son N
  const sanitized: ClaudeMessage[] = [];
  for (const m of parsed.messages.slice(-MAX_HISTORY)) {
    if (m.role !== "user" && m.role !== "assistant") continue;
    const content = String(m.content ?? "").trim();
    if (!content) continue;
    sanitized.push({
      role: m.role,
      content:
        content.length > MAX_MESSAGE_LEN
          ? content.slice(0, MAX_MESSAGE_LEN)
          : content,
    });
  }

  if (sanitized.length === 0) {
    return jsonError("Geçerli mesaj bulunamadı.", 400);
  }

  // Anthropic API'ye proxy
  const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
  try {
    const apiRes = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: MAX_OUTPUT_TOKENS,
        system: buildSystemPrompt(),
        messages: sanitized,
      }),
    });

    if (!apiRes.ok) {
      // Status code'u logla ama anahtarı/yanıt body'sini DOKUNMA.
      console.error("[ai-chat] Anthropic API status", apiRes.status);
      return jsonError(
        "Asistan şu an yanıt veremiyor. Lütfen kısa süre sonra tekrar deneyin veya bizi arayın.",
        502,
      );
    }

    const data = (await apiRes.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };
    const textBlock = data.content?.find((c) => c.type === "text");
    const reply = textBlock?.text?.trim() || "Yanıt alınamadı.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[ai-chat] Fetch failed", err instanceof Error ? err.message : "");
    return jsonError(
      "Bağlantı sorunu oluştu. Lütfen kısa süre sonra tekrar deneyin veya bizi arayın.",
      502,
    );
  }
}
