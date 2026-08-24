import crypto from "node:crypto";
import type { EnquiryInput } from "@/lib/holidayos";

type SheetRow = {
  timestamp: string;
  eventId: string;
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
  holidayosStatus: string;
  apiPushed: string;
  apiStatus: string;
  apiError: string;
};

const HEADERS = [
  "Timestamp",
  "Event ID",
  "Name",
  "Email",
  "Phone",
  "Destination",
  "Travelling With",
  "Why",
  "UTM Source",
  "UTM Campaign",
  "UTM Medium",
  "UTM Term",
  "HolidayOS Status",
  "API Pushed",
  "API Status",
  "API Error",
];

function toRow(row: SheetRow): string[] {
  return [
    row.timestamp,
    row.eventId,
    row.name,
    row.email,
    row.phone,
    row.destination,
    row.travellers,
    row.why,
    row.utm_source,
    row.utm_campaign,
    row.utm_medium,
    row.utm_term,
    row.holidayosStatus,
    row.apiPushed,
    row.apiStatus,
    row.apiError,
  ];
}

function enquiryToRow(
  input: EnquiryInput,
  holidayosStatus: string,
  api: { apiPushed: string; apiStatus: string; apiError: string },
): SheetRow {
  return {
    timestamp: input.occurredAt,
    eventId: input.eventId,
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
    holidayosStatus,
    apiPushed: api.apiPushed,
    apiStatus: api.apiStatus,
    apiError: api.apiError,
  };
}

async function appendViaWebhook(row: SheetRow) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ headers: HEADERS, values: toRow(row), ...row }),
    redirect: "follow",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Sheet webhook failed (${response.status}): ${text.slice(0, 200)}`);
  }

  return true;
}

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function serviceAccountJwt(email: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claim}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(privateKey.replace(/\\n/g, "\n"), "base64url");
  return `${unsigned}.${signature}`;
}

async function googleAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !privateKey) return null;

  const assertion = serviceAccountJwt(email, privateKey);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await response.json()) as { access_token?: string; error?: string };
  if (!response.ok || !data.access_token) {
    throw new Error(data.error || "Could not get a Google access token.");
  }

  return data.access_token;
}

async function appendViaSheetsApi(row: SheetRow) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_SHEET_TAB || "Enquiries";
  const token = await googleAccessToken();
  if (!spreadsheetId || !token) return false;

  const range = encodeURIComponent(`${tab}!A1`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const existing = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(`${tab}!A1:M1`)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const existingJson = (await existing.json()) as { values?: string[][] };
  const needsHeader = !existingJson.values?.[0]?.length;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: needsHeader ? [HEADERS, toRow(row)] : [toRow(row)],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Sheets API failed (${response.status}): ${text.slice(0, 200)}`);
  }

  return true;
}

export async function appendEnquiryToSheet(
  input: EnquiryInput,
  holidayosStatus: string,
  api: { apiPushed: string; apiStatus: string; apiError: string },
) {
  const row = enquiryToRow(input, holidayosStatus, api);
  const viaWebhook = await appendViaWebhook(row);
  if (viaWebhook) return "webhook";
  const viaApi = await appendViaSheetsApi(row);
  if (viaApi) return "sheets-api";
  throw new Error(
    "Google Sheet is not configured. Set GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEET_ID with a service account.",
  );
}
