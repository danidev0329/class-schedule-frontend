"use client";

import { useEffect, useMemo, useState } from "react";
import { CourseCard } from "@/features/courses/course-browsing/components/course-card";
import { ScheduleSidebar } from "@/features/courses/course-timetable/components/schedule-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const { count: selectedCount } = useSchedule();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);
  const [dayFilter, setDayFilter] = useState<DayFilter>("ALL");

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
    <main className="mx-auto w-full max-w-6xl p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {filteredCourses.length} courses · {selectedCount} sections selected
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
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
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
        <ScheduleSidebar />
      </div>
    </main>
  );
}