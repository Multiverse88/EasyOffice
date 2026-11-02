/**
 * WhatsApp helpers — centralized so every CTA uses the same logic.
 */
export const WHATSAPP_NUMBER = "62818881425";
export type WhatsAppRoute = { label?: string; number: string; active?: boolean; priority?: number; weight?: number };

/** Per-location numbers. Unknown slugs fall back to the default. */
const LOCATION_WHATSAPP: Record<string, string> = {
  bandung: "62818881425",
  jakarta: "62818881425",
  bekasi: "62818881425",
};

export function locationWhatsappNumber(locationSlug: string): string {
  return LOCATION_WHATSAPP[locationSlug] ?? WHATSAPP_NUMBER;
}

export function whatsappUrl(message?: string, number: string = WHATSAPP_NUMBER): string {
  const base = `https://wa.me/${number.trim() || WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function whatsappRotatorUrl(message?: string, city?: string): string {
  const params = new URLSearchParams();
  if (message) params.set("pesan", message);
  if (city) params.set("kota", city);
  return `/api/wa?${params.toString()}`;
}

export function whatsappFor(
  topic: string,
  locationName?: string,
  number?: string,
): string {
  const location = locationName ? ` di ${locationName}` : "";
  const msg = `Halo EasyOffice, saya tertarik dengan layanan ${topic}${location}. Boleh info lebih lanjut?`;
  if (number && number !== WHATSAPP_NUMBER) {
    return whatsappUrl(msg, number);
  }
  return whatsappRotatorUrl(msg, locationName);
}

export function routedWhatsappNumber(numbers?: WhatsAppRoute[], fallback?: string, excludedNumber?: string): string {
  const active = (numbers ?? [])
    .filter((item) => item.active !== false && item.number?.trim() && item.number !== excludedNumber);
  if (!active.length) return fallback?.trim() || WHATSAPP_NUMBER;
  if (active.length === 1) return active[0].number.trim();

  // Weighted Rotator logic
  const pool: string[] = [];
  for (const item of active) {
    const weight = Math.max(1, Number(item.weight || item.priority || 1));
    for (let i = 0; i < weight; i++) {
      pool.push(item.number.trim());
    }
  }
  return pool[Math.floor(Math.random() * pool.length)] || active[0].number.trim();
}
