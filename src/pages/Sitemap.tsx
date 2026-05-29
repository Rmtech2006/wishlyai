import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, Zap, BadgeDollarSign, Play, Image, BookOpen, Info, FileText, BriefcaseBusiness } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllBlogPosts } from "@/lib/blogs";

const mainPages = [
  { href: "/", label: "Home", desc: "AI-powered social media for Indian restaurants", icon: Home },
  { href: "/how-it-works", label: "How It Works", desc: "See how Wishly automates your content", icon: Zap },
  { href: "/pricing", label: "Pricing", desc: "Plans for every size restaurant", icon: BadgeDollarSign },
  { href: "/managed-services", label: "Managed Services", desc: "We handle everything for you", icon: BriefcaseBusiness },
  { href: "/demo", label: "Demo", desc: "Try Wishly before you sign up", icon: Play },
  { href: "/gallery", label: "Gallery", desc: "Real posts created by Wishly", icon: Image },
  { href: "/video", label: "Video", desc: "Watch Wishly in action", icon: Play },
];

const companyPages = [
  { href: "/about", label: "About Wishly", desc: "Our mission and the team behind the product", icon: Info },
  { href: "/terms", label: "Terms & Privacy", desc: "Terms of service, privacy policy, and billing", icon: FileText },
];

const Sitemap = () => {
  const allPosts = getAllBlogPosts();
  const postsByCategory = allPosts.reduce<Record<string, typeof allPosts>>((acc, post) => {
    const cat = post.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sitemap | Wishly AI</title>
        <meta name="description" content="Browse all pages and blog posts on Wishly AI — the AI-powered social media platform built for Indian restaurants." />
        <link rel="canonical" href="https://wishlyai.in/sitemap" />
        <meta property="og:title" content="Sitemap | Wishly AI" />
        <meta property="og:url" content="https://wishlyai.in/sitemap" />
        <meta property="og:image" content="https://wishlyai.in/hero-download-1.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />

      <main className="pt-28 pb-20 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Page header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange-light px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-orange mb-4">
            Site Directory
          </div>
          <h1 className="font-display text-[clamp(28px,3.5vw,48px)] font-extrabold leading-tight tracking-tight text-ink mb-3">
            Everything on Wishly AI
          </h1>
          <p className="text-mid text-base max-w-xl">
            A complete list of all pages and articles on wishlyai.in — find what you're looking for quickly.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Main Pages */}
          <section>
            <h2 className="font-display flex items-center gap-2.5 text-xl font-bold text-ink mb-5 pb-3 border-b border-border">
              <span className="h-5 w-1 rounded-full bg-orange inline-block" />
              Main Pages
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mainPages.map(({ href, label, desc, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-4 hover:border-orange/50 hover:shadow-sm transition-all duration-200"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-light text-orange group-hover:bg-orange group-hover:text-white transition-all">
                    <Icon size={16} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink group-hover:text-orange transition-colors">{label}</span>
                    <span className="block text-xs text-mid mt-0.5 leading-relaxed">{desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Company */}
          <section>
            <h2 className="font-display flex items-center gap-2.5 text-xl font-bold text-ink mb-5 pb-3 border-b border-border">
              <span className="h-5 w-1 rounded-full bg-orange inline-block" />
              Company
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {companyPages.map(({ href, label, desc, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-white px-4 py-4 hover:border-orange/50 hover:shadow-sm transition-all duration-200"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-light text-orange group-hover:bg-orange group-hover:text-white transition-all">
                    <Icon size={16} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink group-hover:text-orange transition-colors">{label}</span>
                    <span className="block text-xs text-mid mt-0.5 leading-relaxed">{desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Blog */}
          <section>
            <h2 className="font-display flex items-center gap-2.5 text-xl font-bold text-ink mb-5 pb-3 border-b border-border">
              <span className="h-5 w-1 rounded-full bg-orange inline-block" />
              Blog & Articles
              <span className="ml-auto text-xs font-normal text-muted-foreground">{allPosts.length} articles</span>
            </h2>

            {/* Blog index link */}
            <Link
              to="/blogs"
              className="group mb-8 inline-flex items-center gap-3 rounded-xl border border-orange/40 bg-orange-light px-5 py-3.5 hover:bg-orange hover:border-orange transition-all duration-200"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange/20 text-orange group-hover:bg-white/20 group-hover:text-white transition-all">
                <BookOpen size={15} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink group-hover:text-white transition-colors">All Blog Posts</span>
                <span className="block text-xs text-mid group-hover:text-white/80 transition-colors">Browse the complete article library</span>
              </span>
            </Link>

            {/* Posts grouped by category */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(postsByCategory).map(([category, posts]) => (
                <div key={category} className="rounded-xl border border-border bg-white p-5">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-orange mb-4 pb-2 border-b border-border">{category}</h3>
                  <ul className="space-y-2.5">
                    {posts.map((post) => (
                      <li key={post.slug}>
                        <Link
                          to={`/blogs/${post.slug}`}
                          className="group flex items-start gap-2 text-sm text-mid hover:text-ink transition-colors"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-orange/40 group-hover:bg-orange transition-colors" />
                          <span className="group-hover:underline underline-offset-2 leading-snug">{post.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
