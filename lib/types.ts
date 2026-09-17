export type Day =
  | "M"
  | "T"
  | "W"
  | "Th"
  | "F"
  | "S"
  | "Su"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface ScheduleBlock {
  day: Day;
  startTime: string;
  endTime: string;
}

export interface Section {
  id: string | number;
  section: string;
  instructor: string;
  room: string;
  schedule: ScheduleBlock[];
}

export interface Course {
  id: string | number;
  code: string;
  title: string;
  units: number;
  sections: Section[];
}