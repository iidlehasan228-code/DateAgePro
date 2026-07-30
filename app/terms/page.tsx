import type { Metadata } from "next";
import LegalPageShell from "@/components/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions governing your use of Age Calculator.",
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Service" updated="July 22, 2026">
      <p>
        By accessing or using Age Calculator (the &quot;Service&quot;), you agree to be bound by these
        Terms of Service. If you do not agree, please do not use the Service.
      </p>

      <h2>Use of the Service</h2>
      <p>
        Age Calculator provides a free tool for calculating a person&apos;s age from a given date of
        birth. The Service is provided for informational and personal use only.
      </p>

      <h2>No Warranty</h2>
      <p>
        The Service is provided &quot;as is&quot; without warranties of any kind, express or implied.
        While we take reasonable care to ensure calculations are accurate, we do not
        guarantee the Service will be error-free, uninterrupted, or fit for any particular
        purpose, including legal, medical, or financial decision-making.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Age Calculator and its operators shall not be
        liable for any indirect, incidental, or consequential damages arising from your use
        of, or inability to use, the Service.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        The Service uses third-party providers, including Supabase for data storage, Google
        AdSense for advertising, and Google Analytics for usage analytics. Your use of the
        Service is also subject to the respective terms and privacy policies of these
        providers.
      </p>

      <h2>Changes to the Service</h2>
      <p>
        We may modify, suspend, or discontinue the Service at any time without notice.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may revise these Terms from time to time. Continued use of the Service after any
        changes constitutes acceptance of the revised Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms can be sent via our{" "}
        <a href="/contact" className="text-accent underline">
          Contact page
        </a>
        .
      </p>
    </LegalPageShell>
  );
}
