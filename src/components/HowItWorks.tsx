import { steps } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { StepIcon } from "@/components/icons";

export function HowItWorks() {
  return (
    <section className="how section" aria-label="How it works">
      <div className="wrap">
        <Reveal className="how__head">
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            The Process
          </p>
          <h2>How it works</h2>
          <p>You tell us what you want. We take care of the rest.</p>
        </Reveal>

        <div className="journey">
          <ol className="journey__list">
            {steps.map((step, index) => (
              <Reveal
                as="li"
                className="stop"
                delay={index === 0 ? undefined : ((Math.min(index, 3) as 1 | 2 | 3))}
                key={step.num}
              >
                <div className="stop__dot">
                  <span className="stop__num">{step.num}</span>
                  <StepIcon name={step.icon} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
