# Refactoring Todo List

## Phase 1: Quick Wins (Eliminate Duplication)

- [x] Create `lib/` folder structure with utils, config, and constants
- [x] Extract duplicate font loading utility to `lib/utils/fonts.js`
- [ ] Create `useScrollTriggerRefresh` custom hook (skipped - behavior varies between components)
- [ ] Create `useResponsiveAnimation` custom hook (skipped - behavior varies between components)
- [x] Move data files to centralized `src/data/` folder
- [ ] Add CSS utility classes to `globals.css` (skipped - would require updating all component CSS)

## Phase 2: Architecture Fixes

- [ ] Fix mutable module-level state in Preloader (`isInitialLoad`) (skipped - changing to sessionStorage would alter behavior)
- [x] Extract Lenis scroll config to `lib/config/lenis.js`
- [x] Move `client-layout.js` to `components/providers/`

## Phase 3: Type Safety & Stability

- [x] Add PropTypes to Button, Copy, and Menu components
- [ ] Add null checks to unsafe querySelector calls (future improvement)
- [ ] Refactor FeaturedWork to use React JSX instead of innerHTML (future improvement)

---

## Completed Changes Summary

### New Folder Structure
```
src/
├── lib/
│   ├── constants.js          # Breakpoints, animation timing, custom fonts, routes
│   ├── config/
│   │   └── lenis.js          # Lenis scroll configuration (mobile & desktop)
│   └── utils/
│       ├── fonts.js          # Shared waitForFonts utility
│       └── index.js          # Barrel export
├── data/
│   ├── client-reviews.js     # Client reviews data
│   ├── projects.js           # Featured work projects
│   ├── stories.js            # Story slides data
│   ├── team-members.js       # Team members data
│   └── index.js              # Barrel export
└── components/
    └── providers/
        └── ClientLayout.jsx  # Moved from src/client-layout.js
```

### Files Modified
- `src/components/Button/Button.jsx` - Added PropTypes, uses shared font utility
- `src/components/Copy/Copy.jsx` - Added PropTypes, uses shared font utility
- `src/components/Menu/Menu.jsx` - Added PropTypes
- `src/components/Preloader/Preloader.jsx` - Uses shared font utility
- `src/components/ClientReviews/ClientReviews.jsx` - Uses centralized data
- `src/components/FeaturedWork/FeaturedWork.js` - Uses centralized data
- `src/components/TeamCards/TeamCards.jsx` - Uses centralized data
- `src/components/StorySlides/StorySlides.jsx` - Uses centralized data
- `src/app/layout.js` - Updated import path for ClientLayout

### Files Deleted
- `src/client-layout.js` (moved to components/providers/)
- `src/components/ClientReviews/clientReviewsData.js` (moved to data/)
- `src/components/FeaturedWork/project.js` (moved to data/)
- `src/components/TeamCards/teamMembers.js` (moved to data/)
- `src/components/StorySlides/stories.js` (moved to data/)

### Dependencies Added
- `prop-types` - Runtime prop validation

---

## Progress Notes

### Phase 1 Progress
- Created lib/ folder with constants, config, and utils
- Extracted duplicate waitForFonts function (was in 3 components)
- Centralized all data files in src/data/
- Reduced code duplication significantly

### Phase 2 Progress
- Moved ClientLayout to proper providers folder
- Extracted Lenis configuration to separate config file
- Using BREAKPOINTS constant instead of magic number 1000

### Phase 3 Progress
- Added PropTypes validation to Button, Copy, and Menu components
- Provides runtime prop validation in development mode
