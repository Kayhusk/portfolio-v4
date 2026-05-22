"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import Menu from "@/components/Menu/Menu";
import { LENIS_CONFIG } from "@/lib/config/lenis";
import { isInitialLoad, setInitialLoadComplete } from "@/components/Preloader/Preloader";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useTablet } from "@/hooks/useMobile";
import gsap from "gsap";

export default function ClientLayout({ children }) {
  const pageRef = useRef();
  const logoRef = useRef();
  const staticLogoRef = useRef();
  const pathname = usePathname();

  // Show static logo only on non-home page initial loads (before preloader has ever run)
  const [showStaticLogo, setShowStaticLogo] = useState(false);

  // Scroll to top on page refresh
  useScrollToTop();

  // Use the tablet breakpoint for layout changes
  const { isMobile } = useTablet();

  // Track if we showed the static logo (persists for the session)
  const usedStaticLogo = useRef(false);

  // Handle static logo visibility and logo positioning
  useEffect(() => {
    const isHomePage = pathname === "/";
    const viewportWidth = window.innerWidth;
    const isMobileView = viewportWidth <= 1000;
    const logoOffset = isMobileView ? 40 : 80;
    const scaleValue = isMobileView ? 0.4 : 0.35;

    // Fresh load on non-home page - show static logo and mark initial load complete
    // This prevents Preloader from running when navigating to home later
    if (isInitialLoad && !isHomePage && !showStaticLogo) {
      setShowStaticLogo(true);
      usedStaticLogo.current = true;
      setInitialLoadComplete(); // Preloader won't run on subsequent home navigation
    }
    // If we used static logo, keep it visible everywhere (don't switch to preloader's logo)
    // User can do a full page refresh to see the Preloader animation
    else if (usedStaticLogo.current) {
      // Static logo stays visible, nothing to do
    }
    // Normal navigation after preloader has run - position the preloader's logo
    else if (!isInitialLoad && logoRef.current) {
      gsap.set(logoRef.current, {
        y: isMobileView ? "1.25rem" : "2rem",
        x: -(viewportWidth / 2) + logoOffset,
        scale: scaleValue,
        mixBlendMode: "difference",
      });
    }
  }, [pathname, showStaticLogo]);

  const scrollSettings = isMobile ? LENIS_CONFIG.mobile : LENIS_CONFIG.desktop;

  return (
    <ReactLenis root options={scrollSettings}>
      <Menu pageRef={pageRef} />

      {/* Preloader's logo - used for the animation on home page */}
      <div className="preloader-header" ref={logoRef}>
        <a href="/">Edward Bowie</a>
      </div>

      {/* Static "EE" logo - matches preloader's final state */}
      {showStaticLogo && (
        <a href="/" className="static-logo" ref={staticLogoRef}>
          EE
        </a>
      )}

      <div className="page" ref={pageRef}>
        {children}
      </div>
    </ReactLenis>
  );
}
