"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowIcon, PhoneIcon } from "@/components/icons";

const PHONE_DISPLAY = "+91 9187978746";
const PHONE_HREF = "tel:+919187978746";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`nav${scrolled || !onHome ? " is-scrolled" : ""}`}>
        <div className="wrap nav__inner">
          <a href={onHome ? "#top" : "/"} className="nav__logo" aria-label="Holidays.ai home">
            <Image src="/logo.png" alt="Holidays.ai" width={140} height={30} priority />
          </a>
          <div className="nav__actions">
            <a className="nav__phone" href={PHONE_HREF} aria-label={`Call ${PHONE_DISPLAY}`}>
              <PhoneIcon size={14} />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a href={onHome ? "#enquiry" : "/#enquiry"} className="btn btn--primary nav__cta">
              Plan My Trip
              <ArrowIcon size={13} />
            </a>
          </div>
        </div>
      </header>
      <a href={onHome ? "#enquiry" : "/#enquiry"} className="enquire-sticky">
        Enquire now
      </a>
    </>
  );
}
