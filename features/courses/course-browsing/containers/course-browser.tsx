"use client";

import { useEffect, useMemo, useState } from "react";
import { GraduationCap } from "lucide-react";
import { CourseCard } from "@/features/courses/course-browsing/components/course-card";
import { SchedulePanel } from "@/features/courses/course-timetable/components/schedule-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useSchedule } from "@/features/courses/hooks/use-schedule";
import { courses } from "@/lib/data";
import type { Day } from "@/lib/types";

type DayFilter = Day | "ALL";

const DAYS: Day[] = ["M", "T", "W", "Th", "F", "S", "Su"];

const DAY_LABELS: Record<Day, string> = {
  M: "Mondays",
  T: "Tuesdays",
  W: "Wednesdays",
  Th: "Thursdays",
  F: "Fridays",
  S: "Saturdays",
  Su: "Sundays",
};

export function CourseBrowser() {
  const { count: selectedCount, totalUnits } = useSchedule();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);
  const [dayFilter, setDayFilter] = useState<DayFilter>("ALL");
  const [scheduleOpen, setScheduleOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const availableDays = useMemo(
    () =>
      DAYS.filter((day) =>
        courses.some((course) =>
          course.sections.some((section) =>
            section.schedule.some((block) => block.day === day)
          )
        )
      ),
    []
  );

  const filteredCourses = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return courses.filter((course) => {
      if (
        query &&
        !course.code.toLowerCase().includes(query) &&
        !course.title.toLowerCase().includes(query)
      ) {
        return false;
      }
      if (
        dayFilter !== "ALL" &&
        !course.sections.some((section) =>
          section.schedule.some((block) => block.day === dayFilter)
        )
      ) {
        return false;
      }
      return true;
    });
  }, [debouncedSearch, dayFilter]);

  const hasActiveFilters = search.trim() !== "" || dayFilter !== "ALL";

  const clearFilters = () => {
    setSearch("");
    setDayFilter("ALL");
  };

  if (loading) {
    return (
      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse space-y-4 rounded-lg border bg-zinc-100 p-4"
          >
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-3 w-2/3 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
          </div>
        ))}
      </main>
    );
  }

  if (courses.length === 0) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <p className="text-zinc-500">No courses found</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex h-dvh w-full max-w-8xl flex-col overflow-hidden px-10 py-6">
      <div className="shrink-0">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-zinc-900 text-white shadow-sm">
            <GraduationCap className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              Coursify
            </h1>
            <p className="text-sm text-zinc-500">
              A simple and reliable course finder
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{filteredCourses.length} courses</Badge>
          <Badge variant="secondary">{selectedCount} sections selected</Badge>
          <Badge variant="secondary">{totalUnits} units</Badge>
        </div>
        <Separator className="mt-5" />
      </div>

      <div className="mb-6 mt-6 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          type="search"
          placeholder="Search by code or title"
          aria-label="Search courses"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-xs"
        />
        <Select
          value={dayFilter}
          onValueChange={(value) => setDayFilter(value as DayFilter)}
        >
          <SelectTrigger aria-label="Filter by day" className="w-full sm:w-48">
            <SelectValue placeholder="All days" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="ALL">All days</SelectItem>
            {availableDays.map((day) => (
              <SelectItem key={day} value={day}>
                {DAY_LABELS[day]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={() => setScheduleOpen(true)}
        >
          Schedule ({selectedCount})
        </Button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="min-h-0 min-w-0 overflow-y-auto">
          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed py-16 text-center">
              <p className="font-medium">No courses match your filters</p>
              <p className="text-sm text-zinc-500">
                Try a different search or day, or clear your filters.
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  sections={
                    dayFilter === "ALL"
                      ? course.sections
                      : course.sections.filter((section) =>
                          section.schedule.some(
                            (block) => block.day === dayFilter
                          )
                        )
                  }
                />
              ))}
            </div>
          )}
        </div>
        <SchedulePanel
          open={scheduleOpen}
          onClose={() => setScheduleOpen(false)}
        />
      </div>
    </main>
  );
}