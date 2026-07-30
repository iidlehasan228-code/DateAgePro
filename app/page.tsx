import AgeCalculator from "@/components/AgeCalculator";
import AdUnit from "@/components/AdUnit";

// Structured data helps search engines understand this page is a free
// interactive tool, which can improve rich-result eligibility.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Age Calculator — Find Your Exact Age Instantly",
  url: "https://date-age-pro.vercel.app",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Age Calculator instantly calculates your exact age in years, months, days, and live seconds from your date of birth.",
};

const faqs = [
  {
    q: "How is my exact age calculated?",
    a: "We take your date of birth and today's date, then work out the full calendar difference — years, months, and days — accounting for different month lengths and leap years, not just a simple day count.",
  },
  {
    q: "Is my date of birth stored anywhere?",
    a: "Only an anonymous log (birth date and the calculated result) is saved to our database to help us understand usage. It isn't linked to your name, email, or any other identifying information.",
  },
  {
    q: "Why does the seconds counter keep changing?",
    a: "Once you calculate your age, the total time alive updates every second in real time, right in your browser — it's a live view of exactly how much time has passed since you were born.",
  },
  {
    q: "Does this work for any date of birth?",
    a: "Yes. Enter any past date and the calculator will handle it correctly, including birthdays on February 29th in leap years.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
        <section className="bg-grid border-b border-line dark:border-line-dark px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-accent-soft dark:bg-accent-darksoft px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              Age Calculator &nbsp;•&nbsp; Free &amp; Instant
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Age Calculator — Find Your Exact Age, <span className="text-accent">Down to the Second.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted dark:text-muted-dark sm:text-lg">
              Age Calculator is a modern, accurate tool. Enter your date of birth and
              instantly see your age in years, months, and days — plus a live counter of
              every second you&apos;ve been alive.
            </p>
          </div>
        </section>

        {/* Top ad slot */}
        <div className="mx-auto max-w-4xl px-6 pt-10">
          <AdUnit slot="1111111111" format="horizontal" label="Advertisement" />
        </div>

        {/* Calculator */}
        <section className="mx-auto max-w-2xl px-6 py-12">
          <AgeCalculator />
        </section>

        {/* Mid ad slot */}
        <div className="mx-auto max-w-4xl px-6 pb-10">
          <AdUnit slot="2222222222" format="rectangle" label="Advertisement" />
        </div>

        {/* FAQ */}
        <section id="faq" className="border-t border-line dark:border-line-dark px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display mb-8 text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((item) => (
                <div key={item.q} className="border-b border-line dark:border-line-dark pb-6">
                  <h3 className="mb-2 font-semibold">{item.q}</h3>
                  <p className="text-sm text-muted dark:text-muted-dark">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
