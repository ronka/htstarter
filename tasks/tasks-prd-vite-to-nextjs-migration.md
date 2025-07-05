## Relevant Files

- `next.config.js` - Next.js configuration file to replace vite.config.ts
- `app/layout.tsx` - Root layout with global providers (Toaster, QueryClient, TooltipProvider)
- `app/page.tsx` - Index page migrated from src/pages/Index.tsx
- `app/project/[id]/page.tsx` - Project detail page with dynamic routing
- `app/profile/[id]/page.tsx` - Profile page with dynamic routing
- `app/profile/[id]/edit/page.tsx` - Edit profile page with nested dynamic routing
- `app/submit/page.tsx` - Submit project page
- `app/not-found.tsx` - 404 page to replace React Router catch-all
- `app/api/` - Directory for API routes foundation
- `components/` - Migrated components with updated import paths
- `lib/` - Utility functions and hooks migrated to Next.js structure
- `package.json` - Updated dependencies and scripts for Next.js
- `tsconfig.json` - TypeScript configuration for Next.js
- `tailwind.config.ts` - Tailwind configuration for Next.js optimization

### Notes

- Components should maintain client/server boundaries appropriately
- Use `npx jest [optional/path/to/test/file]` to run tests if test files are created
- All existing functionality must be preserved during migration
- Next.js app router uses file-based routing instead of React Router DOM

## Tasks

- [x] 1.0 Next.js Foundation Setup and Configuration

  - [x] 1.1 Install Next.js 14+ and create initial app directory structure
  - [x] 1.2 Create `next.config.js` with path aliases and basic configuration
  - [x] 1.3 Update TypeScript configuration (`tsconfig.json`) for Next.js compatibility
  - [x] 1.4 Configure Tailwind CSS for Next.js optimization
  - [x] 1.5 Set up ESLint configuration following Next.js standards
  - [x] 1.6 Create basic `app/globals.css` and migrate global styles

- [x] 2.0 Project Structure and Directory Migration

  - [x] 2.1 Create app router directory structure (`app/`, `app/api/`, etc.)
  - [x] 2.2 Move and update `src/components/` to `components/` with updated import paths
  - [x] 2.3 Move and update `src/lib/` utilities to maintain `@/` alias compatibility
  - [x] 2.4 Migrate `src/hooks/` to Next.js compatible structure
  - [x] 2.5 Move `src/data/mockData.ts` and update import references
  - [x] 2.6 Update all component imports throughout the codebase to use new paths

- [x] 3.0 Routing and Navigation Migration

  - [x] 3.1 Create `app/page.tsx` from `src/pages/Index.tsx` (home route)
  - [x] 3.2 Create `app/project/[id]/page.tsx` from `src/pages/ProjectDetail.tsx`
  - [x] 3.3 Create `app/profile/[id]/page.tsx` from `src/pages/Profile.tsx`
  - [x] 3.4 Create `app/profile/[id]/edit/page.tsx` from `src/pages/EditProfile.tsx`
  - [x] 3.5 Create `app/submit/page.tsx` from `src/pages/SubmitProject.tsx`
  - [x] 3.6 Create `app/not-found.tsx` from `src/pages/NotFound.tsx`
  - [x] 3.7 Replace React Router `Link` components with Next.js `Link` throughout
  - [x] 3.8 Update navigation hooks to use `useRouter` and `usePathname` from `next/navigation`
  - [x] 3.9 Remove React Router DOM dependencies and routing setup

- [ ] 4.0 Dependencies and Build Configuration

  - [ ] 4.1 Remove Vite-specific dependencies (`vite`, `@vitejs/plugin-react`, etc.)
  - [ ] 4.2 Add Next.js dependencies and update React/React-DOM versions
  - [ ] 4.3 Update `package.json` scripts for Next.js (`dev`, `build`, `start`, `lint`)
  - [ ] 4.4 Verify shadcn/ui and Radix UI compatibility with Next.js
  - [ ] 4.5 Configure environment variable handling for Next.js patterns
  - [ ] 4.6 Update any bundler-specific configurations (asset handling, etc.)

- [ ] 5.0 Layout, Providers, and Final Integration Testing
  - [ ] 5.1 Create `app/layout.tsx` with HTML structure and metadata
  - [ ] 5.2 Set up global providers (Toaster, QueryClient, TooltipProvider) in root layout
  - [ ] 5.3 Configure proper client/server component boundaries using 'use client' directive
  - [ ] 5.4 Set up basic API routes foundation in `app/api/` directory
  - [ ] 5.5 Test all pages load correctly and navigation works between routes
  - [ ] 5.6 Verify all form submissions and user interactions function properly
  - [ ] 5.7 Ensure responsive design and theme switching continue to work
  - [ ] 5.8 Run development server and production build to verify no errors
  - [ ] 5.9 Clean up unused files (vite.config.ts, index.html, src/main.tsx)
  - [ ] 5.10 Update README.md with Next.js development instructions
