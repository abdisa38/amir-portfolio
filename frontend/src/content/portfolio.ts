// Replace the sample copy here as Amir's real information becomes available.
// Leave unverified details, contact links, and videos empty rather than inventing them.
export type Project = {
  id: string;
  title: string;
  category: "Long-form" | "Short-form" | "Documentary";
  image: string;
  imageAlt: string;
  description: string;
  services: string[];
  videoUrl: string;
  isSample: boolean;
};

export const portfolio = {
  name: "Amir Dedefo",
  initials: "AD",
  title: "Long-form video editor & visual storyteller",
  introduction: "Sharp cuts. Real feeling. Stories worth watching.",
  biography: "Purposeful stories. Thoughtful pacing. Details you feel.",
  biographyContinued: "From the first cut to the final frame.",
  location: "Addis Ababa, Ethiopia",
  locationConfirmed: false,
  profileIsSample: true,
  email: "",
  showreelUrl: "",
  portrait: "/assets/amir-portrait.png",
  portraitIsReference: false,
  resumeUrl: "",
  socials: [] as { label: string; url: string }[],
  // These are suggested tools, not a claim about Amir's actual software.
  tools: [
    { abbreviation: "Pr", name: "Premiere Pro", color: "#a9a0ff" },
    { abbreviation: "Ae", name: "After Effects", color: "#b3a0ff" },
    { abbreviation: "Da", name: "DaVinci Resolve", color: "#97c5d4" },
  ],
};

export const projects: Project[] = [
  {
    id: "01",
    title: "The business of ambition",
    category: "Long-form",
    image: "/assets/c2e59.png",
    imageAlt: "A creative workspace with a laptop and editing screens",
    description: "A story-led YouTube concept. Sample work, ready to replace.",
    services: ["Story editing", "Sound design", "Color grading"],
    videoUrl: "",
    isSample: true,
  },
  {
    id: "02",
    title: "Every second counts",
    category: "Short-form",
    image: "/assets/fa40b.png",
    imageAlt: "Close-up of US dollar bills",
    description: "Strong hooks. Fast rhythm. A short-form concept.",
    services: ["Short-form editing", "Motion graphics", "Captions"],
    videoUrl: "",
    isSample: true,
  },
  {
    id: "03",
    title: "Beyond the familiar",
    category: "Documentary",
    image: "/assets/b4e9e.png",
    imageAlt: "A winding road through a dramatic mountain landscape",
    description: "A documentary concept. Space for a story worth telling.",
    services: ["Narrative editing", "Color grading", "Audio finishing"],
    videoUrl: "",
    isSample: true,
  },
  {
    id: "04",
    title: "A different perspective",
    category: "Long-form",
    image: "/assets/e4ccb.png",
    imageAlt: "Sample editorial project thumbnail from the reference design",
    description: "A fresh angle on long-form storytelling. Sample project.",
    services: ["Story editing", "Sound design", "Visual research"],
    videoUrl: "",
    isSample: true,
  },
  {
    id: "05",
    title: "Made for the moment",
    category: "Short-form",
    image: "/assets/fcc1b.png",
    imageAlt: "Sample creative video thumbnail from the reference design",
    description: "A quick idea. A lasting impression. Sample campaign.",
    services: ["Short-form editing", "Transitions", "Captions"],
    videoUrl: "",
    isSample: true,
  },
  {
    id: "06",
    title: "Conversations that matter",
    category: "Documentary",
    image: "/assets/319ed.png",
    imageAlt: "Sample podcast project thumbnail from the reference design",
    description: "Human stories. Honest conversations. Sample interview.",
    services: ["Interview editing", "Dialogue cleanup", "Color matching"],
    videoUrl: "",
    isSample: true,
  },
];

export const services = [
  {
    number: "01",
    title: "Long-form storytelling",
    description: "YouTube. Documentaries. Stories that hold attention.",
    tags: ["YouTube", "Documentaries", "Interviews"],
    icon: "film",
  },
  {
    number: "02",
    title: "Short-form. Big impact.",
    description: "Strong hooks. Clean captions. No wasted seconds.",
    tags: ["Reels & Shorts", "Social content", "Captions"],
    icon: "clapperboard",
  },
  {
    number: "03",
    title: "The finishing touches",
    description: "Expressive color. Immersive sound. Purposeful motion.",
    tags: ["Color grading", "Sound design", "Motion"],
    icon: "sparkles",
  },
];
