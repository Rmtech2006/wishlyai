import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Demo from "./pages/Demo";
import Terms from "./pages/Terms";
import Gallery from "./pages/Gallery";
import Video from "./pages/Video";
import ManagedServices from "./pages/ManagedServices";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const VideoPopup = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [reelIndex, setReelIndex] = useState(0);
  const interactionCount = useRef(0);
  const fired = useRef(false);
  const reels = useRef<string[]>([]);

  useEffect(() => {
    // Lazy-load reel URLs so the MP4s aren't referenced until VideoPopup mounts
    Promise.all([
      import("@/assets/reel-1.mp4"),
      import("@/assets/reel-2.mp4"),
      import("@/assets/reel-3.mp4"),
      import("@/assets/reel-4.mp4"),
    ]).then((mods) => { reels.current = mods.map((m) => m.default); });
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/managed-services")) return;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const fire = () => {
      if (fired.current) return;
      if ((window as Window & { __wishlyAnimating?: boolean }).__wishlyAnimating) return;
      interactionCount.current += 1;
      if (interactionCount.current >= 14) {
        fired.current = true;
        setShow(true);
      }
    };

    const onScroll = () => {
      if (scrollTimer) return;
      fire();
      scrollTimer = setTimeout(() => { scrollTimer = null; }, 600);
    };

    window.addEventListener("click", fire);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("click", fire);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          style={{ background: "rgba(4,2,1,0.92)", backdropFilter: "blur(18px)" }}
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[300px] rounded-3xl border border-orange/20 bg-[hsla(22,30%,5%,0.99)] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/50 text-[11px] text-white/50 hover:text-white/90 transition-colors cursor-pointer"
            >✕</button>

            {/* Header — fixed height */}
            <div className="px-5 pt-4 pb-2 text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-widest text-orange mb-1.5">
                🎬 Real posts. Built by Wishly.
              </div>
              <h3 className="text-[15px] font-extrabold leading-snug text-primary-foreground">
                See what Wishly creates
                <br />
                <span style={{ background: "linear-gradient(90deg, hsl(17,82%,65%), hsl(30,90%,60%), hsl(17,82%,65%))", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }} className="font-normal italic">
                  for restaurants like yours.
                </span>
              </h3>
            </div>

            {/* Video */}
            <div className="relative w-full bg-black" style={{ height: "320px" }}>
              <video
                key={reelIndex}
                src={reels.current[reelIndex]}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Footer — fixed height */}
            <div className="px-4 py-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {reels.current.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReelIndex(i)}
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-200 cursor-pointer border ${
                      reelIndex === i
                        ? "bg-orange border-orange text-white"
                        : "bg-transparent border-white/20 text-white/40 hover:border-white/40 hover:text-white/60"
                    }`}
                  >{i + 1}</button>
                ))}
                <motion.button
                  onClick={() => setReelIndex((reelIndex + 1) % (reels.current.length || 4))}
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white/60 hover:text-white hover:border-white/40 cursor-pointer transition-all text-[12px]"
                >→</motion.button>
              </div>
              <motion.a
                href="https://app.wishlyai.in/login"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full bg-orange px-4 py-2 text-[12px] font-extrabold text-white no-underline shadow-[0_4px_20px_hsla(17,82%,45%,0.4)] hover:bg-orange-dark"
              >
                Try free →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <VideoPopup />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<Blogs />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/video" element={<Video />} />
        <Route path="/managed-services" element={<ManagedServices />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
