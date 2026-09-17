"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "cn";
import { schedulesConflict } from "@/lib/schedule-utils";
import type { Course, Section } from "@/lib/types";

export interface SelectedSectionRecord {
  courseId: string | number;
  code: string;
  title: string;
  units: number;
  section: Section;
}

interface ScheduleContextValue {
  selectedSections: SelectedSectionRecord[];
  count: number;
  totalUnits: number;
  selectSection: (course: Course, section: Section) => void;
  removeSection: (courseId: string | number) => void;
  isSelected: (sectionId: string | number) => boolean;
  getSelectedSection: (
    courseId: string | number
  ) => SelectedSectionRecord | undefined;
  getConflict: (
    course: Course,
    section: Section
  ) => SelectedSectionRecord | undefined;
}

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

interface ToastState {
  id: number;
  message: string;
}

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [selectedSections, setSelectedSections] = useState<
    Map<string | number, SelectedSectionRecord>
  >(new Map());
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  const selectSection = useCallback(
    (course: Course, section: Section) => {
      const previous = selectedSections.get(course.id);
      for (const record of selectedSections.values()) {
        if (record.courseId === course.id) continue;
        if (schedulesConflict(record.section.schedule, section.schedule)) {
          showToast(
            `Time conflict with ${record.code} · Section ${record.section.section}`
          );
          return;
        }
      }
      const next = new Map(selectedSections);
      next.set(course.id, {
        courseId: course.id,
        code: course.code,
        title: course.title,
        units: course.units,
        section,
      });
      setSelectedSections(next);
      showToast(
        previous
          ? `Switched ${course.code} to Section ${section.section}`
          : `Added ${course.code} · Section ${section.section}`
      );
    },
    [selectedSections, showToast]
  );

  const removeSection = useCallback(
    (courseId: string | number) => {
      const existing = selectedSections.get(courseId);
      if (!existing) return;
      const next = new Map(selectedSections);
      next.delete(courseId);
      setSelectedSections(next);
      showToast(
        `Removed ${existing.code} · Section ${existing.section.section}`
      );
    },
    [selectedSections, showToast]
  );

  const isSelected = useCallback(
    (sectionId: string | number) => {
      for (const record of selectedSections.values()) {
        if (record.section.id === sectionId) return true;
      }
      return false;
    },
    [selectedSections]
  );

  const getSelectedSection = useCallback(
    (courseId: string | number) => selectedSections.get(courseId),
    [selectedSections]
  );

  const getConflict = useCallback(
    (course: Course, section: Section): SelectedSectionRecord | undefined => {
      for (const record of selectedSections.values()) {
        if (record.courseId === course.id) continue;
        if (schedulesConflict(record.section.schedule, section.schedule)) {
          return record;
        }
      }
      return undefined;
    },
    [selectedSections]
  );

  const selectedList = useMemo(
    () => Array.from(selectedSections.values()),
    [selectedSections]
  );

  const totalUnits = useMemo(
    () => selectedList.reduce((sum, record) => sum + record.units, 0),
    [selectedList]
  );

  const value = useMemo<ScheduleContextValue>(
    () => ({
      selectedSections: selectedList,
      count: selectedSections.size,
      totalUnits,
      selectSection,
      removeSection,
      isSelected,
      getSelectedSection,
      getConflict,
    }),
    [
      selectedList,
      selectedSections.size,
      totalUnits,
      selectSection,
      removeSection,
      isSelected,
      getSelectedSection,
      getConflict,
    ]
  );

  return (
    <ScheduleContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-card-foreground shadow-lg ring-1 ring-foreground/10 transition-all duration-300",
          toast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {toast?.message ?? ""}
      </div>
    </ScheduleContext.Provider>
  );
}

export function useSchedule(): ScheduleContextValue {
  const context = useContext(ScheduleContext);
  if (context === null) {
    throw new Error("useSchedule must be used within a <ScheduleProvider>");
  }
  return context;
}