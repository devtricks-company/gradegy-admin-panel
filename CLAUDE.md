# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gradegy Admin Panel - A Next.js 15 admin panel application built with TypeScript, React 19, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Build Tool**: Turbopack (enabled by default)
- **Linting**: ESLint 9 with next/core-web-vitals and next/typescript configs
- **Data Fetching**: TanStack Query (React Query) v5

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production (uses Turbopack)
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

Development server runs on http://localhost:3000

## Project Structure

```
src/
├── app/              # Next.js App Router directory
│   ├── layout.tsx    # Root layout with QueryProvider
│   ├── page.tsx      # Home page
│   ├── globals.css   # Global styles & Tailwind imports
│   └── favicon.ico   # Site favicon
├── components/       # React components
│   └── providers/    # Context providers
│       └── query-provider.tsx  # TanStack Query provider
└── [future dirs]     # Add lib/, hooks/, etc. as needed

public/               # Static assets
```

## Architecture Notes

### App Router (Next.js 15)
- Uses App Router architecture (not Pages Router)
- All routes live in `src/app/` directory
- Server Components by default - add `'use client'` directive for client components
- File-based routing: `page.tsx` for pages, `layout.tsx` for layouts, `loading.tsx` for loading states

### Path Aliases
- `@/*` maps to `src/*` (configured in tsconfig.json)
- Use absolute imports: `import { Component } from '@/components/Component'`

### TypeScript Configuration
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler (for Turbopack compatibility)

### Styling
- Tailwind CSS v4 with PostCSS
- Global styles in `src/app/globals.css`
- Uses CSS variables for theming (check globals.css for :root and @media prefers-color-scheme)

### Build System
- Turbopack enabled for both dev and build
- Faster than webpack, especially for large projects
- Hot Module Replacement (HMR) optimized

### Data Fetching with TanStack Query
- QueryProvider wraps the app in `src/app/layout.tsx`
- QueryClient configured with sensible defaults:
  - `staleTime: 60000` (1 minute) - prevents immediate refetch on client
  - `refetchOnWindowFocus: false` - disabled for better UX
- React Query Devtools available in development (bottom-left corner)
- For client components, use `useQuery`, `useMutation`, etc. from `@tanstack/react-query`
- Server Components should use native `fetch` with Next.js caching

#### Example Usage
```tsx
'use client'

import { useQuery } from '@tanstack/react-query'

export function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos')
      return res.json()
    },
  })

  if (isLoading) return <div>Loading...</div>
  return <div>{/* render data */}</div>
}
```

## Key Configuration Files

- `next.config.ts` - Next.js configuration (TypeScript)
- `tsconfig.json` - TypeScript compiler options with path aliases
- `eslint.config.mjs` - ESLint flat config with Next.js presets
- `postcss.config.mjs` - PostCSS config for Tailwind
- `tailwindcss` - v4 uses CSS-first configuration (check globals.css)
