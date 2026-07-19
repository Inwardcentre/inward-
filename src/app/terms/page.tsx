import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Inward Centre Inc.",
  description: "Terms of service for Inward Centre Inc. website and administrative booking.",
};

export default function TermsPage() {
  const lastUpdated = "July 17, 2026";

  return (
    <div className="max-w-[760px] mx-auto px-6 py-12 md:py-20 font-sans text-muted-text space-y-6">
      <div>
        <span className="text-xs font-bold text-ochre-accent uppercase tracking-wider">
          Legal Agreement
        </span>
        <h1 className="font-bold text-3xl md:text-4xl text-dark-green mt-2 mb-4">
          Terms of Service
        </h1>
        <p className="text-xs">
          Last Updated: <span className="font-semibold text-dark-green">{lastUpdated}</span>
        </p>
      </div>

      <div className="border-t border-muted-border/40 pt-6 space-y-6 text-sm md:text-base leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bold text-lg text-primary-forest">1. Agreement to Terms</h2>
          <p>
            By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-lg text-primary-forest">2. Administrative Services</h2>
          <p>
            The services offered on this public website include booking administrative onboarding calls and obtaining information about the Inward platform. Booking a call does not establish a therapist-client relationship. Onboarding staff are administrative and cannot provide clinical advice, therapy, or diagnosis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-lg text-primary-forest">3. Use Boundaries</h2>
          <p>
            You agree to provide accurate, current, and complete information when booking onboarding calls. You agree not to submit any sensitive medical or clinical details on public forms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-lg text-primary-forest">4. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, icons, and software, is the property of {siteConfig.companyName} and is protected by Canadian and international copyright laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-lg text-primary-forest">5. Limitation of Liability</h2>
          <p>
            {siteConfig.companyName} provides this website on an "as is" and "as available" basis. We do not warrant that the website will be uninterrupted or error-free. To the maximum extent permitted by law, we disclaim all liability for damages arising out of your use of this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-lg text-primary-forest">6. Governing Law</h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of the Province of British Columbia and the federal laws of Canada applicable therein.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-lg text-primary-forest">7. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href={`mailto:${siteConfig.businessEmail}`} className="underline hover:text-ochre-accent font-semibold">
              {siteConfig.businessEmail}
            </a>.
          </p>
        </section>
      </div>
      
      <div className="pt-6 border-t border-muted-border/30">
        <Link href="/" className="text-sm font-bold text-primary-forest hover:text-ochre-accent transition-colors">
          &larr; Back to Homepage
        </Link>
      </div>
    </div>
  );
}
