import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp, MessageCircle, ArrowRight, Zap, Clock, TrendingUp, Palette, BarChart2, Users } from "lucide-react";
import Footer from "@/components/Footer";
import wishlyLogo from "@/assets/wishly-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";
import postDiwali from "@/assets/post-diwali.jpg";
import postSports from "@/assets/post-sports.jpg";
import postFriday from "@/assets/post-friday.jpg";
import postMothers from "@/assets/post-mothers-day.jpg";
import postReviews from "@/assets/post-reviews.jpg";
import catFestival from "@/assets/cat-festival.jpg";
import catOffers from "@/assets/cat-offers.jpg";
import catProducts from "@/assets/cat-products.jpg";
import catSpecials from "@/assets/cat-specials.jpg";
import catServices from "@/assets/cat-services.jpg";
import catEvents from "@/assets/cat-events.jpg";
import catQuotes from "@/assets/cat-quotes.jpg";
import vasakhi from "@/assets/vaisakhi-output.jpg";
import vasakhiProduct from "@/assets/vaisakhi-product.jpg";
import reel1 from "@/assets/reel-1.mp4";
import reel2 from "@/assets/reel-2.mp4";
import reel3 from "@/assets/reel-3.mp4";
import reel4 from "@/assets/reel-4.mp4";
import customerIcecream from "@/assets/customer-icecream.png";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";
import portfolio9 from "@/assets/portfolio-9.jpg";
import portfolio10 from "@/assets/portfolio-10.jpg";
import portfolio11 from "@/assets/portfolio-11.jpg";
import portfolio12 from "@/assets/portfolio-12.jpg";

const WHATSAPP_URL = "https://wa.me/919100102870";

const col1 = [catFestival, postDiwali, catOffers, vasakhi, postMothers];
const col2 = [catSpecials, postSports, catProducts, postReviews, catEvents];
const col3 = [catQuotes, postFriday, catServices, vasakhiProduct, catFestival];
const col4 = [postDiwali, catOffers, postSports, catSpecials, catQuotes];

const stats = [
  { value: "30+", label: "Clients served" },
  { value: "10h", label: "Saved weekly" },
  { value: "3×", label: "More value" },
];

const restaurantStats = [
  { value: "30+", label: "Clients served" },
  { value: "Zero", label: "Posts for you to publish" },
  { value: "3×", label: "More value" },
];

const painPoints = [
  { icon: "⏰", title: "No time to plan content", desc: "You are busy running the business. Social media gets pushed to later." },
  { icon: "💡", title: "No clear ideas", desc: "You know posting matters, but not what to post consistently." },
  { icon: "💸", title: "Slow or expensive execution", desc: "Agencies feel heavy. Freelancers are inconsistent. DIY takes too much time." },
  { icon: "📉", title: "No real consistency", desc: "A few posts go out, then everything stops. Important moments get missed." },
  { icon: "🎯", title: "Timely opportunities get missed", desc: "Sports events, weather changes, festivals and trending dates pass by without your brand." },
  { icon: "😩", title: "Owner burnout on content", desc: "You end up doing everything yourself - and content is always the last thing that gets attention." },
];

const whatWeCreate = [
  { icon: "🎁", label: "Offer & promotion posts" },
  { icon: "🎉", label: "Festival & occasion creatives" },
  { icon: "🍽️", label: "Product & service highlights" },
  { icon: "📢", label: "Daily specials & announcements" },
  { icon: "🎬", label: "Reels & short-form video" },
  { icon: "✍️", label: "Caption-ready social posts" },
  { icon: "📅", label: "Monthly content planning" },
  { icon: "🎨", label: "Brand-style content" },
  { icon: "🚀", label: "Campaign & launch creatives" },
  { icon: "📍", label: "Timely moment-based content" },
];

const benefits = [
  { icon: <BarChart2 className="w-5 h-5" />, title: "Consistent Posting", desc: "Your business stays active without depending on random effort." },
  { icon: <Palette className="w-5 h-5" />, title: "Better-Looking Content", desc: "Your brand looks polished, presentable, and more professional online." },
  { icon: <Zap className="w-5 h-5" />, title: "Faster Turnaround", desc: "Move quickly on offers, events, seasonal moments, and important updates." },
  { icon: <Clock className="w-5 h-5" />, title: "Less Effort From Your Side", desc: "No briefing designers, chasing freelancers, or figuring out content every week." },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Better Economics", desc: "Our AI-powered managed service gives better output and value than agencies or an in-house team." },
  { icon: <Users className="w-5 h-5" />, title: "Smart Suggestions", desc: "Wishly AI tracks festivals, sports events, weather, and local moments so you never miss a relevant post." },
];

const steps = [
  { num: "01", title: "We understand your business", desc: "We learn about your business, offers, audience, style, and content needs." },
  { num: "02", title: "Wishly AI powers the workflow", desc: "Our system identifies timely opportunities, generates content ideas, adapts formats, and speeds up production." },
  { num: "03", title: "We create and deliver the content", desc: "Content is reviewed, refined, and delivered ready to post - so you stay consistent without extra effort." },
  { num: "04", title: "Ongoing managed support", desc: "As your business keeps moving, Wishly keeps you active with regular content support." },
];

const restaurantSteps = [
  {
    num: "01",
    title: "We learn your restaurant once",
    desc: "You tell us your menu, your cuisine, your ambience, your peak times, and your key occasions. We connect to your social accounts. This is the last time you'll need to explain your restaurant or touch your social media.",
    badge: null,
  },
  {
    num: "02",
    title: "Wishly AI builds your content plan",
    desc: "Every week, Wishly's engine scans your restaurant profile alongside live signals — upcoming occasions, sports events, movie releases, local news, weather, trending topics, and your own demand patterns — and generates a prioritized content plan for your restaurant. Not a generic calendar. A promotion plan built around what's actually happening in your world this week.",
    badge: "This is what makes Wishly different",
  },
  {
    num: "03",
    title: "We create, schedule, and post — you do nothing",
    desc: "Our team takes Wishly's plan and produces finished content — food posts, Reels, captions, and reservation CTAs. We schedule it. We post it directly to your accounts. Every week, you get a short WhatsApp summary showing what went live. If you ever want to flag something before it posts, you have a 24-hour window. If we don't hear from you, it goes live on schedule. Either way — it's handled.",
    badge: null,
  },
  {
    num: "04",
    title: "Tables fill. You keep cooking.",
    desc: "Every month we review what drove the most engagement and reservations, and sharpen from there — better promotions, stronger CTAs, smarter timing. Your social media improves over time. Your involvement stays at zero.",
    badge: null,
  },
];

const comparison = [
  { usual: "Post only when someone gets time", wishly: "Structured, ongoing content support" },
  { usual: "Depend on freelancers or manual coordination", wishly: "One managed workflow" },
  { usual: "Slow turnaround on offers and trends", wishly: "Faster production for timely content" },
  { usual: "Hard to maintain consistency", wishly: "Built for continuous posting" },
  { usual: "More effort from the owner or team", wishly: "Lower day-to-day effort" },
  { usual: "Miss local or timely opportunities", wishly: "Smart suggestions surface them early" },
];

