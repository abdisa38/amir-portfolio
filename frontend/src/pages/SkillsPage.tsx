import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight, AudioLines, Check, Film, Palette, Sparkles } from "lucide-react";
import { skills } from "../content/experience";
import { portfolio } from "../content/portfolio";
import { Reveal, SpotlightCard, ease } from "../components/Motion";

const icons = [Film, Palette, AudioLines, Sparkles];

export default function SkillsPage() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const id = useId();
  const skill = skills[selected];
  return (
    <section className="skills-page section-space" id="skills">
      <div className="page-container">
        <Reveal className="page-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>Skills
        </Reveal>
        <Reveal className="page-intro">
          <span className="eyebrow">
            <span className="section-index">SKILLS /</span> BEHIND THE CRAFT
          </span>
          <h1>
            THE DETAILS
            <br />
            <span className="outlined-text">MAKE THE DIFFERENCE.</span>
          </h1>
          <p>Four disciplines. One seamless story.</p>
          <span className="sample-pill">SUGGESTED SKILLSET · TO CONFIRM</span>
        </Reveal>
        <Reveal className="skill-tabs">
          {skills.map((item, index) => {
            const Icon = icons[index];
            return (
              <button
                key={item.id}
                className={selected === index ? "is-selected" : ""}
                aria-pressed={selected === index}
                aria-controls={`${id}-skill-panel`}
                onClick={() => setSelected(index)}
              >
                <Icon size={20} strokeWidth={1.4} />
                <span>{item.title}</span>
                <span>0{index + 1}</span>
              </button>
            );
          })}
        </Reveal>
        <Reveal className="skill-explorer">
          <div className="skill-timeline" aria-hidden="true">
            <div className="timeline-toolbar">
              <span className="live-dot" />
              <span>THE EDIT SUITE</span>
              <span>00:00:12:04</span>
            </div>
            <div className="timeline-ruler">
              <span>00:00</span>
              <span>00:05</span>
              <span>00:10</span>
              <span>00:15</span>
            </div>
            <div className="timeline-tracks">
              {skills.map((item, index) => (
                <div
                  key={item.id}
                  className={`timeline-track track-${item.id} ${selected === index ? "is-active" : ""}`}
                >
                  <span>{item.title}</span>
                  <div>
                    {index === 0 ? (
                      <>
                        <i>INTRO</i>
                        <i>THE STORY</i>
                        <i>OUTRO</i>
                      </>
                    ) : index === 1 ? (
                      <i className="color-strip" />
                    ) : index === 2 ? (
                      Array.from({ length: 38 }, (_, i) => (
                        <i
                          className="wave-bar"
                          key={i}
                          style={{ height: `${12 + ((i * 17) % 29)}px` }}
                        />
                      ))
                    ) : (
                      <>
                        <i>TITLE</i>
                        <i>CAPTION</i>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <motion.div
              className="timeline-playhead"
              animate={{ left: `${[24, 44, 65, 81][selected]}%` }}
              transition={{ duration: reduced ? 0 : 0.7, ease }}
            />
            <div className="timeline-footer">
              <span>SELECT A DISCIPLINE TO EXPLORE</span>
              <span>AD /</span>
            </div>
          </div>
          <div className="skill-panel" id={`${id}-skill-panel`} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0 : 0.2, ease }}
              >
                <span className="eyebrow purple-text">
                  0{selected + 1} / {skill.title.toUpperCase()}
                </span>
                <h2>{skill.subtitle}</h2>
                <p>{skill.description}</p>
                <ul>
                  {skill.details.map((detail) => (
                    <li key={detail}>
                      <Check size={14} />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="tag-list">
                  {skill.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
        <Reveal className="toolkit-heading">
          <span className="eyebrow">THE TOOLKIT</span>
          <p>Tools serve the story.</p>
        </Reveal>
        <div className="skill-tools-grid">
          {portfolio.tools.map((tool, index) => (
            <Reveal delay={index * 0.08} key={tool.name}>
              <SpotlightCard className="skill-tool-card">
                <span className="tool-icon" style={{ color: tool.color }}>
                  {tool.abbreviation}
                </span>
                <div>
                  <h3>{tool.name}</h3>
                  <span>Suggested tool</span>
                </div>
                <ArrowUpRight size={19} />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="skill-bottom">
          <p>Good tools. Better instincts.</p>
          <Link className="button button-primary" to="/contact">
            LET’S CREATE <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
