/**
 * Application-wide constants
 */

// Breakpoints
export const BREAKPOINTS = {
  mobile: 1000,
  tablet: 768,
  desktop: 1440,
};

// Animation timing
export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
    verySlow: 1.5,
  },
  ease: {
    default: "power4.out",
    smooth: "power3.inOut",
    bounce: "back.out(1.7)",
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
};

// Custom fonts used in the project
export const CUSTOM_FONTS = [
  "Geist Mono",
  "PP Neue Montreal",
  "PP Pangram Sans",
  "Big Shoulders Display",
];

// Routes
export const ROUTES = {
  home: "/",
  work: "/work",
  studio: "/studio",
  stories: "/stories",
  contact: "/contact",
  sampleProject: "/sample-project",
};
