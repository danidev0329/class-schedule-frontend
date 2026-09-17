import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/lib/types";
import { SectionRow } from "@/features/courses/course-browsing/components/section-row";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{course.code}</CardTitle>
            <p className="text-sm text-zinc-600">{course.title}</p>
          </div>
          <Badge variant="secondary">{course.units} units</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {course.sections.map((section) => (
          <SectionRow key={section.id} course={course} section={section} />
        ))}
      </CardContent>
    </Card>
  );
}