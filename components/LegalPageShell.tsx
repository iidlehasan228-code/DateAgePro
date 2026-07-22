import { ReactNode } from "react";

export default function LegalPageShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted dark:text-muted-dark">Last updated: {updated}</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink dark:text-ink-dark [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:text-muted [&_p]:dark:text-muted-dark [&_li]:text-muted [&_li]:dark:text-muted-dark [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}
