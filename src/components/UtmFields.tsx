"use client";

import { useEffect, useState } from "react";
import { captureAndPersistUtm, mergeUtm, type UtmValues } from "@/lib/utm";

export function UtmFields({ initialUtm }: { initialUtm?: Partial<UtmValues> }) {
  const [utm, setUtm] = useState<UtmValues>(() =>
    mergeUtm(initialUtm, {
      utm_source: "",
      utm_campaign: "",
      utm_medium: "",
      utm_term: "",
    }),
  );

  useEffect(() => {
    setUtm(captureAndPersistUtm());
  }, []);

  return (
    <>
      <input type="hidden" name="utm_source" value={utm.utm_source} />
      <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
      <input type="hidden" name="utm_medium" value={utm.utm_medium} />
      <input type="hidden" name="utm_term" value={utm.utm_term} />
    </>
  );
}
