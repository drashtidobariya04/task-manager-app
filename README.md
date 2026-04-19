# Task Manager

A production-quality task management app built with Next.js 14 (App Router), TypeScript, Redux Toolkit, TanStack Query, and Tailwind CSS.

## Getting Started

```bash
npm install
cp .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/tasks`.

## Architecture Decisions

**State separation:** Redux manages only locally created tasks. All server state (fetched tasks, individual task detail) lives in TanStack Query's cache. These two are intentionally never mixed — merging happens at the component/hook level, not in the store.

**Debounce with useRef:** Rather than a custom hook, debouncing is handled inline in the tasks page using `useRef` + `setTimeout`. This keeps the logic visible and avoids an abstraction layer that isn't reused anywhere else.

**TypeScript discriminated union:** `Task = ApiTask | LocalTask` with `isLocal: true` as a literal on `LocalTask`. This makes it safe to distinguish the two types at runtime without type assertions.

**No UI libraries:** All styling is Tailwind CSS. Components are composed from scratch to match what a production codebase would expect.

**Features**

Task List — Paginated list of 200 tasks fetched from JSONPlaceholder (10 per page)
Search — Debounced title search (300ms), resets to page 1 on change
Filter — All / Completed / Pending, resets to page 1 on change
Task Detail — Dynamic route /tasks/[id] with loading skeleton and error state
Create Task — Modal form with validation (title required, min 3 characters), stored in Redux
Merged List — Locally created tasks appear at the top of the list, merged with API results
Responsive — Fully usable from 360px mobile to 1280px+ desktop