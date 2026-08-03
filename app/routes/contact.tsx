import { motion } from "motion/react";
import { ArrowRightCircle, Mail, MessageSquare } from "lucide-react";
import type { MetaFunction } from "react-router";
import { getEmailHref, getWhatsAppHref, siteConfig } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: "Contact | PRATIMA AI" },
  { name: "description", content: "Start a direct conversation with PRATIMA AI about an AI, software or education project." },
  { property: "og:title", content: "Contact | PRATIMA AI" },
  { property: "og:description", content: "Start a direct conversation with PRATIMA AI about an AI, software or education project." },
  { property: "og:image", content: `${siteConfig.siteUrl}/assets/og-pratima.png` },
  { property: "og:url", content: `${siteConfig.siteUrl}/contact` },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { tagName: "link", rel: "canonical", href: `${siteConfig.siteUrl}/contact` },
];

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function ContactRoute() {
  return (
    <div className="relative w-full min-h-screen font-sans text-[#090909] overflow-hidden bg-[#F2F2EE] flex flex-col justify-center py-20 sm:py-28">
      {/* Full-screen Background Video in 100% Original Contrast and Brightness */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-100"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Soft edge gradient to ensure navigation visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <main
        id="contact-hero"
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-[clamp(40px,8vw,72px)] pb-12"
      >
        {/* Frosted Glass Content Panel for Crisp Readability over 100% Original Video */}
        <div className="max-w-[680px] bg-white/85 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-black/10 shadow-2xl">
          {/* Utility Label using PRATIMA AI Brand Typography (IBM Plex Mono) */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="utility-label mb-4"
          >
            Contact / PRATIMA AI
          </motion.div>

          {/* Clean Hero Heading without icons */}
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl sm:text-6xl lg:text-[72px] font-light tracking-tight leading-[0.9] text-[#090909] mb-6 select-none"
          >
            <span>Bring Us Your Problem</span>
            <span className="block text-[#090909]">Before The Specification.</span>
          </motion.h1>

          {/* Hero Subtext with high contrast dark text */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[#444444] text-base sm:text-lg leading-relaxed mb-8 max-w-[560px]"
          >
            A useful first message names the organisation, the people it affects, the problem as it stands today, and what a good outcome would look like. That&apos;s enough for us to start.
          </motion.p>

          {/* Action Cards & Buttons using PRATIMA AI Logo Brand Colors */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
          >
            {/* Primary Action (WhatsApp) in Logo Amber Brand Color */}
            <motion.a
              href={getWhatsAppHref("a new project")}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                backgroundColor: "var(--amber)",
                color: "#090909",
                boxShadow: "0 4px 24px rgba(255, 190, 74, 0.4)",
                minWidth: "220px",
              }}
              className="inline-flex items-center justify-between gap-8 px-6 py-4 rounded-[50px] font-semibold text-sm sm:text-base transition-all cursor-pointer hover:bg-[#111111] hover:text-white"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare size={18} />
                <span>WhatsApp (+91 70268 11812)</span>
              </div>
              <ArrowRightCircle size={20} />
            </motion.a>

            {/* Secondary Action (Email) in Logo Dark Ink Brand Color */}
            <motion.a
              href={getEmailHref()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                backgroundColor: "#090909",
                color: "#ffffff",
                boxShadow: "0 4px 24px rgba(9, 9, 9, 0.18)",
              }}
              className="inline-flex items-center justify-between gap-6 px-6 py-4 rounded-[50px] font-medium text-sm sm:text-base transition-all cursor-pointer hover:bg-[#2b2b2b]"
            >
              <div className="flex items-center gap-2.5">
                <Mail size={18} className="text-[#ffbe4a]" />
                <span>{siteConfig.email}</span>
              </div>
              <ArrowRightCircle size={20} className="text-[#ffbe4a]" />
            </motion.a>
          </motion.div>

          {/* Expectation Note Card */}
          <motion.aside
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="pt-6 border-t border-black/10"
          >
            <div className="utility-label text-[#090909] mb-2">
              What happens next
            </div>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed margin-0">
              We read the context, identify the most useful first question and continue the conversation directly. There is no automated sales sequence.
            </p>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}
