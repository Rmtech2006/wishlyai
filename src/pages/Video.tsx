import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";

const showcaseVideos = [
  {
    id: "Nlkvuq-IVFI",
    title: "Vaisakhi Special Promo",
    tag: "Festival",
    tagColor: "bg-orange/10 text-orange border-orange/20",
    desc: "A full restaurant promo video generated in under 5 minutes. No brief, no editor, no prompt engineering.",
  },
  {
    id: "jeuonRcuA8s",
    title: "Weekend Offer Campaign",
    tag: "Offer",
    tagColor: "bg-green/10 text-green border-green/20",
    desc: "Wishly detected the weekend signal and generated this promotional video automatically.",
  },
];

const capabilities = [
  {
    icon: "🎬",
    title: "Full video in under 5 minutes",
    desc: "From signal detection to a ready-to-post video. No editing software, no freelancer, no waiting.",
  },
  {
    icon: "🧠",
    title: "Zero prompting required",
    desc: "Wishly reads your business data and writes the script, selects visuals, and generates the video automatically.",
  },
  {
    icon: "📱",
    title: "Every format covered",
    desc: "Reels, Stories, YouTube Shorts, WhatsApp Status. One generation, every platform.",
  },
  {
    icon: "🎯",
    title: "Occasion-aware content",
    desc: "Videos built around real signals - festivals, sports nights, review milestones, and your daily specials.",
  },
  {
    icon: "🏷️",
    title: "On-brand always",
    desc: "Your logo, colours, fonts, and tone baked into every video. Consistent identity across all content.",
  },
  {
    icon: "⚡",
    title: "Paid users get first access",
    desc: "Video generation is rolling out to paid plans first. Get on a plan now to be first in line.",
  },
];

