import type { Day } from "./types";

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

const DAY_NAMES: Record<string, string> = {
  M: "Mon",
  T: "Tue",
  W: "Wed",
  Th: "Thu",
  F: "Fri",
  S: "Sat",
  Su: "Sun",
};

export function getDayIndex(day: string): number {
  return DAY_ORDER[day] ?? -1;
}

export function formatSchedule(
  schedule: { day: string; startTime: string; endTime: string }[]
): string {
  return schedule.map((b) => `${b.day} ${formatTime(parseTime(b.startTime))} - ${formatTime(parseTime(b.endTime))}`).join(", ");
}

export function formatScheduleParts(
  schedule: { day: string; startTime: string; endTime: string }[]
): { days: string; times: string } {
  const groups: { start: number; end: number; days: string[] }[] = [];
  for (const block of schedule) {
    const start = parseTime(block.startTime);
    const end = parseTime(block.endTime);
    const group = groups.find((g) => g.start === start && g.end === end);
    if (group) {
      group.days.push(block.day);
    } else {
      groups.push({ start, end, days: [block.day] });
    }
  }
  return {
    days: groups
      .map((g) =>
        [...g.days]
          .sort((a, b) => getDayIndex(a) - getDayIndex(b))
          .map((d) => DAY_NAMES[d])
          .join("/")
      )
      .join(" · "),
    times: groups
      .map((g) => `${formatTime(g.start)} - ${formatTime(g.end)}`)
      .join(" · "),
  };
}

export function timeToGridLine(
  time: string,
  options: { startMinute: number; startRow: number }
): number {
  return options.startRow + (parseTime(time) - options.startMinute);
}

export function getDayGridColumn(
  day: Day,
  firstContentColumn = 2
): number {
  return getDayIndex(day) + firstContentColumn;
}