import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const FALLBACK_NUMBER = "62818881425";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text =
    searchParams.get("text") ||
    searchParams.get("pesan") ||
    "Halo EasyOffice, saya ingin bertanya tentang layanan Anda.";
  const city = (searchParams.get("city") || searchParams.get("kota") || "").toLowerCase();

  let targetNumber = FALLBACK_NUMBER;

  try {
    const apiBase = (process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000").replace(/\/$/, "");
    const res = await fetch(`${apiBase}/api/nomor-whatsapp?where[enabled][equals]=true&limit=100`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const docs: Array<{
        id: number;
        label: string;
        phoneNumber: string;
        weight?: number;
        assignedCount?: number;
      }> = data.docs ?? [];

      if (docs.length > 0) {
        // Filter by city if matching CS label exists
        let candidates = docs;
        if (city) {
          const cityMatches = docs.filter((d) => d.label?.toLowerCase().includes(city));
          if (cityMatches.length > 0) {
            candidates = cityMatches;
          }
        }

        // Weighted Rotator Selection
        const weightedPool: Array<{ id: number; number: string }> = [];
        for (const item of candidates) {
          const weight = Math.max(1, Number(item.weight || 1));
          for (let i = 0; i < weight; i++) {
            weightedPool.push({ id: item.id, number: item.phoneNumber });
          }
        }

        const selected = weightedPool[Math.floor(Math.random() * weightedPool.length)];
        if (selected?.number) {
          targetNumber = selected.number.replace(/\D/g, "");

          // Increment counter
          const currentCount = Number(docs.find((d) => d.id === selected.id)?.assignedCount) || 0;
          fetch(`${apiBase}/api/nomor-whatsapp/${selected.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              assignedCount: currentCount + 1,
              lastAssignedAt: new Date().toISOString(),
            }),
          }).catch(() => {});
        }
      }
    }
  } catch {
    // Graceful fallback to default number
  }

  const cleanNumber = targetNumber.replace(/\D/g, "") || FALLBACK_NUMBER;
  const waTarget = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;

  return NextResponse.redirect(waTarget, 307);
}
