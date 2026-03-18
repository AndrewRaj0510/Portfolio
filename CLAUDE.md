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
- `app/globals.css` — Tailwind directives and global styles (including CardNav navbar styles)
- `components/` — One component per portfolio section (Navbar, LoadingScreen, PrismBackground, Myself, About, Skills, Projects, Contact, Footer)

### Import alias

`@/*` maps to `./src/*` (configured in `jsconfig.json`)

### Key patterns

- Section components receive data as inline arrays/objects (skills list, projects list, experience timeline)
- Navigation uses smooth scroll with anchor IDs (`#home`, `#about`, `#experience`, `#education`, `#skills`, `#contact`)
- Floating CardNav navbar with GSAP animations (expand/collapse), translucent backdrop blur
- `LoadingScreen.js` — GridScan shader (THREE.js) with single-pass cyan scan + Welcome text animation
- `PrismBackground.js` — Prism shader (THREE.js) with 3D rotating ray-marched visuals as main background
- WebGL components use `next/dynamic` with `ssr: false` to avoid SSR issues
- Static assets in `public/` (icons, project screenshots, resume PDF)
