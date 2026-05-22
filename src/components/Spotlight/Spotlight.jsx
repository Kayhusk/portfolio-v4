"use client";
import "./Spotlight.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Spotlight = () => {
  const spotlightRef = useRef(null);

  useGSAP(
    () => {
      const scrollTriggerInstances = [];

      const initSpotlight = () => {
        new SplitType(".marquee-text-item h1", { types: "chars" });

        document
          .querySelectorAll(".marquee-container")
          .forEach((container, index) => {
            const marquee = container.querySelector(".marquee");
            const chars = container.querySelectorAll(".char");

            const marqueeTrigger = gsap.to(marquee, {
              x: index % 2 === 0 ? "5%" : "-15%",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "150% top",
                scrub: true,
              },
              force3D: true,
            });

            const charsTrigger = gsap.fromTo(
              chars,
              { fontWeight: 100 },
              {
                fontWeight: 900,
                duration: 1,
                ease: "none",
                stagger: {
                  each: 0.35,
                  from: index % 2 === 0 ? "end" : "start",
                  ease: "linear",
                },
                scrollTrigger: {
                  trigger: container,
                  start: "50% bottom",
                  end: "top top",
                  scrub: true,
                },
              }
            );

            if (marqueeTrigger.scrollTrigger) {
              scrollTriggerInstances.push(marqueeTrigger.scrollTrigger);
            }
            if (charsTrigger.scrollTrigger) {
              scrollTriggerInstances.push(charsTrigger.scrollTrigger);
            }
          });

        ScrollTrigger.refresh();
      };

      const waitForOtherTriggers = () => {
        const existingTriggers = ScrollTrigger.getAll();
        const hasPinnedTrigger = existingTriggers.some(
          (trigger) => trigger.vars && trigger.vars.pin
        );

        if (hasPinnedTrigger || existingTriggers.length > 0) {
          setTimeout(initSpotlight, 300);
        } else {
          initSpotlight();
        }
      };

      setTimeout(waitForOtherTriggers, 100);

      return () => {
        scrollTriggerInstances.forEach((trigger) => trigger.kill());
      };
    },
    { scope: spotlightRef }
  );

  return (
    <section className="spotlight" ref={spotlightRef}>
      <div className="marquees">
        <div className="marquee-container" id="marquee-1">
          <div className="marquee">
            <div className="marquee-img-item" style={{ backgroundColor: "#646CFF" }}>
              <img src="/skills/vite.svg" alt="Vite" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>React.js</h1>
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#E6E6FA" }}>
              <img src="/skills/redux.svg" alt="Redux" />
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#0ae448" }}>
              <img src="/skills/gsap.png" alt="GSAP" />
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#0055FF" }}>
              <img src="/skills/framer-motion.svg" alt="Framer Motion" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-2">
          <div className="marquee">
            <div className="marquee-img-item" style={{ backgroundColor: "#DCDCDC" }}>
              <img src="/skills/vercel.svg" alt="Vercel" />
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#E0F7FA" }}>
              <img src="/skills/tailwind.png" alt="Tailwind CSS" />
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#F5F5F5" }}>
              <img src="/skills/shadcn.png" alt="shadcn/ui" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Next.js</h1>
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#FFF5EE" }}>
              <img src="/skills/figma.png" alt="Figma" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-3">
          <div className="marquee">
            <div className="marquee-img-item" style={{ backgroundColor: "#627EEA" }}>
              <img src="/skills/eth.png" alt="Ethereum" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Web3</h1>
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#F0F8FF" }}>
              <img src="/skills/solidityjs.svg" alt="Solidity" />
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#F6851B" }}>
              <img src="/skills/metamask.png" alt="MetaMask" />
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#F5FFFA" }}>
              <img src="/skills/threejs.png" alt="Three.js" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-4">
          <div className="marquee">
            <div className="marquee-img-item" style={{ backgroundColor: "#E8F5E9" }}>
              <img src="/skills/nodejs.png" alt="Node.js" />
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#336791" }}>
              <img src="/skills/postgressql.png" alt="PostgreSQL" />
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#FDF5E6" }}>
              <img src="/skills/git.png" alt="Git" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>TypeScript</h1>
            </div>
            <div className="marquee-img-item" style={{ backgroundColor: "#FFFAF0" }}>
              <img src="/skills/postman.webp" alt="Postman" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
