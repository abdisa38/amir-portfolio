import { ArrowUpRight, FileText, Globe2, Mail, MapPin } from "lucide-react";
import { Link } from "react-router";
import { portfolio } from "../content/portfolio";
import ContactForm from "../components/ContactForm";
import { Reveal } from "../components/Motion";

export default function ContactPage() {
  return (
    <section className="contact contact-page section-space" id="contact">
      <div className="contact-glow" />
      <div className="page-container">
        <Reveal className="page-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>Contact
        </Reveal>
        <div className="contact-grid">
          <Reveal className="contact-copy">
            <span className="eyebrow">
              <span className="section-index">CONTACT /</span> YOUR NEXT CHAPTER
            </span>
            <h1>
              GOT A STORY?
              <br />
              LET’S <span className="purple-text">TELL IT.</span>
              <ArrowUpRight size={46} />
            </h1>
            <p>A big idea. Or a little spark.</p>
            <div className="contact-info-list">
              <div>
                <MapPin size={18} />
                <span>
                  {portfolio.location}
                  <small>
                    {portfolio.locationConfirmed ? "Location" : "Draft location · To confirm"}
                  </small>
                </span>
              </div>
              <div>
                <Globe2 size={18} />
                <span>
                  Built for collaboration<small>Wherever the story takes us.</small>
                </span>
              </div>
              <div>
                <Mail size={18} />
                <span>
                  {portfolio.email ? (
                    <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
                  ) : (
                    "Business email coming soon"
                  )}
                  <small>
                    {portfolio.email
                      ? "Let’s start a conversation."
                      : "For now, download your project brief."}
                  </small>
                </span>
              </div>
            </div>
            <span className="contact-privacy">
              <FileText size={13} />
              Your brief stays with you.
            </span>
          </Reveal>
          <Reveal className="contact-form-card" delay={0.12}>
            <div className="form-card-header">
              <span className="live-dot" />
              <span>LET’S START WITH AN IDEA.</span>
              <span>01 /</span>
            </div>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
