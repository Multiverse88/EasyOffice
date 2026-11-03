"use client";

import { useEffect } from "react";

const COOKIE_NAME = "eo_src";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, first-touch attribution

function detectSource(): string | null {
  const params = new URLSearchParams(window.location.search);
  const ref = document.referrer.toLowerCase();

  // Paid click IDs are the most reliable signal.
  if (params.get("gclid") || params.get("gbraid") || params.get("wbraid")) return "Google Ads";
  if (params.get("fbclid")) return "Meta Ads";
  if (params.get("ttclid")) return "TikTok Ads";

  const utmSource = (params.get("utm_source") || "").toLowerCase();
  const utmMedium = (params.get("utm_medium") || "").toLowerCase();
  if (utmSource) {
    const isPaid = ["cpc", "paid", "ads", "ppc"].includes(utmMedium);
    if (utmSource.includes("google")) return isPaid || !utmMedium ? "Google Ads" : "Google SEO";
    if (utmSource.includes("facebook") || utmSource.includes("meta") || utmSource.includes("instagram")) return "Meta Ads";
    if (utmSource.includes("tiktok")) return "TikTok Ads";
    return utmSource.charAt(0).toUpperCase() + utmSource.slice(1);
  }

  if (ref.includes("google.")) return "Google SEO";
  if (ref.includes("facebook.com") || ref.includes("instagram.com") || ref.includes("fb.com")) return "Meta Ads";
  if (ref.includes("tiktok.com")) return "TikTok";

  return null;
}

/** Captures first-touch lead source (Google Ads, Google SEO, Meta Ads, etc.) into a cookie read by /api/wa for the WhatsApp autotext. */
export function AttributionTracker() {
  useEffect(() => {
    if (document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE_NAME}=`))) return;
    const source = detectSource();
    if (source) {
      document.cookie = `${COOKIE_NAME}=${encodeURIComponent(source)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  }, []);

  return null;
}
