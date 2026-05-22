/**
 * Lenis smooth scroll configuration
 */

// Shared easing function
const lenisEasing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const LENIS_CONFIG = {
  mobile: {
    duration: 0.8,
    easing: lenisEasing,
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: true,
    touchMultiplier: 1.5,
    infinite: false,
    lerp: 0.09,
    wheelMultiplier: 1,
    orientation: "vertical",
    smoothWheel: true,
    syncTouch: true,
  },
  desktop: {
    duration: 1.2,
    easing: lenisEasing,
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1,
    wheelMultiplier: 1,
    orientation: "vertical",
    smoothWheel: true,
    syncTouch: true,
  },
};
