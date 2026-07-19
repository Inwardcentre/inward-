import { SVGProps } from "react";

export function StressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Pressure/Tension indicator */}
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83" />
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M12 12l2.5 -3" stroke="#C57A39" strokeWidth="2.5" />
    </svg>
  );
}

export function MoodIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Balanced emotional waves */}
      <path d="M2 10c3-3 3-3 6 0s3 3 6 0 3-3 6 0" />
      <path d="M2 14c3-3 3-3 6 0s3 3 6 0 3-3 6 0" opacity="0.6" />
      <path d="M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="#C57A39" stroke="none" />
    </svg>
  );
}

export function SleepIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Crescent moon with a small ochre star */}
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="M19 3l.5 1 .5-.5-.5-.5z" fill="#C57A39" stroke="none" />
      <path d="M17 6l1 1.5 1.5-1-1-1.5z" fill="#C57A39" stroke="none" />
    </svg>
  );
}

export function FocusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Target with center point */}
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="#C57A39" stroke="none" />
    </svg>
  );
}

export function RelationshipsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Intertwined/overlapping connection circles */}
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
      <path d="M12 10a3 3 0 0 0 0 4" stroke="#C57A39" strokeWidth="2.5" />
    </svg>
  );
}

export function PatternsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Interconnected patterns / infinity-like loop */}
      <path d="M22 12c0 3-2.5 5-5.5 5S12 14.5 12 12s-1.5-5-4.5-5S2 9 2 12s2.5 5 5.5 5S12 14.5 12 12s1.5-5 4.5-5 5.5 2 5.5 5Z" />
      <circle cx="12" cy="12" r="1.5" fill="#C57A39" stroke="none" />
    </svg>
  );
}
