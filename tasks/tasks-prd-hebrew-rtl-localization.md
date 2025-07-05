## Relevant Files

- `app/layout.tsx` - Root layout component requiring HTML dir attribute and RTL configuration
- `app/globals.css` - Global CSS file for RTL base styles and font definitions
- `tailwind.config.ts` - Tailwind configuration for RTL support and Hebrew fonts
- `components/Header.tsx` - Header component requiring RTL navigation and logo positioning
- `components/Sidebar.tsx` - Sidebar component requiring right-side positioning and RTL alignment
- `components/ProjectCard.tsx` - Project card component requiring RTL layout and content flow
- `components/ProjectList.tsx` - Project list component requiring RTL grid layout adaptation
- `components/FilterBar.tsx` - Filter bar component requiring RTL dropdown positioning
- `components/SubmitForm.tsx` - Form component requiring RTL input alignment and validation
- `components/ui/` - All UI components requiring RTL compatibility testing
- `data/mockData.ts` - Mock data requiring Hebrew translation
- `app/page.tsx` - Main page component requiring Hebrew content translation
- `app/submit/page.tsx` - Submit page requiring Hebrew form labels and content
- `app/profile/[id]/page.tsx` - Profile page requiring Hebrew content translation
- `app/profile/[id]/edit/page.tsx` - Profile edit page requiring Hebrew form translation
- `app/project/[id]/page.tsx` - Project detail page requiring Hebrew content translation
- `app/not-found.tsx` - 404 page requiring Hebrew error messages

### Notes

- Focus on component-level RTL implementation rather than unit tests in this phase
- Test RTL layout on various screen sizes and browsers
- Ensure all shadcn/ui components work correctly with RTL direction
- Use `npm run dev` to test changes locally with Hebrew RTL layout

## Tasks

- [x] 1.0 Technical Infrastructure Setup
  - [x] 1.1 Configure Tailwind CSS for RTL support in `tailwind.config.ts`
  - [x] 1.2 Add Hebrew font stack to global CSS configuration
  - [x] 1.3 Set up RTL-specific CSS utilities and classes
  - [x] 1.4 Update HTML dir attribute to "rtl" in root layout
  - [x] 1.5 Configure Next.js for RTL direction support
- [ ] 2.0 Core Layout RTL Implementation
  - [ ] 2.1 Update `app/layout.tsx` with RTL HTML structure and meta tags
  - [ ] 2.2 Implement RTL base styles in `app/globals.css`
  - [ ] 2.3 Convert main layout containers to RTL flow
  - [ ] 2.4 Ensure proper text alignment (right-aligned for Hebrew)
  - [ ] 2.5 Update CSS logical properties for better RTL support
- [ ] 3.0 Component RTL Conversion
  - [ ] 3.1 Convert `components/Header.tsx` for RTL navigation and logo positioning
  - [ ] 3.2 Update `components/Sidebar.tsx` to appear on right side with proper alignment
  - [ ] 3.3 Adapt `components/ProjectCard.tsx` for RTL content flow and button positioning
  - [ ] 3.4 Convert `components/ProjectList.tsx` for RTL grid layout
  - [ ] 3.5 Update `components/FilterBar.tsx` for RTL dropdown positioning and filter alignment
  - [ ] 3.6 Adapt `components/SubmitForm.tsx` for RTL input alignment and label positioning
  - [ ] 3.7 Review and fix all `components/ui/` components for RTL compatibility
  - [ ] 3.8 Update mobile responsive behavior for RTL layout
- [ ] 4.0 Content Translation to Hebrew
  - [ ] 4.1 Translate all static text and UI labels in page components
  - [ ] 4.2 Convert navigation menu items to Hebrew in Header component
  - [ ] 4.3 Translate form labels, placeholders, and validation messages
  - [ ] 4.4 Convert button text and call-to-action elements to Hebrew
  - [ ] 4.5 Translate project data and descriptions in `data/mockData.ts`
  - [ ] 4.6 Convert error messages and system notifications to Hebrew
  - [ ] 4.7 Update 404 page (`app/not-found.tsx`) with Hebrew error messages
  - [ ] 4.8 Ensure mixed Hebrew-English content (brand name) displays correctly
