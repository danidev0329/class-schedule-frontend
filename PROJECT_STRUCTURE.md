# Project Folder Structure

```
class-schedule-frontend/
├── app/                        # Next.js App Router (pages & layouts)
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Browse page (course grid)
├── components/                 # Reusable UI components
│   ├── course-card.tsx         # Course card with sections
│   ├── section-row.tsx         # Section row w/ select toggle
│   └── ui/                    # shadcn/ui components (download via npx shadcn)
├── lib/                        # Types, data & helpers
│   ├── data.ts                 # Mock course dataset
│   ├── schedule-utils.ts       # parseTime, formatTime, getDayIndex, formatSchedule
│   └── types.ts                # Course, Section, ScheduleBlock, Day
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── AGENTS.md                   # Next.js agent rules
├── CLAUDE.md                   # Claude agent rules
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

> Notes: `data/`, `features/`, and `hooks/` directories exist but are currently empty.