import Image from "next/image";
import { ArrowIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__media">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
          alt="The bow of a wooden rowing boat gliding across a still alpine lake, ringed by dramatic mountain peaks"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__content wrap">
        <p className="eyebrow eyebrow--light">Personalised Vacations</p>
        <h1 className="hero__headline">
          <span className="line">
            <span>Don&apos;t just book a vacation.</span>
          </span>
          <span className="line">
            <span>Make it yours.</span>
          </span>
        </h1>
        <div className="hero__foot">
          <p className="hero__sub">Tell us what you want to feel. We&apos;ll create the trip around you.</p>
          <p className="hero__micro">
            Personalised itineraries · Handpicked experiences · Human expertise
          </p>
          <a href="#enquiry" className="btn btn--primary">
            Talk to Our Travel Expert
            <ArrowIcon size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
