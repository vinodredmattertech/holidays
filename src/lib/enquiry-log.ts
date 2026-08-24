import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { EnquiryInput } from "@/lib/holidayos";

export type EnquiryLog = {
  eventId: string;
  occurredAt: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travellers: string;
  why: string;
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  utm_term: string;
  apiPushed: "yes" | "no";
  apiStatus: "pushed" | "not_pushed";
  apiError: string;
  holidayosStatus: string;
  sheetStatus: string;
};

export function toEnquiryLog(
  input: EnquiryInput,
  holidayosStatus: string,
  sheetStatus: string,
  apiError = "",
): EnquiryLog {
  const apiPushed = holidayosStatus === "accepted" || holidayosStatus === "duplicate" ? "yes" : "no";

  return {
    eventId: input.eventId,
    occurredAt: input.occurredAt,
    name: input.name,
    email: input.email,
    phone: input.phone,
    destination: input.destination,
    travellers: input.travellers,
    why: input.why,
    utm_source: input.utm.utm_source,
    utm_campaign: input.utm.utm_campaign,
    utm_medium: input.utm.utm_medium,
    utm_term: input.utm.utm_term,
    apiPushed,
    apiStatus: apiPushed === "yes" ? "pushed" : "not_pushed",
    apiError: apiPushed === "yes" ? "" : apiError || "HolidayOS request failed.",
    holidayosStatus,
    sheetStatus,
  };
}

export async function logEnquiry(entry: EnquiryLog) {
  console.info("Enquiry form data:", entry);

  const dir = join(process.cwd(), "logs");
  await mkdir(dir, { recursive: true });
  await appendFile(join(dir, "enquiries.jsonl"), `${JSON.stringify(entry)}\n`, "utf8");
}
