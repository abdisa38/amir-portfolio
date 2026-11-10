import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight, Check, Clapperboard, Film, Layers3, ShieldCheck } from "lucide-react";
import { currencyCode, pricing } from "../content/experience";
import { Reveal, SpotlightCard, ease } from "../components/Motion";
import FAQ from "../components/FAQ";

export default function PricingPage() {
  const [billing, setBilling] = useState<"project" | "monthly">("project");
  const reduced = useReducedMotion();
  return (
    <>
      <section className="pricing-page section-space" id="pricing">
        <div className="page-container">
          <Reveal className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>Pricing
          </Reveal>
          <Reveal className="page-intro">
            <span className="eyebrow">
              <span className="section-index">PRICING /</span> A CLEAR STARTING POINT
            </span>
            <h1>
              BIG IDEAS.
              <br />
              <span className="outlined-text">CLEAR PACKAGES.</span>
            </h1>
            <p>Your story. The right scope.</p>
            <span className="sample-pill">SAMPLE {currencyCode} RATES · NOT FINAL QUOTES</span>
          </Reveal>
          <Reveal className="pricing-switch-row">
            <div className="billing-switch" aria-label="Billing options">
              {(["project", "monthly"] as const).map((option) => (
                <button
                  key={option}
                  aria-pressed={billing === option}
                  onClick={() => setBilling(option)}
                >
                  {billing === option && (
                    <motion.span
                      className="billing-indicator"
                      layoutId="billing-pill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span>{option === "project" ? "Per project" : "Monthly"}</span>
                </button>
              ))}
            </div>
            <span className="small-note">No checkout. Just a conversation.</span>
          </Reveal>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className="pricing-grid"
              key={billing}
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : 0.23, ease }}
            >
              {pricing[billing].map((plan, index) => {
                const Icon = [Clapperboard, Film, Layers3][index];
                return (
                  <SpotlightCard
                    className={`price-card ${plan.featured ? "is-featured" : ""}`}
                    key={plan.name}
                  >
                    <div className="price-card-top">
                      <span className="price-icon">
                        <Icon size={23} strokeWidth={1.4} />
                      </span>
                      <span className="price-type">
                        {plan.featured ? "STORY-FIRST" : `0${index + 1} /`}
                      </span>
                    </div>
                    <h2>{plan.name}</h2>
                    <p className="plan-description">{plan.description}</p>
                    <div className="price-amount">
                      <span>FROM</span>
                      <div>
                        <span className="price-currency">{currencyCode}</span>{" "}
                        {plan.price.toLocaleString("en-US")}
                        <small>{plan.unit}</small>
                      </div>
                    </div>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <Check size={15} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/contact?package=${encodeURIComponent(plan.name)}&billing=${billing}`}
                      className={`button ${plan.featured ? "button-primary" : "button-outline"}`}
                      aria-label={`Choose ${plan.name}`}
                    >
                      LET’S CREATE <ArrowUpRight size={17} />
                    </Link>
                    <span className="price-sample-note">
                      Illustrative package · Confirm with Amir
                    </span>
                  </SpotlightCard>
                );
              })}
            </motion.div>
          </AnimatePresence>
          <Reveal className="pricing-bottom-note">
            <span>
              <ShieldCheck size={16} />
              Scope first. Clear expectations.
            </span>
            <Link to="/contact">
              Something custom? <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
      <FAQ />
    </>
  );
}
