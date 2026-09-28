# This is my Portfolio project build with [Next.js](https://nextjs.org/)

This project uses GraphQL to load GitHub repos onto the Projects page: the latest pinned items plus category tabs (web, mobile, desktop, dependencies). Cards render first, then fill in commit counts, GitHub release/download totals when a repo has releases, and last-year npm downloads for published packages. Click a project card and it animates out into a centered modal (and back on close) with the full description, topics, stats, and live-demo links. GitHub links are shown only for public repositories.

The Skills page groups technologies by what they ship — Languages, Web, Native Apps, Backend & Data, Tooling & Platforms, and Design — including Rust, Tauri, Firebase, and Supabase.

When I change a pinned project on GitHub, the portfolio updates on the next rebuild.
<br>
Star the project and see the changes happen.

## CV link (Google Drive)

The home page **My CV** button resolves its URL from Google Drive at build/ISR time by looking up the fixed file name `CV Pountzas Nikolaos` (no hardcoded Drive file ID in the UI).

1. In Google Cloud, create a service account and download a JSON key.
2. Enable the **Google Drive API** for that project.
3. Share the Drive folder that contains your CV with the service account email (Viewer).
4. Copy [`.env.example`](.env.example) to `.env.local` (or set the same vars in Vercel) and fill in:
   - `GOOGLE_DRIVE_FOLDER_ID` — folder ID from the Drive URL
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — `client_email` from the JSON key
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` — `private_key` from the JSON key (use `\n` for newlines in a single-line env value)

If lookup fails (missing env, API error, or file not found), the **My CV** button is hidden.

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
