import { useEffect, useRef } from "react";
import { ArrowUpRight, Clapperboard, X } from "lucide-react";
import type { Project } from "../content/portfolio";

type Props = {
  project: Project | null;
  showreel: boolean;
  showreelUrl: string;
  onClose: () => void;
};

function Media({ url, title }: { url: string; title: string }) {
  let parsed: URL;
  try {
    parsed = new URL(url, window.location.origin);
    if (!["https:", "http:"].includes(parsed.protocol)) throw new Error("Unsupported URL");
  } catch {
    return <p className="media-message">Add a valid video URL to preview this project.</p>;
  }

  const host = parsed.hostname.replace(/^www\./, "");
  let embed = "";
  if (["youtube.com", "youtu.be", "youtube-nocookie.com"].includes(host)) {
    const id =
      host === "youtu.be"
        ? parsed.pathname.split("/")[1]
        : parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    if (id && /^[\w-]{11}$/.test(id)) embed = `https://www.youtube-nocookie.com/embed/${id}`;
  }
  if (["vimeo.com", "player.vimeo.com"].includes(host)) {
    const id = parsed.pathname.split("/").filter(Boolean).pop();
    if (id && /^\d+$/.test(id)) embed = `https://player.vimeo.com/video/${id}`;
  }

  if (embed) {
    return (
      <iframe
        src={embed}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) {
    return <video src={parsed.href} controls playsInline aria-label={title} />;
  }
  return (
    <a className="button button-primary" href={parsed.href} target="_blank" rel="noreferrer">
      Watch on video platform <ArrowUpRight size={18} />
    </a>
  );
}

export default function MediaDialog({ project, showreel, showreelUrl, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = Boolean(project || showreel);
  const url = project?.videoUrl || (showreel ? showreelUrl : "");

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      dialog.current?.close();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialog}
      className="media-dialog"
      aria-labelledby="media-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">
        <button className="dialog-close icon-button" onClick={onClose} aria-label="Close preview">
          <X size={22} />
        </button>
        <div className={`dialog-media ${url ? "" : "is-placeholder"}`}>
          {url ? (
            <Media url={url} title={project?.title || "Showreel"} />
          ) : (
            <>
              {project && <img src={project.image} alt={project.imageAlt} />}
              <div className="placeholder-message">
                <span className="placeholder-icon">
                  <Clapperboard size={30} strokeWidth={1.4} />
                </span>
                <span className="eyebrow">YOUR NEXT GREAT STORY</span>
                <h2>{project ? "Your next great edit." : "Your story. In 60 seconds."}</h2>
                <p>
                  {project
                    ? "Sample concept. Not client work."
                    : "Your showreel goes here. Video coming soon."}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="dialog-details">
          <span className="eyebrow purple-text">
            {project
              ? `${project.category} / ${project.isSample ? "Sample project" : "Project"}`
              : "Showreel / Template preview"}
          </span>
          <h3 id="media-title">{project?.title || "A first look."}</h3>
          <p>{project?.description || "A space for your strongest edits."}</p>
          {project && (
            <div className="tag-list">
              {project.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
          )}
          {!url && (
            <p className="dialog-template-note">
              To update: add the video link in <code>src/content/portfolio.ts</code>.
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
