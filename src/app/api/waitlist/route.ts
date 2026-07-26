import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

type WaitlistSubmission = {
  name?: unknown;
  email?: unknown;
  countryCode?: unknown;
  country?: unknown;
  region?: unknown;
  consent?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function storageDirectory() {
  return process.env.WAITLIST_STORAGE_DIR
    ? path.resolve(process.env.WAITLIST_STORAGE_DIR)
    : path.join(process.cwd(), "data", "waitlist");
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "This request could not be verified." }, { status: 403 });
  }

  let body: WaitlistSubmission;

  try {
    body = (await request.json()) as WaitlistSubmission;
  } catch {
    return Response.json({ error: "Please submit the form again." }, { status: 400 });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 254).toLowerCase();
  const countryCode = text(body.countryCode, 2).toUpperCase();
  const country = text(body.country, 120);
  const region = text(body.region, 120);
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailIsValid || !/^[A-Z]{2}$/.test(countryCode) || !country || !region || body.consent !== true) {
    return Response.json({ error: "Please complete each required field." }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const id = randomUUID();
  const record = {
    id,
    submittedAt,
    name,
    email,
    countryCode,
    country,
    region,
    consent: true,
  };

  try {
    const directory = storageDirectory();
    await mkdir(directory, { recursive: true });
    await writeFile(
      path.join(directory, `${submittedAt.replace(/[:.]/g, "-")}-${id}.json`),
      `${JSON.stringify(record, null, 2)}\n`,
      { encoding: "utf8", flag: "wx" },
    );
  } catch (error) {
    console.error("Unable to save waitlist submission", error);
    return Response.json(
      { error: "We could not save your request. Please try again shortly." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true, id }, { status: 201 });
}
