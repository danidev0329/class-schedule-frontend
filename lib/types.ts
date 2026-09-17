export type Day =
  | "M"
  | "T"
  | "W"
  | "Th"
  | "F"
  | "S"
  | "Su";

export interface ScheduleBlock {
  day: Day;
  startTime: string;
  endTime: string;
}

export interface Section {
  id: number;
  section: string;
  instructor: string;
  room: string;
  schedule: ScheduleBlock[];
}

export interface Course {
  id: number;
  code: string;
  title: string;
  units: number;
  sections: Section[];
}