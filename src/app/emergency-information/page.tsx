import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Information | Inward Centre Inc.",
  description: "Immediate crisis resources and emergency contacts for British Columbia, Canada.",
};

export default function EmergencyPage() {
  return (
    <div className="max-w-[760px] mx-auto px-6 py-12 md:py-20 font-sans text-muted-text space-y-8">
      
      {/* Alert Header */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3 text-red-700">
          <svg className="w-8 h-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="font-bold text-2xl md:text-3xl">
            Are you in immediate danger?
          </h1>
        </div>
        <p className="text-sm md:text-base leading-relaxed text-red-900 font-medium">
          Inward is an administrative onboarding website and scheduled check-in service. 
          <strong> We do not provide crisis intervention, immediate response, or emergency medical services.</strong>
        </p>
        <p className="text-sm md:text-base text-red-900">
          If you are in distress, having thoughts of suicide, or feel you may harm yourself or others:
        </p>
        <div className="pt-2">
          <a
            href="tel:911"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-red-700 hover:bg-red-800 text-white font-bold text-base transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-700"
          >
            Call 911 Immediately
          </a>
        </div>
      </div>

      {/* BC Crisis Resources */}
      <div className="space-y-6">
        <h2 className="font-sans font-bold text-xl md:text-2xl text-dark-green border-b border-muted-border/40 pb-2">
          British Columbia Crisis Services
        </h2>
        
        <p className="text-sm md:text-base leading-relaxed">
          The following support networks are available 24 hours a day, 7 days a week, and are free and confidential:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Card 1: Suicide Support */}
          <div className="bg-light-card border border-muted-border/60 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-base text-primary-forest">
              1-800-SUICIDE
            </h3>
            <p className="text-xs md:text-sm">
              If you or someone you know is having thoughts of suicide, call this line to connect with help.
            </p>
            <a
              href="tel:1-800-784-2433"
              className="inline-block text-sm font-bold text-ochre-accent hover:underline"
            >
              Call 1-800-784-2433
            </a>
          </div>

          {/* Card 2: Mental Health Support */}
          <div className="bg-light-card border border-muted-border/60 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-base text-primary-forest">
              310 Mental Health Support
            </h3>
            <p className="text-xs md:text-sm">
              Call for emotional support, information, and resources specific to mental health in BC.
            </p>
            <a
              href="tel:310-6789"
              className="inline-block text-sm font-bold text-ochre-accent hover:underline"
            >
              Call 310-6789 (No area code needed)
            </a>
          </div>

          {/* Card 3: 988 Suicide Crisis Helpline */}
          <div className="bg-light-card border border-muted-border/60 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-base text-primary-forest">
              988 Suicide Crisis Helpline
            </h3>
            <p className="text-xs md:text-sm">
              National helpline available across Canada via call or text for immediate support.
            </p>
            <a
              href="tel:988"
              className="inline-block text-sm font-bold text-ochre-accent hover:underline mr-4"
            >
              Call 988
            </a>
            <span className="text-xs text-muted-text">or text 988</span>
          </div>

          {/* Card 4: KUU-US Indigenous Crisis Line */}
          <div className="bg-light-card border border-muted-border/60 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-base text-primary-forest">
              KUU-US Indigenous Crisis Line
            </h3>
            <p className="text-xs md:text-sm">
              Culturally safe crisis support for Indigenous peoples in British Columbia.
            </p>
            <a
              href="tel:1-800-588-8717"
              className="inline-block text-sm font-bold text-ochre-accent hover:underline"
            >
              Call 1-800-588-8717
            </a>
          </div>

        </div>
      </div>

      {/* Hospital directions */}
      <div className="space-y-4 pt-2">
        <h2 className="font-sans font-bold text-lg text-primary-forest">
          Local Hospital Emergency Rooms
        </h2>
        <p className="text-sm md:text-base leading-relaxed">
          If you are experiencing a mental health emergency, you can also present yourself to the nearest hospital Emergency Department. Administrative staff at hospitals can connect you to the psychiatric response team on duty.
        </p>
      </div>

      <div className="pt-6 border-t border-muted-border/30">
        <Link href="/" className="text-sm font-bold text-primary-forest hover:text-ochre-accent transition-colors">
          &larr; Back to Homepage
        </Link>
      </div>

    </div>
  );
}
