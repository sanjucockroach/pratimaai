export type PillarId = "ai-support" | "software" | "education" | "crm-lms";
export type PillarColour = "coral" | "blue" | "green" | "amber";

export interface ServicePillar {
  id: PillarId;
  name: string;
  shortName: string;
  colour: PillarColour;
  summary: string;
  suitableFor: string[];
  capabilities: string[];
  outcomes: string[];
  cta: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  siteUrl: string;
  email: string;
  whatsappNumber: string;
  areaServed: string;
  socialLinks: ReadonlyArray<{ label: string; href: string }>;
}

const publicEmail = import.meta.env.VITE_PUBLIC_CONTACT_EMAIL?.trim() || "infopratimaai@gmail.com";
const publicWhatsapp = import.meta.env.VITE_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "917026811812";

export const siteConfig: SiteConfig = {
  name: "PRATIMA AI",
  tagline: "Connecting Dots",
  description:
    "PRATIMA AI — Connecting Dots. One team connecting applied intelligence, custom software and education platforms for organisations across India.",
  siteUrl: import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://pratimaai.com",
  email: publicEmail,
  whatsappNumber: publicWhatsapp,
  areaServed: "India",
  socialLinks: [],
};

export const servicePillars: readonly ServicePillar[] = [
  {
    id: "ai-support",
    name: "AI Intelligence and Business Support",
    shortName: "Intelligence and Support",
    colour: "coral",
    summary:
      "Applied AI systems and hands-on operational support, shaped around the work a business actually needs to move.",
    suitableFor: [
      "Teams evaluating where AI can create practical value",
      "Organisations connecting scattered information and workflows",
      "Operators who need continued support after an initial build",
    ],
    capabilities: [
      "AI opportunity and workflow assessment",
      "Applied assistants and internal knowledge systems",
      "Automation design and ongoing operational support",
    ],
    outcomes: [
      "A clear, bounded use case",
      "A working system connected to real operations",
      "A support path after launch",
    ],
    cta: "Discuss an AI requirement",
  },
  {
    id: "software",
    name: "Software Solutions",
    shortName: "Software Solutions",
    colour: "blue",
    summary:
      "Custom software designed around the way a team works, from the first system map through a maintainable release.",
    suitableFor: [
      "Teams replacing manual or fragmented processes",
      "Businesses planning a new digital product",
      "Organisations that need connected internal tools",
    ],
    capabilities: [
      "Product and workflow definition",
      "Web platforms and operational tools",
      "Integration, testing and release support",
    ],
    outcomes: [
      "A shared product definition",
      "A usable and maintainable software release",
      "A clear path for iteration",
    ],
    cta: "Discuss a software build",
  },
  {
    id: "education",
    name: "Schools and EdTech",
    shortName: "Schools and EdTech",
    colour: "green",
    summary:
      "A platform doesn't make a school AI-ready. A teacher who trusts it does. We build both.",
    suitableFor: [
      "Schools exploring responsible use of AI",
      "Education teams planning digital learning services",
      "EdTech organisations building or improving platforms",
    ],
    capabilities: [
      "Education workflow and platform discovery",
      "Learning and administration tools",
      "AI-assisted education experiences with human oversight",
    ],
    outcomes: [
      "A defined education need and audience",
      "Technology that supports rather than obscures learning",
      "An implementation path institutions can operate",
    ],
    cta: "Discuss an education project",
  },
  {
    id: "crm-lms",
    name: "CRM and LMS Portals with AI Agents",
    shortName: "AI CRM & LMS",
    colour: "amber",
    summary:
      "Integrated CRM and LMS portals built with native AI agent infrastructure and connected pipelines rather than rigid traditional software suites.",
    suitableFor: [
      "Organisations replacing legacy, siloed CRM or LMS tools",
      "Teams deploying autonomous AI agents into client and student operations",
      "Institutions requiring adaptive learning workflows and unified client portals",
    ],
    capabilities: [
      "AI agent orchestration and automated workflow intelligence",
      "Adaptive learning engines, progress tracking and institutional portals",
      "Custom unified pipelines connecting CRM data to operational systems",
    ],
    outcomes: [
      "A unified, AI-native CRM and LMS platform",
      "Intelligent AI agents running repetitive customer and student tasks",
      "An extensible system architecture your team completely owns",
    ],
    cta: "Discuss a CRM or LMS build",
  },
] as const;

export const processSteps = [
  {
    name: "Understand",
    detail: "We ask the people who'll actually use it before we ask what the org chart wants.",
  },
  {
    name: "Design",
    detail: "Map the system, prototype the critical interaction and agree what success means.",
  },
  {
    name: "Build",
    detail: "Deliver the smallest complete release, with quality and operating needs built in.",
  },
  {
    name: "Support",
    detail: "We measure success by whether the system is still trusted, twelve months later.",
  },
] as const;

export function getWhatsAppHref(context = "a project with PRATIMA AI") {
  const message = encodeURIComponent(`Hello PRATIMA AI, I would like to discuss ${context}.`);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}

export function getEmailHref(subject = "Project enquiry") {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}
