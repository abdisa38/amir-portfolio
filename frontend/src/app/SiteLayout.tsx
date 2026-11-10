import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { Link, useLocation, useOutlet } from "react-router";
import { ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";
import { portfolio } from "../content/portfolio";
import { ease } from "../components/Motion";

const navigation = [
  { label: "Home", to: "/", section: "home" },
  { label: "Work", to: "/#work", section: "work" },
  { label: "About", to: "/#about", section: "about" },
  { label: "Skills", to: "/skills", section: "skills" },
  { label: "Pricing", to: "/pricing", section: "pricing" },
];

function Brand() {
  return (
    <Link className="brand" to="/" aria-label={`${portfolio.name} — home`}>
      <span className="brand-symbol" aria-hidden="true">
        {portfolio.initials}
        <span />
      </span>
      <span className="brand-name">
        {portfolio.name}
        <span>VIDEO EDITOR & STORYTELLER</span>
      </span>
    </Link>
  );
}

function moveToHash(hash: string, reduced: boolean | null) {
  if (!hash) return;
  let id: string;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return;
  }
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
}

export default function SiteLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const previousPath = useRef(location.pathname);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  const focusRoute = useCallback(
    (node: HTMLElement | null) => {
      const active = document.activeElement;
      // A late route entrance must not steal focus from a newly used control.
      const canMoveFocus =
        active === document.body || active?.id === "main" || active?.tagName === "A";
      if (node && !location.hash && canMoveFocus) node.focus({ preventScroll: true });
    },
    [location.pathname, location.hash],
  );

  useMotionValueEvent(scrollY, "change", () => {
    if (location.pathname !== "/") return;
    const candidates = [
      "home",
      "work",
      "about",
      "services",
      "process",
      "credibility",
      "faq",
      "contact",
    ];
    const current =
      candidates
        .filter((id) => {
          const element = document.getElementById(id);
          return element && element.getBoundingClientRect().top <= 200;
        })
        .pop() || "home";
    setActiveSection(current);
  });

  useEffect(() => {
    setMenuOpen(false);
    const name =
      location.pathname === "/"
        ? "Video Editor & Storyteller"
        : `${location.pathname.slice(1).replace(/^\w/, (letter) => letter.toUpperCase())} — Video Editor`;
    document.title = `${portfolio.name} — ${name}`;
    const samePage = previousPath.current === location.pathname;
    previousPath.current = location.pathname;
    const frame = requestAnimationFrame(() => {
      if (location.hash) moveToHash(location.hash, reduced);
      else if (samePage && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.hash, location.pathname, reduced]);

  useEffect(() => {
    if (!menuOpen) return;
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <motion.div
          className="scroll-progress"
          style={{ scaleX: reduced ? scrollYProgress : progress }}
          aria-hidden="true"
        />
        <div className="page-container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => {
              const active =
                location.pathname === "/"
                  ? item.section === activeSection
                  : item.to === location.pathname;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={active ? "active" : ""}
                  aria-current={active ? "location" : undefined}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="nav-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <Link
            to="/contact"
            className={`header-cta ${location.pathname === "/contact" ? "is-current" : ""}`}
          >
            LET’S TALK <ArrowUpRight size={17} />
          </Link>
          <button
            ref={menuToggle}
            className="mobile-menu-toggle icon-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav"
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduced ? 0 : 0.25, ease }}
            >
              {[
                ...navigation,
                { label: "FAQs", to: "/faq", section: "faq" },
                { label: "Contact", to: "/contact", section: "contact" },
              ].map((item) => (
                <Link to={item.to} key={item.label} onClick={() => setMenuOpen(false)}>
                  {item.label}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
      >
        <motion.main
          ref={focusRoute}
          id="main"
          tabIndex={-1}
          className="route-view"
          key={location.pathname}
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -12 }}
          transition={{ duration: reduced ? 0 : 0.3, ease }}
          onAnimationComplete={() => {
            moveToHash(location.hash, reduced);
          }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <footer className="site-footer">
        <div className="page-container">
          <div className="footer-top">
            <Brand />
            <nav className="footer-nav" aria-label="Footer navigation">
              <Link to="/skills">Skills</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/contact">Contact</Link>
            </nav>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" })}
              className="back-to-top"
            >
              BACK TO TOP{" "}
              <span>
                <ArrowUp size={17} />
              </span>
            </button>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {portfolio.name}.
            </span>
            <span className="footer-template-label">
              <span />
              TEMPLATE · UNVERIFIED DETAILS
            </span>
            {portfolio.socials.length > 0 && (
              <div className="social-links">
                {portfolio.socials.map((social) => (
                  <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
                    {social.label}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
