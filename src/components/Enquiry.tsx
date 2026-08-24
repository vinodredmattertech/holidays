"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { useEnquiry } from "@/components/EnquiryProvider";
import { UtmFields } from "@/components/UtmFields";
import type { UtmValues } from "@/lib/utm";

export function Enquiry({ initialUtm }: { initialUtm?: Partial<UtmValues> }) {
  const router = useRouter();
  const { destination, setDestination } = useEnquiry();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "We could not send your enquiry. Please try again.");
      }

      sessionStorage.setItem(
        "enquiry_thanks",
        JSON.stringify({
          name: String(payload.name || ""),
          destination: String(payload.destination || ""),
        }),
      );
      router.push("/thank-you");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not send your enquiry. Please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <section className="enquiry section wrap" id="enquiry" aria-label="Enquiry form">
      <div className="enquiry__inner">
        <Reveal className="enquiry__left">
          <p className="eyebrow">Start Here</p>
          <h2>Ready for a holiday that feels designed around you?</h2>
          <p>
            Tell us where you want to go, what you want to experience, and how you like to travel.
            We&apos;ll take it from there.
          </p>
          <div className="enquiry__visual">
            <Image
              src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1200&auto=format&fit=crop"
              alt="A plane wing catching golden light above the clouds at sunset"
              fill
              sizes="(max-width: 1080px) 100vw, 40vw"
            />
          </div>
        </Reveal>

        <Reveal className="form-card" delay={1}>
          <form id="enquiryForm" onSubmit={onSubmit} noValidate>
            <div className="form-el">
              <UtmFields initialUtm={initialUtm} />
              <div className="form-grid">
                <div className="field field--full">
                  <label htmlFor="ef-name">Full name</label>
                  <input type="text" id="ef-name" name="name" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="ef-email">Email</label>
                  <input type="email" id="ef-email" name="email" autoComplete="email" required />
                </div>
                <div className="field">
                  <label htmlFor="ef-phone">Phone number</label>
                  <input type="tel" id="ef-phone" name="phone" autoComplete="tel" required />
                </div>
                <div className="field">
                  <label htmlFor="ef-destination">Where do you want to go?</label>
                  <select
                    id="ef-destination"
                    name="destination"
                    required
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                  >
                    <option value="">Select a destination</option>
                    <option value="Bali">Bali</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="ef-travellers">Travelling with</label>
                  <select id="ef-travellers" name="travellers" required defaultValue="">
                    <option value="">Select</option>
                    <option value="Solo">Solo</option>
                    <option value="Partner">Partner</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                  </select>
                </div>
                <div className="field field--full">
                  <label htmlFor="ef-why">Why are you travelling?</label>
                  <textarea
                    id="ef-why"
                    name="why"
                    placeholder="To switch off, to celebrate, to reconnect…"
                  />
                  <span className="field-hint">The more honest, the better we can plan.</span>
                </div>
              </div>
              {error ? (
                <p className="form-error" role="alert">
                  {error}
                </p>
              ) : null}
              <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
                {submitting ? "Sending…" : "Create My Vacation"}
                {submitting ? null : <ArrowIcon size={14} />}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
