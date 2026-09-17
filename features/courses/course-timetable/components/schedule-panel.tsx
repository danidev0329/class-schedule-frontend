"use client";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import { useSchedule } from "@/features/courses/hooks/use-schedule";
import { ScheduleSidebar } from "@/features/courses/course-timetable/components/schedule-sidebar";
import { Timetable } from "@/features/courses/course-timetable/components/timetable";

interface SchedulePanelProps {
  open: boolean;
  onClose: () => void;
}

export function SchedulePanel({ open, onClose }: SchedulePanelProps) {
  const { count, totalUnits } = useSchedule();

  const content = (
    <div className="space-y-4">
      <Timetable />
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle>My schedule</CardTitle>
              <p className="text-sm text-muted-foreground">
                {count} section{count === 1 ? "" : "s"} · {totalUnits} units
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="-mt-1 -mr-1 lg:hidden"
              onClick={onClose}
              aria-label="Close schedule"
            >
              <XIcon />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScheduleSidebar />
        </CardContent>
      </Card>
      
    </div>
  );

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-zinc-950/50 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        aria-label="My schedule"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[92vw] max-w-md flex-col overflow-y-auto bg-background p-4 shadow-xl transition-transform duration-300 sm:w-96 lg:static lg:z-auto lg:w-full lg:max-w-none lg:translate-x-0 lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {content}
      </aside>
    </>
  );
}