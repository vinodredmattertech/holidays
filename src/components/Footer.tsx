import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Image className="footer__logo" src="/logo.png" alt="Holidays.ai" width={110} height={22} />
          <span className="footer__tagline">Personalised vacations, designed around you.</span>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <a href="/#enquiry">Privacy Policy</a>
          <a href="/#enquiry">Terms &amp; Conditions</a>
          <a href="/#enquiry">Contact</a>
        </nav>
        <p className="footer__copy">© 2026 Holidays.ai. All rights reserved.</p>
      </div>
    </footer>
  );
}
