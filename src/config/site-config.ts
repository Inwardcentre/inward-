export type ServiceStatus = 'prelaunch' | 'live';

export interface SiteConfig {
  companyName: string;
  brandName: string;
  serviceStatus: ServiceStatus;
  bookingUrl: string;
  businessEmail: string;
  privacyEmail: string;
  showInsuranceSection: boolean;
  showDirectBilling: boolean;
  showFees: boolean;
  showTeam: boolean;
  provinceAvailability: string[];
}

export const siteConfig: SiteConfig = {
  companyName: 'INWARD CENTRE INC.',
  brandName: 'Inward',
  serviceStatus: 'live', // 'prelaunch' or 'live'
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || 'https://booking.inwardcentre.ca', // Fallback URL
  businessEmail: 'connect@inwardcentre.ca',
  privacyEmail: 'privacy@inwardcentre.ca',
  showInsuranceSection: false,
  showDirectBilling: false,
  showFees: false,
  showTeam: false,
  provinceAvailability: ['British Columbia'],
};
