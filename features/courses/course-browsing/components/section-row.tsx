import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSchedule } from "@/features/courses/hooks/use-schedule";
import { formatScheduleParts } from "@/lib/schedule-utils";
import type { Course, Section } from "@/lib/types";

interface SectionRowProps {
  course: Course;
  section: Section;
}

export function SectionRow({ course, section }: SectionRowProps) {
  const { isSelected, selectSection, removeSection, getConflict } =
    useSchedule();
  const selected = isSelected(section.id);
  const conflict = getConflict(course, section);

  const handleToggle = () => {
    if (selected) {
      removeSection(course.id);
    } else {
      selectSection(course, section);
    }
  };

  const scheduleParts = formatScheduleParts(section.schedule);

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${
        selected ? "border-blue-600 bg-blue-50" : "border-zinc-200 bg-white"
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Section {section.section}</span>
          {selected && (
            <Badge variant="default" className="text-[10px]">
              Selected
            </Badge>
          )}
        </div>
        <p className="truncate text-sm text-zinc-600">{section.instructor}</p>
        <p className="text-xs text-zinc-500">
          <span className="font-medium text-zinc-600">{scheduleParts.days}</span>
          <span className="block">
            {scheduleParts.times} · {section.room}
          </span>
        </p>
        {conflict && !selected && (
          <p className="mt-1 text-xs font-medium text-red-600">
            Time conflict with {conflict.code} · Section{" "}
            {conflict.section.section}
          </p>
        )}
      </div>
      <Button
        variant={selected ? "default" : "outline"}
        size="sm"
        className="shrink-0"
        disabled={Boolean(conflict) && !selected}
        onClick={handleToggle}
      >
        {selected ? "Selected" : "Select"}
      </Button>
    </div>
  );
}