"use client";
import "./home.css";
import Button from "@/components/Button/Button";
import Showreel from "@/components/Showreel/Showreel";
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTACard from "@/components/CTACard/CTACard";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Page = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useGSAP(
    () => {
      const dividers = gsap.utils.toArray(".hero .header-row .divider");

      gsap.to(dividers, {
        scaleX: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        delay: isInitialLoad ? 6.0 : 0.75,
      });
    },
    { scope: heroRef }
  );

  return (
    <>
      <Preloader />
      <section className="hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content-main">
            <div className="hero-header">
              <div className="header-row">
                <div className="divider"></div>
                <Copy animateOnScroll={false} delay={isInitialLoad ? 6.0 : 0.75}>
                  <h1>Turning Bold Ideas</h1>
                </Copy>
              </div>
              <div className="header-row">
                <div className="divider"></div>
                <Copy animateOnScroll={false} delay={isInitialLoad ? 6.1 : 0.85}>
                  <h1>into Impactful</h1>
                </Copy>
              </div>
              <div className="header-row">
                <div className="divider"></div>
                <Copy animateOnScroll={false} delay={isInitialLoad ? 6.2 : 0.95}>
                  <h1>Digital Products</h1>
                </Copy>
              </div>
            </div>

            <div className="hero-footer-outer">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 6.6 : 1.65}>
                <p className="sm">&copy; Kydek Studio</p>
                <p className="sm">All Rights Reserved</p>
              </Copy>
            </div>

            <div className="hero-footer">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 6.3 : 1.15}>
                <p className="lg">
                  I help turn rough ideas into sharp digital products with strong UX, thoughtful motion, and code that actually holds up.
                </p>
              </Copy>

              <Button delay={isInitialLoad ? 6.6 : 1.55} href="/studio">
                Visit the Studio
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Showreel />

      <section className="featured-work">
        <div className="container">
          <div className="featured-work-header-content">
            <div className="featured-work-header">
              <Copy animateOnScroll={true} delay={0.25}>
                <h1>Featured Work</h1>
              </Copy>
            </div>

            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 32 32"
                fill="none"
                className="icon"
              >
                <path
                  d="M16 26.6665L16 5.33317"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M22.6667 19.9999L16 26.6665L9.33337 19.9998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>

            <div className="featured-work-header-copy">
              <Copy animateOnScroll={true} delay={0.25}>
                <p className="lg">
                  A few favorite builds born from late nights, sharp instincts, and ideas worth seeing through.
                </p>
              </Copy>
            </div>
          </div>

          <FeaturedWork />
        </div>
      </section>

      <Spotlight />

      <section className="client-reviews-header-container">
        <div className="container">
          <div className="client-reviews-header-content">
            <div className="client-reviews-header">
              <Copy animateOnScroll={true} delay={0.25}>
                <h1>Client Notes</h1>
              </Copy>
            </div>

            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 32 32"
                fill="none"
                className="icon"
              >
                <path
                  d="M16 26.6665L16 5.33317"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M22.6667 19.9999L16 26.6665L9.33337 19.9998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>

            <div className="client-reviews-header-copy">
              <Copy animateOnScroll={true} delay={0.25}>
                <p className="lg">
                  A few words from the people who trusted me with the work.
                </p>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <ClientReviews />

      <CTACard />

      <Footer />
    </>
  );
};

export default Page;
