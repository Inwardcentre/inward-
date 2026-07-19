import Link from "next/link";
import { InwardLogo } from "@/components/icons/InwardLogo";
import { siteConfig } from "@/config/site-config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-forest text-warm-cream/90 border-t border-muted-border/10 py-16">
      <div className="max-w-[1180px] mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-muted-border/10">
          
          {/* Logo & Legal Name */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent">
              <InwardLogo inverted />
            </Link>
            <div className="text-sm font-sans font-medium opacity-80 mt-2">
              <p className="font-bold">{siteConfig.companyName}</p>
              <p>{siteConfig.provinceAvailability.join(", ")}, Canada</p>
              <p className="mt-4">
                <span className="opacity-60">Email:</span>{" "}
                <a
                  href={`mailto:${siteConfig.businessEmail}`}
                  className="underline hover:text-ochre-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-accent"
                >
                  {siteConfig.businessEmail}
                </a>
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans font-bold text-sm text-ochre-accent uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm font-sans">
              <Link href="/" className="hover:text-ochre-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-accent">
                Home
              </Link>
              <Link href="/#how-it-works" className="hover:text-ochre-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-accent">
                How It Works
              </Link>
              <Link href="/privacy" className="hover:text-ochre-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-accent">
                Privacy Policy
              </Link>
              <Link href="/book" className="hover:text-ochre-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-accent">
                Book a Call
              </Link>
            </nav>
          </div>

          {/* Footer Only Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans font-bold text-sm text-ochre-accent uppercase tracking-wider">
              Information
            </h4>
            <nav className="flex flex-col gap-2.5 text-sm font-sans">
              <Link href="/terms" className="hover:text-ochre-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-accent">
                Terms of Service
              </Link>
              <Link href="/emergency-information" className="hover:text-ochre-accent transition-colors text-red-300 hover:text-red-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre-accent font-semibold">
                Emergency Information
              </Link>
            </nav>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-xs font-sans opacity-70">
            &copy; {currentYear} {siteConfig.companyName}. All rights reserved.
          </div>
          
          {/* Crisis Disclaimer */}
          <div className="bg-dark-green/40 border border-muted-border/10 rounded-xl p-4 max-w-[620px]">
            <p className="text-xs font-sans leading-relaxed text-red-200/90 font-medium">
              <strong className="text-white block mb-1">Crisis Notice:</strong>
              Inward is not an emergency or crisis service. If you are in immediate danger, call 911 or go to the nearest emergency department.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
