export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: {
    date: Date;
    daysUntil: number;
  };
}

/**
 * Calculates a precise, calendar-aware age breakdown between a birth date
 * and a reference "now" (defaults to the current instant).
 */
export function calculateAge(birthDate: Date, now: Date = new Date()): AgeBreakdown {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = now.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);

  // Next birthday
  let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday.getTime() < stripTime(now).getTime()) {
    nextBirthday = new Date(now.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const daysUntil = Math.ceil(
    (stripTime(nextBirthday).getTime() - stripTime(now).getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthday: { date: nextBirthday, daysUntil },
  };
}

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
