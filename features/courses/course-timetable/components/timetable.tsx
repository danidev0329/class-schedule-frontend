"use client";

import { useMemo } from "react";
import { cn } from "cn";
import { courses } from "@/lib/data";
import {
  getDayGridColumn,
  parseTime,
  timeToGridLine,
} from "@/lib/schedule-utils";
import type { Day } from "@/lib/types";
import { useSchedule } from "@/features/courses/hooks/use-schedule";

const WEEK_DAYS: Day[] = ["M", "T", "W", "Th", "F"];

const DAY_SHORT_LABELS: Record<string, string> = {
  M: "Mon",
  Monday: "Mon",
  T: "Tue",
  Tuesday: "Tue",
  W: "Wed",
  Wednesday: "Wed",
  Th: "Thu",
  Thursday: "Thu",
  F: "Fri",
  Friday: "Fri",
  S: "Sat",
  Saturday: "Sat",
  Su: "Sun",
  Sunday: "Sun",
};

const DAY_LONG_LABELS: Record<string, string> = {
  M: "Monday",
  Monday: "Monday",
  T: "Tuesday",
  Tuesday: "Tuesday",
  W: "Wednesday",
  Wednesday: "Wednesday",
  Th: "Thursday",
  Thursday: "Thursday",
  F: "Friday",
  Friday: "Friday",
  S: "Saturday",
  Saturday: "Saturday",
  Su: "Sunday",
  Sunday: "Sunday",
};

const PX_PER_MINUTE = 1.5;
const FIRST_CONTENT_ROW = 2;
const FIRST_CONTENT_COLUMN = 2;
const MIN_WIDTH = "42rem";

const COURSE_COLORS = [
  "border-blue-500 bg-blue-100 text-blue-950",
  "border-emerald-500 bg-emerald-100 text-emerald-950",
  "border-amber-500 bg-amber-100 text-amber-950",
  "border-violet-500 bg-violet-100 text-violet-950",
  "border-rose-500 bg-rose-100 text-rose-950",
  "border-cyan-500 bg-cyan-100 text-cyan-950",
  "border-lime-500 bg-lime-100 text-lime-950",
  "border-orange-500 bg-orange-100 text-orange-950",
];

function colorIndexFor(id: string | number): number {
  const key = String(id);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % COURSE_COLORS.length;
}

function formatHourLabel(hour: number): string {
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12} ${hour < 12 ? "AM" : "PM"}`;
}

export function Timetable() {
  const { selectedSections } = useSchedule();

  const { startMinute, endMinute, hourLabels } = useMemo(() => {
    const times = courses.flatMap((course) =>
      course.sections.flatMap((section) =>
        section.schedule.flatMap((block) => [
          parseTime(block.startTime),
          parseTime(block.endTime),
        ])
      )
    );
    const min = Math.min(...times);
    const max = Math.max(...times);
    const start = Math.floor(min / 60) * 60;
    const end = Math.ceil(max / 60) * 60;

    const labels: { hour: number; label: string }[] = [];
    for (let hour = start / 60; hour < end / 60; hour += 1) {
      labels.push({ hour, label: formatHourLabel(hour) });
    }

    return { startMinute: start, endMinute: end, hourLabels: labels };
  }, []);

  const totalMinutes = endMinute - startMinute;

  if (selectedSections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed py-16 text-center">
        <p className="font-medium">No sections in your schedule yet</p>
        <p className="text-sm text-muted-foreground">
          Select a section on the left to see it on the weekly timetable.
        </p>
      </div>
    );
  }

  const blocks = selectedSections.flatMap((record) =>
    record.section.schedule.map((block, index) => ({
      id: `${record.courseId}-${record.section.id}-${index}`,
      column: getDayGridColumn(block.day, FIRST_CONTENT_COLUMN),
      rowStartLine: timeToGridLine(block.startTime, {
        startMinute,
        startRow: FIRST_CONTENT_ROW,
      }),
      rowEndLine: timeToGridLine(block.endTime, {
        startMinute,
        startRow: FIRST_CONTENT_ROW,
      }),
      color: COURSE_COLORS[colorIndexFor(record.courseId)],
      record,
    }))
  );

  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <div
        className={cn("grid", MIN_WIDTH)}
        style={{
          gridTemplateColumns: "4.5rem repeat(5, minmax(0, 1fr))",
          gridTemplateRows: `auto repeat(${totalMinutes}, ${PX_PER_MINUTE}px)`,
        }}
      >
        <div
          className="sticky left-0 z-20 flex items-end border-b border-r bg-card px-2 pb-2"
          style={{ gridColumn: 1, gridRow: 1 }}
        >
          <span className="text-xs font-medium text-muted-foreground">Time</span>
        </div>

        {WEEK_DAYS.map((day, index) => (
          <div
            key={day}
            className="flex items-end border-b px-2 pb-2"
            style={{ gridColumn: index + FIRST_CONTENT_COLUMN, gridRow: 1 }}
          >
            <div>
              <p className="text-sm font-semibold leading-tight">
                {DAY_SHORT_LABELS[day]}
              </p>
              <p className="text-xs text-muted-foreground">
                {DAY_LONG_LABELS[day]}
              </p>
            </div>
          </div>
        ))}

        {hourLabels.map(({ hour, label }) => {
          const lineStart =
            FIRST_CONTENT_ROW + (hour * 60 - startMinute);
          return (
            <div
              key={hour}
              className="sticky left-0 z-10 bg-card pr-2 text-right text-xs text-zinc-500"
              style={{
                gridColumn: 1,
                gridRow: `${lineStart} / span 60`,
                alignSelf: "start",
              }}
            >
              {label}
            </div>
          );
        })}

        {blocks.map((block) => (
          <div
            key={block.id}
            className={cn(
              "z-10 mx-0.5 mt-0.5 overflow-hidden rounded-md border px-1.5 py-1",
              block.color
            )}
            style={{
              gridColumn: block.column,
              gridRow: `${block.rowStartLine} / ${block.rowEndLine}`,
            }}
          >
            <p className="truncate text-[11px] font-semibold leading-tight">
              {block.record.code}
            </p>
            <p className="truncate text-[10px] leading-tight">
              Section {block.record.section.section} · {block.record.section.room}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}