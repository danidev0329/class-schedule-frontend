"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "cn";
import type { Course, Section } from "@/lib/types";
import { SectionRow } from "@/features/courses/course-browsing/components/section-row";

interface CourseCardProps {
  course: Course;
  sections?: Section[];
}

export function CourseCard({
  course,
  sections = course.sections,
}: CourseCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card>
      <CardHeader>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between gap-2 text-left"
        >
          <span className="min-w-0">
            <span className="block text-lg leading-snug font-medium">
              {course.code}
            </span>
            <span className="block text-sm text-zinc-600">{course.title}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            <Badge variant="secondary">{course.units} units</Badge>
            <ChevronDown
              className={cn(
                "size-4 text-zinc-500 transition-transform duration-200",
                !expanded && "-rotate-90"
              )}
              aria-hidden
            />
          </span>
        </button>
      </CardHeader>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <CardContent className="space-y-2">
            {sections.map((section) => (
              <SectionRow key={section.id} course={course} section={section} />
            ))}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}