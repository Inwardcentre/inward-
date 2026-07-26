/**
 * Generates a two-sided, 3.5 x 2 in visit card for Inward Centre.
 *
 * Output:
 *   outputs/marketing/inward-centre-visit-cards/
 *
 * The QR deliberately encodes the production home page directly (not a
 * redirect), so the printed card remains useful without another service.
 */
import fs from 'node:fs';
import path from 'node:path';
import QRCode from 'qrcode';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, 'outputs', 'marketing', 'inward-centre-visit-cards');
const HOME_URL = 'https://inwardcentre.ca';
const TRIM = { width: 1050, height: 600 }; // 3.5 x 2 in at 300 DPI
const BLEED = 38; // 0.125 in at 300 DPI, rounded to a whole pixel
const PRINT = { width: TRIM.width + BLEED * 2, height: TRIM.height + BLEED * 2 };

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const inwardIconBuffer = await sharp(path.join(ROOT, 'assets', 'inward-centre', 'inward-logo.webp')).png().toBuffer();
const inwardIconHref = `data:image/png;base64,${inwardIconBuffer.toString('base64')}`;
const bodyMindCardBuffer = await sharp(path.join(ROOT, 'assets', 'inward-centre', 'body-mind-transparent.png'))
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .resize({ height: 415, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toBuffer();
const bodyMindCardHref = `data:image/png;base64,${bodyMindCardBuffer.toString('base64')}`;
const qrBuffer = await QRCode.toBuffer(HOME_URL, {
  errorCorrectionLevel: 'H',
  margin: 5,
  width: 720,
  color: { dark: '#073B3A', light: '#FFFDF8' },
});
const qrHref = `data:image/png;base64,${qrBuffer.toString('base64')}`;

function cardShell(content, background) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${TRIM.width}" height="${TRIM.height}" viewBox="0 0 ${TRIM.width} ${TRIM.height}">
  <title>Inward Centre Mental Health Check-Up Clinic visit card</title>
  <desc>A two-sided visit card that links directly to inwardcentre.ca through a high-contrast QR code.</desc>
  <rect width="${TRIM.width}" height="${TRIM.height}" fill="${background}"/>
  ${content}
</svg>`;
}

const front = cardShell(`
  <defs>
    <linearGradient id="frontBloom" x1="0" x2="1" y1="0.15" y2="0.9">
      <stop offset="0" stop-color="#E9D3BE" stop-opacity="0.82"/>
      <stop offset="1" stop-color="#F7F0E7" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="frontLine" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#D28A61"/>
      <stop offset="1" stop-color="#A7A68B"/>
    </linearGradient>
  </defs>
  <circle cx="955" cy="-40" r="315" fill="url(#frontBloom)"/>
  <circle cx="950" cy="-42" r="220" fill="none" stroke="#D28A61" stroke-width="1.2" opacity="0.36"/>
  <circle cx="950" cy="-42" r="164" fill="none" stroke="#0B4A48" stroke-width="1.2" opacity="0.20"/>
  <circle cx="950" cy="-42" r="105" fill="none" stroke="#D28A61" stroke-width="1.2" opacity="0.36"/>
  <path d="M775 526 C848 427 914 497 1005 379" fill="none" stroke="url(#frontLine)" stroke-width="2" opacity="0.65"/>
  <path d="M733 566 C836 443 931 544 1043 408" fill="none" stroke="#0B4A48" stroke-width="1" opacity="0.28"/>

  <image x="72" y="42" width="58" height="58" href="${inwardIconHref}" preserveAspectRatio="xMidYMid meet"/>
  <text x="140" y="84" fill="#0D281B" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="800" letter-spacing="-1.2">Inward</text>
  <text x="72" y="139" fill="#59706A" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="3.2">INWARD CENTRE INC.</text>
  <line x1="72" y1="164" x2="174" y2="164" stroke="#D17F32" stroke-width="4"/>
  <rect x="72" y="184" width="392" height="34" rx="17" fill="#0D281B"/>
  <path d="M92 201 l5 5 10 -12" fill="none" stroke="#F7F0E7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="120" y="206" fill="#F7F0E7" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="1.1">COVERED BY EXTENDED HEALTH INSURANCE</text>

  <text x="72" y="270" fill="#0D281B" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800" letter-spacing="-1.5">MENTAL HEALTH</text>
  <text x="72" y="317" fill="#0D281B" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800" letter-spacing="-1.5">CHECK-UP CLINIC</text>

  <text x="72" y="390" fill="#263E3B" font-family="Georgia, serif" font-size="30" font-weight="700">Your body gets regular check-ups.</text>
  <text x="72" y="432" fill="#D17F32" font-family="Georgia, serif" font-size="30" font-weight="700">Your mind should too.</text>

  <text x="72" y="526" fill="#596561" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="0.6">A PRIVATE, STRUCTURED WAY TO CHECK IN WITH YOURSELF.</text>

  <ellipse cx="863" cy="332" rx="176" ry="220" fill="#F0E2D1" opacity="0.80"/>
  <circle cx="863" cy="332" r="153" fill="none" stroke="#D17F32" stroke-width="1.2" opacity="0.50"/>
  <image x="674" y="115" width="378" height="440" href="${bodyMindCardHref}" preserveAspectRatio="xMidYMid meet"/>
  <text x="863" y="554" text-anchor="middle" fill="#59706A" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" letter-spacing="2.6">BODY + MIND</text>
`, '#F7F0E7');

const back = cardShell(`
  <defs>
    <linearGradient id="backGlow" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#1B5C57"/>
      <stop offset="1" stop-color="#093B39"/>
    </linearGradient>
  </defs>
  <rect width="${TRIM.width}" height="${TRIM.height}" fill="url(#backGlow)"/>
  <circle cx="-10" cy="590" r="290" fill="none" stroke="#D28A61" stroke-width="1.2" opacity="0.48"/>
  <circle cx="-10" cy="590" r="225" fill="none" stroke="#F7F0E7" stroke-width="1" opacity="0.18"/>
  <circle cx="-10" cy="590" r="160" fill="none" stroke="#D28A61" stroke-width="1" opacity="0.40"/>
  <path d="M81 130 C194 204 250 91 386 153" fill="none" stroke="#D17F32" stroke-width="2" opacity="0.9"/>

  <image x="72" y="42" width="42" height="42" href="${inwardIconHref}" preserveAspectRatio="xMidYMid meet"/>
  <text x="122" y="75" fill="#F7F0E7" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="800" letter-spacing="-0.8">Inward</text>
  <text x="72" y="162" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" letter-spacing="-1.4">A CLEARER PLACE</text>
  <text x="72" y="211" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" letter-spacing="-1.4">TO BEGIN.</text>

  <text x="72" y="273" fill="#DDE7E2" font-family="Arial, Helvetica, sans-serif" font-size="20">Understand what's happening beneath the surface,</text>
  <text x="72" y="301" fill="#DDE7E2" font-family="Arial, Helvetica, sans-serif" font-size="20">then find a clearer next step.</text>

  <rect x="72" y="340" width="607" height="124" rx="16" fill="#F7F0E7" opacity="0.10"/>
  <text x="96" y="375" fill="#F0CBAF" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="1.1">USE YOUR EXTENDED HEALTH INSURANCE</text>
  <text x="96" y="409" fill="#F7F0E7" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700">Direct billing for some providers is available.</text>
  <text x="96" y="440" fill="#DDE7E2" font-family="Arial, Helvetica, sans-serif" font-size="15">Our care coordinators can help you understand your options.</text>

  <text x="72" y="502" fill="#F0CBAF" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" letter-spacing="1.1">PRIVATE. STRUCTURED. PRACTICAL.</text>
  <text x="72" y="529" fill="#DDE7E2" font-family="Arial, Helvetica, sans-serif" font-size="15">A mental-health check-in designed around the whole picture.</text>
  <text x="72" y="552" fill="#AFC0BA" font-family="Arial, Helvetica, sans-serif" font-size="12">Inward is not an emergency or crisis service.</text>

  <rect x="748" y="78" width="236" height="436" rx="22" fill="#FFFDF8"/>
  <rect x="772" y="102" width="188" height="188" rx="11" fill="#FFFFFF"/>
  <image x="778" y="108" width="176" height="176" href="${qrHref}" preserveAspectRatio="xMidYMid meet"/>
  <text x="866" y="337" text-anchor="middle" fill="#0B3E3C" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="800" letter-spacing="2.4">SCAN TO CONNECT</text>
  <line x1="788" y1="362" x2="944" y2="362" stroke="#D17F32" stroke-width="2"/>
  <text x="866" y="400" text-anchor="middle" fill="#0D281B" font-family="Georgia, serif" font-size="22" font-weight="700">inwardcentre.ca</text>
  <text x="866" y="435" text-anchor="middle" fill="#536661" font-family="Arial, Helvetica, sans-serif" font-size="13">Connect with your care</text>
  <text x="866" y="454" text-anchor="middle" fill="#536661" font-family="Arial, Helvetica, sans-serif" font-size="13">coordinator.</text>
`, '#0B4A48');

const assets = [
  { name: 'inward-centre-visit-card-front', svg: front, background: '#F7F0E7' },
  { name: 'inward-centre-visit-card-back', svg: back, background: '#0B4A48' },
];

for (const asset of assets) {
  fs.writeFileSync(path.join(OUTPUT_DIR, `${asset.name}.svg`), asset.svg);
  await sharp(Buffer.from(asset.svg)).png().withMetadata({ density: 300 }).toFile(path.join(OUTPUT_DIR, `${asset.name}.png`));
  await sharp(Buffer.from(asset.svg))
    .extend({ top: BLEED, right: BLEED, bottom: BLEED, left: BLEED, extendWith: 'copy' })
    .png()
    .withMetadata({ density: 300 })
    .toFile(path.join(OUTPUT_DIR, `${asset.name}-with-bleed-300dpi.png`));
}

fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), `# Inward Centre visit cards

This set is formatted as a standard 3.5 × 2 in visit card.

- **Front:** Mental Health Check-Up Clinic message and body/mind comparison.
- **Back:** QR call-to-action, direct URL, coverage details, and care-coordinator language.
- **QR destination:** ${HOME_URL}
- **QR settings:** Error correction H with a five-module quiet zone.
- **Print files:** The \`*-with-bleed-300dpi.png\` files include 0.125 in bleed on every edge (3.75 × 2.25 in total). The SVG files are the editable, scalable source art at trim size.

Copy matches Inward Centre's home-page positioning: private, structured, practical, and a clear next step. The insurance wording is drawn from clinic-provided language.
`);

console.log(`Generated ${assets.length} card sides in ${OUTPUT_DIR}`);
