"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, Loader2, CheckCircle2, Gift } from "lucide-react";
import { calculateAge } from "@/lib/calculateAge";
import { logAgeCalculation } from "@/lib/supabase";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [submittedDob, setSubmittedDob] = useState<string | null>(null);
  const [now, setNow] = useState<Date>(new Date());
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  // Live ticking clock — only runs once a date of birth has been submitted
  useEffect(() => {
    if (!submittedDob) return;
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, [submittedDob]);

  const result = useMemo(() => {
    if (!submittedDob) return null;
    const birthDate = new Date(submittedDob + "T00:00:00");
    if (isNaN(birthDate.getTime())) return null;
    return calculateAge(birthDate, now);
  }, [submittedDob, now]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dob) return;

    setSubmittedDob(dob);
    setNow(new Date());

    const breakdown = calculateAge(new Date(dob + "T00:00:00"));
    setSaveStatus("saving");
    const { error } = await logAgeCalculation({
      birth_date: dob,
      years: breakdown.years,
      months: breakdown.months,
      days: breakdown.days,
    });
    setSaveStatus(error ? "idle" : "saved");
  }

  return (
    <div
      id="calculator"
      className="rounded-2xl border border-line dark:border-line-dark bg-surface dark:bg-surface-dark p-6 shadow-xl shadow-black/5 dark:shadow-black/30 sm:p-8"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="dob" className="mb-2 block text-sm font-semibold text-muted dark:text-muted-dark">
            Your Date of Birth
          </label>
          <div className="relative">
            <Calendar
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark"
            />
            <input
              id="dob"
              type="date"
              required
              max={new Date().toISOString().split("T")[0]}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-xl border border-line dark:border-line-dark bg-elevated dark:bg-elevated-dark py-3 pl-11 pr-4 text-ink dark:text-ink-dark outline-none ring-accent/40 transition focus:ring-4"
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-glow transition hover:brightness-110 active:scale-[0.98]"
        >
          Calculate Age
        </button>
      </form>

      {result && (
        <div className="mt-8 border-t border-line dark:border-line-dark pt-8">
          {/* Primary breakdown: Years / Months / Days */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <StatBlock value={result.years} label="Years" />
            <StatBlock value={result.months} label="Months" />
            <StatBlock value={result.days} label="Days" />
          </div>

          {/* Live-ticking totals */}
          <div className="mt-6 rounded-xl bg-elevated dark:bg-elevated-dark p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted dark:text-muted-dark">
              Total Time Alive (live)
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <MiniStat value={result.totalDays.toLocaleString()} label="Days" />
              <MiniStat value={result.totalHours.toLocaleString()} label="Hours" />
              <MiniStat value={result.totalMinutes.toLocaleString()} label="Minutes" />
              <MiniStat value={result.totalSeconds.toLocaleString()} label="Seconds" accent />
            </div>
          </div>

          {/* Next birthday + save status */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark">
              <Gift size={16} className="text-highlight" />
              <span>
                <strong className="text-ink dark:text-ink-dark">{result.nextBirthday.daysUntil}</strong> days
                until your next birthday
              </span>
            </div>
            <SaveIndicator status={saveStatus} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl bg-accent-soft dark:bg-accent-darksoft p-4 text-center sm:p-6">
      <div className="font-display tabular text-3xl font-bold text-accent sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted dark:text-muted-dark">
        {label}
      </div>
    </div>
  );
}

function MiniStat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div>
      <div
        className={`tabular font-display text-lg font-semibold sm:text-xl ${
          accent ? "text-highlight" : "text-ink dark:text-ink-dark"
        }`}
      >
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-muted dark:text-muted-dark">{label}</div>
    </div>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === "idle") return null;
  if (status === "saving") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted dark:text-muted-dark">
        <Loader2 size={14} className="animate-spin" /> Logging calculation…
      </span>
    );
  }
  if (status === "saved") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-emerald-500">
        <CheckCircle2 size={14} /> Saved to database
      </span>
    );
  }
  return (
    <span className="text-xs text-muted dark:text-muted-dark">
      Logging unavailable (Supabase not configured)
    </span>
  );
}
