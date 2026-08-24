import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function Statement() {
  return (
    <section className="statement" aria-label="Our promise">
      <Reveal className="wrap">
        <h2>
          We don&apos;t sell packages.
          <br />
          We create <span className="orange">your vacation.</span>
        </h2>
        <div className="statement__lines">
          <p>
            We ask why you travel.
            <br />
            We listen to what you love.
            <br />
            We design your perfect trip.
            <br />
            You live it, your way.
          </p>
        </div>
        <div className="statement__logo">
          <Image src="/logo.png" alt="Holidays.ai" width={120} height={26} />
        </div>
      </Reveal>
    </section>
  );
}
