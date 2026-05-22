"use client";
import "./work.css";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useMobile } from "@/hooks/useMobile";
import { useProjectNavigation } from "@/hooks/useProjectNavigation";
import { projects } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const WorkCarousel = () => {
  const { navigateWithTransition } = useViewTransition();
  const { isMobile, isMobileRef } = useMobile();
  const { initialProjectIndex, initialProject } = useProjectNavigation();

  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderImagesRef = useRef(null);
  const sliderTitleRef = useRef(null);
  const sliderIndicesRef = useRef(null);
  const progressBarRef = useRef(null);

  // Use refs for mutable values to avoid re-renders
  const activeSlideRef = useRef(initialProjectIndex);
  const currentSplitRef = useRef(null);
  const initialProjectIndexRef = useRef(initialProjectIndex);
  const scrollTriggerRef = useRef(null);
  const pinDistanceRef = useRef(0);
  const lenisRef = useRef(null);

  const lenis = useLenis();

  // Keep lenisRef updated with current lenis instance
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  // Scroll to top on page refresh and reset URL
  useEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0];
    const isPageRefresh = performance.navigation?.type === 1 ||
      navEntry?.type === "reload";

    if (isPageRefresh) {
      window.scrollTo(0, 0);
      // Clear the project param from initial refs so it doesn't auto-scroll
      initialProjectIndexRef.current = 0;
      // Reset URL to default /work without query params
      if (window.location.search) {
        window.history.replaceState({}, "", "/work");
      }
    }
  }, []);

  // Get initial image based on viewport and URL params
  const getInitialImage = () => {
    const project = initialProject || projects[0];
    if (!project) return "";
    return isMobile && project.mobileImg ? project.mobileImg : project.img;
  };

  const [initialImage, setInitialImage] = useState(getInitialImage);

  // Update initial image when mobile state or project changes
  useEffect(() => {
    setInitialImage(getInitialImage());
  }, [isMobile, initialProject]);

  // Use all projects for the carousel
  const slides = useMemo(
    () =>
      projects.map((project) => ({
        name: project.name,
        slug: project.slug,
        description: project.description,
        image: project.img,
        mobileImage: project.mobileImg,
        route: project.route,
        externalUrl: project.externalUrl,
      })),
    []
  );

  // Main setup - runs once like original DOMContentLoaded
  useGSAP(
    () => {
      if (!sliderRef.current || !sliderIndicesRef.current) return;

      const sliderImages = sliderImagesRef.current;
      const sliderTitle = sliderTitleRef.current;
      const sliderIndices = sliderIndicesRef.current;
      const progressBar = progressBarRef.current;

      let activeSlide = 0;
      let currentSplit = null;

      const pinDistance = window.innerHeight * slides.length;

      // Sync Lenis with ScrollTrigger
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
      }

      // Scroll to a specific project index
      function scrollToProject(index, smooth = true) {
        const currentLenis = lenisRef.current;
        if (!currentLenis || !scrollTriggerRef.current) return;

        const targetProgress = (index + 0.5) / slides.length;
        const targetScroll = scrollTriggerRef.current.start + (pinDistanceRef.current * targetProgress);

        if (smooth) {
          currentLenis.scrollTo(targetScroll, { duration: 1.2 });
        } else {
          currentLenis.scrollTo(targetScroll, { immediate: true });
        }
      }

      // Create indices - matching original exactly
      function createIndices() {
        sliderIndices.innerHTML = "";

        slides.forEach((_, index) => {
          const indexNum = (index + 1).toString().padStart(2, "0");
          const indicatorElement = document.createElement("p");
          indicatorElement.dataset.index = index;
          indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
          sliderIndices.appendChild(indicatorElement);

          // Add click handler for each indicator
          indicatorElement.addEventListener("click", () => {
            scrollToProject(index, true);
          });

          if (index === 0) {
            gsap.set(indicatorElement.querySelector(".index"), {
              opacity: 1,
            });
            gsap.set(indicatorElement.querySelector(".marker"), {
              scaleX: 1,
            });
          } else {
            gsap.set(indicatorElement.querySelector(".index"), {
              opacity: 0.35,
            });
            gsap.set(indicatorElement.querySelector(".marker"), {
              scaleX: 0,
            });
          }
        });
      }

      // Animate new slide - matching original exactly
      function animateNewSlide(index) {
        const newSliderImage = document.createElement("img");
        // Use mobile image on mobile viewport
        const slide = slides[index];
        newSliderImage.src = isMobileRef.current && slide.mobileImage ? slide.mobileImage : slide.image;
        newSliderImage.alt = `Slide ${index + 1}`;

        gsap.set(newSliderImage, {
          opacity: 0,
          scale: 1.1,
        });

        sliderImages.appendChild(newSliderImage);

        gsap.to(newSliderImage, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(newSliderImage, {
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });

        const allImages = sliderImages.querySelectorAll("img");
        if (allImages.length > 3) {
          const removeCount = allImages.length - 3;
          for (let i = 0; i < removeCount; i++) {
            sliderImages.removeChild(allImages[i]);
          }
        }

        animateNewTitle(index);
        animateIndicators(index);
      }

      // Animate indicators - matching original exactly
      function animateIndicators(index) {
        const indicators = sliderIndices.querySelectorAll("p");

        indicators.forEach((indicator, i) => {
          const markerElement = indicator.querySelector(".marker");
          const indexElement = indicator.querySelector(".index");

          if (i === index) {
            gsap.to(indexElement, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(markerElement, {
              scaleX: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            gsap.to(indexElement, {
              opacity: 0.5,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(markerElement, {
              scaleX: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      }

      // Animate new title - matching original exactly
      function animateNewTitle(index) {
        if (currentSplit) {
          currentSplit.revert();
        }

        sliderTitle.innerHTML = `
          <p class="sm slide-name">${slides[index].name}</p>
          <h4>${slides[index].description}</h4>
        `;

        const heading = sliderTitle.querySelector("h4");
        const nameElement = sliderTitle.querySelector(".slide-name");

        // Only apply SplitText animation if heading exists and has content
        if (heading && heading.textContent.trim()) {
          currentSplit = new SplitText(heading, {
            type: "lines",
            linesClass: "line",
          });

          gsap.set(currentSplit.lines, {
            y: 30,
            opacity: 0,
          });

          gsap.to(currentSplit.lines, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          });
        }

        gsap.set(nameElement, {
          opacity: 0,
          y: 20,
        });

        gsap.to(nameElement, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      // Initialize - matching original exactly
      createIndices();

      // First slide title is pre-rendered in JSX (matching original HTML approach)

      // Store pinDistance in ref for click handlers
      pinDistanceRef.current = pinDistance;

      // Create ScrollTrigger - matching original exactly
      const scrollTrigger = ScrollTrigger.create({
        trigger: sliderRef.current,
        start: "top top",
        end: `+=${pinDistance}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          gsap.set(progressBar, {
            scaleY: self.progress,
          });

          const currentSlide = Math.floor(self.progress * slides.length);

          if (activeSlide !== currentSlide && currentSlide < slides.length) {
            activeSlide = currentSlide;
            activeSlideRef.current = activeSlide;
            animateNewSlide(activeSlide);
          }
        },
      });

      // Store scrollTrigger ref for click handlers
      scrollTriggerRef.current = scrollTrigger;

      // If URL has a project param, scroll to that project
      if (initialProjectIndexRef.current > 0) {
        // Delay to ensure ScrollTrigger and Lenis are fully initialized
        setTimeout(() => {
          scrollToProject(initialProjectIndexRef.current, true);
        }, 150);
      }
    },
    { scope: containerRef }
  );

  const handleSlideClick = (e) => {
    const currentIndex = activeSlideRef.current;
    if (currentIndex < slides.length) {
      e.preventDefault();
      const currentSlide = slides[currentIndex];
      // If project has an external URL, open in new tab
      if (currentSlide.externalUrl) {
        window.open(currentSlide.externalUrl, "_blank", "noopener,noreferrer");
      } else {
        navigateWithTransition(currentSlide.route);
      }
    }
  };

  return (
    <div className="work-carousel-container" ref={containerRef}>
      <section className="carousel-intro">
        <h2>
          Less talk, more proof. Scroll through the work and see what made the cut.
        </h2>
      </section>

      <section className="slider" ref={sliderRef}>
        <div
          className="slider-images"
          ref={sliderImagesRef}
          onClick={handleSlideClick}
        >
          <img src={initialImage} alt="Slide 1" />
        </div>

        <div className="slider-title" ref={sliderTitleRef}>
          <p className="sm slide-name">{projects[0].name}</p>
          <h4>{projects[0].description}</h4>
        </div>

        <div className="slider-indicator">
          <div className="slider-indices" ref={sliderIndicesRef}></div>
          <div className="slider-progress-bar">
            <div className="slider-progress" ref={progressBarRef}></div>
          </div>
        </div>

        <button className="slider-cta" onClick={handleSlideClick}>
          View Project
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </section>

      <section className="carousel-outro">
        <h2>
          Some launched fast. Some evolved quietly. All of them taught me
          something worth carrying into the next build.
        </h2>
      </section>
    </div>
  );
};

// Wrap in Suspense for useSearchParams
const Page = () => {
  return (
    <Suspense fallback={<div className="work-carousel-container" />}>
      <WorkCarousel />
    </Suspense>
  );
};

export default Page;
