export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogComment {
  id: string;
  blogSlug: string;
  authorName: string;
  authorRole?: string;
  content: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // array of paragraphs or markdown sections
  bannerImage: string;
  galleryImages: string[];
  category: "AI Architecture" | "Custom Software" | "EdTech & LMS" | "Operations";
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "building-ai-infrastructure-for-real-operations",
    title: "Why We Build AI Infrastructure for Real Operations, Not Demos",
    excerpt:
      "Most AI initiatives fail because they are built as isolated prototypes. Discover how connecting data pipelines to actual operational workflows creates long-term value.",
    category: "AI Architecture",
    publishedAt: "2026-08-10",
    readTime: "6 min read",
    author: {
      name: "Prashanth",
      role: "CEO & Founder",
      avatar: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    },
    bannerImage: "/assets/services-hero-poster.png",
    galleryImages: [
      "/assets/pratima-circuit-poster.png",
      "/assets/og-pratima.png",
      "/assets/hero-poster.png",
    ],
    tags: ["Applied AI", "Infrastructure", "Workflow Automation"],
    featured: true,
    content: [
      "The rush to demonstrate artificial intelligence has created an epidemic of toy systems. Across enterprise software and educational institutions, we see conversational widgets bolted onto legacy databases with zero thought given to context maintenance, operational accountability, or ongoing support.",
      "At PRATIMA AI, our core conviction is that an AI system is only complete when the people responsible for the work understand what the system uses, how it reasons, and how it handles unexpected edge cases. When you treat AI as infrastructure rather than novelty, your architecture fundamentally changes.",
      "First, you design around data reality. Most organizations don't suffer from a lack of intelligence models; they suffer from scattered information locked inside disconnected spreadsheets, CRM silos, and undocumented institutional memory. We map these systems first to build robust ingestion pipelines before writing prompt logic.",
      "Second, we mandate explainability. If a system cannot trace its recommendation back to the specific operational document or record that generated it, we don't consider it finished. In applied business intelligence, an untraceable 95% accuracy rate is worse than an explainable 85% baseline.",
      "Third, one team must own the full lifecycle. Deploying four vendors to handle UI, backend, AI orchestration, and support inevitably leads to pointing fingers when operations shift. Owning the entire picture is how we measure success twelve months after launch.",
    ],
  },
  {
    id: "blog-2",
    slug: "moving-from-legacy-lms-to-autonomous-ai-portals",
    title: "Moving from Legacy LMS to Autonomous AI Learning Portals",
    excerpt:
      "A platform doesn't make an institution AI-ready. A teacher who trusts it does. How modern CRM and LMS portals integrate autonomous agents for adaptive education.",
    category: "EdTech & LMS",
    publishedAt: "2026-08-08",
    readTime: "5 min read",
    author: {
      name: "Sai Dhanush",
      role: "Vice President",
      avatar: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    },
    bannerImage: "/assets/pratima-circuit-poster.png",
    galleryImages: [
      "/assets/services-hero-poster.png",
      "/assets/og-pratima.png",
    ],
    tags: ["EdTech", "AI Agents", "LMS Architecture"],
    featured: false,
    content: [
      "Traditional Learning Management Systems were built as administrative filing cabinets—designed to log attendance, store PDFs, and record test scores. They were never architected to assist the pedagogical relationship between educators and students.",
      "Modern education technology requires a dynamic bridge. When AI agents are embedded directly into learning infrastructure, they can assist grading workflows, surface individual student comprehension gaps in real-time, and automate administrative tasks without removing human teacher oversight.",
      "By unifying CRM relationship tracking with adaptive LMS engines, institutions gain a single line of sight. From the first student enquiry to ongoing academic progress, the system acts as an intelligent assistant rather than a static database.",
      "We design education platforms with strict privacy boundaries, human-in-the-loop review gates, and clear transparency metrics so faculties can adopt AI with complete confidence.",
    ],
  },
  {
    id: "blog-3",
    slug: "the-architecture-of-maintainable-custom-software",
    title: "The Architecture of Maintainable Custom Software",
    excerpt:
      "Replacing load-bearing spreadsheets and rigid SaaS with software your team can actually understand, modify, and operate without vendor lock-in.",
    category: "Custom Software",
    publishedAt: "2026-08-05",
    readTime: "4 min read",
    author: {
      name: "Sanjeeva Reddy",
      role: "CTO",
      avatar: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    },
    bannerImage: "/assets/og-pratima.png",
    galleryImages: [
      "/assets/hero-poster.png",
      "/assets/services-hero-poster.png",
    ],
    tags: ["Engineering", "Web Platforms", "System Design"],
    featured: false,
    content: [
      "Every growing organization eventually runs into the limit of off-the-shelf software. What began as an efficient SaaS stack morphs into a maze of costly subscriptions, duplicate data entry, and fragile Zapier connections.",
      "Custom software is not about reinventing the wheel—it is about carving away the 80% of unnecessary features that clutter third-party software and building the precise 20% that dictates your competitive edge.",
      "We build with strict TypeScript, modern edge architectures, and zero bloated component libraries. This ensures that the codebase remains lightning-fast, fully responsive across devices, and simple for internal teams to maintain long after launch.",
    ],
  },
];

export const INITIAL_COMMENTS: BlogComment[] = [
  {
    id: "comment-1",
    blogSlug: "building-ai-infrastructure-for-real-operations",
    authorName: "Anand Murthy",
    authorRole: "Head of Operations, LogiTech India",
    content:
      "The point about unexplainable AI models being a liability in enterprise operations hits home. In logistics, if an AI agent reroutes fleet dispatch without citing fuel and traffic constraints, dispatch managers simply won't trust it. Great perspective on connecting dots across the real workflow.",
    createdAt: "2026-08-10T14:30:00Z",
  },
  {
    id: "comment-2",
    blogSlug: "moving-from-legacy-lms-to-autonomous-ai-portals",
    authorName: "Dr. Kavitha Rao",
    authorRole: "Director of Academics",
    content:
      "Teacher AI-fluency is genuinely the missing link in our school's tech strategy. Most EdTech vendors want to sell us software licenses and disappear. Building teacher confidence alongside the platform is the only sustainable way.",
    createdAt: "2026-08-09T10:15:00Z",
  },
];
