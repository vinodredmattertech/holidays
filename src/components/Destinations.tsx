"use client";

import Image from "next/image";
import { destinations } from "@/lib/data";
import { ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { useEnquiry } from "@/components/EnquiryProvider";

export function Destinations() {
  const { setDestination } = useEnquiry();

  function pickDestination(name: string) {
    setDestination(name);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("enquiry")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    window.setTimeout(
      () => {
        document.getElementById("ef-destination")?.focus({ preventScroll: true });
      },
      reduceMotion ? 0 : 650,
    );
  }

  return (
    <section className="destinations section wrap" id="destinations" aria-label="Destinations">
      <Reveal className="section-head">
        <p className="eyebrow">Four Destinations</p>
        <h2>
          Four destinations.
          <br />
          Infinite ways to experience them.
        </h2>
        <p>The destination is only the beginning. The way you experience it is what makes the vacation yours.</p>
      </Reveal>

      <div className="destinations__grid">
        {destinations.map((dest, index) => (
          <Reveal
            key={dest.id}
            className={`dest dest--${dest.id}`}
            delay={index === 0 ? undefined : ((Math.min(index, 3) as 1 | 2 | 3))}
          >
            <button type="button" className="dest__hit" onClick={() => pickDestination(dest.name)}>
              <span className="dest__frame">
                <Image src={dest.image} alt={dest.alt} fill sizes="(max-width: 1080px) 100vw, 50vw" />
                <span className="dest__label">
                  <span className="dest__num">
                    {dest.num} — {dest.name}
                  </span>
                  <span className="dest__name">{dest.title}</span>
                  {dest.tagline ? <span className="dest__tagline">{dest.tagline}</span> : null}
                </span>
              </span>
              <span className="dest__body">
                <span className="dest__copy">{dest.copy}</span>
                <span className="dest__cta">
                  {dest.cta} <ArrowIcon size={13} />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
