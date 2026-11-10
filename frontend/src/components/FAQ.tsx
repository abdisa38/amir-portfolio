import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { faqs } from "../content/experience";
import { Reveal, ease } from "./Motion";

export default function FAQ({
  compact = false,
  standalone = false,
}: {
  compact?: boolean;
  standalone?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  const reduced = useReducedMotion();
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className="faq-section section-space" id="faq">
      <div className="page-container faq-layout">
        <Reveal>
          <span className="eyebrow">
            <span className="section-index">FAQ /</span> GOOD TO KNOW
          </span>
          <Heading>
            A FEW
            <br />
            <span className="outlined-text">ANSWERS.</span>
          </Heading>
          <p>Less guessing. More creating.</p>
          <Link className="text-link" to="/contact">
            Something else? Let’s talk.
          </Link>
        </Reveal>
        <div className="faq-list">
          {(compact ? faqs.slice(0, 4) : faqs).map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <div className={`faq-item ${open === index ? "is-open" : ""}`}>
                <h3>
                  <button
                    aria-expanded={open === index}
                    aria-controls={`${id}-answer-${index}`}
                    id={`${id}-question-${index}`}
                    onClick={() => setOpen(open === index ? null : index)}
                  >
                    <span>
                      <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                      {faq.question}
                    </span>
                    <Plus size={19} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open === index && (
                    <motion.div
                      id={`${id}-answer-${index}`}
                      role="region"
                      aria-labelledby={`${id}-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.3, ease }}
                      className="faq-answer"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
          <p className="small-note">Sample terms · Confirm before booking.</p>
        </div>
      </div>
    </section>
  );
}
