import type { Course } from "./types";

export const courses: Course[] = [
  {
    id: 1,
    code: "CS 101",
    title: "Introduction to Computer Science",
    units: 3,
    sections: [
      {
        id: 1001,
        section: "01",
        instructor: "Dr. Sarah Kim",
        room: "STEM 201",
        schedule: [
          { day: "M", startTime: "09:00 AM", endTime: "10:15 AM" },
          { day: "W", startTime: "09:00 AM", endTime: "10:15 AM" },
        ],
      },
      {
        id: 1002,
        section: "02",
        instructor: "Dr. James Park",
        room: "STEM 203",
        schedule: [
          { day: "T", startTime: "11:00 AM", endTime: "12:15 PM" },
          { day: "Th", startTime: "11:00 AM", endTime: "12:15 PM" },
        ],
      },
      {
        id: 1003,
        section: "03",
        instructor: "Dr. Sarah Kim",
        room: "STEM 205",
        schedule: [
          { day: "W", startTime: "01:00 PM", endTime: "03:40 PM" },
        ],
      },
    ],
  },
  {
    id: 2,
    code: "CS 201",
    title: "Data Structures and Algorithms",
    units: 3,
    sections: [
      {
        id: 2001,
        section: "01",
        instructor: "Dr. Michael Chen",
        room: "STEM 210",
        schedule: [
          { day: "M", startTime: "10:30 AM", endTime: "11:45 AM" },
          { day: "W", startTime: "10:30 AM", endTime: "11:45 AM" },
          { day: "F", startTime: "10:30 AM", endTime: "11:45 AM" },
        ],
      },
      {
        id: 2002,
        section: "02",
        instructor: "Dr. Emily Davis",
        room: "STEM 212",
        schedule: [
          { day: "T", startTime: "02:00 PM", endTime: "03:15 PM" },
          { day: "Th", startTime: "02:00 PM", endTime: "03:15 PM" },
        ],
      },
    ],
  },
  {
    id: 3,
    code: "CS 310",
    title: "Database Systems",
    units: 3,
    sections: [
      {
        id: 3001,
        section: "01",
        instructor: "Dr. Emily Davis",
        room: "STEM 215",
        schedule: [
          { day: "M", startTime: "01:00 PM", endTime: "02:15 PM" },
          { day: "W", startTime: "01:00 PM", endTime: "02:15 PM" },
        ],
      },
      {
        id: 3002,
        section: "02",
        instructor: "Prof. Robert Nguyen",
        room: "STEM 220",
        schedule: [
          { day: "T", startTime: "04:00 PM", endTime: "05:15 PM" },
          { day: "Th", startTime: "04:00 PM", endTime: "05:15 PM" },
        ],
      },
    ],
  },
  {
    id: 4,
    code: "MATH 151",
    title: "Calculus I",
    units: 4,
    sections: [
      {
        id: 4001,
        section: "01",
        instructor: "Dr. Alan Turing",
        room: "SCI 110",
        schedule: [
          { day: "M", startTime: "08:00 AM", endTime: "08:50 AM" },
          { day: "W", startTime: "08:00 AM", endTime: "08:50 AM" },
          { day: "F", startTime: "08:00 AM", endTime: "08:50 AM" },
        ],
      },
      {
        id: 4002,
        section: "02",
        instructor: "Prof. Maria Lopez",
        room: "SCI 112",
        schedule: [
          { day: "T", startTime: "09:30 AM", endTime: "10:20 AM" },
          { day: "Th", startTime: "09:30 AM", endTime: "10:20 AM" },
        ],
      },
      {
        id: 4003,
        section: "03",
        instructor: "Dr. Alan Turing",
        room: "SCI 120",
        schedule: [
          { day: "W", startTime: "02:00 PM", endTime: "02:50 PM" },
          { day: "F", startTime: "02:00 PM", endTime: "02:50 PM" },
        ],
      },
    ],
  },
  {
    id: 5,
    code: "MATH 201",
    title: "Linear Algebra",
    units: 3,
    sections: [
      {
        id: 5001,
        section: "01",
        instructor: "Prof. Maria Lopez",
        room: "SCI 130",
        schedule: [
          { day: "M", startTime: "11:00 AM", endTime: "12:15 PM" },
          { day: "W", startTime: "11:00 AM", endTime: "12:15 PM" },
        ],
      },
      {
        id: 5002,
        section: "02",
        instructor: "Dr. Priya Sharma",
        room: "SCI 135",
        schedule: [
          { day: "T", startTime: "10:00 AM", endTime: "11:15 AM" },
          { day: "Th", startTime: "10:00 AM", endTime: "11:15 AM" },
        ],
      },
    ],
  },
  {
    id: 6,
    code: "PHYS 121",
    title: "General Physics I",
    units: 4,
    sections: [
      {
        id: 6001,
        section: "01",
        instructor: "Dr. Robert Oppenheimer",
        room: "SCI 210",
        schedule: [
          { day: "M", startTime: "09:00 AM", endTime: "09:50 AM" },
          { day: "W", startTime: "09:00 AM", endTime: "09:50 AM" },
          { day: "F", startTime: "09:00 AM", endTime: "09:50 AM" },
        ],
      },
      {
        id: 6002,
        section: "02",
        instructor: "Dr. Grace Hopper",
        room: "SCI 212",
        schedule: [
          { day: "T", startTime: "01:00 PM", endTime: "01:50 PM" },
          { day: "Th", startTime: "01:00 PM", endTime: "01:50 PM" },
        ],
      },
    ],
  },
  {
    id: 7,
    code: "CHEM 110",
    title: "General Chemistry",
    units: 4,
    sections: [
      {
        id: 7001,
        section: "01",
        instructor: "Dr. Marie Curie",
        room: "SCI 310",
        schedule: [
          { day: "M", startTime: "10:00 AM", endTime: "10:50 AM" },
          { day: "W", startTime: "10:00 AM", endTime: "10:50 AM" },
          { day: "F", startTime: "10:00 AM", endTime: "10:50 AM" },
        ],
      },
      {
        id: 7002,
        section: "02",
        instructor: "Prof. Linus Pauling",
        room: "SCI 312",
        schedule: [
          { day: "T", startTime: "03:00 PM", endTime: "03:50 PM" },
          { day: "Th", startTime: "03:00 PM", endTime: "03:50 PM" },
        ],
      },
    ],
  },
  {
    id: 8,
    code: "BIO 130",
    title: "Introductory Biology",
    units: 3,
    sections: [
      {
        id: 8001,
        section: "01",
        instructor: "Dr. Charles Darwin",
        room: "SCI 410",
        schedule: [
          { day: "M", startTime: "12:00 PM", endTime: "01:15 PM" },
          { day: "W", startTime: "12:00 PM", endTime: "01:15 PM" },
        ],
      },
      {
        id: 8002,
        section: "02",
        instructor: "Prof. Jane Goodall",
        room: "SCI 412",
        schedule: [
          { day: "T", startTime: "09:00 AM", endTime: "10:15 AM" },
          { day: "Th", startTime: "09:00 AM", endTime: "10:15 AM" },
        ],
      },
    ],
  },
  {
    id: 9,
    code: "ENG 101",
    title: "English Composition",
    units: 3,
    sections: [
      {
        id: 9001,
        section: "01",
        instructor: "Prof. Maya Angelou",
        room: "LIB 101",
        schedule: [
          { day: "M", startTime: "08:00 AM", endTime: "09:15 AM" },
          { day: "W", startTime: "08:00 AM", endTime: "09:15 AM" },
        ],
      },
      {
        id: 9002,
        section: "02",
        instructor: "Dr. John Steinbeck",
        room: "LIB 103",
        schedule: [
          { day: "T", startTime: "02:00 PM", endTime: "03:15 PM" },
          { day: "Th", startTime: "02:00 PM", endTime: "03:15 PM" },
        ],
      },
      {
        id: 9003,
        section: "03",
        instructor: "Prof. Maya Angelou",
        room: "LIB 105",
        schedule: [
          { day: "F", startTime: "09:00 AM", endTime: "11:45 AM" },
        ],
      },
    ],
  },
  {
    id: 10,
    code: "ENG 220",
    title: "World Literature",
    units: 3,
    sections: [
      {
        id: 10001,
        section: "01",
        instructor: "Dr. Toni Morrison",
        room: "LIB 110",
        schedule: [
          { day: "M", startTime: "01:00 PM", endTime: "02:15 PM" },
          { day: "W", startTime: "01:00 PM", endTime: "02:15 PM" },
        ],
      },
      {
        id: 10002,
        section: "02",
        instructor: "Dr. Toni Morrison",
        room: "LIB 112",
        schedule: [
          { day: "T", startTime: "11:00 AM", endTime: "12:15 PM" },
          { day: "Th", startTime: "11:00 AM", endTime: "12:15 PM" },
        ],
      },
    ],
  },
  {
    id: 11,
    code: "HIST 150",
    title: "Modern World History",
    units: 3,
    sections: [
      {
        id: 11001,
        section: "01",
        instructor: "Prof. Howard Zinn",
        room: "ART 201",
        schedule: [
          { day: "M", startTime: "09:00 AM", endTime: "10:15 AM" },
          { day: "W", startTime: "09:00 AM", endTime: "10:15 AM" },
          { day: "F", startTime: "09:00 AM", endTime: "10:15 AM" },
        ],
      },
      {
        id: 11002,
        section: "02",
        instructor: "Dr. Ada Lovelace",
        room: "ART 203",
        schedule: [
          { day: "T", startTime: "01:00 PM", endTime: "02:15 PM" },
          { day: "Th", startTime: "01:00 PM", endTime: "02:15 PM" },
        ],
      },
    ],
  },
  {
    id: 12,
    code: "ECON 101",
    title: "Principles of Microeconomics",
    units: 3,
    sections: [
      {
        id: 12001,
        section: "01",
        instructor: "Prof. Adam Smith",
        room: "BUS 101",
        schedule: [
          { day: "M", startTime: "10:00 AM", endTime: "11:15 AM" },
          { day: "W", startTime: "10:00 AM", endTime: "11:15 AM" },
        ],
      },
      {
        id: 12002,
        section: "02",
        instructor: "Dr. John Keynes",
        room: "BUS 105",
        schedule: [
          { day: "T", startTime: "12:00 PM", endTime: "01:15 PM" },
          { day: "Th", startTime: "12:00 PM", endTime: "01:15 PM" },
        ],
      },
      {
        id: 12003,
        section: "03",
        instructor: "Prof. Milton Friedman",
        room: "BUS 110",
        schedule: [
          { day: "W", startTime: "04:00 PM", endTime: "05:15 PM" },
          { day: "F", startTime: "04:00 PM", endTime: "05:15 PM" },
        ],
      },
    ],
  },
  {
    id: 13,
    code: "PSYC 101",
    title: "Introduction to Psychology",
    units: 3,
    sections: [
      {
        id: 13001,
        section: "01",
        instructor: "Dr. Sigmund Freud",
        room: "SS 201",
        schedule: [
          { day: "M", startTime: "11:00 AM", endTime: "12:15 PM" },
          { day: "W", startTime: "11:00 AM", endTime: "12:15 PM" },
        ],
      },
      {
        id: 13002,
        section: "02",
        instructor: "Dr. Carl Jung",
        room: "SS 203",
        schedule: [
          { day: "T", startTime: "08:00 AM", endTime: "09:15 AM" },
          { day: "Th", startTime: "08:00 AM", endTime: "09:15 AM" },
        ],
      },
    ],
  },
  {
    id: 14,
    code: "PSYC 210",
    title: "Abnormal Psychology",
    units: 3,
    sections: [
      {
        id: 14001,
        section: "01",
        instructor: "Dr. Abraham Maslow",
        room: "SS 210",
        schedule: [
          { day: "T", startTime: "03:00 PM", endTime: "04:15 PM" },
          { day: "Th", startTime: "03:00 PM", endTime: "04:15 PM" },
        ],
      },
      {
        id: 14002,
        section: "02",
        instructor: "Dr. Sigmund Freud",
        room: "SS 212",
        schedule: [
          { day: "M", startTime: "03:00 PM", endTime: "04:15 PM" },
          { day: "W", startTime: "03:00 PM", endTime: "04:15 PM" },
        ],
      },
    ],
  },
  {
    id: 15,
    code: "SOC 101",
    title: "Introduction to Sociology",
    units: 3,
    sections: [
      {
        id: 15001,
        section: "01",
        instructor: "Prof. Emile Durkheim",
        room: "SS 305",
        schedule: [
          { day: "M", startTime: "08:30 AM", endTime: "09:45 AM" },
          { day: "W", startTime: "08:30 AM", endTime: "09:45 AM" },
          { day: "F", startTime: "08:30 AM", endTime: "09:45 AM" },
        ],
      },
      {
        id: 15002,
        section: "02",
        instructor: "Dr. Max Weber",
        room: "SS 307",
        schedule: [
          { day: "T", startTime: "02:00 PM", endTime: "03:15 PM" },
          { day: "Th", startTime: "02:00 PM", endTime: "03:15 PM" },
        ],
      },
    ],
  },
  {
    id: 16,
    code: "PHIL 201",
    title: "Critical Thinking",
    units: 3,
    sections: [
      {
        id: 16001,
        section: "01",
        instructor: "Dr. Socrates Alon",
        room: "ART 301",
        schedule: [
          { day: "T", startTime: "10:00 AM", endTime: "11:15 AM" },
          { day: "Th", startTime: "10:00 AM", endTime: "11:15 AM" },
        ],
      },
      {
        id: 16002,
        section: "02",
        instructor: "Prof. Hannah Arendt",
        room: "ART 303",
        schedule: [
          { day: "M", startTime: "02:00 PM", endTime: "03:15 PM" },
          { day: "W", startTime: "02:00 PM", endTime: "03:15 PM" },
        ],
      },
    ],
  },
  {
    id: 17,
    code: "ART 202",
    title: "Modern Art History",
    units: 3,
    sections: [
      {
        id: 17001,
        section: "01",
        instructor: "Prof. Frida Kahlo",
        room: "ART 110",
        schedule: [
          { day: "W", startTime: "11:00 AM", endTime: "12:15 PM" },
          { day: "F", startTime: "11:00 AM", endTime: "12:15 PM" },
        ],
      },
      {
        id: 17002,
        section: "02",
        instructor: "Dr. Claude Monet",
        room: "ART 112",
        schedule: [
          { day: "T", startTime: "01:00 PM", endTime: "02:15 PM" },
          { day: "Th", startTime: "01:00 PM", endTime: "02:15 PM" },
        ],
      },
    ],
  },
  {
    id: 18,
    code: "MUS 115",
    title: "Music Theory I",
    units: 3,
    sections: [
      {
        id: 18001,
        section: "01",
        instructor: "Dr. Beethoven Amar",
        room: "ART 410",
        schedule: [
          { day: "M", startTime: "11:00 AM", endTime: "12:15 PM" },
          { day: "W", startTime: "11:00 AM", endTime: "12:15 PM" },
        ],
      },
      {
        id: 18002,
        section: "02",
        instructor: "Prof. Vanessa Thompson",
        room: "ART 412",
        schedule: [
          { day: "T", startTime: "09:00 AM", endTime: "10:15 AM" },
          { day: "Th", startTime: "09:00 AM", endTime: "10:15 AM" },
        ],
      },
    ],
  },
  {
    id: 19,
    code: "BUS 210",
    title: "Financial Accounting",
    units: 3,
    sections: [
      {
        id: 19001,
        section: "01",
        instructor: "Dr. Warren Buffet",
        room: "BUS 201",
        schedule: [
          { day: "M", startTime: "08:00 AM", endTime: "09:15 AM" },
          { day: "W", startTime: "08:00 AM", endTime: "09:15 AM" },
          { day: "F", startTime: "08:00 AM", endTime: "09:15 AM" },
        ],
      },
      {
        id: 19002,
        section: "02",
        instructor: "Prof. Janet Yellen",
        room: "BUS 205",
        schedule: [
          { day: "T", startTime: "11:00 AM", endTime: "12:15 PM" },
          { day: "Th", startTime: "11:00 AM", endTime: "12:15 PM" },
        ],
      },
    ],
  },
  {
    id: 20,
    code: "SPN 101",
    title: "Elementary Spanish I",
    units: 4,
    sections: [
      {
        id: 20001,
        section: "01",
        instructor: "Prof. Gabriel Marquez",
        room: "LIB 201",
        schedule: [
          { day: "M", startTime: "09:00 AM", endTime: "09:50 AM" },
          { day: "W", startTime: "09:00 AM", endTime: "09:50 AM" },
          { day: "F", startTime: "09:00 AM", endTime: "09:50 AM" },
        ],
      },
      {
        id: 20002,
        section: "02",
        instructor: "Dr. Pablo Neruda",
        room: "LIB 203",
        schedule: [
          { day: "T", startTime: "12:00 PM", endTime: "01:50 PM" },
          { day: "Th", startTime: "12:00 PM", endTime: "01:50 PM" },
        ],
      },
    ],
  },
  {
    id: 21,
    code: "KIN 150",
    title: "Sports and Wellness",
    units: 2,
    sections: [
      {
        id: 21001,
        section: "01",
        instructor: "Coach Lopez",
        room: "GYM 101",
        schedule: [
          { day: "M", startTime: "06:00 AM", endTime: "06:50 AM" },
          { day: "W", startTime: "06:00 AM", endTime: "06:50 AM" },
          { day: "F", startTime: "06:00 AM", endTime: "06:50 AM" },
        ],
      },
      {
        id: 21002,
        section: "02",
        instructor: "Coach Smith",
        room: "GYM 102",
        schedule: [
          { day: "T", startTime: "04:00 PM", endTime: "05:15 PM" },
          { day: "Th", startTime: "04:00 PM", endTime: "05:15 PM" },
        ],
      },
    ],
  },
  {
    id: "CCPROG3",
    code: "CCPROG3",
    title: "Object-Oriented Programming",
    units: 3,
    sections: [
      {
        id: "CCPROG3-Y01",
        section: "Y01",
        instructor: "Juan Dela Cruz",
        room: "G301",
        schedule: [
          { day: "Monday", startTime: "10:00", endTime: "11:30" },
          { day: "Wednesday", startTime: "10:00", endTime: "11:30" },
        ],
      },
      {
        id: "CCPROG3-Y02",
        section: "Y02",
        instructor: "Maria Santos",
        room: "G305",
        schedule: [
          { day: "Tuesday", startTime: "13:00", endTime: "14:30" },
          { day: "Thursday", startTime: "13:00", endTime: "14:30" },
        ],
      },
    ],
  },
  {
    id: "CSMODEL",
    code: "CSMODEL",
    title: "Mathematical Modeling",
    units: 3,
    sections: [
      {
        id: "CSMODEL-Y01",
        section: "Y01",
        instructor: "Pedro Reyes",
        room: "G201",
        schedule: [
          { day: "Monday", startTime: "11:00", endTime: "12:30" },
          { day: "Wednesday", startTime: "11:00", endTime: "12:30" },
        ],
      },
    ],
  },
];