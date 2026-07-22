import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the DateAgePro team.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
      <p className="mt-3 text-muted dark:text-muted-dark">
        Found a bug, have feedback, or just want to say hi? Fill out the form below and it
        will open your email client with everything pre-filled.
      </p>

      <div className="mt-8 rounded-2xl border border-line dark:border-line-dark bg-surface dark:bg-surface-dark p-6 sm:p-8">
        <ContactForm />
      </div>
    </section>
  );
}
