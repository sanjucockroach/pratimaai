import { getWhatsAppHref, siteConfig } from "~/content/site";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
}

interface KnowledgeItem {
  topics: string[];
  title: string;
  content: string;
  suggestedAction?: { label: string; url: string };
}

export const COMPANY_KNOWLEDGE: KnowledgeItem[] = [
  {
    topics: ["who", "what", "company", "about", "pratima", "vision", "overview", "connecting dots"],
    title: "About PRATIMA AI",
    content:
      "PRATIMA AI is an India-first agency connecting applied intelligence, custom software, education technology, and CRM/LMS portals into one practice. Our tagline is 'Connecting Dots' and our operating motto is: 'One team owns the whole picture — not four vendors pointing fingers.'",
  },
  {
    topics: ["services", "practice", "offer", "capabilities", "what do you do"],
    title: "Our 4 Core Practices",
    content:
      "We operate across four connected disciplines:\n1. AI Intelligence & Business Support: Applied AI systems, internal assistants, and operational assessments.\n2. Software Solutions: Custom web platforms and maintainable tools tailored to team workflows.\n3. Schools & EdTech: AI-aware platforms that build teacher fluency and institutional confidence.\n4. CRM & LMS Portals with AI Agents: Modern portals with autonomous AI agents and unified infrastructure.",
    suggestedAction: {
      label: "Explore Services",
      url: "/services",
    },
  },
  {
    topics: ["crm", "lms", "agents", "portal", "ai agents", "infrastructure"],
    title: "CRM & LMS Portals with AI Infrastructure",
    content:
      "Unlike traditional, rigid CRM and LMS software, PRATIMA AI builds custom portals integrated directly with autonomous AI agents. These agents automate customer support, student tracking, document ingestion, and adaptive learning paths while ensuring human-in-the-loop oversight.",
    suggestedAction: {
      label: "Discuss a CRM/LMS Build",
      url: "/services#crm-lms",
    },
  },
  {
    topics: ["team", "founder", "ceo", "leadership", "prashanth", "sanjeeva", "riya", "varun", "sai dhanush", "who works"],
    title: "Leadership & Team",
    content:
      "Our leadership team includes:\n• Prashanth — CEO & Founder\n• Sanjeeva Reddy — CTO\n• Riya — CFO & HR\n• Varun — President\n• Sai Dhanush — Vice President\nYou can connect with each team member on our About page via their LinkedIn profiles.",
    suggestedAction: {
      label: "Meet the Team",
      url: "/about",
    },
  },
  {
    topics: ["process", "methodology", "how we work", "steps", "workflow", "understand", "design", "build", "support"],
    title: "How We Work",
    content:
      "Our four-stage operating methodology:\n1. Understand: 'We ask the people who'll actually use it before we ask what the org chart wants.'\n2. Design: Map the system and prototype critical interactions.\n3. Build: Deliver the smallest complete release with quality baked in.\n4. Support: 'We measure success by whether the system is still trusted, twelve months later.'",
  },
  {
    topics: ["principles", "values", "philosophy", "glass box", "explainable"],
    title: "Operating Principles",
    content:
      "Our core principles:\n1. Start with the work (technology is a response, not an assumption)\n2. Make the connection visible ('If a system can't explain its own answer, we don't consider it finished.')\n3. Build for operation (releases must be maintainable)\n4. Keep people responsible (human judgement remains in the loop).",
  },
  {
    topics: ["contact", "email", "phone", "whatsapp", "hire", "start", "quote", "pricing", "talk"],
    title: "Starting a Project with PRATIMA AI",
    content:
      `You can start directly with us without automated sales sequences!\n• WhatsApp: +91 70268 11812\n• Email: ${siteConfig.email}\nBring us your problem before the specification, and we'll identify the best starting point.`,
    suggestedAction: {
      label: "Chat on WhatsApp",
      url: getWhatsAppHref("a project enquiry via AI Assistant"),
    },
  },
  {
    topics: ["blog", "articles", "insights", "views", "opinions", "read"],
    title: "PRATIMA AI Blog & Views",
    content:
      "Visit our Blog to read articles on AI architecture, custom software maintainability, and LMS evolution. You can also share your views and opinions with no word limit!",
    suggestedAction: {
      label: "Read Blog Posts",
      url: "/blog",
    },
  },
];

/** RAG Semantic Scoring Engine with limited conversational memory */
export function queryKnowledgeBase(query: string, history: ChatMessage[] = []): {
  reply: string;
  actionUrl?: string;
  actionLabel?: string;
} {
  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\W+/).filter(Boolean);

  if (words.length === 0) {
    return {
      reply: "Hello! I am the PRATIMA AI Assistant. Ask me anything about our practices, team, architecture, or how to kick off a project.",
    };
  }

  // Greeting check
  if (/^(hi|hello|hey|greetings|namaste|good (morning|afternoon|evening))/i.test(normalizedQuery)) {
    return {
      reply:
        "Hello! I am PRATIMA AI's knowledge assistant. I can answer questions about our 4 practices (AI Intelligence, Custom Software, EdTech, and CRM/LMS with AI Agents), our team, or how we work. How can I help you today?",
    };
  }

  // Calculate score for each knowledge item
  let bestItem: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of COMPANY_KNOWLEDGE) {
    let score = 0;
    for (const topic of item.topics) {
      if (normalizedQuery.includes(topic)) {
        score += 3;
      }
    }
    for (const word of words) {
      if (item.content.toLowerCase().includes(word) || item.title.toLowerCase().includes(word)) {
        score += 1;
      }
    }

    // Contextual continuity with last user message
    if (history.length > 0) {
      const lastUserMsg = history.filter((m) => m.sender === "user").slice(-1)[0]?.text.toLowerCase() || "";
      for (const topic of item.topics) {
        if (lastUserMsg.includes(topic)) {
          score += 0.5;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  // If match confidence is sufficient
  if (bestItem && highestScore >= 2) {
    return {
      reply: bestItem.content,
      actionUrl: bestItem.suggestedAction?.url,
      actionLabel: bestItem.suggestedAction?.label,
    };
  }

  // Fallback with direct WhatsApp chat redirection
  return {
    reply:
      "I don't have enough specific data in my current company knowledge base to answer that precisely. For custom project scopes, architecture reviews, or direct quotes, please chat with our leadership team on WhatsApp!",
    actionUrl: getWhatsAppHref(`a question: "${query}"`),
    actionLabel: "Direct WhatsApp Chat →",
  };
}
