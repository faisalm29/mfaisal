import type { Metadata } from "next";

import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteConfig from "@/config";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../InterVariable.woff2",
      style: "normal",
    },
    {
      path: "../InterVariable-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-inter",
});

const jakartaSans = localFont({
  src: [
    {
      path: "../PlusJakartaSans-Regular.woff2",
      style: "normal",
    },
    {
      path: "../PlusJakartaSans-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-jakarta-sans",
});

const uncutSans = localFont({
  src: [
    {
      path: "../UncutSans-Light.woff2",
      weight: "300", //light
      style: "normal",
    },
    {
      path: "../UncutSans-LightItalic.woff2",
      weight: "300", //light italic
      style: "italic",
    },
    {
      path: "../UncutSans-Book.woff2",
      weight: "350", //book
      style: "normal",
    },
    {
      path: "../UncutSans-BookItalic.woff2",
      weight: "350", //book italic
      style: "italic",
    },
    {
      path: "../UncutSans-Regular.woff2",
      weight: "400", //regular
      style: "normal",
    },
    {
      path: "../UncutSans-RegularItalic.woff2",
      weight: "400", //regular italic
      style: "italic",
    },
    {
      path: "../UncutSans-Medium.woff2",
      weight: "500", //medium
      style: "normal",
    },
    {
      path: "../UncutSans-MediumItalic.woff2",
      weight: "500", //medium italic
      style: "italic",
    },
    {
      path: "../UncutSans-Semibold.woff2",
      weight: "600", //semibold
      style: "normal",
    },
    {
      path: "../UncutSans-SemiboldItalic.woff2",
      weight: "600", //semibold italic
      style: "italic",
    },
    {
      path: "../UncutSans-Bold.woff2",
      weight: "700", //bold
      style: "normal",
    },
    {
      path: "../UncutSans-BoldItalic.woff2",
      weight: "700", //bold italic
      style: "italic",
    },
  ],
  variable: "--font-uncut-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faisalm.vercel.app"),
  title: siteConfig.details.title,
  description: siteConfig.details.description,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: siteConfig.assets.favicon.light,
        type: "image/svg+xml",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: siteConfig.assets.favicon.dark,
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "/twitter-image.png",
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
      className={`${uncutSans.variable} ${inter.variable} ${jakartaSans.variable}`}
    >
      <body className="bg-primary text-secondary-400 font-inter">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 md:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
