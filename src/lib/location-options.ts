type RegionOption = {
  code: string;
  name: string;
};

export const canadianRegions: readonly RegionOption[] = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
];

const unitedStatesRegions: readonly RegionOption[] = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" },
  { code: "AS", name: "American Samoa" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" }, { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
  { code: "GU", name: "Guam" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" }, { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" }, { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" }, { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" }, { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" }, { code: "MP", name: "Northern Mariana Islands" },
  { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "PR", name: "Puerto Rico" }, { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" }, { code: "VT", name: "Vermont" },
  { code: "VI", name: "U.S. Virgin Islands" }, { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];

const australianRegions: readonly RegionOption[] = [
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NSW", name: "New South Wales" },
  { code: "NT", name: "Northern Territory" },
  { code: "QLD", name: "Queensland" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "VIC", name: "Victoria" },
  { code: "WA", name: "Western Australia" },
];

const unitedKingdomRegions: readonly RegionOption[] = [
  { code: "ENG", name: "England" },
  { code: "NIR", name: "Northern Ireland" },
  { code: "SCT", name: "Scotland" },
  { code: "WLS", name: "Wales" },
];

const newZealandRegions: readonly RegionOption[] = [
  { code: "AUK", name: "Auckland" }, { code: "BOP", name: "Bay of Plenty" },
  { code: "CAN", name: "Canterbury" }, { code: "CIT", name: "Chatham Islands" },
  { code: "GIS", name: "Gisborne" }, { code: "HKB", name: "Hawke's Bay" },
  { code: "MBH", name: "Marlborough" }, { code: "MWT", name: "Manawatū-Whanganui" },
  { code: "NSN", name: "Nelson" }, { code: "NTL", name: "Northland" },
  { code: "OTA", name: "Otago" }, { code: "STL", name: "Southland" },
  { code: "TAS", name: "Tasman" }, { code: "TKI", name: "Taranaki" },
  { code: "WGN", name: "Wellington" }, { code: "WKO", name: "Waikato" },
  { code: "WTC", name: "West Coast" },
];

const regionsByCountry: Record<string, readonly RegionOption[]> = {
  AU: australianRegions,
  CA: canadianRegions,
  GB: unitedKingdomRegions,
  NZ: newZealandRegions,
  US: unitedStatesRegions,
};

const regionLabels: Record<string, string> = {
  AU: "State or territory",
  CA: "Province or territory",
  GB: "Nation",
  NZ: "Region",
  US: "State, district, or territory",
};

const countryCodes = `
AF AL DZ AS AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI
CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ
ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HU IS IN ID IR IQ IE IL IT JM JP JO
KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MG MW MY MV ML MT MH MR MU MX FM MD MC
MN ME MA MZ MM NA NR NP NL NZ NI NE NG MK NO OM PK PW PA PG PY PE PH PL PT QA RO RU RW
KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA SS ES LK SD SR SE CH SY TJ TZ TH TL
TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VA VE VN YE ZM ZW XK
`.trim().split(/\s+/);

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export const countries = countryCodes
  .map((code) => ({ code, name: regionNames.of(code) ?? code }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function countryNameFor(code: string) {
  return countries.find((country) => country.code === code)?.name ?? code;
}

export function regionsForCountry(code: string) {
  return regionsByCountry[code] ?? null;
}

export function regionNameFor(countryCode: string, regionCode: string) {
  return regionsForCountry(countryCode)?.find((region) => region.code === regionCode)?.name ?? regionCode;
}

export function regionLabelFor(countryCode: string) {
  return regionLabels[countryCode] ?? "State, province, or region";
}