export default function Video() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, hsla(22,40%,4%,0.97) 0%, hsla(22,30%,5%,0.85) 50%, hsla(20,25%,4%,0.92) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              AI Video - Dropping this week
            </div>

            <h1 className="text-[clamp(36px,5.5vw,72px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-primary-foreground mb-6">
              Your restaurant's story,<br />
              <span
                className="italic font-normal"
                style={{
                  background: "linear-gradient(90deg, #F5C842, #FFE566, #D4A017, #FFD700, #F5C842)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 3s ease-in-out infinite",
                }}
              >
                told in video. Automatically.
              </span>
            </h1>

            <p className="text-[16px] text-white/50 leading-relaxed mb-8 max-w-xl mx-auto">
              Wishly's AI video engine creates ready-to-post restaurant videos in under 5 minutes. No prompts. No editing. No agency.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://app.wishlyai.in/login"
                className="bg-orange text-white px-8 py-4 rounded-full text-[15px] font-bold no-underline shadow-[0_4px_30px_hsla(17,82%,45%,0.45)] hover:bg-orange-dark transition-all animate-glow"
              >
                Get early access →
              </a>
              <a
                href="#videos"
                className="border-2 border-white/30 text-white/80 px-6 py-4 rounded-full text-[15px] font-semibold no-underline hover:border-white/60 transition-all"
              >
                Watch examples ↓
              </a>
            </div>

            <p className="text-[12px] text-white/25 mt-4 tracking-wide">Paid users get access first · Free users join the waitlist</p>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO SHOWCASE ── */}
      <section id="videos" className="py-24 bg-background">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow>See it in action</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,50px)] font-bold tracking-tight text-ink leading-[1.06] mb-4">
              Real videos. Real restaurants.<br />
              <span className="text-gradient italic font-normal">Generated by AI.</span>
            </h2>
            <p className="text-[15px] text-mid max-w-[480px] mx-auto leading-relaxed">
              Every video below was created by Wishly in under 5 minutes with zero manual input.
            </p>
          </AnimatedSection>

          {/* Video tabs */}
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 mb-6 justify-center flex-wrap">
              {showcaseVideos.map((v, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveVideo(i); setPlaying(false); }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold border transition-all cursor-pointer ${
                    activeVideo === i
                      ? "bg-orange border-orange text-white shadow-[0_4px_20px_hsla(17,82%,45%,0.35)]"
                      : "bg-card border-w-border text-mid hover:border-orange/40 hover:text-ink"
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Video player */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.35)] border border-w-border/60 bg-card">
                  {!playing ? (
                    <div className="relative w-full aspect-video bg-[hsla(22,28%,6%,1)] flex items-center justify-center cursor-pointer group" onClick={() => setPlaying(true)}>
                      <img
                        src={`https://img.youtube.com/vi/${showcaseVideos[activeVideo].id}/maxresdefault.jpg`}
                        alt={showcaseVideos[activeVideo].title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
                      />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10 w-20 h-20 rounded-full bg-orange shadow-[0_8px_40px_hsla(17,82%,45%,0.6)] flex items-center justify-center"
                      >
                        <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-l-[24px] border-t-transparent border-b-transparent border-l-white ml-1.5" />
                      </motion.div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${showcaseVideos[activeVideo].tagColor}`}>
                          {showcaseVideos[activeVideo].tag}
                        </span>
                        <span className="text-[11px] text-white/50 bg-black/40 px-2 py-1 rounded-full">AI Generated</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${showcaseVideos[activeVideo].id}?autoplay=1&rel=0&modestbranding=1`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="text-[15px] font-bold text-ink mb-1">{showcaseVideos[activeVideo].title}</div>
                    <div className="text-[13px] text-mid leading-relaxed">{showcaseVideos[activeVideo].desc}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="relative py-24 overflow-hidden">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 section-dark opacity-95" />
        <div className="container relative">
          <AnimatedSection className="text-center mb-14">
            <Eyebrow variant="dark">What the AI does</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,50px)] font-bold tracking-tight text-primary-foreground leading-[1.06] mb-4">
              Not just a video tool.<br />
              <span className="text-gradient italic font-normal">A full content engine.</span>
            </h2>
            <p className="text-[15px] text-white/40 max-w-[480px] mx-auto leading-relaxed">
              Wishly's video AI handles everything a content creator would - but in under 5 minutes, for every occasion.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <AnimatedSection key={i} delay={i * 0.08} direction="scale">
                <div className="glass-dark rounded-2xl p-7 border border-white/[0.06] h-full group hover:border-orange/20 transition-all duration-300">
                  <div className="text-3xl mb-4">{cap.icon}</div>
                  <div className="text-[16px] font-bold text-primary-foreground mb-2 group-hover:text-orange transition-colors">{cap.title}</div>
                  <div className="text-[13.5px] text-white/40 leading-relaxed">{cap.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON BAND ── */}
      <section className="py-20 bg-background">
        <div className="container">
          <AnimatedSection>
            <div className="relative rounded-[32px] overflow-hidden">
              <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsla(33,28%,4%,0.97)] to-[hsla(33,28%,4%,0.85)]" />
              <div className="relative px-8 py-16 sm:px-16 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                  Launching this week
                </div>
                <h2 className="text-[clamp(26px,4vw,46px)] font-extrabold text-primary-foreground tracking-tight leading-tight mb-4">
                  Be first to get<br />AI video for your restaurant.
                </h2>
                <p className="text-[14px] text-white/40 leading-relaxed mb-8 max-w-md mx-auto">
                  Paid users get access the moment it launches. Free users join the waitlist. One plan. Everything included.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.a
                    href="https://app.wishlyai.in/login"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-orange text-white px-8 py-4 rounded-full text-[15px] font-bold no-underline shadow-[0_4px_30px_hsla(17,82%,45%,0.5)] hover:bg-orange-dark transition-all"
                  >
                    Get early access →
                  </motion.a>
                </div>
                <p className="text-[11px] text-white/20 mt-4">No credit card needed · 7-day free trial</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
