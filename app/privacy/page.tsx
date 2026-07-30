import type { Metadata } from "next";
import LegalPageShell from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Age Calculator collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Privacy Policy" updated="July 22, 2026">
      <p>
        Age Calculator (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates this website. This page explains
        what information we collect when you use the age calculator and why.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you calculate your age, we log the date of birth you entered along with the
        resulting years/months/days breakdown to an anonymous database record. This log is
        not linked to your name, email address, IP address, or any other identifying
        information, and there is no user account system on this site.
      </p>

      <h2>Cookies and Analytics</h2>
      <p>
        We use Google Analytics to understand how visitors use the site (e.g. pages viewed,
        general location, device type). Google Analytics uses cookies to collect this
        information. You can opt out of Google Analytics tracking using the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" className="text-accent underline">
          Google Analytics Opt-out Browser Add-on
        </a>
        .
      </p>

      <h2>Advertising</h2>
      <p>
        This site displays ads served by Google AdSense. Google and its partners may use
        cookies to serve ads based on your prior visits to this or other websites. You can
        opt out of personalized advertising by visiting{" "}
        <a href="https://adssettings.google.com" className="text-accent underline">
          Google Ads Settings
        </a>
        .
      </p>

      <h2>Data Storage</h2>
      <p>
        Calculation logs are stored in a Supabase (PostgreSQL) database with Row Level
        Security enabled. The public can only insert new records — no one can read, edit, or
        delete existing records through the public-facing site.
      </p>

      <h2>Your Rights</h2>
      <p>
        Since we do not collect identifying information, we have no way to associate a
        calculation log with a specific individual. If you have questions about this policy,
        please reach out via our{" "}
        <a href="/contact" className="text-accent underline">
          Contact page
        </a>
        .
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this
        page with an updated revision date.
      </p>
    </LegalPageShell>
  );
}
