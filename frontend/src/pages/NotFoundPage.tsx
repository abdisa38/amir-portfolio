import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Motion";

export default function NotFoundPage() {
  return (
    <section className="not-found section-space">
      <Reveal className="page-container page-intro">
        <span className="eyebrow">404 / MISSING FRAME</span>
        <h1>
          LET’S GET
          <br />
          <span className="purple-text">BACK ON TRACK.</span>
        </h1>
        <Link to="/" className="button button-primary">
          BACK HOME <ArrowUpRight size={17} />
        </Link>
      </Reveal>
    </section>
  );
}
