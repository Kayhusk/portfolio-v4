"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// Breakpoint constants aligned with CSS media queries
export const BREAKPOINTS = {
  mobile: 768,   // Mobile images, touch interactions
  tablet: 1000,  // Layout changes, GSAP animations
};

/**
 * Custom hook for responsive mobile detection
 * Provides both state (for React re-renders) and ref (for GSAP callbacks)
 *
 * @param {number} breakpoint - The breakpoint to check against (default: 768)
 * @returns {{ isMobile: boolean, isMobileRef: React.RefObject<boolean>, checkMobile: () => boolean }}
 */
export function useMobile(breakpoint = BREAKPOINTS.mobile) {
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);

  const checkMobile = useCallback(() => {
    if (typeof window === "undefined") return false;
    const mobile = window.innerWidth < breakpoint;
    isMobileRef.current = mobile;
    return mobile;
  }, [breakpoint]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkMobile]);

  return { isMobile, isMobileRef, checkMobile };
}

/**
 * Hook specifically for tablet/layout breakpoint (1000px)
 * Used for GSAP matchMedia and layout changes
 */
export function useTablet() {
  return useMobile(BREAKPOINTS.tablet);
}

export default useMobile;
