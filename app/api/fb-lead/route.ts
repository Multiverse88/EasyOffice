import { NextResponse } from "next/server";
import { createHash } from "node:crypto";


function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("62")) return digits;
  return "62" + digits;
}

export async function POST(req: Request) {
  const token = process.env.FB_CONVERSION_TOKEN || "";
  const pixelId = process.env.NUXT_PUBLIC_META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
  if (!token || !pixelId) {
    return NextResponse.json({ ok: false, error: "FB_CONVERSION_TOKEN / META_PIXEL_ID not configured" });
  }

  try {
    const body = await req.json();
    const { eventId, nama, whatsapp } = body || {};
    if (!whatsapp) {
      return NextResponse.json({ ok: false, error: "whatsapp wajib diisi" }, { status: 400 });
    }

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          user_data: {
            ph: [createHash("sha256").update(normalizePhone(whatsapp).trim().toLowerCase()).digest("hex")],
            ...(nama ? { fn: [createHash("sha256").update(String(nama).split(" ")[0].trim().toLowerCase()).digest("hex")] } : {}),
          },
        },
      ],
    };

    const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return NextResponse.json({ ok: true, res: data });
  } catch (err: unknown) {
    console.error("FB CAPI error:", err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
