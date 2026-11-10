// Illustrative content only. Replace with approved rates, clients, and exact quotes.
export const currencyCode = "ETB";

export const pricing = {
  project: [
    {
      name: "The Short",
      price: 150,
      unit: "/ video",
      description: "Small format. Big energy.",
      features: ["One short, up to 60 sec", "Captions & sound", "One revision"],
      service: "Short-form / Reels & Shorts",
      featured: false,
    },
    {
      name: "The Story",
      price: 400,
      unit: "/ video",
      description: "Room for a real story.",
      features: ["One video, up to 15 min", "Color, sound & titles", "Two revisions"],
      service: "Long-form / YouTube video",
      featured: true,
    },
    {
      name: "The Film",
      price: 850,
      unit: "/ project",
      description: "A deeper perspective.",
      features: ["One film, up to 30 min", "Narrative & finishing", "Two revisions"],
      service: "Documentary / Interview",
      featured: false,
    },
  ],
  monthly: [
    {
      name: "The Short",
      price: 500,
      unit: "/ month",
      description: "Keep the feed fresh.",
      features: ["Four shorts per month", "Captions & sound", "One revision per video"],
      service: "Short-form / Reels & Shorts",
      featured: false,
    },
    {
      name: "The Story",
      price: 1400,
      unit: "/ month",
      description: "A consistent creative rhythm.",
      features: ["Four videos, up to 15 min", "Color, sound & titles", "Two revisions per video"],
      service: "Long-form / YouTube video",
      featured: true,
    },
    {
      name: "The Film",
      price: 2400,
      unit: "/ month",
      description: "Space for bigger ideas.",
      features: ["Two films, up to 30 min", "Narrative & finishing", "Two revisions per film"],
      service: "Documentary / Interview",
      featured: false,
    },
  ],
};

export const faqs = [
  {
    question: "What can we create?",
    answer: "YouTube videos, shorts, interviews, and documentaries.",
  },
  {
    question: "Are these the final rates?",
    answer: `No. These are sample ${currencyCode} rates; confirm scope and pricing with Amir.`,
  },
  { question: "How fast is delivery?", answer: "Agree on a timeline before the first cut." },
  {
    question: "What about revisions?",
    answer: "Define revision rounds together before the project starts.",
  },
  {
    question: "Can we work remotely?",
    answer: "Plan footage sharing, feedback, and delivery online.",
  },
  {
    question: "How do I get started?",
    answer: "Choose a package or create a brief on the contact page.",
  },
];

export const brands = ["NORTHLINE", "frame/studio", "VALE®", "MONO MEDIA"];
export const testimonials = [
  {
    quote: "A sharp eye. A stronger story.",
    name: "Alex Morgan",
    role: "Creative Director",
    company: "Northline",
    initials: "AM",
  },
  {
    quote: "Every cut felt intentional.",
    name: "Jordan Ellis",
    role: "Producer",
    company: "Frame Studio",
    initials: "JE",
  },
  {
    quote: "Our idea, beautifully brought to life.",
    name: "Taylor Reed",
    role: "Founder",
    company: "Vale",
    initials: "TR",
  },
];

export const skills = [
  {
    id: "story",
    title: "Story",
    subtitle: "Find the thread.",
    description: "Structure. Rhythm. A reason to watch.",
    icon: "film",
    details: ["Narrative structure", "Long-form editing", "Pacing & retention"],
    tools: ["Premiere Pro", "DaVinci Resolve"],
  },
  {
    id: "color",
    title: "Color",
    subtitle: "Set the feeling.",
    description: "A consistent look. A cinematic finish.",
    icon: "palette",
    details: ["Color correction", "Shot matching", "Creative grading"],
    tools: ["DaVinci Resolve", "Premiere Pro"],
  },
  {
    id: "sound",
    title: "Sound",
    subtitle: "Make it immersive.",
    description: "Clear voices. Space. Texture.",
    icon: "audio",
    details: ["Dialogue cleanup", "Sound design", "Music & mixing"],
    tools: ["Premiere Pro", "DaVinci Resolve"],
  },
  {
    id: "motion",
    title: "Motion",
    subtitle: "Guide the eye.",
    description: "Clean titles. Subtle movement. Clarity.",
    icon: "sparkles",
    details: ["Title design", "Motion graphics", "Animated captions"],
    tools: ["After Effects", "Premiere Pro"],
  },
];
