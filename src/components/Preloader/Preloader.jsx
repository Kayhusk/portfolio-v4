"use client";
import "./Preloader.css";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { waitForFonts } from "@/lib/utils/fonts";

gsap.registerPlugin(useGSAP, SplitText, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export let isInitialLoad = true;

// Allow external code to mark initial load as complete (used when static logo is shown on non-home pages)
export function setInitialLoadComplete() {
  isInitialLoad = false;
}

const Preloader = () => {
  const preloaderRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(
    () => {
      if (!showPreloader) return;
      setLoaderAnimating(true);

      const initializeAnimation = async () => {
        await waitForFonts(["Big Shoulders Display"]);

        // Query logo element globally (it's in ClientLayout, not scoped to preloader)
        const preloaderHeader = document.querySelector(".preloader-header");
        const preloaderHeaderLink = document.querySelector(".preloader-header a");

        if (!preloaderHeaderLink) return;

        gsap.set(preloaderHeaderLink, { opacity: 0 });

        const preloaderHeaderSplit = SplitText.create(preloaderHeaderLink, {
          type: "chars",
          charsClass: "char",
          mask: "chars",
        });

        const preloaderCopySplit = SplitText.create(".preloader-copy p", {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });

        const chars = preloaderHeaderSplit.chars;
        const lines = preloaderCopySplit.lines;
        const initialChar = chars[0];
        const lastChar = chars[chars.length - 1];

        chars.forEach((char, index) => {
          gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
        });

        gsap.set(lines, { yPercent: 100 });
        gsap.set(preloaderHeaderLink, { opacity: 1 });
        gsap.set(".preloader-copy p", { opacity: 1 });

        const preloaderImages = gsap.utils.toArray(".preloader-images .img");
        const preloaderImagesInner = gsap.utils.toArray(
          ".preloader-images .img img"
        );

        const tl = gsap.timeline({ delay: 0.25 });

        tl.to(".progress-bar", {
          scaleX: 1,
          duration: 4,
          ease: "power3.inOut",
        })
          .set(".progress-bar", { transformOrigin: "right" })
          .to(".progress-bar", {
            scaleX: 0,
            duration: 1,
            ease: "power3.in",
          });

        preloaderImages.forEach((preloaderImg, index) => {
          tl.to(
            preloaderImg,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1,
              ease: "hop",
              delay: index * 0.75,
            },
            "-=5"
          );
        });

        preloaderImagesInner.forEach((preloaderImageInner, index) => {
          tl.to(
            preloaderImageInner,
            {
              scale: 1,
              duration: 1.5,
              ease: "hop",
              delay: index * 0.75,
            },
            "-=5.25"
          );
        });

        tl.to(
          lines,
          {
            yPercent: 0,
            duration: 2,
            ease: "hop",
            stagger: 0.1,
          },
          "-=5.5"
        );

        tl.to(
          chars,
          {
            yPercent: 0,
            duration: 1,
            ease: "hop",
            stagger: 0.025,
          },
          "-=5"
        );

        tl.to(
          ".preloader-images",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
          },
          "-=1.5"
        );

        tl.to(
          lines,
          {
            y: "-125%",
            duration: 2,
            ease: "hop",
            stagger: 0.1,
          },
          "-=2"
        );

        tl.to(
          chars,
          {
            yPercent: (index) => {
              if (index === 0 || index === chars.length - 1) {
                return 0;
              }
              return index % 2 === 0 ? 100 : -100;
            },
            duration: 1,
            ease: "hop",
            stagger: 0.025,
            delay: 0.5,
            onStart: () => {
              const initialCharMask = initialChar.parentElement;
              const lastCharMask = lastChar.parentElement;

              if (
                initialCharMask &&
                initialCharMask.classList.contains("char-mask")
              ) {
                initialCharMask.style.overflow = "visible";
              }

              if (lastCharMask && lastCharMask.classList.contains("char-mask")) {
                lastCharMask.style.overflow = "visible";
              }

              const viewportWidth = window.innerWidth;
              const centerX = viewportWidth / 2;
              const initialCharRect = initialChar.getBoundingClientRect();
              const lastCharRect = lastChar.getBoundingClientRect();

              gsap.to([initialChar, lastChar], {
                duration: 1,
                ease: "hop",
                delay: 0.5,
                x: (i) => {
                  if (i === 0) {
                    return centerX - initialCharRect.left - initialCharRect.width;
                  } else {
                    return centerX - lastCharRect.left;
                  }
                },
                onComplete: () => {
                  gsap.set(preloaderHeader, { mixBlendMode: "difference" });

                  // Responsive offset for logo position
                  const isMobile = viewportWidth <= 1000;
                  const logoOffset = isMobile ? 40 : 80;
                  const scaleValue = isMobile ? 0.4 : 0.35;

                  // Scale down and move to top
                  gsap.to(preloaderHeader, {
                    y: isMobile ? "1.25rem" : "2rem",
                    scale: scaleValue,
                    duration: 1.75,
                    ease: "hop",
                  });

                  // Move to the left (logo position) - starts with delay to sync with hero content
                  gsap.to(preloaderHeader, {
                    x: -(viewportWidth / 2) + logoOffset,
                    duration: 1.2,
                    delay: 1.5,
                    ease: "hop",
                  });
                },
              });
            },
          },
          "-=2.5"
        );

        tl.to(
          ".preloader",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.75,
            ease: "hop",
            onStart: () => {
              gsap.set(".preloader", { pointerEvents: "none" });
            },
            onComplete: () => {
              setTimeout(() => {
                setLoaderAnimating(false);
                setShowPreloader(false);
              }, 100);
            },
          },
          "-=0.5"
        );
      };

      initializeAnimation();
    },
    { scope: preloaderRef, dependencies: [showPreloader] }
  );

  return (
    <>
      {showPreloader && (
        <div className="preloader" ref={preloaderRef}>
          <div className="progress-bar"></div>

          <div className="preloader-images">
            <div className="img">
              <img src="/profile/profile-1.png" alt="" />
            </div>
            <div className="img">
              <img src="/profile/profile-2.png" alt="" />
            </div>
            <div className="img">
              <img src="/profile/profile-3.jpg" alt="" />
            </div>
            <div className="img">
              <img src="/profile/profile-4.png" alt="" />
            </div>
          </div>

          <div className="preloader-copy">
            <p>
              Full Stack Developer specializing in high-performance web apps,
              interactive interfaces, and seamless user experiences.
            </p>
          </div>
        </div>
      )}
      {/* Logo element is in ClientLayout for persistence across navigation */}
    </>
  );
};

export default Preloader;
