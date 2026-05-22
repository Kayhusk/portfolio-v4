"use client";
import "./Showreel.css";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMobile } from "@/hooks/useMobile";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const showreelFrames = [
  {
    desktop: "/work-projects/desktop/timaski.png",
    mobile: "/work-projects/mobile/timaski.png",
  },
  {
    desktop: "/work-projects/desktop/connect2pet.png",
    mobile: "/work-projects/mobile/connect2pet.png",
  },
  {
    desktop: "/work-projects/desktop/throu-investments.png",
    mobile: "/work-projects/mobile/throu-investments.png",
  },
  {
    desktop: "/work-projects/desktop/foldly.png",
    mobile: "/work-projects/mobile/foldly.png",
  },
  {
    desktop: "/work-projects/desktop/arlenis-designs.png",
    mobile: "/work-projects/mobile/arlenis-designs.png",
  },
  {
    desktop: "/work-projects/desktop/crazy-clips.png",
    mobile: "/work-projects/mobile/crazy-clips.png",
  },
  {
    desktop: "/work-projects/desktop/stay-maxxed.png",
    mobile: "/work-projects/mobile/stay-maxxed.png",
  },
];

const Showreel = () => {
  const showreelSecRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Use the mobile hook for responsive images
  const { isMobile } = useMobile();

  const totalFrames = showreelFrames.length;
  const frameInterval = 500;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1000px)", () => {
        const scrollTriggerInstances = [];

        const frameTimeline = gsap.timeline({ repeat: -1 });

        for (let i = 0; i < totalFrames; i++) {
          frameTimeline.add(() => {
            setCurrentFrame(i);
          }, i * (frameInterval / 1000));
        }

        const scrollTrigger = ScrollTrigger.create({
          trigger: showreelSecRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}px`,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;

            const scaleValue = gsap.utils.mapRange(0, 1, 0.75, 1, progress);
            const borderRadiusValue =
              progress <= 0.5 ? gsap.utils.mapRange(0, 0.5, 2, 0, progress) : 0;

            gsap.set(".showreel-container", {
              scale: scaleValue,
              borderRadius: `${borderRadiusValue}rem`,
            });
          },
        });

        if (scrollTrigger) {
          scrollTriggerInstances.push(scrollTrigger);
        }

        const refreshHandler = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener("orientationchange", refreshHandler);
        window.addEventListener("resize", refreshHandler);

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad, { passive: true });

        return () => {
          frameTimeline.kill();

          scrollTriggerInstances.forEach((trigger) => trigger.kill());

          window.removeEventListener("orientationchange", refreshHandler);
          window.removeEventListener("resize", refreshHandler);
          window.removeEventListener("load", onLoad);
        };
      });

      mm.add("(max-width: 999px)", () => {
        const showreelSection = showreelSecRef.current;
        if (showreelSection) {
          gsap.set(showreelSection, { clearProps: "all" });
        }
        gsap.set(".showreel-container", { clearProps: "all" });

        // Frame cycling animation for mobile (without scroll effects)
        const frameTimeline = gsap.timeline({ repeat: -1 });

        for (let i = 0; i < totalFrames; i++) {
          frameTimeline.add(() => {
            setCurrentFrame(i);
          }, i * (frameInterval / 1000));
        }

        ScrollTrigger.refresh();

        const refreshHandler = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener("orientationchange", refreshHandler);
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad, { passive: true });

        return () => {
          frameTimeline.kill();
          window.removeEventListener("orientationchange", refreshHandler);
          window.removeEventListener("load", onLoad);
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: showreelSecRef }
  );

  return (
    <section className="showreel" ref={showreelSecRef}>
      <div className="showreel-container">
        <div className="showreel-overlay"></div>
        <img
          src={
            isMobile
              ? showreelFrames[currentFrame].mobile
              : showreelFrames[currentFrame].desktop
          }
          alt="Showreel frame"
        />
        <p className="showreel-text">Sneak Peek 👀</p>
      </div>
    </section>
  );
};

export default Showreel;
