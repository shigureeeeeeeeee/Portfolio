# CLAUDE.md

すべての回答は日本語で行う

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for `src`

## Architecture Overview

This is a modern Next.js 16 portfolio website built with TypeScript and deployed to Vercel. The project uses a component-based architecture with the following key patterns:

### Core Technologies
- **Next.js 16** with App Router and ISR
- **TypeScript** for type safety
- **Tailwind CSS 4** with custom animations
- **Framer Motion** for complex animations
- **LanguageContext** for Japanese/English language switching

### Project Structure
- `/src/app` - Next.js app directory with main layout and page
- `/src/components` - Reusable UI components organized by feature
- `/src/components/ui` - Advanced UI components with effects (3D cards, animations)
- `/src/contexts` - React Context providers (LanguageContext for i18n)
- `/src/data` - Data layer separated from presentation (projects, skills, translations, aboutMe)
- `/src/hooks` - Custom React hooks for viewport detection and click handling

### Key Architectural Decisions
1. **Incremental Static Regeneration**: The landing page revalidates hourly on Vercel so pinned GitHub repositories update without a redeploy
2. **Server and Client Components**: The page fetches project data on the server while interactive sections use client components
3. **Data Separation**: All content data is stored in `/src/data` files, making it easy to update without touching components
4. **Responsive Design**: Mobile-first approach using Tailwind breakpoints
5. **Performance**: Component-level code splitting and viewport-based animation triggers

### Important Configuration Files
- `next.config.mjs` - Next.js configuration using Vercel-compatible defaults
- `tsconfig.json` - Path alias `@/*` maps to `./src/*`

### Component Architecture
The site is built as a single-page application with smooth scroll sections:
1. **Header** - Fixed navigation with language toggle
2. **Hero** - Landing section with animated background
3. **AboutMe** - Personal introduction with timeline
4. **Skills** - Interactive skill visualization
5. **Projects** - 3D card showcase of portfolio items
6. **Footer** - Contact information and social links

All components follow a pattern of separating data from presentation, with TypeScript interfaces defining data structures and components consuming data from the `/src/data` directory.
