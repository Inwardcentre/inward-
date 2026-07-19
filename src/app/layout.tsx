import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inward | A Private Mental Health Check-In",
    template: "%s | Inward",
  },
  description: "A private, structured way to check in with your mental health, understand connected patterns and find a clearer next step.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://inwardcentre.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Inward | A Private Mental Health Check-In",
    description: "A private, structured way to check in with your mental health, understand connected patterns and find a clearer next step.",
    url: "/",
    siteName: "Inward",
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-cream text-dark-green selection:bg-ochre-accent/20 selection:text-dark-green">
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
