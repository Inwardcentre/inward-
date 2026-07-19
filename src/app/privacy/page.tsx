import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = {
  title: "Privacy | Inward Centre Inc.",
  description: "Privacy policy for Inward Centre Inc. website, onboarding, and administrative communications.",
};

// INTERNAL REVIEW COMPLIANCE:
// NOTE: This privacy policy requires final review once vendors (hosting, clinic management, assessment provider) are finalized.
// Currently contains placeholders for confirmed data processors.

export default function PrivacyPage() {
  const lastUpdated = "July 17, 2026";

  return (
    <div className="max-w-[1180px] mx-auto px-6 py-12 md:py-20">
      
      {/* Title */}
      <div className="max-w-[760px] border-b border-muted-border/40 pb-6 mb-12">
        <span className="text-xs font-sans font-bold text-ochre-accent uppercase tracking-wider">
          Legal & Compliance
        </span>
        <h1 className="font-sans font-bold text-3xl md:text-4xl text-dark-green mt-2 mb-4">
          Privacy Policy
        </h1>
        <p className="font-sans text-sm text-muted-text">
          Last Updated: <span className="font-semibold">{lastUpdated}</span>
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Navigation Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-28 self-start">
          <nav className="flex flex-col gap-3 font-sans text-sm text-muted-text border-l border-muted-border/60 pl-4">
            <a href="#who-we-are" className="hover:text-primary-forest transition-colors">1. Who we are</a>
            <a href="#scope" className="hover:text-primary-forest transition-colors">2. Scope of this policy</a>
            <a href="#collected" className="hover:text-primary-forest transition-colors">3. Information collected</a>
            <a href="#not-collected" className="hover:text-primary-forest transition-colors font-semibold text-primary-forest">4. Information NOT collected</a>
            <a href="#why-collected" className="hover:text-primary-forest transition-colors">5. Why information is collected</a>
            <a href="#service-providers" className="hover:text-primary-forest transition-colors">6. Service providers</a>
            <a href="#consent" className="hover:text-primary-forest transition-colors">7. Consent and choices</a>
            <a href="#safeguards" className="hover:text-primary-forest transition-colors">8. Safeguards</a>
            <a href="#retention" className="hover:text-primary-forest transition-colors">9. Retention</a>
            <a href="#access-requests" className="hover:text-primary-forest transition-colors">10. Access and correction</a>
            <a href="#cookies" className="hover:text-primary-forest transition-colors">11. Cookies and analytics</a>
            <a href="#contact" className="hover:text-primary-forest transition-colors">12. Contact details</a>
            <a href="#updates" className="hover:text-primary-forest transition-colors">13. Policy updates</a>
          </nav>
        </aside>

        {/* Policy Body */}
        <div className="lg:col-span-8 max-w-[680px] font-sans text-sm md:text-base leading-relaxed text-muted-text space-y-8">
          
          <div className="bg-primary-forest/5 border border-primary-forest/10 rounded-2xl p-6 mb-8 text-xs md:text-sm">
            <p className="font-bold text-primary-forest mb-2">Attention Reader:</p>
            <p>
              This policy is designed to maintain high standards of transparency regarding how administrative and technical information is managed by {siteConfig.companyName}.
            </p>
          </div>

          {/* Section 1 */}
          <section id="who-we-are" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              1. Who we are
            </h2>
            <p>
              Inward is operated by <span className="font-semibold text-dark-green">{siteConfig.companyName}</span>, a registered company based in British Columbia, Canada. We offer private, structured mental-health check-ins via virtual services.
            </p>
          </section>

          {/* Section 2 */}
          <section id="scope" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              2. Scope of this policy
            </h2>
            <p>
              This Privacy Policy explains how we collect, use, and store information through our public marketing website, external booking integrations, and subsequent administrative onboarding workflows.
            </p>
            <p className="font-medium text-dark-green">
              Important: Separate professional privacy, confidentiality, and recordkeeping regulations (such as health records acts) apply when clinical services are delivered by a registered health professional. Those standards will be outlined in a separate clinical consent and client service agreement prior to commencing clinical reviews.
            </p>
          </section>

          {/* Section 3 */}
          <section id="collected" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              3. Information collected on the public website
            </h2>
            <p>
              When you browse our website or schedule an administrative onboarding call, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Contact details (first and last name, email address, phone number).</li>
              <li>Administrative preferences (province, suggested call times).</li>
              <li>Inbound interest categories (e.g., questions regarding availability, pricing, or practitioner status).</li>
              <li>Technical security logs (IP addresses, user agent, browser types) automatically stored for server security and optimization purposes.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="not-collected" className="bg-light-card border border-muted-border/80 rounded-2xl p-6 space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-ochre-accent">
              4. Information not collected by this website
            </h2>
            <p className="text-dark-green font-medium">
              We strongly guard client boundaries. This public marketing website and booking portal are explicitly decoupled from the clinical process.
            </p>
            <p className="font-bold text-primary-forest">
              This website NEVER collects or stores:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-primary-forest/90">
              <li>Check-in assessment answers or questionnaires.</li>
              <li>Mental health results, scores, scales, or parameters.</li>
              <li>Clinical profiles or practitioner review notes.</li>
              <li>Detailed medical records or lists of medications.</li>
              <li>Insurance policy numbers or health card details.</li>
            </ul>
            <p className="text-xs">
              Check-ins are conducted privately using a secure, independent link generated manually by our administrative staff after your onboarding call.
            </p>
          </section>

          {/* Section 5 */}
          <section id="why-collected" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              5. Why information is collected
            </h2>
            <p>
              We collect public and administrative details solely for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Responding to inquiries submitted by visitors.</li>
              <li>Scheduling and facilitating administrative onboarding calls.</li>
              <li>Providing administrative communication (pricing changes, practitioner onboarding notices).</li>
              <li>Operating, checking, and securing the website.</li>
              <li>Meeting regulatory, compliance, and legal frameworks under Canadian law.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="service-providers" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              6. Service providers
            </h2>
            <p>
              To host the website and facilitate communications, we employ selected third-party processors. Vendors will only process information based on our direct instruction.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Hosting provider:</strong> [Vercel Hosting Platform] (Static files and API proxying)
              </li>
              <li>
                <strong>Booking provider:</strong> [Configured External Scheduling System] (Collection of administrative schedules)
              </li>
              <li>
                <strong>Email provider:</strong> [Secure Office Mail System] (Handling support and contact messages)
              </li>
              <li>
                <strong>Clinic-management provider:</strong> [Secure Canadian Electronic Medical Record System] (Management of client files post-onboarding)
              </li>
              <li>
                <strong>Assessment technology provider:</strong> [Secure Private Assessment Platform] (Delivering decoupled check-in linkages)
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="consent" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              7. Consent and choices
            </h2>
            <p>
              By submitting details on our booking form, you consent to administrative staff calling or emailing you regarding Inward. You can revoke your consent at any time by contacting our privacy officer.
            </p>
          </section>

          {/* Section 8 */}
          <section id="safeguards" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              8. Safeguards
            </h2>
            <p>
              We use appropriate physical, administrative, and technological security controls (such as secure socket layer encryption and restricted access controls) to protect your contact information. However, no data transmission over the internet can be guaranteed as completely secure. We limit information exchange to the absolute minimum necessary.
            </p>
          </section>

          {/* Section 9 */}
          <section id="retention" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              9. Retention
            </h2>
            <p>
              Contact details from visitors who book calls but decide not to proceed with Inward are deleted from our administrative files within twelve (12) months, unless a legal obligation requires us to retain them.
            </p>
          </section>

          {/* Section 10 */}
          <section id="access-requests" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              10. Access and correction requests
            </h2>
            <p>
              You have the right to request access to the contact details we hold about you and request corrections if they are inaccurate. Please submit access requests to the privacy email listed below.
            </p>
          </section>

          {/* Section 11 */}
          <section id="cookies" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              11. Cookies and analytics
            </h2>
            <p>
              We believe in a tracking-free browsing experience. At launch:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>We do not write or use advertising tracking cookies.</li>
              <li>We do not deploy Meta Pixel (Facebook), TikTok Pixel, or any other social retargeting tools.</li>
              <li>We do not use session-recording software or hot-spot heatmaps.</li>
              <li>We prefer no analytics. If analytics are added later, we will use only privacy-respecting, cookie-light options, and we will update this policy first.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section id="contact" className="space-y-3">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              12. Contact details
            </h2>
            <p>
              For privacy concerns or access requests:
            </p>
            <p className="mt-2 font-medium">
              Privacy Officer Email:{" "}
              <a href={`mailto:${siteConfig.privacyEmail}`} className="underline text-ochre-accent">
                {siteConfig.privacyEmail}
              </a>
            </p>
            <p>
              General Business Email:{" "}
              <a href={`mailto:${siteConfig.businessEmail}`} className="underline hover:text-ochre-accent">
                {siteConfig.businessEmail}
              </a>
            </p>
          </section>

          {/* Section 13 */}
          <section id="updates" className="space-y-3 pb-8">
            <h2 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              13. Policy updates
            </h2>
            <p>
              We may update this policy periodically to align with services, vendor changes, or provincial privacy regulations in British Columbia. Updates take effect immediately upon publication.
            </p>
          </section>

        </div>

      </div>

    </div>
  );
}
