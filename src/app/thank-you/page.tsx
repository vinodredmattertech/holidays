import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ThankYouContent } from "@/components/ThankYouContent";

export const metadata: Metadata = {
  title: "Thank you — Holidays.ai",
  description: "Your enquiry has been received. A travel expert will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <ThankYouContent />
      </main>
      <Footer />
    </>
  );
}
