import { useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

const specialties = [
  "STORY-DRIVEN EDITING",
  "CINEMATIC COLOR",
  "IMMERSIVE SOUND",
  "MEANINGFUL MOTION",
];

export default function Marquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={`expertise-strip marquee ${paused ? "is-paused" : ""}`}
      aria-label="Editing specialties"
    >
      <div className="marquee-window">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((copy) => (
            <div className="marquee-group" key={copy} aria-hidden={copy > 0 ? true : undefined}>
              {specialties.map((item) => (
                <span key={item}>
                  <Sparkles size={13} strokeWidth={1.4} />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="marquee-control icon-button"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Play specialties animation" : "Pause specialties animation"}
        aria-pressed={paused}
      >
        {paused ? <Play size={12} /> : <Pause size={12} />}
      </button>
    </div>
  );
}
