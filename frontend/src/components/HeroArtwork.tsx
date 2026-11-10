import { portfolio } from "../content/portfolio";

export default function HeroArtwork() {
  return (
    <div className="hero-art" aria-label={`${portfolio.name} — video editor`}>
      <div className="hero-art-stage">
        <div className="art-orbit art-orbit-one" />
        <div className="art-orbit art-orbit-two" />
        <div className="lightning lightning-left">
          <div>
            <img src="/assets/bad84.png" alt="" />
          </div>
        </div>
        <div className="lightning lightning-right">
          <div>
            <img src="/assets/bad84.png" alt="" />
          </div>
        </div>
        <div className="software-art software-art-pr">
          <div>
            <img src="/assets/1e9b0.png" alt="" />
          </div>
        </div>
        <div className={`portrait-crop${portfolio.portraitIsReference ? " is-reference" : ""}`}>
          <img
            src={portfolio.portrait}
            alt={portfolio.portraitIsReference ? "Reference portrait" : portfolio.name}
            fetchPriority="high"
          />
        </div>
        <div className="software-art software-art-ae">
          <div>
            <img src="/assets/990ed.png" alt="" />
          </div>
        </div>
        <span className="art-coordinate art-coordinate-top">CREATIVITY, FRAME BY FRAME</span>
        <div className="edit-label">
          <span className="live-dot" />
          <span>EVERY FRAME HAS A PURPOSE</span>
        </div>
        {portfolio.portraitIsReference && <span className="portrait-note">REFERENCE PORTRAIT</span>}
      </div>
    </div>
  );
}