const restaurantComparison = [
  { usual: "Delivers a folder of content - you still have to post it yourself", wishly: "We post directly to your accounts. Nothing reaches you except a weekly WhatsApp summary of what went live." },
  { usual: "Generic posts built from a brief you gave them weeks ago", wishly: "Wishly monitors live signals and builds your content plan automatically - before you ask" },
  { usual: "Your logo on a restaurant template. Same format for every client.", wishly: "Content generated from your actual menu and demand data. No two restaurants get the same post." },
  { usual: "Valentine's Day content arrives a day before - or the day after", wishly: "Valentine's reservation CTA goes live 10 days out. '8 tables left' before you even thought to post." },
  { usual: "Beautiful food photos with no CTA - likes but no reservations", wishly: "Every post is built to drive a specific action - Reserve, Book, Order, Visit - not just look good." },
  { usual: "No awareness of IPL, movie releases, weather, or local events", wishly: "Wishly monitors all of it and builds match-night promos, rainy-day offers, and movie specials automatically" },
  { usual: "Your Google reviews sit unused - never turned into content", wishly: "Wishly turns your best reviews into social proof posts automatically. Your fans do the selling." },
];

const restaurantBenefits = [
  { icon: <MessageCircle className="w-5 h-5" />, title: "We post. You don't.", desc: "Not 'we deliver content for you to post.' We post it. Directly to your Instagram, WhatsApp Status, and Facebook - on schedule, every week, even during dinner rush." },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Never miss a table-filling moment", desc: "IPL nights, Diwali, a big movie release, a rainy Tuesday. Wishly catches the dining opportunity and posts before the moment passes. You don't track any of it." },
  { icon: <Palette className="w-5 h-5" />, title: "Content built from your actual menu", desc: "Your dishes. Your specials. Your ambience. Not a template - content generated from your restaurant specifically, every single week." },
  { icon: <BarChart2 className="w-5 h-5" />, title: "Every post built to fill seats", desc: "The right CTA. The right offer. The right timing. Not just content that looks good - promotions designed to drive reservations and footfall." },
  { icon: <Zap className="w-5 h-5" />, title: "Reels and posts. Both posted.", desc: "Food Reels, story creatives, promotional posts - posted directly to Instagram, WhatsApp Status, and Facebook. No new shoots, no extra coordination, ever." },
  { icon: <Clock className="w-5 h-5" />, title: "One WhatsApp contact for everything", desc: "Message us when something specific comes up. Weekly summary so you always see what went live. Fast turnaround on anything time-sensitive." },
];

const restaurantFaqs = [
  { q: "Do you actually post for us - or do we still have to publish?", a: "We post. Directly to your accounts, on schedule, every week. You don't review drafts, you don't hit publish, you don't manage a content calendar. Each week you get a short WhatsApp summary showing what went live. If you ever want to flag something before it posts, you have a 24-hour window. If we don't hear from you, it goes live on schedule. Either way - it's handled." },
  { q: "How is this different from a regular social media agency?", a: "Two key differences. First, most agencies deliver content and leave the posting to you - Wishly handles the full loop including publishing directly to your accounts. Second, most agencies build from a generic brief. Wishly's engine knows your actual menu, tracks every signal that drives dining decisions (IPL, festivals, weather, movie releases), and builds a content plan for your restaurant specifically every week." },
  { q: "Do I need to brief you every time I run a special or promotion?", a: "Only if it's something we wouldn't know - a new dish you just added, a private event, a one-day offer. For everything else - holidays, match nights, occasions, weekend promos - Wishly's engine surfaces it automatically and we post it. Most of our restaurant clients send us maybe one or two messages a week, if that." },
  { q: "Will the content look generic - like every other restaurant?", a: "No. Wishly AI generates content from your specific menu, cuisine type, ambience, and demand data - not a shared restaurant template. The caption for your biryani post will reference your specific dish, not 'our delicious food.' And no other restaurant on Wishly gets a post that looks or reads like yours." },
  { q: "Do you handle Reels as well as static posts - and do you post both?", a: "Yes - we create and post both. Food Reels are included and we treat them as the primary growth format. We build them from your existing food photos - no new shoots, no video crew. We publish them directly to Instagram, WhatsApp Status, and Facebook. Reels consistently get 5-10x more reach than static posts to non-followers, so we prioritise them in your content plan." },
  { q: "What about Valentine's Day, IPL, Mother's Day - do you handle those?", a: "That's exactly where Wishly earns its place. Wishly's engine monitors every upcoming occasion and posts reservation campaigns 7-10 days in advance - not day-of. Your Valentine's 'last 8 tables' post goes live before your competitor even starts thinking about it. IPL final match-night promo is posted 5 days out. You never scramble the morning of a big occasion again - because we already handled it." },
  { q: "Can you turn our Google reviews into posts?", a: "Yes - review-to-post is included and we post them. Wishly connects to your Google Business Profile, pulls your strongest reviews, turns them into social proof posts, and publishes them directly to your accounts. Your happiest customers become your loudest marketing - without you lifting a finger." },
  { q: "We already post sometimes - why do we need this?", a: "Occasional posting is the most common pattern we see - and the least effective one. Instagram's algorithm rewards consistency above almost everything else. The restaurants driving reservations through social are the ones posting every day, hitting every occasion, and running Reels consistently. Wishly makes that happen without it falling on you or your team - because we handle the posting too." },
];

const restaurantSignals = [
  { title: "Holidays & festivals", desc: "Diwali, Eid, Christmas, Pongal - the engine flags it 10 days out, builds your promo, and posts it before your competitor wakes up." },
  { title: "Weather conditions", desc: "Rain detected on Friday? A comfort food or delivery promo is queued automatically. Sunny weekend? A footfall offer goes live." },
  { title: "Sports events", desc: "IPL final incoming - the engine builds your match-night promo 5 days early and posts it. You find out from the WhatsApp summary." },
  { title: "Movie & entertainment releases", desc: "Major Bollywood or OTT releases drive dining-out occasions. Wishly captures that audience with a timely post before the weekend." },
  { title: "Local & industry news", desc: "City events, food industry moments, local buzz - your brand stays part of the conversation without you tracking any of it." },
  { title: "Trending topics", desc: "When a food trend breaks nationally, Wishly connects it to your menu and posts while it's still live - not two days later." },
  { title: "Exam & academic seasons", desc: "Result days, graduation dates, college calendars - celebration dining posts go live exactly when families are ready to book." },
  { title: "Local events", desc: "Concerts, markets, sporting events nearby - the engine spots the footfall opportunity and builds your promo around it." },
  { title: "Your demand patterns", desc: "Your slow days, peak windows, and Popular Times data - the engine pushes a fill-the-tables offer exactly when your restaurant needs it." },
];

const plans = [
  { name: "Starter", price: "14,999", tagline: "Start posting consistently.", features: ["Core monthly post support", "Ready-to-use creatives", "Good for structured content starters"], highlight: false },
  { name: "Growth", price: "24,999", tagline: "More regular output for active growth.", features: ["Higher monthly volume", "Mixed formats", "Better fit for active businesses"], highlight: true },
  { name: "Managed Plus", price: "29,999", tagline: "Hands-on support for frequent campaigns.", features: ["Highest output", "Priority handling", "Best for offers & campaigns"], highlight: false },
];

const faqs = [
  { q: "Is this fully managed?", a: "Yes. Wishly handles your social media content with much less effort from your side." },
  { q: "Do I need to send ideas every time?", a: "No. We help with ideas, formats, and content direction as part of the service." },
  { q: "Will the content look generic?", a: "No. Content is built around your business, category, and offers - then reviewed before delivery." },
  { q: "Do you create reels too?", a: "Yes. Wishly supports both static content and short-form video creatives." },
  { q: "What are Smart Suggestions?", a: "Timely content opportunities surfaced by Wishly AI based on sports events, weather, local happenings, festivals, and seasonal moments." },
  { q: "Is this only for restaurants?", a: "No. Wishly works across restaurants, gyms, salons, clinics, stores, coaching centres, ecommerce brands, and other growing businesses." },
  { q: "Why not just use AI tools directly?", a: "Wishly is not just AI access. It is a managed service - better content, less effort, faster turnaround, and more consistency." },
];

