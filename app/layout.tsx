import type { Metadata } from "next";
import {
  Pinyon_Script,
  Bodoni_Moda,
  Open_Sans,
  Playfair_Display,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Image from "next/image";

const pinyonScript = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon-script",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Madonna Del Divino Amore Parish - Catholic Church in Las Pinas City",
  description:
    "Madonna Del Divino Amore Parish Official Website. A Roman Catholic church located at Ayala Southvale Drive, Las Pinas City. Under the Diocese of Paranaque.",
  openGraph: {
    title: "Madonna Del Divino Amore Parish",
    description:
      "Madonna Del Divino Amore Parish Official Website. A Roman Catholic church located at Ayala Southvale Drive, Las Pinas City. Under the Diocese of Paranaque.",
    images: [
      {
        url: "/madonnalogo.png",
        width: 800,
        height: 600,
        alt: "Madonna Del Divino Amore Parish",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madonna Del Divino Amore Parish",
    description:
      "Madonna Del Divino Amore Parish Official Website. A Roman Catholic church located at Ayala Southvale Drive, Las Pinas City. Under the Diocese of Paranaque.",
    images: [
      {
        url: "/madonnalogo.png",
        alt: "Madonna Del Divino Amore Parish",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${openSans.variable} ${pinyonScript.variable} ${playfairDisplay.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link rel="icon" href="/madonnalogo.png" />
        <meta
          name="keywords"
          content="Catholic Church, Las Pinas City, Madonna Del Divino Amore Parish, Diocese of Paranaque, Roman Catholic"
        />
        <meta property="og:title" content="Madonna Del Divino Amore Parish" />
        <meta
          property="og:description"
          content="Madonna Del Divino Amore Parish Official Website. A Roman Catholic church located at Ayala Southvale Drive, Las Pinas City. Under the Diocese of Paranaque."
        />
        <meta property="og:image" content="/madonnalogo.png" />
        {
          //todo: add website link here upon deployment
        }
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Madonna Del Divino Amore Parish",
            url: "https://yourwebsite.com", //todo: add website link here upon deployment
            logo: "https://yourwebsite.com/path/to/your/logo.png", //todo: add logo route here
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-555-555-5555",
              contactType: "Customer Service",
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "Ayala Southvale Drive",
              addressLocality: "Las Pinas City",
              addressRegion: "NCR",
              postalCode: "1740",
              addressCountry: "PH",
            },
          })}
        </script>
      </head>
      <body>
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
