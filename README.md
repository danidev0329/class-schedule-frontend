# Class Schedule Frontend

A single-page course scheduler built with **Next.js 16 + React 19 + Tailwind CSS v4**. Browse courses, search/filter by code, title, or day of the week, select sections with instant timetable preview, and catch scheduling conflicts—all in the browser with zero backend calls.

---

## Getting Started

```bash
# Install dependencies
npm install          # or: pnpm install

# Run the development server
npm run dev          # or: pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
class-schedule-frontend/
├── app/                              # Next.js App Router — routing & providers only
│   ├── layout.tsx                    # Root layout (fonts, global providers)
│   ├── page.tsx                      # Thin route → mounts CourseBrowser
│   └── globals.css                   # Tailwind v4 theme tokens & shadcn CSS vars
├── features/courses/                 # All course-domain logic
│   ├── hooks/
│   │   └── use-schedule.tsx          # Shared selection context/provider
│   ├── course-browsing/              # Left-panel: search, filter, course cards
│   │   ├── components/
│   │   │   ├── course-card.tsx       # Card wrapping a course + its sections
│   │   │   └── section-row.tsx      # Row per section (select, conflict badge)
│   │   └── containers/
│   │       └── course-browser.tsx    # App shell: header, toolbar, two-panel grid
│   └── course-timetable/            # Right-panel: chosen sections & timetable
│       └── components/
│           ├── schedule-panel.tsx    # Desktop sidebar column + mobile slide-over
│           ├── schedule-sidebar.tsx  # List of chosen sections (remove button)
│           └── timetable.tsx         # Weekly day × time CSS grid
├── components/ui/                    # shadcn base primitives (Button, Card, Input, Select, Badge)
├── hooks/
│   └── use-debounced-value.ts       # Generic 250 ms debounce hook
├── lib/
│   ├── types.ts                     # Day, Course, Section, ScheduleBlock
│   ├── data.ts                      # Static mock dataset (21 courses)
│   ├── schedule-utils.ts            # Time parsing, formatting, grid helpers, conflict check
│   └── utils.ts                     # cn() className merge utility
└── public/                           # Static assets
```

---

## Key Features

- **Search & filter** — debounced code/title search + day-of-week dropdown filter.
- **Section selection** — one section per course; instant timetable update via React context.
- **Conflict detection** — selecting a section that overlaps an already-selected section is blocked, with a UI indicator and toast.
- **Weekly timetable** — per-minute CSS Grid showing all selected blocks across Mon–Fri, with horizontal scroll on narrow screens.
- **App-shell layout** — pinned header/toolbar, independently scrollable panels, responsive two-column on desktop, single column with custom slide-over on mobile.
- **Zero API calls** — runs entirely against static mock data in `lib/data.ts`.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 (App Router) | File-based routing, React 19 support, fast refresh |
| UI | React 19 | Component model, hooks, context |
| Styling | Tailwind CSS v4 | Utility-first, zero runtime CSS, theme via CSS vars |
| Primitives | shadcn / Base UI | Unstyled headless buttons/selects (keeps visual control in Tailwind) |
| Icons | Lucide React | Tree-shakeable, consistent with shadcn |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