/* ─── LEAD FORM ─────────────────────────────────────────────── */
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbxxQV5FJw2dGzCwWmm_gOqWr1lDKLh6Z4OyDWhmQaATcheqml9V7FwY74wBTa6mcDEohQ/exec";

const LeadForm = memo(function LeadForm({ source }: { source?: string }) {
  const [form, setForm] = useState({ name: "", businessName: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "phone") {
      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, phone: digits });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, submittedAt: source ? `${source} - ${new Date().toISOString()}` : new Date().toISOString() }),
      });
      setSubmitted(true);
      if (typeof window !== "undefined" && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as Window & { gtag?: (...args: unknown[]) => void }).gtag!("event", "manual_event_SUBMIT_LEAD_FORM");
      }
    } catch {
      setError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  const waMessage = encodeURIComponent(
    `Hi Wishly! I want managed social media for my business.\nName: ${form.name}\nBusiness: ${form.businessName}\nPhone: ${form.phone}`
  );

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-6 px-2"
      >
        <div className="w-14 h-14 rounded-full bg-orange/15 border border-orange/30 flex items-center justify-center mx-auto mb-4 text-2xl">🎉</div>
        <h3 className="text-[18px] font-extrabold text-primary-foreground mb-2">Thank you for submitting!</h3>
        <p className="text-[13px] text-white/45 leading-relaxed mb-5">
          Our team will contact you within the next <span className="text-primary-foreground font-semibold">24 hours</span> with sample content for <span className="text-primary-foreground font-semibold">{form.businessName}</span>.
        </p>
        <a
          href={`${WHATSAPP_URL}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl text-[13px] font-bold no-underline hover:bg-[#1ebe5d] transition-all shadow-[0_4px_20px_rgba(37,211,102,0.3)]"
        >
          <MessageCircle className="w-4 h-4" />
          Continue on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      {[
        { name: "name", label: "Your Name", placeholder: "e.g. Rahul Sharma", type: "text" },
        { name: "businessName", label: "Business Name", placeholder: "e.g. Spice Garden", type: "text" },
        { name: "phone", label: "Contact Number", placeholder: "+91 98765 43210", type: "tel" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-white/35">{field.label} *</label>
          <input
            type={field.type}
            name={field.name}
            required
            value={form[field.name as keyof typeof form]}
            onChange={handleChange}
            placeholder={field.placeholder}
            inputMode={field.name === "phone" ? "numeric" : undefined}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-[13px] text-primary-foreground placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] transition-all bg-white/[0.04] ${
              field.name === "phone" && form.phone.length > 0 && form.phone.length < 10
                ? "border-red-400/50 focus:border-red-400/70"
                : "border-white/[0.08] focus:border-orange/40"
            }`}
          />
          {field.name === "phone" && form.phone.length > 0 && form.phone.length < 10 && (
            <p className="text-[11px] text-red-400 mt-1">{form.phone.length}/10 digits</p>
          )}
        </div>
      ))}

      {error && (
        <p className="text-[12px] text-red-400 text-center">{error}</p>
      )}

      <motion.button
        type="submit"
        disabled={submitting}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-1 py-3 rounded-xl text-[13.5px] font-bold text-white cursor-pointer disabled:opacity-60 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(17,82%,50%) 0%, hsl(25,90%,55%) 100%)", boxShadow: "0 4px 24px hsla(17,82%,45%,0.45)" }}
      >
        {submitting ? "Sending…" : "Get Free Content with Your Brand →"}
      </motion.button>

      <div className="flex items-center gap-2 pt-0.5">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-[10px] text-white/20">or</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 border border-[#25D366]/25 text-[#25D366] py-2.5 rounded-xl text-[13px] font-semibold no-underline hover:border-[#25D366]/50 hover:bg-[#25D366]/06 transition-all"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        Chat on WhatsApp
      </a>
      <p className="text-center text-[10px] text-white/15 pt-0.5">No credit card · We'll reach out within 24 hours</p>
    </form>
  );
});

/* ─── VIDEO GRID ──────────────────────────────────────────── */
const portfolioVideos = [reel1, reel2, reel3, reel4];

