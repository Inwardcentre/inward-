"use client";

import { useState, useEffect, Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site-config";
import {
  countries,
  countryNameFor,
  regionLabelFor,
  regionNameFor,
  regionsForCountry,
} from "@/lib/location-options";

type BookingStage = "location" | "waitlist" | "waitlist-complete" | "booking";

function BookingContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [stage, setStage] = useState<BookingStage>("location");
  const [countryCode, setCountryCode] = useState("");
  const [region, setRegion] = useState("");
  const [locationError, setLocationError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [waitlistError, setWaitlistError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // We read the booking URL from our config file, which handles the environment variable
  const bookingUrl = siteConfig.bookingUrl;

  useEffect(() => {
    // Basic timeout for loading state
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simple Add to Calendar links generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Inward Onboarding Call");
    const details = encodeURIComponent(
      "20-minute administrative onboarding call with Inward.\n\nNote: This call is administrative for general information and process explanation. It is not therapy or clinical advice."
    );
    // Set tentative time 24h from now
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    const endTomorrow = new Date(tomorrow.getTime() + 20 * 60 * 1000);
    
    const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const dates = `${formatTime(tomorrow)}/${formatTime(endTomorrow)}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`;
  };

  const country = countryNameFor(countryCode);
  const isEligibleToBook = countryCode === "CA" && region === "BC";
  const regionOptions = regionsForCountry(countryCode);

  const handleLocationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!countryCode || !region) {
      setLocationError("Choose your country and province, state, or region to continue.");
      return;
    }

    setLocationError("");
    setStage(isEligibleToBook ? "booking" : "waitlist");
  };

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaitlistError("");

    if (!consent) {
      setWaitlistError("Please confirm that we may contact you about availability.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          countryCode,
          country,
          region: regionOptions ? regionNameFor(countryCode, region) : region,
          consent,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setWaitlistError(result.error ?? "We could not save your request. Please try again.");
        return;
      }

      setStage("waitlist-complete");
    } catch {
      setWaitlistError("We could not save your request. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // RENDER BOOKING CONFIRMATION STATE
  if (status === "success") {
    return (
      <div className="max-w-[620px] mx-auto px-6 py-16 md:py-24 text-center">
        <div className="w-16 h-16 bg-ochre-accent/10 text-ochre-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="font-sans font-bold text-3xl text-dark-green leading-tight mb-4">
          Your call is booked.
        </h1>
        
        <p className="font-sans text-base leading-relaxed text-muted-text mb-8">
          We will send the meeting details to your email. The onboarding call is administrative and is not a therapy session or clinical consultation.
        </p>

        <div className="bg-light-card border border-muted-border/60 rounded-2xl p-6 mb-8 text-left space-y-4">
          <h3 className="font-sans font-bold text-sm text-primary-forest uppercase tracking-wider">
            Next steps
          </h3>
          <p className="text-sm text-muted-text leading-relaxed">
            1. Check your inbox for the calendar invite and confirmation email.
          </p>
          <p className="text-sm text-muted-text leading-relaxed">
            2. At the scheduled time, click the video link or answer the call using the details provided.
          </p>
          <p className="text-sm text-muted-text leading-relaxed">
            3. After our conversation, we will send you a secure private link to complete your check-in.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-forest text-warm-cream font-sans font-bold text-sm tracking-wide transition-all hover:bg-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent w-full sm:w-auto"
          >
            Add to Google Calendar
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary-forest text-primary-forest font-sans font-bold text-sm tracking-wide transition-all hover:bg-primary-forest/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent w-full sm:w-auto"
          >
            Return to Homepage
          </Link>
        </div>

        <p className="text-xs text-muted-text opacity-80 mt-10">
          Questions or need to reschedule? Email us at{" "}
          <a href={`mailto:${siteConfig.businessEmail}`} className="underline hover:text-ochre-accent">
            {siteConfig.businessEmail}
          </a>
        </p>
      </div>
    );
  }

  if (stage === "location") {
    return (
      <div className="max-w-[620px] mx-auto px-6 py-16 md:py-24">
        <div className="bg-light-card border border-muted-border/80 rounded-2xl p-6 md:p-10 shadow-sm">
          <span className="inline-flex px-3 py-1.5 rounded-full bg-primary-forest/5 border border-primary-forest/15 text-primary-forest text-xs font-semibold tracking-wide uppercase mb-6">
            Availability check
          </span>
          <h1 className="font-sans font-bold text-3xl md:text-4xl text-dark-green leading-tight mb-4">
            Where are you located?
          </h1>
          <p className="font-sans text-base leading-relaxed text-muted-text mb-8">
            Inward is currently available in British Columbia, Canada. Tell us where you are and we will take you to booking or help you join the waitlist.
          </p>

          <form onSubmit={handleLocationSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="country" className="block text-sm font-bold text-primary-forest mb-2">
                Country
              </label>
              <select
                id="country"
                value={countryCode}
                onChange={(event) => {
                  setCountryCode(event.target.value);
                  setRegion("");
                }}
                className="w-full rounded-xl border border-muted-border bg-warm-cream px-4 py-3 text-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
                required
              >
                <option value="">Select your country</option>
                {countries.map((item) => (
                  <option key={item.code} value={item.code}>{item.name}</option>
                ))}
              </select>
            </div>

            {regionOptions ? (
              <div>
                <label htmlFor="region" className="block text-sm font-bold text-primary-forest mb-2">
                  {regionLabelFor(countryCode)}
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  className="w-full rounded-xl border border-muted-border bg-warm-cream px-4 py-3 text-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
                  required
                >
                  <option value="">Select your {regionLabelFor(countryCode).toLowerCase()}</option>
                  {regionOptions.map((item) => (
                    <option key={item.code} value={item.code}>{item.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label htmlFor="region" className="block text-sm font-bold text-primary-forest mb-2">
                  State, province, or region
                </label>
                <input
                  id="region"
                  type="text"
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  className="w-full rounded-xl border border-muted-border bg-warm-cream px-4 py-3 text-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
                  autoComplete="address-level1"
                  maxLength={120}
                  required
                />
              </div>
            )}

            {locationError && <p className="text-sm text-red-700" role="alert">{locationError}</p>}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center px-6 py-3.5 rounded-full bg-primary-forest text-warm-cream font-sans font-bold text-sm tracking-wide transition-all hover:bg-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (stage === "waitlist") {
    const selectedRegion = regionOptions ? regionNameFor(countryCode, region) : region;

    return (
      <div className="max-w-[620px] mx-auto px-6 py-16 md:py-24">
        <div className="bg-light-card border border-muted-border/80 rounded-2xl p-6 md:p-10 shadow-sm">
          <span className="inline-flex px-3 py-1.5 rounded-full bg-ochre-accent/10 text-ochre-accent text-xs font-semibold tracking-wide uppercase mb-6">
            Join the waitlist
          </span>
          <h1 className="font-sans font-bold text-3xl md:text-4xl text-dark-green leading-tight mb-4">
            We are not booking in {selectedRegion} yet.
          </h1>
          <p className="font-sans text-base leading-relaxed text-muted-text mb-8">
            Leave your details and we will contact you when Inward becomes available in {selectedRegion}, {country}.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-primary-forest mb-2">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-muted-border bg-warm-cream px-4 py-3 text-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
                autoComplete="name"
                maxLength={120}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-primary-forest mb-2">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-muted-border bg-warm-cream px-4 py-3 text-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-text cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-muted-border text-primary-forest focus:ring-ochre-accent"
                required
              />
              <span>I agree that Inward may email me when services become available in my region. I can withdraw my consent at any time.</span>
            </label>
            <p className="text-xs leading-relaxed text-muted-text">
              Please do not include health or other sensitive information. Read our <Link href="/privacy" className="underline hover:text-ochre-accent">Privacy Policy</Link>.
            </p>

            {waitlistError && <p className="text-sm text-red-700" role="alert">{waitlistError}</p>}

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => setStage("location")}
                className="inline-flex flex-1 items-center justify-center px-5 py-3 rounded-full border border-primary-forest text-primary-forest font-sans font-bold text-sm hover:bg-primary-forest/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
              >
                Change location
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex flex-1 items-center justify-center px-5 py-3 rounded-full bg-primary-forest text-warm-cream font-sans font-bold text-sm transition-all hover:bg-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Joining waitlist…" : "Join the waitlist"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (stage === "waitlist-complete") {
    return (
      <div className="max-w-[620px] mx-auto px-6 py-16 md:py-24 text-center">
        <div className="w-16 h-16 bg-ochre-accent/10 text-ochre-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-sans font-bold text-3xl text-dark-green leading-tight mb-4">You are on the waitlist.</h1>
        <p className="font-sans text-base leading-relaxed text-muted-text mb-8">
          We will email you when Inward becomes available in {regionOptions ? regionNameFor(countryCode, region) : region}, {country}.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary-forest text-primary-forest font-sans font-bold text-sm tracking-wide transition-all hover:bg-primary-forest/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  // RENDER BOOKING FORM/EMBED PAGE
  return (
    <div className="max-w-[1180px] mx-auto px-6 py-12 md:py-20">
      
      {/* Hero Section */}
      <div className="max-w-[760px] mb-12 md:mb-16">
        <h1 className="font-sans font-bold text-3xl md:text-4xl text-dark-green leading-tight mb-4">
          Start with a short conversation.
        </h1>
        <p className="font-sans text-base md:text-lg leading-relaxed text-muted-text">
          Book a 20-minute call with a member of our onboarding team. We will explain the process, answer practical questions and help organize the next step.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Information */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Cover Info */}
          <div className="bg-light-card border border-muted-border/60 rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="font-sans font-bold text-lg text-primary-forest border-b border-muted-border/30 pb-2">
              What we can cover
            </h2>
            <ul className="space-y-3 font-sans text-sm md:text-base text-muted-text">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                How Inward Mental Check-Up works
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                Current availability
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                Extended Insurance coverage
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                What happens after the call
              </li>
            </ul>
          </div>

          {/* Not Info */}
          <div className="bg-primary-forest/5 border border-primary-forest/10 rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="font-sans font-bold text-lg text-primary-forest border-b border-primary-forest/10 pb-2">
              What this call is not
            </h2>
            <ul className="space-y-3 font-sans text-sm md:text-base text-muted-text">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-forest/40 mt-2 flex-shrink-0" />
                Therapy
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-forest/40 mt-2 flex-shrink-0" />
                Diagnosis
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-forest/40 mt-2 flex-shrink-0" />
                Clinical advice
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-forest/40 mt-2 flex-shrink-0" />
                Crisis support
              </li>

            </ul>
          </div>

          <div className="text-xs font-sans text-muted-text space-y-2 opacity-95">
            <p className="font-bold">Privacy Note:</p>
            <p>
              Please do not include detailed medical or mental-health histories in the booking forms. If a short optional text field is provided, please use it only for practical questions or administrative parameters.
            </p>
          </div>

        </div>

        {/* Right Column: Scheduling Embed */}
        <div className="lg:col-span-7 bg-light-card border border-muted-border/80 rounded-2xl p-4 md:p-6 shadow-sm min-h-[500px] flex flex-col">
          
          

          {isLoading && (
            <div className="flex-grow flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 border-4 border-muted-border border-t-ochre-accent rounded-full animate-spin" />
              <p className="font-sans text-sm text-muted-text">Connecting to secure scheduling service...</p>
            </div>
          )}

          {!isLoading && !iframeError && bookingUrl && (
            <div className="flex-grow flex flex-col">
              {/* Optional inline embed */}
              <iframe
                src={bookingUrl}
                title="Schedule Onboarding Call"
                className="w-full flex-grow border-0 rounded-lg min-h-[480px] bg-transparent"
                onError={() => setIframeError(true)}
              />
              
              <div className="mt-4 pt-4 border-t border-muted-border/30 text-center">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-sans font-bold text-primary-forest hover:text-ochre-accent transition-colors"
                >
                  Trouble viewing? Open scheduling in a new window
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {(!bookingUrl || iframeError) && !isLoading && (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-6">
              <div className="w-12 h-12 bg-ochre-accent/10 text-ochre-accent rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-primary-forest mb-2">
                  Scheduling is currently offline
                </h3>
                <p className="font-sans text-sm text-muted-text leading-relaxed max-w-[360px]">
                  We cannot connect to our external scheduling provider. Please try loading the page again or book by contacting us directly.
                </p>
              </div>
              <a
                href={`mailto:${siteConfig.businessEmail}?subject=Book%20an%20Onboarding%20Call`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-forest text-warm-cream font-sans font-bold text-sm tracking-wide transition-all hover:bg-dark-green focus-visible:outline-none"
              >
                Contact us via Email
              </a>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1180px] mx-auto px-6 py-20 text-center">
          <div className="w-10 h-10 border-4 border-muted-border border-t-ochre-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-sm text-muted-text">Loading...</p>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
