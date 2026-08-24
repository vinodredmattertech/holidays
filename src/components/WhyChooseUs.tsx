import { stories } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function WhyChooseUs() {
  return (
    <section className="why section wrap" aria-label="Why choose us">
      <Reveal className="why__head section-head">
        <p className="eyebrow">Why Choose Us</p>
        <h2>Why choose us?</h2>
        <p>From industry experience to vacations designed around you.</p>
      </Reveal>

      <div className="why__stories">
        {stories.map((story) => (
          <Reveal as="article" className="story" key={story.num}>
            <span className="story__num">{story.num}</span>
            <div className="story__rule" aria-hidden="true" />
            <div className="story__content">
              <h3>{story.title}</h3>
              <p>{story.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
