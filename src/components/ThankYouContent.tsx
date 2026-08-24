"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

type ThanksDetails = {
  name: string;
  destination: string;
};

export function ThankYouContent() {
  const [details, setDetails] = useState<ThanksDetails | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("enquiry_thanks");
      if (!raw) return;
      const parsed = JSON.parse(raw) as ThanksDetails;
      if (parsed.name || parsed.destination) setDetails(parsed);
    } catch {
      /* ignore invalid storage */
    }
  }, []);

  const firstName = details?.name?.trim().split(/\s+/)[0] || "";

  return (
    <section className="thanks" aria-label="Thank you">
      <div className="wrap thanks__inner">
        <p className="eyebrow">Enquiry received</p>
        <div className="thanks__mark" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12.5l2.5 2.5L16 9.5" />
          </svg>
        </div>
        <h1>
          {firstName ? `Thank you, ${firstName}.` : "Thank you."}
          <br />
          Your travel expert is on it.
        </h1>
        <p className="thanks__copy">
          {details?.destination
            ? `We've received your enquiry for ${details.destination}. `
            : "We've received your enquiry. "}
          We'll be in touch shortly to start shaping a trip around you.
        </p>
        <Link href="/" className="btn btn--primary">
          Back to Holidays.ai
          <ArrowIcon size={14} />
        </Link>
      </div>
    </section>
  );
}
