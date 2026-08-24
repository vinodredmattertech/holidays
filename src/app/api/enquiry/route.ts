import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { ensureLocalEnv } from "@/lib/env";
import { utmFromRequest } from "@/lib/utm";
import { sendHolidayosEvent, type EnquiryInput } from "@/lib/holidayos";
import { appendEnquiryToSheet } from "@/lib/google-sheets";
import { logEnquiry, toEnquiryLog } from "@/lib/enquiry-log";

export const runtime = "nodejs";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  ensureLocalEnv();

  let body: Record<string, unknown> = {};

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const destination = clean(body.destination);
  const travellers = clean(body.travellers);
  const why = clean(body.why);

  if (!name || !email || !phone || !destination || !travellers) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const input: EnquiryInput = {
    name,
    email,
    phone,
    destination,
    travellers,
    why,
    utm: utmFromRequest(request, body),
    eventId: `enq-${randomUUID()}`,
    occurredAt: new Date().toISOString(),
  };

  let holidayos: Awaited<ReturnType<typeof sendHolidayosEvent>> | null = null;
  let holidayosStatus = "failed";
  let holidayosError = "";
  let sheetError = "";

  try {
    holidayos = await sendHolidayosEvent(input);
    holidayosStatus =
      holidayos.accepted > 0 ? "accepted" : holidayos.duplicate > 0 ? "duplicate" : "failed";
  } catch (error) {
    holidayosError = error instanceof Error ? error.message : "HolidayOS request failed.";
    console.error("HolidayOS submit failed:", error);
  }

  const apiPushed = holidayosStatus === "accepted" || holidayosStatus === "duplicate" ? "yes" : "no";
  const api = {
    apiPushed,
    apiStatus: (apiPushed === "yes" ? "pushed" : "not_pushed") as "pushed" | "not_pushed",
    apiError: apiPushed === "yes" ? "" : holidayosError || "HolidayOS request failed.",
  };

  try {
    await appendEnquiryToSheet(input, holidayosStatus, api);
  } catch (error) {
    sheetError = error instanceof Error ? error.message : "Google Sheet request failed.";
    console.error("Google Sheet append failed:", error);
  }

  const sheetStatus = sheetError ? "failed" : "saved";
  try {
    await logEnquiry(toEnquiryLog(input, holidayosStatus, sheetStatus, holidayosError));
  } catch (error) {
    console.error("Enquiry log failed:", error);
  }

  if (holidayos || !sheetError) {
    return NextResponse.json({
      ok: true,
      eventId: input.eventId,
      holidayos,
      warning: holidayosError || sheetError || undefined,
    });
  }

  return NextResponse.json(
    { error: "We could not send your enquiry. Please try again." },
    { status: 502 },
  );
}
