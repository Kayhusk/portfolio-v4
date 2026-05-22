"use client";
import { useEffect } from "react";

/**
 * Hook that scrolls to top on page load/refresh
 * Should be used in a layout component to ensure consistent behavior
 *
 * @param {object} options
 * @param {boolean} options.onMount - Scroll to top on mount (default: true)
 * @param {boolean} options.onRefresh - Scroll to top on page refresh (default: true)
 */
export function useScrollToTop({ onMount = true, onRefresh = true } = {}) {
  useEffect(() => {
    if (!onMount && !onRefresh) return;

    // Scroll to top immediately
    const scrollToTop = () => {
      window.scrollTo(0, 0);

      // Also reset history scroll restoration
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    };

    // Execute on mount
    if (onMount) {
      scrollToTop();
    }

    // Handle page show event (covers refresh and back/forward navigation)
    const handlePageShow = (event) => {
      if (onRefresh && event.persisted) {
        // Page was restored from bfcache (back/forward)
        scrollToTop();
      }
    };

    // Handle before unload to prepare for refresh
    const handleBeforeUnload = () => {
      if (onRefresh) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // Restore default scroll restoration on cleanup
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, [onMount, onRefresh]);
}

export default useScrollToTop;
