"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSchedule } from "@/features/courses/hooks/use-schedule";
import { formatSchedule } from "@/lib/schedule-utils";
import { XIcon } from "lucide-react";

export function ScheduleSidebar() {
  const { selectedSections, removeSection } = useSchedule();

  return (
    <aside className="lg:sticky lg:top-6">
      <Card>
        <CardHeader>
          <CardTitle>My schedule</CardTitle>
          <p className="text-sm text-muted-foreground">
            {selectedSections.length} section
            {selectedSections.length === 1 ? "" : "s"} chosen
          </p>
        </CardHeader>
        <CardContent>
          {selectedSections.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Select a section to start building your schedule.
            </p>
          ) : (
            <ul className="space-y-2">
              {selectedSections.map((record) => (
                <li
                  key={record.courseId}
                  className="flex items-start justify-between gap-2 rounded-lg border p-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {record.code} · Section {record.section.section}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {record.section.instructor}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {formatSchedule(record.section.schedule)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSection(record.courseId)}
                    aria-label={`Remove Section ${record.section.section} of ${record.code}`}
                  >
                    <XIcon />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}