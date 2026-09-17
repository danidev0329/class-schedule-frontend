# Project Folder Structure

```
class-schedule-frontend/
├── app/                        # Next.js App Router — routing only
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx             # Root layout (providers, fonts)
│   └── page.tsx               # Thin route → renders CourseBrowser
├── components/
│   └── ui/                    # shadcn/ui primitives (Button, Card, Input, Select, Badge)
├── features/
│   └── courses/
│       ├── hooks/                 # Cross-feature hooks
│       │   └── use-schedule.tsx   # Shared selection context + provider (Map<courseId, section>, totalUnits)
│       ├── course-browsing/       # Browse view
│       │   ├── components/
│       │   │   ├── course-card.tsx
│       │   │   └── section-row.tsx
│       │   ├── containers/
│       │   │   └── course-browser.tsx   # Search/filter + grid + schedule panel layout
│       │   ├── hooks/
│       │   ├── types/
│       │   └── utils/
│       └── course-timetable/      # Schedule view
│           ├── components/
│           │   ├── schedule-panel.tsx     # Desktop sidebar column + mobile slide-over
│           │   ├── schedule-sidebar.tsx   # Chosen-sections list w/ remove
│           │   └── timetable.tsx          # Weekly day × time grid of selected sections
│           ├── containers/
│           ├── hooks/
│           ├── types/
│           └── utils/
├── hooks/                       # Generic reusable hooks
│   └── use-debounced-value.ts
├── lib/                        # Types, data & helpers
│   ├── cn.ts
│   ├── data.ts                 # Mock course dataset
│   ├── schedule-utils.ts       # parseTime, formatTime, getDayIndex, formatSchedule, timer/grid helpers
│   ├── types.ts                # Course, Section, ScheduleBlock, Day
│   └── utils.ts                # cn (shadcn)
├── public/                     # Static assets
├── AGENTS.md
├── CLAUDE.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

> `data/`, `features/courses/{course-browsing,course-timetable}/{hooks,types,utils}` are scaffolded but currently unused.