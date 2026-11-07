"use client";

import { useState } from "react";
import { Check, MapPin } from "lucide-react";
import type { PricingPlan } from "@/types";
import { whatsappFor } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

export interface CityPricingGroup {
  citySlug: string;
  cityName: string;
  tagline?: string;
  plans: PricingPlan[];
}

function discountedPrice(plan: PricingPlan) {
  if (!plan.discountPercent || plan.discountedPrice) return plan.discountedPrice;
  const numericPrice = Number(plan.price.replace(/[^0-9]/g, ""));
  if (!numericPrice) return undefined;
  return `Rp ${Math.round(numericPrice * (1 - plan.discountPercent / 100)).toLocaleString("id-ID")}`;
}

function displayPrice(value: string) {
  return value.trim().startsWith("Rp") ? value : `Rp ${value}`;
}

export function ServicePricingTabs({
  serviceTitle,
  groups,
}: {
  serviceTitle: string;
  groups: CityPricingGroup[];
}) {
  const [activeCity, setActiveCity] = useState(groups[0]?.citySlug ?? "bandung");
  if (!groups.length) return null;

  const current = groups.find((g) => g.citySlug === activeCity) ?? groups[0];
  const plans = current.plans;

  return (
    <div id="harga" className="scroll-mt-20">
      <Section
        eyebrow="Pricelist & Paket"
        title={`Daftar Harga ${serviceTitle}`}
        description={
          current.tagline ||
          `Pilih paket ${serviceTitle} sesuai lokasi cabang EasyOffice pilihan Anda.`
        }
      >
        {/* City Selector Tabs */}
        {groups.length > 1 ? (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
            {groups.map((group) => {
              const isActive = group.citySlug === current.citySlug;
              return (
                <button
                  key={group.citySlug}
                  type="button"
                  onClick={() => setActiveCity(group.citySlug)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "border-navy bg-navy text-white shadow-soft"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-navy/40 hover:text-navy"
                  }`}
                >
                  <MapPin className="h-4 w-4" aria-hidden />
                  <span>EasyOffice {group.cityName}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {/* Pricing Cards Grid */}
        <div
          className={`mx-auto grid gap-6 ${
            plans.length === 1
              ? "max-w-lg lg:grid-cols-1"
              : plans.length === 2
                ? "max-w-4xl lg:grid-cols-2"
                : "lg:grid-cols-3"
          }`}
        >
          {plans.map((plan) => {
            const salePrice = discountedPrice(plan);
            return (
              <div
                key={`${current.citySlug}-${plan.name}`}
                className={`flex flex-col rounded-3xl border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8 ${
                  plan.featured ? "border-2 border-navy" : "border-neutral-200"
                }`}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {current.cityName}
                  </span>
                  {plan.featured ? (
                    <span className="inline-flex w-fit rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
                      Paling Populer
                    </span>
                  ) : null}
                </div>

                <h3 className="font-display text-xl font-bold text-navy">
                  {plan.name}
                </h3>
                {plan.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {plan.description}
                  </p>
                ) : null}

                <div className="mt-4 border-y border-neutral-100 py-4">
                  {salePrice ? (
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-400 line-through tabular-nums">
                        {displayPrice(plan.price)} {plan.period}
                      </span>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="font-display text-3xl font-extrabold tracking-tight text-navy tabular-nums">
                          {salePrice}
                        </span>
                        <span className="text-sm font-medium text-neutral-500">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-3xl font-extrabold tracking-tight text-navy tabular-nums">
                        {displayPrice(plan.price)}
                      </span>
                      <span className="text-sm font-medium text-neutral-500">
                        {plan.period}
                      </span>
                    </div>
                  )}

                  {plan.discountPercent ? (
                    <span className="mt-2 inline-flex w-fit rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                      Hemat {plan.discountPercent}%
                    </span>
                  ) : null}
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-sm text-neutral-700">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href={whatsappFor(
                      `${serviceTitle} paket ${plan.name}`,
                      current.cityName,
                    )}
                    external
                    variant="primary"
                    fullWidth
                    size="lg"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {plan.ctaLabel || "Hubungi via WhatsApp"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