const VideoGrid = memo(function VideoGrid() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    let loaded = 0;
    const onReady = () => {
      loaded += 1;
      if (loaded === videos.length) {
        setReady(true);
        videos.forEach((v) => { v.currentTime = 0; v.play().catch(() => {}); });
      }
    };
    videos.forEach((v) => {
      if (v.readyState >= 3) { onReady(); }
      else { v.addEventListener("canplaythrough", onReady, { once: true }); }
    });
    return () => videos.forEach((v) => v.removeEventListener("canplaythrough", onReady));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {portfolioVideos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => setLightbox(src)}
            className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[hsla(22,25%,8%,1)] cursor-pointer group max-h-[360px] md:max-h-[680px]"
            style={{ aspectRatio: "9/16" }}
          >
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-8 h-8 rounded-full border-2 border-orange/30 border-t-orange animate-spin" />
              </div>
            )}
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={src}
              muted
              loop
              playsInline
              preload="auto"
              className={`w-full h-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
            />
            {/* Play hint overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-[18px] ml-0.5">▶</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(18px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.video
              key={lightbox}
              src={lightbox}
              autoPlay
              controls
              playsInline
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
              style={{ aspectRatio: "9/16" }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all text-[16px]"
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

/* ─── PORTFOLIO STRIP + LIGHTBOX ─────────────────────────── */
const stripImages = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6, portfolio7, portfolio8, portfolio9, portfolio10, portfolio11, portfolio12, vasakhi, catFestival, postDiwali, catOffers, catSpecials];

const PortfolioStrip = memo(function PortfolioStrip() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(20,18%,5%), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(20,18%,5%), transparent)" }} />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-3 w-max"
        >
          {[...stripImages, ...stripImages].map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(src)}
              className="w-[100px] rounded-xl overflow-hidden shrink-0 border border-white/[0.06] cursor-zoom-in hover:border-orange/40 hover:scale-105 transition-transform duration-200"
              style={{ aspectRatio: "9/16" }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt=""
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all text-[16px]"
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

/* ─── FAQ ─────────────────────────────────────────────────── */
const FAQ = memo(function FAQ({ items }: { items?: typeof faqs }) {
  const [open, setOpen] = useState<number | null>(null);
  const list = items ?? faqs;
  return (
    <div className="space-y-2">
      {list.map((faq, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl border border-w-border bg-card overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer group">
            <span className="text-[13.5px] font-semibold text-ink group-hover:text-orange transition-colors pr-4">{faq.q}</span>
            {open === i ? <ChevronUp className="w-4 h-4 text-orange shrink-0" /> : <ChevronDown className="w-4 h-4 text-mid shrink-0" />}
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <p className="px-5 pb-4 text-[13px] text-mid leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
});

/* ─── PAGE ────────────────────────────────────────────────── */
export default function ManagedServices() {
  const { pathname } = useLocation();
  const isRestaurants = pathname === "/managed-services/restaurants";
  const [pastHero, setPastHero] = useState(false);
  const toastIdx = 0;
  const showToast = false;
  const recentJoins = [{ name: "", area: "", time: "" }];
  const [showCompetitorPopup, setShowCompetitorPopup] = useState(false);
  const competitorClickCount = useRef(0);
  const competitorPopupShown = useRef(false);
  const onScroll = useCallback(() => setPastHero(window.scrollY > window.innerHeight * 0.8), []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (!isRestaurants) return;

    competitorClickCount.current = 0;
    competitorPopupShown.current = false;
    setShowCompetitorPopup(false);

    const onClick = () => {
      if (competitorPopupShown.current) return;
      competitorClickCount.current += 1;

      if (competitorClickCount.current >= 15) {
        competitorPopupShown.current = true;
        setShowCompetitorPopup(true);
      }
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [isRestaurants]);

  useEffect(() => {
    if (!showCompetitorPopup) return;
    const timeout = setTimeout(() => setShowCompetitorPopup(false), 5000);
    return () => clearTimeout(timeout);
  }, [showCompetitorPopup]);

  return (
    <div className="min-h-screen bg-background">

      {/* ── LIVE JOIN TOAST (restaurants only) ── */}
      {false && isRestaurants && (
        <AnimatePresence>
          {showToast && (
            <motion.div
              key={toastIdx}
              initial={{ opacity: 0, x: -24, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-24 left-4 z-[110] flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{ background: "hsla(22,28%,8%,0.98)", border: "1px solid hsla(22,25%,22%,0.5)", backdropFilter: "blur(16px)" }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange/30 to-orange/10 border border-orange/20 flex items-center justify-center text-[14px] shrink-0">🍽️</div>
              <div>
                <div className="text-[12px] font-bold text-white/90 leading-tight">{recentJoins[toastIdx].name} <span className="text-white/40 font-normal">({recentJoins[toastIdx].area})</span></div>
                <div className="text-[10.5px] text-white/40 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Just joined Wishly · {recentJoins[toastIdx].time}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ── URGENCY STRIP (restaurants only) ── */}
      {false && isRestaurants && (
        <div className="fixed top-[60px] left-0 right-0 z-40 flex items-center justify-center gap-3 py-2 px-4 text-center"
          style={{ background: "hsla(0,72%,36%,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid hsla(0,72%,50%,0.3)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-pulse shrink-0" />
          <span className="text-[11px] font-bold text-red-100 tracking-wide">
            Only <span className="underline decoration-red-300">3 spots</span> left in Hyderabad this month — 2 restaurants joined this week
          </span>
          <a href="#contact" className="ml-1 text-[10.5px] font-extrabold text-white bg-red-500/40 border border-red-400/40 px-2.5 py-0.5 rounded-full no-underline hover:bg-red-500/60 transition-all whitespace-nowrap">Claim yours →</a>
        </div>
      )}

      {isRestaurants && (
        <AnimatePresence>
          {showCompetitorPopup && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-[76px] z-[120] w-[min(calc(100vw-24px),720px)] -translate-x-1/2 px-3"
            >
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_12px_38px_rgba(0,0,0,0.35)]"
                style={{ background: "hsla(6,14%,34%,0.96)", border: "1px solid hsla(8,18%,50%,0.22)", backdropFilter: "blur(14px)" }}
              >
                <span className="text-[18px] shrink-0">📸</span>
                <div className="min-w-0 flex-1 text-[14px] sm:text-[15px] font-semibold leading-tight text-white/82">
                  Your competitor posted their specials on Instagram.
                </div>
                <button
                  onClick={() => setShowCompetitorPopup(false)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white/45 transition-colors hover:text-white/75"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {isRestaurants ? (
        <Helmet>
          <title>Digital Marketing Agency for Restaurants in Hyderabad | Wishly AI</title>
          <meta name="description" content="Wishly AI is a leading digital marketing agency for restaurants and food businesses in Hyderabad. We offer AI-powered social media marketing, Instagram ads, Facebook ads, and managed content for restaurants, cafes, and breweries." />
          <meta name="keywords" content="digital marketing for restaurants, online marketing for restaurants, social media marketing for restaurants, Facebook ads for food business, digital marketing strategy for restaurants, Facebook ads for restaurants, restaurant digital marketing agency, social media marketing for food business, Instagram ads for restaurants, digital marketing agency for restaurants, social media management for restaurants, facebook marketing for restaurants, paid ads for food business, paid ads for restaurants, social media management for food business, Instagram ads for food business, paid advertisement for restaurants, paid advertisement for food business, social media advertising for restaurants, digital marketing agency for restaurants Hyderabad, paid ads for cafe, social media marketing for cafe, social media marketing for brewery, Instagram ads for cafe, Facebook ads for cafe, paid ads for brewery, digital marketing for brewery, Instagram ads for brewery, paid advertisement for brewery, paid advertisement for cafe, Facebook ads for brewery, digital marketing for cafe, social media management for cafe, social media management for brewery" />
          <meta property="og:title" content="Digital Marketing Agency for Restaurants | Wishly AI Hyderabad" />
          <meta property="og:description" content="AI-powered social media marketing and paid ads for restaurants, cafes, and food businesses in Hyderabad. Consistent content, faster turnaround, zero effort from your side." />
          <meta property="og:url" content="https://wishlyai.in/managed-services/restaurants" />
          <link rel="canonical" href="https://wishlyai.in/managed-services/restaurants" />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Wishly AI - Restaurant Social Media Marketing",
            "description": "AI-powered social media marketing agency for restaurants, cafes, and food businesses in Hyderabad.",
            "url": "https://wishlyai.in/managed-services/restaurants",
            "telephone": "+919100102870",
            "address": { "@type": "PostalAddress", "addressLocality": "Hyderabad", "addressRegion": "Telangana", "addressCountry": "IN" },
            "serviceType": ["Social Media Marketing", "Instagram Ads", "Facebook Ads", "Content Creation", "Digital Marketing"],
            "areaServed": "Hyderabad"
          })}</script>
        </Helmet>
      ) : (
        <Helmet>
          <title>Social Media Marketing Agency in Hyderabad | Wishly AI Managed Services</title>
          <meta name="description" content="Wishly AI is a leading digital marketing agency in Hyderabad. We offer AI-powered social media marketing, content creation, and managed services for growing businesses. Best digital marketing agency near you." />
          <meta name="keywords" content="digital marketing agency in hyderabad, digital marketing agency, ad agencies in hyderabad, best digital marketing agency hyderabad, digital marketing agency near me, social media marketing agency hyderabad, digital marketing companies in hyderabad, best digital marketing agency in hyderabad india, ad agency in hyderabad, marketing companies in hyderabad, digital marketing services in hyderabad, digital media marketing, best advertising agency in hyderabad, online media marketing, digital marketing in hyderabad, social digital marketing" />
          <meta property="og:title" content="Best Social Media Marketing Agency in Hyderabad | Wishly AI" />
          <meta property="og:description" content="AI-powered social media management for businesses in Hyderabad. Consistent content, faster turnaround, zero effort from your side." />
          <meta property="og:url" content="https://wishlyai.in/managed-services" />
          <link rel="canonical" href="https://wishlyai.in/managed-services" />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Wishly AI - Social Media Marketing Agency",
            "description": "AI-powered social media marketing agency for businesses in Hyderabad.",
            "url": "https://wishlyai.in/managed-services",
            "telephone": "+919100102870",
            "address": { "@type": "PostalAddress", "addressLocality": "Hyderabad", "addressRegion": "Telangana", "addressCountry": "IN" },
            "serviceType": ["Social Media Marketing", "Content Creation", "Digital Marketing", "Managed Services"],
            "areaServed": "Hyderabad"
          })}</script>
        </Helmet>
      )}

      {/* Floating WhatsApp */}
      <AnimatePresence>
        {pastHero && (
          <motion.a
            href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[100] flex items-center gap-2 sm:gap-2.5 bg-[#25D366] text-white pl-3.5 pr-4 sm:pl-4 sm:pr-5 py-2.5 sm:py-3 rounded-full text-[12px] sm:text-[13px] font-bold no-underline shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:bg-[#1ebe5d] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp us
          </motion.a>
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] glass shadow-wishly-sm">
        <div className="container h-full flex items-center justify-between">
          <Link to="/" className="no-underline flex items-center gap-2 shrink-0">
            <img src={wishlyLogo} alt="" className="h-10 w-10 object-contain" />
            <span className="font-display text-[18px] font-extrabold tracking-tight text-ink">Wishly</span>
          </Link>

          {/* Sub-nav links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "How it works", href: "#how-it-works" },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Pricing", href: "#pricing" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-mid hover:text-ink no-underline transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="bg-orange text-white text-[13px] font-semibold px-4 py-2 rounded-full no-underline hover:bg-orange-dark transition-colors duration-200"
          >
            Contact us
          </a>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className={`relative min-h-[100dvh] flex items-start md:items-center overflow-hidden ${isRestaurants ? "pt-[92px]" : "pt-[60px]"}`}>

        {/* 4-col scrolling mosaic */}
        <div className="absolute inset-0 flex gap-1.5 overflow-hidden">
          {[col1, col2, col3, col4].map((col, ci) => (
            <div key={ci} className={`flex-1 flex flex-col gap-1.5 min-w-0 ${ci >= 2 ? "hidden md:flex" : ""}`}>
              <motion.div
                animate={{ y: ci % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: 18 + ci * 5, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-1.5"
              >
                {[...col, ...col].map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full rounded-lg object-cover aspect-square" loading={i < 2 ? "eager" : "lazy"} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Multi-layer overlay: dark base */}
        <div className="absolute inset-0 md:hidden" style={{ background: "hsla(20,25%,3%,0.93)" }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(105deg, hsla(20,25%,3%,0.97) 0%, hsla(20,25%,3%,0.96) 38%, hsla(20,22%,4%,0.88) 65%, hsla(20,22%,4%,0.82) 100%)" }} />
        {/* Vignette edges */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, hsla(20,25%,3%,0.7) 100%)" }} />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative py-8 md:py-14 max-w-6xl grid md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px] gap-6 md:gap-10 lg:gap-14 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>

            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
              style={{ background: "hsla(17,82%,45%,0.12)", border: "1px solid hsla(17,82%,55%,0.28)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-orange">{isRestaurants ? "For Restaurants · Cafes · Clubs · Hyderabad" : "Social Media Marketing Agency · Hyderabad"}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[clamp(32px,3.6vw,54px)] font-extrabold leading-[0.97] tracking-[-0.04em] text-primary-foreground mb-4">
              {isRestaurants ? (
                <>Your restaurant<br />deserves to be<br /><span className="italic font-normal" style={{ background: "linear-gradient(90deg, hsl(35,90%,68%), hsl(20,90%,62%), hsl(35,90%,68%))", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradient-shift 3s ease-in-out infinite" }}>famous.</span></>
              ) : (
                <>Social media<br />content,<br /><span className="italic font-normal" style={{ background: "linear-gradient(90deg, hsl(35,90%,68%), hsl(20,90%,62%), hsl(35,90%,68%))", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradient-shift 3s ease-in-out infinite" }}>handled for you.</span></>
              )}
            </h1>

            <p className="text-[14px] text-white/50 leading-relaxed mb-5 max-w-md">
              {isRestaurants ? (
                <>You run the restaurant. <span className="text-white/70">We handle your social media end to end.</span> Content, captions, reels, scheduling, and posting - powered by Wishly AI, which knows what to post before you even think to ask.</>

              ) : (
                <>Hyderabad's AI-powered digital marketing agency - we plan, create, and deliver social media content for <span className="text-white/70">restaurants, gyms, salons, clinics, stores, and coaching businesses</span> faster and more consistently than any traditional agency or freelancer.</>
              )}
            </p>

            {/* Scarcity line (restaurants only) */}
            {false && isRestaurants && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="flex items-center gap-2 mb-4 text-[12px] text-red-300/80 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shrink-0" />
                3 spots remaining in Hyderabad this month
                <span className="text-white/30 font-normal">· 2 restaurants joined this week</span>
              </motion.div>
            )}

            {/* Stats - horizontal with dividers */}
            <div className="flex items-center gap-0 mb-5 rounded-2xl overflow-hidden"
              style={{ background: "hsla(22,25%,10%,0.7)", border: "1px solid hsla(22,25%,22%,0.4)", backdropFilter: "blur(12px)" }}
            >
              {(isRestaurants ? restaurantStats : stats).map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className={`flex-1 px-3 sm:px-5 py-3 sm:py-4 text-center relative ${i < stats.length - 1 ? "border-r border-white/[0.07]" : ""}`}
                >
                  <div className="text-[18px] sm:text-[22px] font-extrabold leading-none mb-0.5" style={{
                    background: "linear-gradient(135deg, #fff 20%, hsl(35,90%,68%))",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>{s.value}</div>
                  <div className="text-[9px] sm:text-[10px] text-white/35 font-medium tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA - only visible on small screens */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2 md:hidden">
              <a href="#contact" className="flex-1 bg-orange text-white text-[14px] font-bold py-3.5 rounded-xl text-center no-underline shadow-[0_4px_20px_hsla(17,82%,45%,0.4)] hover:bg-orange-dark transition-colors">
                Get free content →
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-[#25D366]/30 text-[#25D366] py-3.5 rounded-xl text-[14px] font-semibold no-underline">
                <MessageCircle className="w-4 h-4" /> WhatsApp us
              </a>
            </div>

            {/* Business type pills */}
            {!isRestaurants && <div className="hidden sm:flex flex-wrap gap-2">
              {[
                { label: "Restaurants", href: "/managed-services/restaurants" },
                { label: "Gyms", href: null },
                { label: "Salons", href: null },
                { label: "Clinics", href: null },
                { label: "Stores", href: null },
                { label: "Coaching", href: null },
              ].map((t, i) =>
                t.href ? (
                  <motion.a key={i} href={t.href} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    className="text-[11px] text-white/40 font-medium px-3 py-1.5 rounded-full no-underline cursor-pointer"
                    style={{ background: "hsla(22,20%,12%,0.7)", border: "1px solid hsla(22,20%,28%,0.3)" }}
                  >
                    {t.label}
                  </motion.a>
                ) : (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    className="text-[11px] text-white/40 font-medium px-3 py-1.5 rounded-full"
                    style={{ background: "hsla(22,20%,12%,0.7)", border: "1px solid hsla(22,20%,28%,0.3)" }}
                  >
                    {t.label}
                  </motion.span>
                )
              )}
            </div>}
          </motion.div>

          {/* RIGHT - form card (desktop only) */}
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }} className="hidden md:block">
            <div className="relative rounded-3xl p-6 overflow-hidden"
              style={{
                background: "linear-gradient(160deg, hsla(22,25%,9%,0.98) 0%, hsla(22,20%,7%,0.99) 100%)",
                border: "1px solid hsla(22,25%,22%,0.5)",
                boxShadow: "0 0 0 1px hsla(0,0%,100%,0.03) inset, 0 32px 80px rgba(0,0,0,0.6), 0 0 60px hsla(17,82%,45%,0.07)",
              }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, transparent 5%, hsl(17,82%,55%) 35%, hsl(35,90%,65%) 65%, transparent 95%)" }}
              />
              {/* Subtle glow behind card */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-16 blur-[40px] opacity-30 rounded-full"
                style={{ background: "hsl(17,82%,55%)" }}
              />

              <div className="mb-4 relative">
                {isRestaurants && (
                  <div className="flex items-center gap-2 mb-3 rounded-xl px-3 py-2" style={{ background: "hsla(0,72%,36%,0.15)", border: "1px solid hsla(0,72%,50%,0.25)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shrink-0" />
                    <span className="text-[11px] font-bold text-red-300">Only 3 spots left in Hyderabad this month</span>
                  </div>
                )}
                <span className="text-[15px] font-extrabold block mb-0.5" style={{
                  background: "linear-gradient(90deg, hsl(35,90%,68%), hsl(17,82%,58%))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {isRestaurants ? "Get free content for your restaurant" : "Get free content for your brand"}
                </span>
                <p className="text-[12px] text-white/35">{isRestaurants ? "Drop your details - we'll create a sample post for your restaurant." : "Drop your details - we'll create sample posts for your business."}</p>
              </div>
              <LeadForm source={isRestaurants ? "restaurant" : undefined} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COMPETITOR IS POSTING (restaurants only) ── */}
      {false && isRestaurants && (
        <section className="py-10 bg-background">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "hsla(0,60%,8%,0.7)", border: "1px solid hsla(0,72%,40%,0.25)" }}
            >
              <div className="px-6 py-4 border-b border-white/[0.05] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-400">Right now, while you're reading this</span>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {[
                  { text: "Your competitor posted their specials on Instagram.", time: "4 min ago", icon: "📸" },
                  { text: "Another restaurant in your area ran a weekend offer reel.", time: "11 min ago", icon: "🎬" },
                  { text: "A new café nearby posted their IPL match-night promo.", time: "23 min ago", icon: "🏏" },
                  { text: "You haven't posted in days. Your reach just dropped.", time: "ongoing", icon: "📉" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 px-6 py-3.5 ${i === 3 ? "bg-red-900/10" : ""}`}>
                    <span className="text-[18px] shrink-0">{item.icon}</span>
                    <span className={`text-[13px] leading-snug flex-1 ${i === 3 ? "text-red-300 font-semibold" : "text-white/60"}`}>{item.text}</span>
                    <span className={`text-[10px] shrink-0 font-bold ${i === 3 ? "text-red-400" : "text-white/25"}`}>{item.time}</span>
                  </motion.div>
                ))}
              </div>
              <div className="px-6 py-4 flex items-center justify-between gap-4 border-t border-white/[0.05]">
                <p className="text-[12px] text-white/35 leading-relaxed">Every day without consistent posting costs you reach, visibility, and tables.</p>
                <a href="#contact" className="shrink-0 bg-red-600 text-white text-[12px] font-bold px-4 py-2 rounded-full no-underline hover:bg-red-500 transition-colors">Fix this now →</a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          WHY DIFFERENT (restaurants only)
      ══════════════════════════════════════════ */}
      {isRestaurants && (
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-5xl">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[10.5px] font-bold uppercase tracking-widest text-orange"
                style={{ background: "hsla(17,82%,45%,0.08)", border: "1px solid hsla(17,82%,55%,0.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Why WishlyAI is Different
              </div>
              <h2 className="text-[clamp(30px,4vw,56px)] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink mb-5">
                Most agencies guess what to post.<br />
                <span className="italic font-bold" style={{ color: "hsl(17,82%,48%)" }}>Wishly AI already knows.</span>
              </h2>
              <p className="text-[16px] text-mid leading-relaxed max-w-2xl">
                WishlyAI already knows your menu, your cuisine, and your food. It scans <span className="text-ink font-semibold">9 live signals</span> - festivals, IPL, weather, movies, local events, trending moments, and more - and posts exactly the right content for your restaurant. <span className="text-ink font-semibold">Before you even think to ask.</span>
              </p>
            </motion.div>

            {/* Live monitoring label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10.5px] font-bold uppercase tracking-widest text-mid">Engine scanning 9 live signals</span>
              </div>
              <div className="flex-1 h-px bg-w-border" />
            </div>

            {/* Signals grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-10">
              {restaurantSignals.map((sig, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl p-4 border border-w-border bg-card hover:border-orange/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                    <span className="text-[13px] font-semibold text-ink">{sig.title}</span>
                  </div>
                  <p className="text-[11.5px] text-mid leading-relaxed pl-3.5">{sig.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Output pills */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10.5px] font-bold uppercase tracking-widest shrink-0" style={{ color: "hsl(17,82%,45%)" }}>WishlyAI Engine Auto Generates</span>
              <div className="flex-1 h-px bg-w-border" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: "🍽️", label: "Daily Specials" },
                { icon: "🎬", label: "Food Reels" },
                { icon: "🎉", label: "Festival Creatives" },
                { icon: "🏷️", label: "Offer Posts" },
                { icon: "📢", label: "Weekend Promos" },
                { icon: "⭐", label: "Review Posts" },
                { icon: "🍹", label: "Menu Highlights" },
                { icon: "📅", label: "Content Calendar" },
                { icon: "📸", label: "Story Creatives" },
                { icon: "🏏", label: "Match-Night Promos" },
                { icon: "🎞️", label: "Movie-Night Posts" },
                { icon: "🔥", label: "Trending Posts" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-center gap-2 rounded-full px-3.5 py-2 cursor-default border border-w-border bg-card hover:border-orange/40 hover:bg-orange/[0.04] transition-all duration-300"
                >
                  <span className="text-[14px]">{item.icon}</span>
                  <span className="text-[12px] text-mid font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          WHAT WE CREATE
      ══════════════════════════════════════════ */}
      {!isRestaurants && (
        <section className="py-12 md:py-16 lg:py-24 bg-background">
          <div className="container max-w-4xl">
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                AI-Powered Content
              </div>
              <h2 className="text-[clamp(24px,2.6vw,40px)] font-extrabold tracking-tight text-ink leading-tight mb-3">
                Content that used to take days,<br /><span className="italic font-normal text-gradient">delivered by AI in hours.</span>
              </h2>
              <p className="text-[14px] text-mid max-w-xl mx-auto">
                Wishly AI generates brand-specific content ideas, formats, captions, and creatives - faster and more consistently than any agency or freelancer.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: "⚡", title: "10× faster than manual", desc: "AI generates content ideas and drafts in minutes, not days." },
                { icon: "🎯", title: "Brand-specific every time", desc: "Trained on your business category, offers, and tone - not generic templates." },
                { icon: "📆", title: "Never misses a moment", desc: "AI tracks festivals, sports events, and trends to surface timely content." },
              ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="rounded-2xl p-5 flex flex-col gap-2 border border-w-border bg-card"
                >
                  <span className="text-2xl">{f.icon}</span>
                  <div className="text-[13.5px] font-bold text-ink">{f.title}</div>
                  <div className="text-[12.5px] text-mid leading-relaxed">{f.desc}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {whatWeCreate.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-center gap-2.5 rounded-full px-4 py-2.5 cursor-default border border-w-border bg-card hover:border-orange/40 hover:bg-orange/[0.06] transition-all duration-300"
                >
                  <span className="text-[16px]">{item.icon}</span>
                  <span className="text-[13px] text-mid font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          PORTFOLIO
      ══════════════════════════════════════════ */}
      <section id="portfolio" className="py-12 md:py-16 lg:py-20 overflow-hidden" style={{ background: "hsl(20,18%,5%)" }}>
        <div className="container max-w-4xl mb-10 md:mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange mb-5">Our Portfolio</div>
            <h2 className="text-[clamp(24px,2.6vw,40px)] font-extrabold tracking-tight text-primary-foreground leading-tight mb-3">
              Content we've created<br />
              <span className="italic font-normal text-gradient">for our clients.</span>
            </h2>
          </motion.div>
        </div>

        {/* Reels */}
        <div className="container max-w-5xl mb-3">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-orange">🎬 Reels</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <VideoGrid />
        </div>

        {/* Posts */}
        <div className="container max-w-5xl mb-4">
          <div className="flex items-center gap-3 mb-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-orange">🖼 Posts</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
        </div>
        <PortfolioStrip />
      </section>

      {/* ══════════════════════════════════════════
          CUSTOMER SPOTLIGHT
      ══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden border border-w-border"
            style={{ background: "linear-gradient(135deg, hsl(22,20%,98%) 0%, hsl(22,18%,96%) 100%)" }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left: ice cream photo */}
              <div
                className="md:w-[340px] shrink-0 relative overflow-hidden min-h-[200px] md:min-h-[380px]"
              >
                <img
                  src={customerIcecream}
                  alt="Old Mumbai Ice Cream"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_48px_rgba(0,0,0,0.22)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/25 pointer-events-none" />
              </div>

              {/* Right: caption + context */}
              <div className="flex-1 p-5 sm:p-8 md:p-10 flex flex-col justify-center gap-4 md:gap-5">
                {/* Instagram header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white text-[10px] font-black shrink-0">OM</div>
                  <div>
                    <div className="text-[13px] font-bold text-ink leading-tight">oldmumbaiicecreamhyderabad</div>
                    <div className="text-[11px] text-mid">Hyderabad, Telangana · Instagram</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 rounded-full border border-[#ee2a7b]/20 bg-[#ee2a7b]/05 px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ee2a7b]" />
                    <span className="text-[10px] font-bold text-[#ee2a7b] uppercase tracking-wide">Live post</span>
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <p className="text-[14px] text-ink/80 leading-relaxed mb-2">
                    "Scooping happiness since 1981 🍦✨<br />
                    Made with real milk, real fruits, and zero shortcuts - just pure handcrafted goodness 🍓🥭"
                  </p>
                  <p className="text-[12px] text-[#3897f0] font-medium">
                    #oldmumbaiicecream &nbsp;#icecream &nbsp;#ipl2026 &nbsp;#trendingpost
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[18px]">❤️</span>
                    <span className="text-[13px] font-semibold text-ink">22 likes</span>
                  </div>
                  <div className="text-[12px] text-mid">1 day ago</div>
                </div>

                {/* Wishly badge */}
                <div className="rounded-2xl border border-orange/20 bg-orange/05 p-4 flex items-center gap-3">
                  <span className="text-[20px]">🚀</span>
                  <span className="text-[13px] text-mid">Old Mumbai Ice Cream (Hyderabad) <span className="text-ink font-semibold">- Created using WishlyAI</span></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social proof line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-[13px] text-mid mt-6"
          >
            Real businesses. Real posts. <span className="text-ink font-semibold">Your brand could be next.</span>
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-5xl">
        <div className="border-t border-w-border" />
      </div>

      {/* ══════════════════════════════════════════
          BENEFITS
      ══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-w-border bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-mid mb-5">What you get</div>
            <h2 className="text-[clamp(24px,2.6vw,40px)] font-extrabold tracking-tight text-ink leading-tight mb-3">
              {isRestaurants ? (
                <>Fully managed means<br /><span className="italic font-normal text-gradient">fully managed.</span></>
              ) : (
                <>Everything included,<br /><span className="italic font-normal text-gradient">nothing left to figure out.</span></>
              )}
            </h2>
            <p className="text-[14px] text-mid max-w-lg mx-auto">
              {isRestaurants
                ? "Content, production, scheduling, and posting - all handled. The only thing that reaches you is a weekly WhatsApp summary of what went live. No drafts to review. No posts to publish. Nothing."
                : "The best digital marketing services in Hyderabad - without agency overheads or long-term lock-ins."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(isRestaurants ? restaurantBenefits : benefits).map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-w-border bg-card p-6 hover:border-orange/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-orange/10 border border-orange/15 flex items-center justify-center mb-4 text-orange group-hover:bg-orange/18 transition-colors">{b.icon}</div>
                <div className="text-[15px] font-bold text-ink mb-1.5 group-hover:text-orange transition-colors">{b.title}</div>
                <div className="text-[13px] text-mid leading-relaxed">{b.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="how-it-works" className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 section-dark opacity-95" />
        <div className="container relative max-w-3xl">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange mb-5">How it works</div>
            <h2 className="text-[clamp(24px,2.6vw,40px)] font-extrabold tracking-tight text-primary-foreground leading-tight">
              {isRestaurants ? (
                <>You cook. We post.<br /><span className="italic font-normal text-gradient">It really is that simple.</span></>
              ) : (
                <>Simple, managed,<br /><span className="italic font-normal text-gradient">done for you.</span></>
              )}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[21px] top-6 bottom-6 w-px bg-gradient-to-b from-orange/50 via-orange/20 to-transparent hidden sm:block" />
            <div className="space-y-4">
              {(isRestaurants ? restaurantSteps : steps).map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }} className="flex items-start gap-5">
                  <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center shrink-0 text-orange font-extrabold text-[12px] tracking-tight z-10"
                    style={{ background: "hsla(17,82%,45%,0.15)", border: "1px solid hsla(17,82%,55%,0.3)" }}
                  >{step.num}</div>
                  <div className={`rounded-2xl p-5 flex-1 ${isRestaurants && (step as typeof restaurantSteps[number]).badge ? "border border-orange/25 glass-dark" : "border border-white/[0.06] glass-dark"}`}>
                    {isRestaurants && (step as typeof restaurantSteps[number]).badge && (
                      <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest text-orange"
                        style={{ background: "hsla(17,82%,45%,0.12)", border: "1px solid hsla(17,82%,55%,0.3)" }}>
                        <span className="w-1 h-1 rounded-full bg-orange" />
                        {(step as typeof restaurantSteps[number]).badge}
                      </div>
                    )}
                    <div className="text-[15px] font-bold text-primary-foreground mb-1">{step.title}</div>
                    <div className="text-[13px] text-white/45 leading-relaxed">{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3-column summary bar - restaurants only */}
          {isRestaurants && (
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="mt-10 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-3"
              style={{ background: "hsla(22,20%,10%,0.8)", border: "1px solid hsla(22,20%,22%,0.4)" }}
            >
              {[
                { label: "Every week", title: "Wishly AI plans it", desc: "Signals scanned. Dining occasions surfaced. Promotion plan built for your restaurant specifically." },
                { label: "Our team", title: "We produce & schedule it", desc: "Food posts, Reels, captions, reservation CTAs - finished and queued. WhatsApp heads-up sent. No action needed from you." },
                { label: "On schedule", title: "It goes live", desc: "Posted directly to your accounts. Weekly WhatsApp summary. That's all that ever reaches you." },
              ].map((col, i) => (
                <div key={i} className={`px-5 py-6 relative ${i < 2 ? "sm:border-r border-white/[0.06]" : ""} ${i > 0 ? "border-t sm:border-t-0 border-white/[0.06]" : ""}`}>
                  {i < 2 && <span className="hidden sm:block absolute right-[-9px] top-1/2 -translate-y-1/2 text-orange text-lg font-bold z-10">›</span>}
                  <div className="text-[10px] font-bold uppercase tracking-widest text-orange mb-1.5">{col.label}</div>
                  <div className="text-[14px] font-bold text-primary-foreground mb-1.5">{col.title}</div>
                  <div className="text-[12px] text-white/40 leading-relaxed">{col.desc}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPARISON
      ══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-w-border bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-mid mb-5">Why Wishly</div>
            <h2 className="text-[clamp(24px,2.6vw,40px)] font-extrabold tracking-tight text-ink leading-tight">
              {isRestaurants ? <>Other agencies vs.<br /><span className="italic font-normal text-gradient">Wishly for restaurants.</span></> : <>The usual way vs.<br /><span className="italic font-normal text-gradient">the Wishly way.</span></>}
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-w-border shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-2">
              <div className="px-3 sm:px-5 py-3 bg-card text-[10px] sm:text-[10.5px] font-bold text-mid uppercase tracking-widest border-r border-w-border">{isRestaurants ? "Other Agencies" : "The usual way"}</div>
              <div className="px-3 sm:px-5 py-3 bg-orange/[0.06] text-[10px] sm:text-[10.5px] font-bold text-orange uppercase tracking-widest">{isRestaurants ? "Wishly Managed" : "With Wishly"}</div>
            </div>
            {(isRestaurants ? restaurantComparison : comparison).map((row, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }} className="grid grid-cols-2 border-t border-w-border">
                <div className="px-3 sm:px-5 py-3 sm:py-4 flex items-start gap-2 border-r border-w-border">
                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400/50 mt-0.5 shrink-0" />
                  <span className="text-[11.5px] sm:text-[13px] text-mid leading-relaxed">{row.usual}</span>
                </div>
                <div className="px-3 sm:px-5 py-3 sm:py-4 flex items-start gap-2 bg-orange/[0.02]">
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange mt-0.5 shrink-0" />
                  <span className="text-[11.5px] sm:text-[13px] text-ink leading-relaxed font-medium">{row.wishly}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <section id="pricing" className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 section-dark opacity-95" />
        <div className="container relative max-w-4xl">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange mb-5">Pricing</div>
            <h2 className="text-[clamp(24px,2.6vw,40px)] font-extrabold tracking-tight text-primary-foreground leading-tight">
              {isRestaurants ? <>One plan.<br /><span className="italic font-normal text-gradient">Everything included.</span></> : <>Simple monthly plans.<br /><span className="italic font-normal text-gradient">No surprises.</span></>}
            </h2>
          </div>
          {isRestaurants ? (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="max-w-[560px] mx-auto rounded-2xl border border-orange glass-dark p-7 relative overflow-hidden shadow-[0_8px_40px_hsla(17,82%,45%,0.2)]"
              style={{ background: "linear-gradient(160deg, hsla(17,60%,10%,0.9), hsla(22,40%,7%,0.95))" }}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg, transparent 5%, hsl(17,82%,55%) 40%, hsl(35,90%,65%) 70%, transparent 95%)" }} />
              <div className="mb-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-orange mb-2">Wishly Managed · Restaurants</div>
                <div className="text-[17px] font-extrabold text-primary-foreground mb-3">Your restaurant's social media - handled.</div>
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="text-[13px] text-white/45 mr-0.5">₹</span>
                  <span className="text-[36px] font-extrabold text-primary-foreground leading-none">14,999</span>
                  <span className="text-[13px] text-white/35 ml-1">/month</span>
                </div>
                <p className="text-[12px] text-white/35 pb-5 mb-5 border-b border-white/[0.08]">Starting price. No long-term contract. Cancel anytime.</p>
              </div>
              <ul className="space-y-2.5 mb-7">
                {[
                  "Wishly AI-powered content planning - we decide what to post, you don't have to",
                  "Food posts + Reels created, scheduled, and posted directly to your accounts every week",
                  "All signals monitored - occasions, sports, movies, weather, local news, your demand patterns",
                  "Review-to-post - your Google reviews turned into social proof posts and published automatically",
                  "Match-night, holiday, and occasion campaigns posted in advance, never last minute",
                  "Instagram, WhatsApp Status & Facebook - we post to all three",
                  "Weekly WhatsApp summary - see what went live, flag anything within 24 hours",
                  "Month-to-month - no lock-in, no surprise invoices",
                ].map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[13px] text-white/60">
                    <Check className="w-3.5 h-3.5 text-orange mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl text-[13px] font-bold text-center no-underline flex items-center justify-center gap-2 bg-orange text-white hover:bg-orange-dark shadow-[0_4px_20px_hsla(17,82%,45%,0.35)] transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat with us on WhatsApp to get started
              </a>
              <p className="text-center text-[11px] text-white/20 mt-3">Multiple locations? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-orange no-underline">Ask about custom plans.</a></p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-5">
              {plans.map((plan, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`rounded-2xl border p-7 flex flex-col relative ${plan.highlight ? "border-orange shadow-[0_8px_40px_hsla(17,82%,45%,0.2)]" : "border-white/[0.07] glass-dark"}`}
                  style={plan.highlight ? { background: "linear-gradient(160deg, hsla(17,60%,10%,0.9), hsla(22,40%,7%,0.95))" } : {}}
                >
                  {plan.highlight && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-[0_4px_12px_hsla(17,82%,45%,0.4)]">Most Popular</div>}
                  <div className="mb-5">
                    <div className="text-[15px] font-extrabold text-primary-foreground mb-2">{plan.name}</div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[13px] text-white/45 mr-0.5">₹</span>
                      <span className="text-[30px] font-extrabold text-primary-foreground leading-none">{plan.price}</span>
                      <span className="text-[12px] text-white/35 ml-1">/mo</span>
                    </div>
                    <p className="text-[12px] text-white/35 mt-2 leading-relaxed">{plan.tagline}</p>
                  </div>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[13px] text-white/60">
                        <Check className="w-3.5 h-3.5 text-orange mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl text-[13px] font-bold text-center no-underline flex items-center justify-center gap-2 transition-all ${plan.highlight ? "bg-orange text-white hover:bg-orange-dark shadow-[0_4px_20px_hsla(17,82%,45%,0.35)]" : "border border-white/12 text-white/55 hover:border-orange/35 hover:text-white"}`}
                  >
                    Get started <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          )}
          {!isRestaurants && (
            <p className="text-center text-[13px] text-white/30 mt-6">
              For detailed plan information,{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-orange no-underline hover:underline">chat with us on WhatsApp</a>
            </p>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="container max-w-2xl">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-w-border bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-mid mb-5">FAQ</div>
            <h2 className="text-[clamp(24px,2.6vw,38px)] font-extrabold tracking-tight text-ink leading-tight">
              {isRestaurants ? <>Questions restaurant owners ask<br /><span className="italic font-normal text-gradient">before they sign up.</span></> : <>Questions people ask<br /><span className="italic font-normal text-gradient">before they sign up.</span></>}
            </h2>
          </div>
          <FAQ items={isRestaurants ? restaurantFaqs : undefined} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="relative rounded-[32px] overflow-hidden">
              <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[hsla(33,28%,4%,0.97)] to-[hsla(22,35%,5%,0.88)]" />
              <div className="relative px-5 py-8 sm:px-12 sm:py-14 max-w-lg mx-auto">
                <div className="text-center mb-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                    Limited slots this month
                  </div>
                  <h2 className="text-[clamp(22px,2.4vw,36px)] font-extrabold text-primary-foreground tracking-tight leading-tight mb-2">
                    {isRestaurants ? <>Your restaurant deserves<br />to be <span className="italic font-normal" style={{ background: "linear-gradient(90deg, hsl(35,90%,68%), hsl(20,90%,62%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>famous.</span></> : <>Get your social media<br />handled by Wishly AI.</>}
                  </h2>
                  <p className="text-[13px] text-white/40 leading-relaxed">{isRestaurants ? "Drop your details - we'll create a sample post for your restaurant within 24 hours." : "Drop your details - we'll reach out within 24 hours."}</p>
                </div>

                {/* Embedded form */}
                <LeadForm source={isRestaurants ? "restaurant" : undefined} />

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-white/[0.07]" />
                  <span className="text-[11px] text-white/25">or reach us directly</span>
                  <div className="flex-1 h-px bg-white/[0.07]" />
                </div>

                {/* Contact options */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+919100102870"
                    className="flex-1 flex items-center justify-center gap-2 border border-white/12 text-white/60 py-3 rounded-xl text-[13px] font-semibold no-underline hover:border-white/25 hover:text-white transition-all"
                  >
                    📞 Call us · 91001 02870
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-[#25D366]/25 text-[#25D366] py-3 rounded-xl text-[13px] font-semibold no-underline hover:border-[#25D366]/50 hover:bg-[#25D366]/06 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
