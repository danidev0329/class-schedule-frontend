export function parseTime(time: string): number {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (!match) throw new Error(`Invalid time: ${time}`);
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const isPM = match[3].toUpperCase() === "PM";
  if (isPM && hours < 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const isPM = hours >= 12;
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(mins).padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
}

const DAY_ORDER: Record<string, number> = {
  M: 0,
  T: 1,
  W: 2,
  Th: 3,
  F: 4,
  S: 5,
  Su: 6,
};

export function getDayIndex(day: string): number {
  return DAY_ORDER[day] ?? -1;
}