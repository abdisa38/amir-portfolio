import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Download,
  Film,
  Globe2,
  MapPin,
  Play,
  Sparkles,
} from "lucide-react";
import { portfolio, projects, services, type Project } from "../content/portfolio";
import HeroArtwork from "../components/HeroArtwork";
import ProjectCard from "../components/ProjectCard";
import MediaDialog from "../components/MediaDialog";
import Marquee from "../components/Marquee";
import Credibility from "../components/Credibility";
import FAQ from "../components/FAQ";
import { Reveal, SpotlightCard, ease } from "../components/Motion";

const filters = ["All work", "Long-form", "Short-form", "Documentary"] as const;

export default function HomePage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work");
  const [page, setPage] = useState(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showreel, setShowreel] = useState(false);
  const filtered = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 3));
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 65]);

  return (
    <>
      <section className="hero" id="home" ref={hero}>
        <div className="hero-gradient">
          <img src="/assets/b1345.svg" alt="" width="1512" height="600" />
        </div>
        <div className="page-container hero-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="hero-eyebrow">
              <span className="short-line" />
              {portfolio.name}
              <span className="eyebrow-separator">/</span>
              <span className="muted">VIDEO EDITOR</span>
            </div>
            <h1>
              PROFESSIONAL
              <br />
              <span>VIDEO EDITOR.</span>
            </h1>
            <p className="hero-subtitle">{portfolio.introduction}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/contact">
                LET’S TALK <ArrowUpRight size={21} />
              </Link>
              <button className="showreel-button" onClick={() => setShowreel(true)}>
                <span className="small-play">
                  <Play size={14} fill="currentColor" />
                </span>
                <span>
                  View showreel
                  <span>{portfolio.showreelUrl ? "Press play." : "Preview coming soon"}</span>
                </span>
              </button>
            </div>
            <div className="hero-footnote">
              <span className="live-dot" />
              GOOD STORIES. GREAT EDITS.
            </div>
          </motion.div>
          <motion.div className="hero-parallax" style={{ y: reduced ? 0 : artY }}>
            <HeroArtwork />
          </motion.div>
          <Link className="hero-scroll" to="/#work">
            <span>EXPLORE THE WORK</span>
            <ArrowDown size={15} />
          </Link>
          <div className="hero-location">
            <Globe2 size={14} />
            <span>
              {portfolio.location}
              {!portfolio.locationConfirmed && "*"}
            </span>
          </div>
        </div>
      </section>
      <Marquee />

      <section className="work section-space" id="work">
        <div className="film-background" aria-hidden="true">
          <img src="/assets/7f50b.svg" alt="" width="1397.62" height="1397.53" />
        </div>
        <div className="page-container">
          <Reveal>
            <div className="section-topline">
              <span className="eyebrow">
                <span className="section-index">01 /</span> THE PORTFOLIO
              </span>
              <span className="micro-label">LESS NOISE. MORE STORY.</span>
            </div>
            <div className="section-heading-row">
              <h2>
                SELECTED <span className="outlined-text">WORK.</span>
              </h2>
              <p>
                Craft, in focus.
                <br />
                <span>Sample concepts.</span>
              </p>
            </div>
          </Reveal>
          <Reveal className="work-toolbar">
            <div className="work-filters" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "selected" : ""}
                  aria-pressed={filter === item}
                  onClick={() => {
                    setFilter(item);
                    setPage(0);
                  }}
                >
                  {item}
                  {item === "All work" && <sup>{String(projects.length).padStart(2, "0")}</sup>}
                </button>
              ))}
            </div>
            <div className="carousel-controls">
              <span className="carousel-pagination">
                {String(page + 1).padStart(2, "0")} <span>/ {String(pages).padStart(2, "0")}</span>
              </span>
              <button
                className="icon-button"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                aria-label="Previous projects"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className="icon-button"
                onClick={() => setPage(page + 1)}
                disabled={page >= pages - 1}
                aria-label="Next projects"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </Reveal>
          <motion.div layout className="projects-grid" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.slice(page * 3, page * 3 + 3).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  index={index}
                  project={project}
                  onOpen={() => setActiveProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="work-bottom">
            <span>
              <span className="tiny-square" />
              CURATED, NOT COMPLICATED.
            </span>
            <p>Reference visuals · Not client work</p>
          </div>
        </div>
      </section>

      <section className="about section-space" id="about">
        <img className="about-background" src="/assets/e88d2.png" alt="" loading="lazy" />
        <div className="page-container about-grid">
          <Reveal className="about-heading">
            <span className="eyebrow">
              <span className="section-index">02 /</span> BEHIND THE TIMELINE
            </span>
            <h2>
              LESS NOISE.
              <br />
              MORE <span className="purple-text">FEELING.</span>
            </h2>
            <div className="about-signature">
              <span>{portfolio.name}</span>
              <ArrowUpRight size={25} strokeWidth={1} />
            </div>
            <p className="about-professional-title">{portfolio.title}</p>
          </Reveal>
          <Reveal className="about-copy" delay={0.12}>
            {portfolio.profileIsSample && (
              <span className="template-tag">
                <span />
                SAMPLE BIO
              </span>
            )}
            <h3>
              Every frame.
              <br />A little more meaning.
            </h3>
            <p>{portfolio.biography}</p>
            <p>{portfolio.biographyContinued}</p>
            <div className="about-facts">
              <span>
                <MapPin size={16} />
                {portfolio.location}
                {!portfolio.locationConfirmed && "*"}
              </span>
              <span>
                <Globe2 size={16} />
                Stories without borders
              </span>
            </div>
            <Link className="text-link" to="/skills">
              Explore the toolkit <ArrowUpRight size={16} />
            </Link>
            <p className="profile-note">*Draft profile · Details to confirm.</p>
            {portfolio.resumeUrl && (
              <a className="text-link" href={portfolio.resumeUrl} download>
                Résumé <Download size={16} />
              </a>
            )}
          </Reveal>
        </div>
      </section>

      <section className="services section-space" id="services">
        <div className="page-container">
          <Reveal>
            <div className="section-topline">
              <span className="eyebrow">
                <span className="section-index">03 /</span> THE CRAFT
              </span>
              <Link to="/skills" className="text-link">
                All skills <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="section-heading-row">
              <h2>
                YOUR VISION.
                <br />
                <span className="outlined-text">IN MOTION.</span>
              </h2>
              <p>
                One idea.
                <br />
                <span>Endless possibilities.</span>
              </p>
            </div>
          </Reveal>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon =
                service.icon === "film"
                  ? Film
                  : service.icon === "clapperboard"
                    ? Clapperboard
                    : Sparkles;
              return (
                <Reveal key={service.number} delay={index * 0.09}>
                  <SpotlightCard className="service-card">
                    <div className="service-card-top">
                      <Icon size={30} strokeWidth={1.3} />
                      <span>/{service.number}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="service-tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <Link
                      to="/contact"
                      className="service-link"
                      aria-label={`Discuss ${service.title}`}
                    >
                      LET’S CREATE <ArrowUpRight size={18} />
                    </Link>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="services-note">
            Made for your story.
            <Link to="/pricing">
              Explore packages <ArrowUpRight size={14} />
            </Link>
            <span>Sample services · Scope by discussion</span>
          </Reveal>
        </div>
      </section>

      <section className="process section-space" id="process">
        <div className="page-container">
          <Reveal className="process-heading">
            <div>
              <span className="eyebrow">
                <span className="section-index">04 /</span> THE PROCESS
              </span>
              <h2>
                THREE STEPS.
                <br />
                <span className="purple-text">ONE GOOD STORY.</span>
              </h2>
            </div>
            <p>Clear from the first cut.</p>
          </Reveal>
          <div className="process-grid">
            {[
              {
                number: "01",
                title: "Share the vision.",
                description: "Your idea. Your footage. Our starting point.",
              },
              {
                number: "02",
                title: "Shape the story.",
                description: "First cut. Your feedback. A sharper edit.",
              },
              {
                number: "03",
                title: "Press play.",
                description: "Final polish. Ready for your audience.",
              },
            ].map((step, index) => (
              <Reveal key={step.number} delay={index * 0.12}>
                <article>
                  <div className="process-step">
                    <span>{step.number}</span>
                    <ArrowRight size={18} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Credibility />
      <FAQ compact />
      <section className="home-contact section-space" id="contact">
        <Reveal className="page-container home-contact-inner">
          <div>
            <span className="eyebrow">NEXT / YOUR STORY</span>
            <h2>
              LET’S MAKE
              <br />
              <span className="purple-text">SOMETHING MATTER.</span>
            </h2>
          </div>
          <Link className="button button-primary" to="/contact">
            START A CONVERSATION <ArrowUpRight size={20} />
          </Link>
        </Reveal>
      </section>
      <MediaDialog
        project={activeProject}
        showreel={showreel}
        showreelUrl={portfolio.showreelUrl}
        onClose={() => {
          setActiveProject(null);
          setShowreel(false);
        }}
      />
    </>
  );
}
