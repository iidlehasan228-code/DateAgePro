"use client";

import { useState } from "react";
import { Send } from "lucide-react";

// TODO: Replace with your real support/contact email address
const CONTACT_EMAIL = "hello@example.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(`Message from ${name || "DateAgePro visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    // Opens the visitor's default email client pre-filled with their message.
    // No backend or email service is required for this to work.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-muted dark:text-muted-dark">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-line dark:border-line-dark bg-elevated dark:bg-elevated-dark px-4 py-3 outline-none ring-accent/40 transition focus:ring-4"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-muted dark:text-muted-dark">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-line dark:border-line-dark bg-elevated dark:bg-elevated-dark px-4 py-3 outline-none ring-accent/40 transition focus:ring-4"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-muted dark:text-muted-dark">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-xl border border-line dark:border-line-dark bg-elevated dark:bg-elevated-dark px-4 py-3 outline-none ring-accent/40 transition focus:ring-4"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-glow transition hover:brightness-110 active:scale-[0.98]"
      >
        <Send size={16} /> Send Message
      </button>
    </form>
  );
}
