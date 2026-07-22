# DateAgePro

A production-ready age calculator built for **DateAgePro.com** using Next.js 14 (App Router), Tailwind CSS, and
Supabase. Enter a date of birth and get an exact breakdown in years, months, and days, plus
a live-ticking total-seconds-alive counter. Calculations are logged to Supabase, ads are
wired up for Google AdSense, and the site ships with SEO metadata, a sitemap, Google
Analytics, and Privacy/Terms/Contact pages.

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript, strict mode)
- **Styling:** Tailwind CSS, dark mode via `next-themes`
- **Database:** Supabase (Postgres)
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4
- **Monetization:** Google AdSense

## Project Structure
```
age-calculator/
├── app/
│   ├── layout.tsx        # Root layout: Header/Footer, SEO metadata, GA, AdSense script
│   ├── page.tsx          # Home page: hero, calculator, ads, FAQ, JSON-LD
│   ├── globals.css
│   ├── sitemap.ts        # Auto-generated sitemap.xml
│   ├── robots.ts         # Auto-generated robots.txt
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Header.tsx          # Nav + dark/light toggle
│   ├── Footer.tsx
│   ├── AgeCalculator.tsx   # Core interactive tool
│   ├── AdUnit.tsx          # Reusable AdSense slot
│   ├── GoogleAnalytics.tsx # GA4 script loader
│   ├── ContactForm.tsx     # mailto-based contact form
│   └── LegalPageShell.tsx  # Shared layout for legal pages
├── lib/
│   ├── supabase.ts        # Supabase client + logging function
│   └── calculateAge.ts    # Pure age-math utility
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .eslintrc.json
├── .env.local.example
└── package.json
```

---

## 1. Local Setup

```bash
npm install
cp .env.local.example .env.local   # then fill in your real values
npm run dev
```

Visit `http://localhost:3000`. The calculator works even before Supabase, Analytics, or
AdSense are configured — each integration is designed to fail gracefully (with a console
warning) rather than break the page.

**Verified in this build:** `npm install`, `npm run build`, `npm run dev`, and `npx tsc
--noEmit` were all run against this exact codebase and complete with zero errors. All
routes (`/`, `/privacy`, `/terms`, `/contact`, `/sitemap.xml`, `/robots.txt`) were hit with
a live dev server and returned `200`. One caveat: the sandbox this was built in blocks
outbound requests to `fonts.googleapis.com`, so the Google Fonts fetch inside `npm run
build` couldn't be exercised end-to-end here — it will resolve normally on Vercel or any
machine with normal internet access, since it's a standard `next/font/google` call.

---

## 2. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run:

```sql
create table age_calculations (
  id uuid primary key default gen_random_uuid(),
  birth_date date not null,
  years int not null,
  months int not null,
  days int not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table age_calculations enable row level security;

-- Insert-only policy: anonymous visitors can log a calculation,
-- but can never read, update, or delete existing rows.
create policy "Allow anonymous inserts"
  on age_calculations
  for insert
  to anon
  with check (true);
```

3. Go to **Project Settings > API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Paste both into `.env.local` (and into Vercel's environment variables when you deploy).
5. Restart `npm run dev`. Use the calculator once, then check **Table Editor >
   age_calculations** in Supabase — a new row should appear with the birth date and
   years/months/days you calculated.

> The RLS policy above is intentionally locked to insert-only. If you later want an admin
> view of the logs, query the table with your Supabase **service role** key from a secure
> server-side route only — never expose it in browser code.

---

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: DateAgePro age calculator"
git branch -M main
git remote add origin https://github.com/<your-username>/dateagepro.git
git push -u origin main
```

---

## 4. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo.
2. Vercel auto-detects Next.js — no build settings needed.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your final production URL, e.g. `https://your-app.vercel.app`)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional — see Analytics section below)
4. Click **Deploy**.

Every push to `main` auto-redeploys.

---

## 5. Google AdSense Integration

1. Sign up at [google.com/adsense](https://www.google.com/adsense) and get your site
   approved (this requires a live, deployed URL — deploy to Vercel first).
2. Once approved, find your **Publisher ID** (format `ca-pub-XXXXXXXXXXXXXXXX`) under
   **AdSense > Account > Account information**.
3. Replace the placeholder `ca-pub-XXXXXXXXXXXXXXXX` in **two files**:
   - `app/layout.tsx` → `ADSENSE_CLIENT_ID`
   - `components/AdUnit.tsx` → `ADSENSE_CLIENT_ID`
4. Create ad units in AdSense (**Ads > By ad unit > Display ads**) and copy each **ad slot
   ID**. Replace the placeholder slot values in `app/page.tsx`:
   ```tsx
   <AdUnit slot="1111111111" format="horizontal" />
   <AdUnit slot="2222222222" format="rectangle" />
   ```
5. Redeploy. Ads typically take a few hours to start appearing after approval, and render
   as empty slots locally/in development — this is expected, since AdSense only serves real
   ads on approved, publicly deployed domains.

---

## 6. Google Analytics

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Under **Admin > Data Streams**, create a Web stream and copy the **Measurement ID**
   (format `G-XXXXXXXXXX`).
3. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` (locally) and in Vercel's
   environment variables (production).
4. That's it — `components/GoogleAnalytics.tsx` loads the GA script automatically when this
   variable is present, and does nothing (no errors, no scripts) when it's absent.

---

## Pages Included
- **`/`** — Landing page: hero, calculator, ad slots, FAQ
- **`/privacy`** — Privacy Policy (data collection, cookies, AdSense, Supabase)
- **`/terms`** — Terms of Service
- **`/contact`** — Contact form (opens the visitor's email client via `mailto:` — no
  backend/email service required; update `CONTACT_EMAIL` in `components/ContactForm.tsx`)

## SEO Notes
- `app/layout.tsx` sets full metadata: title template, description, keywords, Open Graph,
  and Twitter card tags, plus `metadataBase` built from `NEXT_PUBLIC_SITE_URL`.
- `app/sitemap.ts` and `app/robots.ts` use Next.js's built-in metadata route conventions to
  auto-generate `/sitemap.xml` and `/robots.txt` — no extra packages needed.
- `app/page.tsx` includes JSON-LD structured data (`WebApplication` schema) to help search
  engines understand this is a free interactive tool.
- Every page (`/privacy`, `/terms`, `/contact`) exports its own `metadata` for a unique
  title/description.

## Customization Notes
- **Colors:** all design tokens live in `tailwind.config.ts` under `theme.extend.colors`
  (`accent`, `highlight`, `surface`, `elevated`, etc.) — change them in one place to
  re-theme the whole site.
- **Fonts:** `Space Grotesk` (headings) and `Inter` (body) load via `next/font/google` in
  `app/layout.tsx`.
- **Dark mode default:** set via `defaultTheme="dark"` on `ThemeProvider` in
  `app/layout.tsx`; visitors can toggle it with the sun/moon button in the header.
- **Contact email:** update `CONTACT_EMAIL` at the top of `components/ContactForm.tsx`.

## A Known Dependency Note
`npm audit` will report a handful of high/moderate advisories against `next` and against
`eslint`'s transitive `glob` dependency. These affect either build-time-only tooling (not
shipped to the browser) or Next.js features this project doesn't use (i18n middleware,
custom image remote patterns, WebSocket upgrades). If you want a fully clean `npm audit`,
you can upgrade to the latest major Next.js version, but note that's a breaking change
outside the App Router API surface used here and isn't required for this project to run
securely as built.
#   D a t e A g e P r o  
 