import type { Metadata } from "next";
import Script from "next/script";
import { Caveat, Fraunces, Inter } from "next/font/google";
import { EnquiryProvider } from "@/components/EnquiryProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Holidays.ai — Don't just book a vacation. Make it yours.",
  description:
    "We don't sell packages. We create your vacation. Personalised trips to Bali, Sri Lanka, Vietnam and Japan — designed around why you're travelling, not just where.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WGZ35R99');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGZ35R99"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <EnquiryProvider>{children}</EnquiryProvider>
      </body>
    </html>
  );
}
