import Image from "next/image";

export interface PractitionerProps {
  photoUrl?: string;
  fullLegalName: string;
  designation: string;
  registrationBody: string;
  registrationNumber: string;
  province: string;
  shortBiography: string;
  areasOfProfessionalFocus: string[];
  virtualOrInPersonStatus: "Virtual Only" | "In-Person Only" | "Hybrid (Virtual & In-Person)";
}

export default function PractitionerCard({
  photoUrl,
  fullLegalName,
  designation,
  registrationBody,
  registrationNumber,
  province,
  shortBiography,
  areasOfProfessionalFocus,
  virtualOrInPersonStatus,
}: PractitionerProps) {
  return (
    <div className="bg-light-card border border-muted-border/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 max-w-3xl mx-auto">
      {/* Photo */}
      <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border border-muted-border/60 bg-warm-cream/50 flex-shrink-0 mx-auto md:mx-0">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={fullLegalName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
          />
        ) : (
          /* Premium fallback silhouette */
          <div className="w-full h-full flex items-center justify-center text-primary-forest opacity-40">
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-grow flex flex-col">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1.5 border-b border-muted-border/30 pb-3">
          <div>
            <h4 className="font-sans font-bold text-lg md:text-xl text-primary-forest">
              {fullLegalName}
            </h4>
            <p className="font-sans text-sm font-semibold text-ochre-accent">
              {designation}
            </p>
          </div>
          <div className="text-left md:text-right font-sans text-xs text-muted-text">
            <p className="font-semibold">{registrationBody}</p>
            <p>Registration No: {registrationNumber}</p>
            <p className="opacity-90">{province}, Canada</p>
          </div>
        </div>

        {/* Short Biography */}
        <p className="font-sans text-sm leading-relaxed text-muted-text mt-3">
          {shortBiography}
        </p>

        {/* Focus Areas and Status */}
        <div className="mt-4 pt-3 border-t border-muted-border/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {areasOfProfessionalFocus.map((focus) => (
              <span
                key={focus}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium bg-primary-forest/5 text-primary-forest border border-primary-forest/10"
              >
                {focus}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-bold bg-ochre-accent/10 text-ochre-accent">
            {virtualOrInPersonStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
