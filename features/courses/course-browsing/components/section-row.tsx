import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSchedule } from "@/features/courses/hooks/use-schedule";
import { formatSchedule } from "@/lib/schedule-utils";
import type { Course, Section } from "@/lib/types";

interface SectionRowProps {
  course: Course;
  section: Section;
}

export function SectionRow({ course, section }: SectionRowProps) {
  const { isSelected, selectSection, removeSection } = useSchedule();
  const selected = isSelected(section.id);

  const handleToggle = () => {
    if (selected) {
      removeSection(course.id);
    } else {
      selectSection(course, section);
    }
  };

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
        <p className="truncate text-xs text-zinc-500">
          {formatSchedule(section.schedule)} · {section.room}
        </p>
      </div>
      <Button
        variant={selected ? "default" : "outline"}
        size="sm"
        className="shrink-0"
        onClick={handleToggle}
      >
        {selected ? "Selected" : "Select"}
      </Button>
    </div>
  );
}