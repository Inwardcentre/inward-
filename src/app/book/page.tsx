"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site-config";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");

  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

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
                How Inward works
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                Current availability
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                Pricing
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                General insurance questions
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                What happens after the call
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent mt-2 flex-shrink-0" />
                How the private link works
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
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-forest/40 mt-2 flex-shrink-0" />
                Insurance coverage confirmation
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
          
          <div className="mb-4 border-b border-muted-border/30 pb-4 flex justify-between items-center">
            <span className="text-xs font-sans font-bold text-primary-forest uppercase tracking-wider">
              Onboarding Scheduler
            </span>
            <button
              onClick={() => router.push("/book?status=success")}
              className="text-xs font-sans font-medium text-ochre-accent hover:underline focus-visible:outline-none"
              type="button"
            >
              [Simulate Success]
            </button>
          </div>

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
