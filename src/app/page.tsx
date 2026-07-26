import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site-config";
import Accordion from "@/components/Accordion";
import ScrollReveal from "@/components/ScrollReveal";
import {
  StressIcon,
  MoodIcon,
  SleepIcon,
  FocusIcon,
  RelationshipsIcon,
  PatternsIcon,
} from "@/components/icons/Icons";

export default function Home() {
  // Connected Areas list
  const connectedAreas = [
    {
      title: "Stress and overwhelm",
      description: "Understand where pressure may be building in daily life.",
      icon: StressIcon,
    },
    {
      title: "Mood and emotional wellbeing",
      description: "Notice emotional patterns that may be affecting how you feel and function.",
      icon: MoodIcon,
    },
    {
      title: "Sleep and energy",
      description: "Explore how rest, energy and mental wellbeing may be influencing each other.",
      icon: SleepIcon,
    },
    {
      title: "Focus and daily functioning",
      description: "Look at attention, organization and the demands of everyday responsibilities.",
      icon: FocusIcon,
    },
    {
      title: "Relationships and connection",
      description: "Consider how connection, communication and isolation may affect wellbeing.",
      icon: RelationshipsIcon,
    },
    {
      title: "Personal patterns and overall wellbeing",
      description: "Bring together recurring patterns, strengths, meaning and quality of life.",
      icon: PatternsIcon,
    },
  ];

  // Dynamic workflow description for Step 4
  const step4Description =
    siteConfig.serviceStatus === "prelaunch"
      ? "Our onboarding team will explain availability and the next steps as services become available."
      : "An assigned registered professional reviews the information, provides appropriate context and discusses the next step with you.";

  // Dynamic FAQ Question 5 Answer
  const faqQuestion5Answer =
    siteConfig.serviceStatus === "prelaunch"
      ? "Our onboarding team handles administrative setup only. We will explain professional availability and the next stage during your call."
      : "Your information is assigned to an eligible registered professional who is responsible for professional review, interpretation and the related service.";

  // Dynamic FAQ Question 7 Answer
  const faqQuestion7Answer = siteConfig.showInsuranceSection
    ? "Some services delivered by eligible registered practitioners may qualify under extended-health plans. Coverage depends on your insurer, plan and practitioner category and cannot be guaranteed."
    : "Insurance options will be explained during the onboarding call as services become available.";

  // FAQ items construction
  const faqItems = [
    {
      id: "first-call",
      question: "What happens during the first call?",
      answer: "A member of our onboarding team explains how Inward works, reviews practical details such as availability and fees, and helps organize the next step. The call is administrative and is not therapy, diagnosis or clinical advice.",
    },
    {
      id: "create-account",
      question: "Do I need to set up my account myself?",
      answer: "No. A client account is created as part of the onboarding process — our team handles the setup for you. Client records are required for insurance and regulatory purposes.",
    },
    {
      id: "is-therapy",
      question: "Is Inward therapy?",
      answer: "Inward provides a structured starting point for understanding your mental health and wellbeing. Any therapy, clinical interpretation or other professional service is delivered separately by an appropriately qualified practitioner within their professional scope.",
    },
    {
      id: "give-diagnosis",
      question: "Will this give me a diagnosis?",
      answer: "No diagnosis is automatically provided by completing the Inward check-in. A diagnosis can only be made by an appropriately qualified professional within the context of their professional service.",
    },
    {
      id: "who-reviews",
      question: "Who reviews my information?",
      answer: faqQuestion5Answer,
    },
    {
      id: "crisis-support",
      question: "Can I use Inward if I am in crisis?",
      answer: "Inward is not an emergency or crisis service. If you are in immediate danger, call 911 or go to the nearest emergency department.",
    },
    {
      id: "insurance-coverage",
      question: "Is the service covered by insurance?",
      answer: faqQuestion7Answer,
    },
    {
      id: "phone-friendly",
      question: "Can I complete the check-in on my phone?",
      answer: "Yes. The private check-in experience is designed to work on phones, tablets and computers.",
    },
  ];

  // Organization structured data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.companyName,
    "alternateName": siteConfig.brandName,
    "url": "https://inwardcentre.ca",
    "logo": "https://inwardcentre.ca/images/logo.png",
    "email": siteConfig.businessEmail,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "BC",
      "addressCountry": "CA"
    },
    "description": "A private, structured way to check in with your mental health, understand connected patterns and find a clearer next step."
  };

  return (
    <>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col w-full">
        
        {/* SECTION 1 — HERO */}
        <section className="relative overflow-hidden py-16 md:py-28 border-b border-muted-border/40 bg-gradient-to-b from-warm-cream to-light-card/40">
          {/* Decorative background orbs */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-ochre-accent/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-primary-forest/5 blur-3xl" />
          <div className="max-w-[1180px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left — Text Content */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <span className="animate-fade-up animate-fade-up-d1 inline-flex px-3 py-1.5 rounded-full bg-primary-forest/5 border border-primary-forest/15 text-primary-forest text-xs md:text-sm font-semibold tracking-wide uppercase mb-6">
                  A clearer place to begin
                </span>
                
                <h1 className="animate-fade-up animate-fade-up-d2 font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-dark-green leading-[1.08] tracking-tight mb-6">
                  Understand what&apos;s happening beneath the surface.
                </h1>
                
                <p className="animate-fade-up animate-fade-up-d3 font-sans text-lg md:text-xl leading-relaxed text-muted-text max-w-[660px] mb-8">
                  Inward offers a private, structured way to check in with your mental health, understand the patterns affecting your daily life, and find a clearer next step.
                </p>
                
                <div className="animate-fade-up animate-fade-up-d4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-4">
                  <Link
                    href="/book"
                    className="animate-pulse-glow inline-flex items-center justify-center px-8 py-4 rounded-full bg-ochre-accent text-white font-sans font-bold text-base tracking-wide shadow-sm hover:bg-ochre-accent/90 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-forest text-center"
                  >
                    Book a 20-minute onboarding call
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary-forest text-primary-forest font-sans font-bold text-base tracking-wide transition-all duration-300 hover:bg-primary-forest hover:text-warm-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent text-center"
                  >
                    See how it works
                  </Link>
                </div>

                <p className="animate-fade-up animate-fade-up-d4 text-sm font-sans text-muted-text opacity-85 leading-relaxed max-w-[620px] mb-8">
                  The first call is handled by our onboarding team. It is for general information and next-step planning, not therapy or clinical advice.
                </p>

                {/* Trust signals */}
                <div className="animate-fade-up animate-fade-up-d5 border-t border-muted-border/60 pt-6 w-full flex flex-wrap gap-x-8 gap-y-3 text-sm font-sans font-semibold text-primary-forest/90">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent" />
                    Private
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent" />
                    Virtual
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ochre-accent" />
                    Eligible for extended insurance coverage*
                  </div>
                </div>
              </div>

              {/* Right — Hero Visual */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="animate-float relative w-full max-w-[440px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-muted-border/30">
                  <Image
                    src="/hero.png"
                    alt="A person sitting peacefully by a window, reflecting with calm and clarity"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 440px"
                  />
                  {/* Soft overlay gradient for blending with page */}
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-cream/20 via-transparent to-transparent" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2 — PROACTIVE POSITIONING */}
        <section className="relative overflow-hidden py-20 bg-light-card/40 border-b border-muted-border/30">
          <div className="pointer-events-none absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-warm-cream blur-2xl opacity-60" />
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal className="lg:col-span-7 max-w-[660px]">
                <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-dark-green leading-tight mb-6">
                  You don&apos;t have to wait for a crisis to check in with your mind.
                </h2>
                <div className="font-sans text-lg leading-relaxed text-muted-text space-y-4">
                  <p>
                    Mental health changes gradually. Stress, sleep, mood, focus, relationships and daily responsibilities can affect one another long before any single concern becomes impossible to ignore.
                  </p>
                  <p className="font-semibold text-primary-forest">
                    Inward provides a structured starting point for seeing the bigger picture.
                  </p>
                </div>
              </ScrollReveal>
              
              {/* Abstract Visual */}
              <ScrollReveal className="lg:col-span-5 flex justify-center" delay={200}>
                <div className="relative w-64 h-64 flex items-center justify-center bg-warm-cream/50 rounded-full border border-muted-border/80 shadow-inner">
                  {/* Decorative concentric rings */}
                  <div className="absolute inset-4 rounded-full border border-dashed border-muted-border/60" />
                  <div className="absolute inset-10 rounded-full border border-muted-border/40" />
                  
                  {/* Center logo motif — head/question/check symbol */}
                  <div className="relative z-10 w-[70px] h-[90px]">
                    <Image src="/inward-logo.png" alt="Inward logo" width={70} height={90} className="w-full h-full object-contain" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SECTION 3 — CONNECTED AREAS */}
        <section className="relative py-20 bg-warm-cream/30 border-b border-muted-border/30" style={{backgroundImage: 'radial-gradient(circle, rgba(197,122,57,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px'}}>
          <div className="max-w-[1180px] mx-auto px-6">
            <ScrollReveal className="max-w-[760px] mb-12">
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-dark-green leading-tight mb-4">
                Mental health rarely fits into one box.
              </h2>
              <p className="font-sans text-lg leading-relaxed text-muted-text">
                Different parts of life can interact in ways that are difficult to see when each concern is considered separately.
              </p>
            </ScrollReveal>
            
            {/* Grid of 6 connected areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <ScrollReveal
                    key={index}
                    delay={index * 100}
                    className="group bg-light-card border border-muted-border/60 hover:border-ochre-accent/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-forest/8 to-primary-forest/4 flex items-center justify-center text-primary-forest mb-4 group-hover:from-ochre-accent/15 group-hover:to-ochre-accent/8 group-hover:text-ochre-accent transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans font-bold text-base md:text-lg text-primary-forest mb-2">
                      {area.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-muted-text">
                      {area.description}
                    </p>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4 — HOW IT WORKS */}
        <section id="how-it-works" className="py-20 bg-light-card/20 border-b border-muted-border/30">
          <div className="max-w-[1180px] mx-auto px-6">
            <ScrollReveal className="max-w-[760px] mb-16">
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-dark-green leading-tight mb-4">
                A simple place to start.
              </h2>
              <p className="font-sans text-lg leading-relaxed text-muted-text">
                We make the process straightforward and transparent from the beginning.
              </p>
            </ScrollReveal>

            {/* Steps Timeline Grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Connector line (desktop only) */}
              <div className="hidden lg:block absolute top-[22px] left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-px bg-gradient-to-r from-transparent via-muted-border to-transparent" />
              
              {/* Step 1 */}
              <ScrollReveal delay={0} className="flex flex-col gap-4 relative">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-11 h-11 rounded-full bg-ochre-accent/10 border-2 border-ochre-accent/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-sans text-sm font-extrabold text-ochre-accent">01</span>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-lg text-primary-forest">
                  Talk with our onboarding team
                </h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-muted-text">
                  Book a short administrative call. We explain the process, pricing, availability and what to expect.
                </p>
              </ScrollReveal>

              {/* Step 2 */}
              <ScrollReveal delay={100} className="flex flex-col gap-4 relative">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-11 h-11 rounded-full bg-ochre-accent/10 border-2 border-ochre-accent/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-sans text-sm font-extrabold text-ochre-accent">02</span>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-lg text-primary-forest">
                  Get set up for your check-in
                </h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-muted-text">
                  If you decide to continue, we handle all the setup so you can begin your check-in with no extra steps.
                </p>
              </ScrollReveal>

              {/* Step 3 */}
              <ScrollReveal delay={200} className="flex flex-col gap-4 relative">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-11 h-11 rounded-full bg-ochre-accent/10 border-2 border-ochre-accent/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-sans text-sm font-extrabold text-ochre-accent">03</span>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-lg text-primary-forest">
                  Complete your mental-health check-in
                </h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-muted-text">
                  Work through the questions privately and at your own pace using your phone, tablet or computer.
                </p>
              </ScrollReveal>

              {/* Step 4 */}
              <ScrollReveal delay={300} className="flex flex-col gap-4 relative">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-11 h-11 rounded-full bg-primary-forest/10 border-2 border-primary-forest/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-sans text-sm font-extrabold text-primary-forest">04</span>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-lg text-primary-forest">
                  Move to the appropriate next step
                </h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-muted-text">
                  Your information is prepared for the next stage of the service. <span className="font-medium text-primary-forest">{step4Description}</span>
                </p>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* SECTION 5 — WHY INWARD */}
        <section className="py-20 bg-warm-cream/20 border-b border-muted-border/30">
          <div className="max-w-[1180px] mx-auto px-6">
            <ScrollReveal className="text-center max-w-[760px] mx-auto mb-16">
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-dark-green leading-tight mb-4">
                Clarity begins by looking at the whole picture.
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Block 1 — Structured */}
              <ScrollReveal delay={0} className="group relative bg-light-card border border-muted-border/50 rounded-2xl p-8 text-center flex flex-col items-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 rounded-full bg-ochre-accent/4 blur-2xl" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-ochre-accent/12 to-ochre-accent/6 flex items-center justify-center text-ochre-accent mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-lg text-primary-forest mb-3">Structured</h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-muted-text">
                  A guided process helps organize areas that can otherwise feel disconnected or difficult to explain.
                </p>
              </ScrollReveal>

              {/* Block 2 — Private */}
              <ScrollReveal delay={100} className="group relative bg-gradient-to-b from-primary-forest to-dark-green border border-primary-forest/80 rounded-2xl p-8 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="pointer-events-none absolute bottom-0 left-0 w-40 h-40 rounded-full bg-ochre-accent/10 blur-3xl" />
                <div className="relative w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-warm-cream mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-lg text-warm-cream mb-3">Private</h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-warm-cream/70">
                  Your check-in information is handled with discretion and kept separate from administrative records.
                </p>
              </ScrollReveal>

              {/* Block 3 — Practical */}
              <ScrollReveal delay={200} className="group relative bg-light-card border border-muted-border/50 rounded-2xl p-8 text-center flex flex-col items-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary-forest/4 blur-2xl" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-forest/10 to-primary-forest/5 flex items-center justify-center text-primary-forest mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-lg text-primary-forest mb-3">Practical</h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-muted-text">
                  The goal is to help make your next conversation or decision more informed and focused.
                </p>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* SECTION 6 — PRIVACY SUMMARY */}
        <section className="relative py-20 bg-light-card border-b border-muted-border/30 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, rgba(19,52,36,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
          <div className="pointer-events-none absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full bg-ochre-accent/5 blur-3xl" />
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <ScrollReveal className="lg:col-span-6 max-w-[560px]">
                <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-dark-green leading-tight mb-6">
                  Your privacy matters.
                </h2>
                <p className="font-sans text-base leading-relaxed text-muted-text mb-8">
                  Mental-health information deserves careful handling. Inward limits unnecessary data collection and treats your check-in information with discretion — keeping it separate from administrative records wherever possible.
                </p>
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-forest text-warm-cream font-sans font-bold text-sm tracking-wide transition-all hover:bg-dark-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre-accent"
                >
                  Read our privacy approach
                </Link>
              </ScrollReveal>
              
              <div className="lg:col-span-6">
                <div className="bg-warm-cream/30 border border-muted-border/60 rounded-2xl p-6 md:p-8 space-y-4">
                  <h4 className="font-sans font-bold text-sm text-primary-forest uppercase tracking-wider mb-2">
                    Privacy Controls
                  </h4>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-ochre-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans text-sm md:text-base text-muted-text">
                        Client accounts kept separate from check-in data
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-ochre-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans text-sm md:text-base text-muted-text">
                        No unnecessary data collection
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-ochre-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans text-sm md:text-base text-muted-text">
                        No advertising pixels on the check-in experience
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-ochre-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-sans text-sm md:text-base text-muted-text">
                        Information collected only for defined service purposes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — INSURANCE AND BENEFITS */}
        {siteConfig.showInsuranceSection && (
          <section className="py-20 bg-warm-cream/10 border-b border-muted-border/30">
            <div className="max-w-[1180px] mx-auto px-6">
              <div className="max-w-[760px] bg-light-card border border-muted-border/70 rounded-2xl p-8 md:p-10 shadow-sm mx-auto text-center">
                <h2 className="font-sans font-bold text-2xl md:text-3xl text-dark-green leading-tight mb-4">
                  Extended-health benefits
                </h2>
                <p className="font-sans text-sm md:text-base leading-relaxed text-muted-text mb-6">
                  Services delivered by an eligible registered practitioner may qualify for reimbursement under some extended-health plans. Eligibility depends on the insurer, the individual plan, the practitioner type and the service provided.
                </p>
                <p className="font-sans text-xs md:text-sm text-primary-forest font-semibold mb-6">
                  Coverage cannot be guaranteed. Clients should confirm their specific plan before proceeding.
                </p>
                {siteConfig.showDirectBilling && (
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-forest/5 text-primary-forest border border-primary-forest/10 text-xs font-sans font-bold uppercase tracking-wider">
                    Direct billing may be available for eligible plans and services.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 8 — FAQ */}
        <section className="py-20 bg-warm-cream/40 border-b border-muted-border/30">
          <div className="max-w-[760px] mx-auto px-6">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl text-dark-green leading-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-sans text-base md:text-lg leading-relaxed text-muted-text">
                General details about the onboarding process and the Inward platform.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={150}>
              <Accordion items={faqItems} />
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION 9 — FINAL CTA */}
        <section className="py-24 bg-light-card border-b border-muted-border/30 relative overflow-hidden">
          <ScrollReveal className="max-w-[760px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl text-dark-green leading-tight mb-5">
              Start with a short conversation.
            </h2>
            
            <p className="font-sans text-lg leading-relaxed text-muted-text mb-8 max-w-[620px]">
              Book a 20-minute call with our onboarding team to learn how Inward works and ask practical questions before deciding whether to continue.
            </p>
            
            <Link
              href="/book"
              className="animate-pulse-glow inline-flex items-center justify-center px-10 py-4.5 rounded-full bg-ochre-accent text-white font-sans font-bold text-lg tracking-wide shadow-md hover:bg-ochre-accent/90 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-forest mb-4 text-center"
            >
              Book an onboarding call
            </Link>
            
            <p className="text-sm font-sans text-muted-text opacity-90">
              No commitment. This is not a therapy or clinical consultation.
            </p>
          </ScrollReveal>
        </section>

        <section className="bg-warm-cream border-b border-muted-border/30 py-6">
          <div className="max-w-[1180px] mx-auto px-6">
            <p className="text-xs font-sans leading-relaxed text-muted-text">
              * Eligibility for extended insurance coverage and reimbursement depends on your insurer, individual plan, practitioner type, and the service provided. Coverage is not guaranteed.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
