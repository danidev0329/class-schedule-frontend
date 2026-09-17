"use client";

import { useEffect, useState } from "react";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/lib/data";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedSections, setSelectedSections] = useState<Set<number>>(
    () => new Set()
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (sectionId: number) => {
    setSelectedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <p className="mt-1 text-sm text-zinc-600">
          {courses.length} courses · {selectedSections.size} sections selected
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            selectedSections={selectedSections}
            onToggleSection={toggleSection}
          />
        ))}
      </div>
    </main>
  );
}