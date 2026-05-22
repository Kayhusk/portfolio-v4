"use client";
import "./CTACard.css";
import Button from "../Button/Button";
import Copy from "../Copy/Copy";

const CTACard = () => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-copy">
          <div className="cta-col">
            <Copy animateOnScroll={true}>
              <p className="sm">Available for work</p>
            </Copy>
          </div>

          <div className="cta-col">
            <Copy animateOnScroll={true}>
              <p className="lg">
                Open to freelance, contract, and long-term collaborations. If
                the idea is worth building, I am always up for the conversation.
              </p>
            </Copy>

            <Button
              animateOnScroll={true}
              delay={0.25}
              variant="dark"
              href="/contact"
            >
              Get in Touch
            </Button>
          </div>
        </div>

        <div className="cta-card">
          <div className="cta-card-copy">
            <div className="cta-card-col">
              <Copy animateOnScroll={true}>
                <h3>Kydek Studio</h3>
              </Copy>
            </div>

            <div className="cta-card-col">
              <Copy animateOnScroll={true}>
                <p>
                  Kydek Studio is where client work and personal experiments
                  meet. A place for building products, testing ideas, and
                  sharing the thinking behind the work.
                </p>

                <p>New work, notes, and experiments are on the way.</p>
              </Copy>

              <p className="coming-soon">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTACard;
