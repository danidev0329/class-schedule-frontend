import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatSchedule } from "@/lib/schedule-utils";
import type { Section } from "@/lib/types";

interface SectionRowProps {
  section: Section;
  selected: boolean;
  onToggle: () => void;
}

export function SectionRow({ section, selected, onToggle }: SectionRowProps) {
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
        onClick={onToggle}
      >
        {selected ? "Selected" : "Select"}
      </Button>
    </div>
  );
}