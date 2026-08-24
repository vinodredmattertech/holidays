import { readFileSync } from "node:fs";
import { join } from "node:path";

export function ensureLocalEnv() {
  try {
    const file = readFileSync(join(process.cwd(), ".env.local"), "utf8");
    for (const line of file.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (key) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env.local is optional when the host already injects env vars
  }
}
