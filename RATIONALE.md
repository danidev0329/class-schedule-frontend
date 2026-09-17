# Technical Rationale

## Why Next.js / React / Tailwind (no heavy component library)

The assignment asked for no pre-built component library (e.g. MUI, Chakra, Radix with default themes). We installed **shadcn** for its headless base primitives (`Button`, `Card`, `Input`, `Select`, `Badge`) to avoid reimplementing focus management, ARIA roles, and keyboard navigation—all of which are easy to get subtly wrong. The critical design decision is that every visual layer is pure Tailwind: no theme objects, no runtime CSS-in-JS, and no locked-in design tokens we can't override. This gives full control over the palette, spacing, and layout while letting us ship only the minimal runtime required by React itself.

The approach also limits bundle size: only the specific primitives imported are bundled (tree-shakeable via `@base-ui/react`), and Tailwind v4 purges unused classes at build time.

---

## State structure: keyed by courseId

Selected sections are stored as:

```ts
Map<number, SelectedSectionRecord>   // key = courseId
```

This is intentional for three reasons:

1. **One section per course** — a course cannot have two different sections selected simultaneously. Keying by `courseId` makes this constraint structural rather than something we have to validate on every write.

2. **O(1) lookups** — `isSelected(sectionId)` and `getSelectedSection(courseId)` both run in constant or near-constant time by iterating the small map.

3. **Switching is a single set** — changing a course's selected section from "01" to "03" is just `map.set(course.id, newRecord)`, which replaces the old entry cleanly without needing to splice an array.

The `ScheduleProvider` exposes the map's values as a memoized `selectedSections` array for list rendering, plus a derived `totalUnits` memo. All consumers share the same context, so toggling a section in the browse panel immediately updates the timetable without any prop-drilling or event coordination.

---

## Timetable positioning: computed grid styles vs static Tailwind

The timetable uses a **CSS Grid** with per-minute row granularity (1.5 px per minute), positioned entirely through inline `style` attributes rather than static Tailwind classes:

```tsx
style={{
  gridColumn: block.column,            // computed from day index + offset
  gridRow: `${block.rowStartLine} / ${block.rowEndLine}`,  // computed from parseTime()
}}
```

This is the only practical approach for this kind of data-driven layout because:

- **Minute-level precision** — Tailwind's spacing scale doesn't support arbitrary minutes (9:17 AM to 10:03 AM can't be expressed with pre-defined utility classes). A class-per-slot approach would require generating hundreds of utility classes at build time.

- **Dynamic rows** — the number of rows is determined at runtime from the data's time range, so the `gridTemplateRows` value itself must be computed (`auto repeat(N, 1.5px)`), which is impossible with static classes alone.

- **Block heights vary** — a 50-minute class and a 90-minute class need different row spans; only inline styles can express `span 30` vs `span 45` programmatically.

The grid header (day labels) and time labels do use Tailwind utility classes for visual styling (`sticky left-0`, font size, color), keeping layout concerns in JS and presentation in CSS.

The entire grid is wrapped in an `overflow-x-auto` container with a `min-w-[42rem]` floor, so it degrades gracefully to horizontal scroll on narrow screens instead of compressing columns.

---

## Performance considerations

- **`useMemo` for filtering** — `filteredCourses` recomputes only when `debouncedSearch` or `dayFilter` change (not on every keystroke or every parent re-render). With 21 courses this is cheap, but the pattern scales correctly to hundreds of items without changes.

- **`useMemo` for selected list and total units** — `selectedList` (used by the timetable and sidebar) and `totalUnits` are derived from the `Map` and recomputed only when the map changes, avoiding unnecessary re-renders of the timetable during unrelated context updates.

- **Debounced search input** — the `useDebouncedValue` hook (250 ms) prevents the `useMemo` filter from running on every keystroke, which matters more as the dataset grows.

- **Static mock data** — pagination is unnecessary with only 21 hardcoded courses. If the dataset grew to hundreds or thousands, two complementary strategies would apply: **server-side pagination** (load 20–30 at a time via API, append on scroll) or **client-side virtualization** (`react-window` / `@tanstack/virtual`) for the course grid, keeping only visible cards in the DOM while keeping the same search/filter UI unchanged.

- **`useCallback` for all context methods** — every exposed function (`selectSection`, `removeSection`, `isSelected`, `getConflict`) is wrapped in `useCallback`, so child components that receive them as props only re-render when the underlying map changes, not on every parent render.

---

## Conflict detection — added beyond the brief

The original assignment brief did not require time-conflict checking. We added it as a value-add enhancement because it is a common-sense requirement for any real scheduling tool, and the implementation cost was low given the existing `parseTime` helper.

The check works by comparing every block of the prospective section against every block of every already-selected section (excluding the same course being switched), looking for same-day overlap (`aStart < bEnd && bStart < aEnd`). Two constants make this clear:

- **Same-course swap is allowed** — selecting a different section for an already-selected course always succeeds, since the old section is replaced.
- **Adjacent blocks don't conflict** — a class ending at 10:00 AM and another starting at 10:00 AM are treated as non-overlapping, which matches real-world schedule behavior.

The UI surfaces this by disabling conflicting Select buttons and showing a red note explaining which selected section causes the conflict. The toast system reinforces this with a message if a conflict is encountered programmatically (e.g., if the guard is hit before the button state updates).

---

## What was intentionally left out (and why)

| Omitted | Rationale |
|---------|-----------|
| Dark mode | Explicitly cancelled during development per user instruction; the design stays light-theme only. |
| Backend / API / database | Out of scope for a frontend assignment; mock data in `lib/data.ts` is sufficient to demonstrate the UI, state management, and timetable logic. |
| Persistence (localStorage, DB) | Selected sections reset on page reload; would require a backend or localStorage integration beyond the brief. |
| Authentication | Not relevant to the scheduling UI; would add complexity with no value for the demo. |
| Real timetable color-coding by course | Colors are assigned by `courseId % 8` (8 color palettes rotating); a real app would let users assign or auto-assign colors per course for consistency. |
| Live class capacity / waitlist | No backend to query; the static data doesn't model capacity. |
| Export / share | Calendar export (ICS) or URL-based state sharing would require additional libraries and is outside the brief. |
