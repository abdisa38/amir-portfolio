import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { brands, testimonials } from "../content/experience";
import { Reveal, ease } from "./Motion";

export default function Credibility() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];
  const reduced = useReducedMotion();
  return (
    <section className="credibility section-space" id="credibility">
      <div className="page-container">
        <Reveal className="client-heading">
          <span className="eyebrow">
            <span className="section-index">05 /</span> GOOD COMPANY
          </span>
          <span className="sample-pill">PLACEHOLDER BRANDS</span>
        </Reveal>
        <Reveal className="brand-wall">
          {brands.map((brand, i) => (
            <span className={`client-wordmark wordmark-${i}`} key={brand}>
              {brand}
            </span>
          ))}
        </Reveal>
        <Reveal className="testimonial-layout">
          <div>
            <span className="eyebrow">WORDS THAT MATTER</span>
            <h2>
              THE OTHER
              <br />
              <span className="purple-text">SIDE OF THE EDIT.</span>
            </h2>
            <p className="small-note">Fictional names & quotes · Template only.</p>
          </div>
          <div className="testimonial-card spotlight-card">
            <div className="testimonial-top">
              <Quote size={28} strokeWidth={1.3} />
              <span className="sample-pill">SAMPLE TESTIMONIAL</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.22, ease }}
                aria-live="polite"
              >
                <blockquote>“{testimonial.quote}”</blockquote>
                <div className="testimonial-person">
                  <span className="avatar-initials">{testimonial.initials}</span>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>
                      {testimonial.role} · {testimonial.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="testimonial-controls">
              <span>
                {String(index + 1).padStart(2, "0")} <span>/ 03</span>
              </span>
              <div>
                <button
                  className="icon-button"
                  aria-label="Previous testimonial"
                  onClick={() => setIndex((index + testimonials.length - 1) % testimonials.length)}
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  className="icon-button"
                  aria-label="Next testimonial"
                  onClick={() => setIndex((index + 1) % testimonials.length)}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
