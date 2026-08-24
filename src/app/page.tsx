import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Destinations } from "@/components/Destinations";
import { CoreIdea } from "@/components/CoreIdea";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Stats } from "@/components/Stats";
import { Enquiry } from "@/components/Enquiry";
import { Statement } from "@/components/Statement";
import { Footer } from "@/components/Footer";

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialUtm = {
    utm_source: first(params.utm_source),
    utm_campaign: first(params.utm_campaign),
    utm_medium: first(params.utm_medium),
    utm_term: first(params.utm_term),
  };

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Destinations />
        <CoreIdea />
        <WhyChooseUs />
        <HowItWorks />
        <Stats />
        <Enquiry initialUtm={initialUtm} />
        <Statement />
      </main>
      <Footer />
    </>
  );
}
