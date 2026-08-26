# This is my Portfolio project build with [Next.js](https://nextjs.org/)

This project uses GraphQL to load GitHub repos onto the Projects page: the latest pinned items plus category tabs (web, mobile, desktop, dependencies). Cards render first, then fill in commit counts, GitHub release/download totals when a repo has releases, and last-year npm downloads for published packages. Click a project card and it animates out into a centered modal (and back on close) with the full description, topics, stats, and live-demo links. GitHub links are shown only for public repositories.

The Skills page groups technologies by what they ship — Languages, Web, Native Apps, Backend & Data, Tooling & Platforms, and Design — including Rust, Tauri, Firebase, and Supabase.

When I change a pinned project on GitHub, the portfolio updates on the next rebuild.
<br>
Star the project and see the changes happen.

## Build with

- NEXT.js
- React.js
- Tailwind-css
- GraphQL
- Framer Motion
- Rust / Tauri (listed in skills; used for native desktop work)

<!-- ## Getting Started

Clone

First, run the development server:

```
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 -->

## Deploy on Vercel

My Next.js app is to deployed on [Vercel Platform](https://pountzas-portfolio.vercel.app/)
