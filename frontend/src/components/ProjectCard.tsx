import { motion, useReducedMotion } from "motion/react";
import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../content/portfolio";
import { ease, trackPointer } from "./Motion";

const ProjectCard = forwardRef<
  HTMLButtonElement,
  {
    project: Project;
    onOpen: () => void;
    index: number;
  }
>(function ProjectCard({ project, onOpen, index }, ref) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      ref={ref}
      layout
      className="project-card spotlight-card"
      onClick={onOpen}
      onPointerMove={trackPointer}
      aria-label={`Preview ${project.title}`}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 0.98 }}
      whileHover={reduced ? undefined : { y: -7 }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: index * 0.05, ease }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
        <div className="project-image-shade" />
        <span className="project-number">{project.id} /</span>
        {project.isSample && <span className="sample-label">SAMPLE PROJECT</span>}
        <span className="project-play">
          <img src="/assets/76659.svg" alt="" width="120" height="120" />
        </span>
        <span className="project-preview-label">
          VIEW PROJECT <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="project-info">
        <div>
          <span className="project-category">{project.category}</span>
          <h3>{project.title}</h3>
        </div>
        <ArrowUpRight className="project-arrow" size={23} strokeWidth={1.5} />
      </div>
    </motion.button>
  );
});

export default ProjectCard;
