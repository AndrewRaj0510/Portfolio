# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Andrew Isaac Raj G (Data Analyst & AI Automation Enthusiast). Built with Next.js 16 (App Router), React 19, and Tailwind CSS. Deployed on Vercel.

## Commands

```bash
npm run dev      # Start dev server (next dev)
npm run build    # Production build (next build)
npm run start    # Start production server (next start)
npm run lint     # Run ESLint
```

No testing framework is configured.

## Architecture

- **Framework:** Next.js App Router with all client-side components (`'use client'`)
- **Language:** JavaScript (no TypeScript)
- **Styling:** Tailwind CSS with `darkMode: 'class'`, dark-mode only (no theme toggle)
- **State:** React useState only — no external state management
- **Package manager:** npm

### Source layout (`portfolio/src/`)

- `app/layout.js` — Root layout with Geist fonts, metadata, hardcoded dark mode
- `app/page.js` — Main page composing all section components with dynamic WebGL imports
- `app/projects/page.js` — Dedicated `/projects` route; holds the `projects` data array and renders it via `AnimatedList`
- `app/globals.css` — Tailwind directives and global styles (including CardNav navbar styles)
- `components/` — One component per portfolio section (Navbar, LoadingScreen, PrismBackground, Myself, About, Skills, Projects, Contact, Footer) plus `AnimatedList` (projects-page list/cards)

### Import alias

`@/*` maps to `./src/*` (configured in `jsconfig.json`)

### Key patterns

- Section components receive data as inline arrays/objects (skills list, projects list, experience timeline)
- Navigation uses smooth scroll with anchor IDs (`#home`, `#about`, `#experience`, `#education`, `#skills`, `#contact`)
- Floating CardNav navbar with GSAP animations (expand/collapse), translucent backdrop blur. Hides on scroll-down / reveals on scroll-up via the `.nav-hidden` class on `.card-nav-container` (stays visible near the top and while the menu is expanded)
- `LoadingScreen.js` — GridScan shader (THREE.js) with single-pass cyan scan + Welcome text animation
- `PrismBackground.js` — Prism shader (THREE.js) with 3D rotating ray-marched visuals as main background
- WebGL components use `next/dynamic` with `ssr: false` to avoid SSR issues
- Static assets in `public/` (icons, project screenshots, resume PDF)

### Projects data & images

Each entry in the `projects` array (`app/projects/page.js`) has: `title`, `description`, `image` (tile cover, or `null` for none yet), `github`, `visibility` (`'public'` | `'private'`), optional `deployed`, `details` (array of paragraphs), and `gallery` (array of screenshot paths, may be empty).

The authoritative source for each project's details is its real repo README, kept locally (gitignored) under the top-level `projects/<name>/README.md`. Use these as the source of truth when writing/editing on-site descriptions. Folder names don't always match site titles — e.g. `techiesscrapers` → "Job Scraper Console", `naturaldatalanguagevisualizer` → "Natural Language Data Visualizer", `Whatsappchatbot` → "WhatsApp ChatWidget".

Project images live under `public/projects/<slug>/`: the tile cover is `cover.<ext>` and gallery shots are numbered (`1.png`, `2.png`, …). See `public/projects/README.md` for the naming convention and the full folder → project map. `AnimatedList` renders "Image coming soon" placeholders when `image` is `null` or `gallery` is empty, so entries can ship before their images exist (e.g. AIRNotes currently has no tile/gallery images).
