export const UTM_KEYS = ["utm_source", "utm_campaign", "utm_medium", "utm_term"] as const;

export type UtmValues = Record<(typeof UTM_KEYS)[number], string>;

const STORAGE_KEY = "holidays_utm";
const COOKIE_NAME = "holidays_utm";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

function emptyUtm(): UtmValues {
  return { utm_source: "", utm_campaign: "", utm_medium: "", utm_term: "" };
}

function clean(value: unknown): string {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : "";
}

function readStored(raw: string | null): Partial<UtmValues> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      utm_source: clean(parsed.utm_source),
      utm_campaign: clean(parsed.utm_campaign),
      utm_medium: clean(parsed.utm_medium),
      utm_term: clean(parsed.utm_term),
    };
  } catch {
    return {};
  }
}

function readCookie(): Partial<UtmValues> {
  if (typeof document === "undefined") return {};
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? readStored(decodeURIComponent(match[1])) : {};
}

export function captureUtmFromSearch(search: string): UtmValues {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  return {
    utm_source: clean(params.get("utm_source")),
    utm_campaign: clean(params.get("utm_campaign")),
    utm_medium: clean(params.get("utm_medium")),
    utm_term: clean(params.get("utm_term")),
  };
}

export function mergeUtm(...sources: Array<Partial<UtmValues> | undefined>): UtmValues {
  const merged = emptyUtm();
  for (const source of sources) {
    if (!source) continue;
    for (const key of UTM_KEYS) {
      if (!merged[key] && clean(source[key])) merged[key] = clean(source[key]);
    }
  }
  return merged;
}

export function captureAndPersistUtm(): UtmValues {
  const fromUrl = captureUtmFromSearch(window.location.search);
  const fromSession = readStored(sessionStorage.getItem(STORAGE_KEY));
  const fromCookie = readCookie();
  const utm = mergeUtm(fromUrl, fromSession, fromCookie);
  const serialized = JSON.stringify(utm);
  sessionStorage.setItem(STORAGE_KEY, serialized);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(serialized)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
  return utm;
}

export function utmFromRequest(request: Request, body: Record<string, unknown>): UtmValues {
  const url = new URL(request.url);
  return mergeUtm(
    {
      utm_source: clean(body.utm_source),
      utm_campaign: clean(body.utm_campaign),
      utm_medium: clean(body.utm_medium),
      utm_term: clean(body.utm_term),
    },
    captureUtmFromSearch(url.search),
  );
}
