import { reasons } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function CoreIdea() {
  return (
    <section className="core section" aria-label="Our philosophy">
      <Reveal className="wrap core__inner">
        <p className="eyebrow eyebrow--on-blue">The Core Idea</p>
        <h2>
          We don&apos;t ask <em>where.</em>
          <br />
          We ask <em>why.</em>
        </h2>
        <p className="core__prompt">Why are you travelling?</p>
        <ul className="core__reasons">
          {reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
        <p className="core__close">That&apos;s where your vacation starts.</p>
      </Reveal>
    </section>
  );
}
