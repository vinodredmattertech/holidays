import crypto from "node:crypto";
import type { UtmValues } from "@/lib/utm";

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travellers: string;
  why: string;
  utm: UtmValues;
  eventId: string;
  occurredAt: string;
};

export type HolidayosResult = {
  accepted: number;
  duplicate: number;
  failed: number;
  results?: Array<{ eventId: string; status: string }>;
};

function env(name: string, fallback = "") {
  return process.env[name] || fallback;
}

function compact<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value == null || value === "") continue;
    if (typeof value === "object" && !Array.isArray(value)) {
      const nested = compact(value as Record<string, unknown>);
      if (Object.keys(nested).length) out[key] = nested;
      continue;
    }
    out[key] = value;
  }
  return out;
}

export function buildHolidayosPayload(input: EnquiryInput) {
  const tenantSlug = env("HOLIDAYOS_TENANT", "the-holidays-ai");

  return {
    events: [
      compact({
        specVersion: "1.0",
        eventId: input.eventId,
        eventType: "enquiry.submitted",
        occurredAt: input.occurredAt,
        tenant: tenantSlug,
        origin: env("HOLIDAYOS_ORIGIN", "source-system"),
        actor: compact({
          type: "contact",
          email: input.email,
          name: input.name,
          phone: input.phone,
        }),
        payload: compact({
          destination: input.destination,
          party: input.travellers,
          message: input.why,
          utm_source: input.utm.utm_source,
          utm_campaign: input.utm.utm_campaign,
          utm_medium: input.utm.utm_medium,
          utm_term: input.utm.utm_term,
        }),
      }),
    ],
  };
}

export async function sendHolidayosEvent(input: EnquiryInput): Promise<HolidayosResult> {
  const connectSecret = env("HOLIDAYOS_CONNECT_SECRET") || env("HOLIDAYOS_CONNECT_KEY");
  const keyPrefix = env("HOLIDAYOS_CONNECT_KEY") || connectSecret;
  const tenantSlug = env("HOLIDAYOS_TENANT", "the-holidays-ai");
  const apiUrl = env("HOLIDAYOS_API_URL", "https://api.new.holidayos.ai/api/v1/crm/connect/events");

  if (!connectSecret || !keyPrefix) {
    throw new Error("HolidayOS connect credentials are not configured.");
  }

  const payload = buildHolidayosPayload(input);
  const rawBody = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000);
  const digest = crypto
    .createHmac("sha256", connectSecret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Connect-Key": keyPrefix,
      "X-Connect-Tenant": tenantSlug,
      "X-Connect-Signature": `t=${timestamp},v1=${digest}`,
    },
    body: rawBody,
  });

  const text = await response.text();
  let data: HolidayosResult | { error?: string; message?: string } = {
    accepted: 0,
    duplicate: 0,
    failed: 1,
  };

  try {
    data = JSON.parse(text) as HolidayosResult;
  } catch {
    throw new Error(`HolidayOS returned HTTP ${response.status}`);
  }

  if (!response.ok) {
    const message =
      ("error" in data && data.error) ||
      ("message" in data && data.message) ||
      `HolidayOS request failed (${response.status})`;
    throw new Error(String(message));
  }

  return data as HolidayosResult;
}
