import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock3, Sparkles, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Eyebrow from "@/components/Eyebrow";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";
import { fetchPublicBlogPosts } from "@/lib/blogApi";
import { BlogPost, getAllBlogPosts, resolveBlogImage } from "@/lib/blogs";

const BlogArticle = ({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) => (
  <>
    <Helmet>
      <title>{post.seoTitle ? `${post.seoTitle} | Wishly AI` : `${post.title} | Wishly AI Blog`}</title>
      <meta name="description" content={post.seoDescription || post.excerpt} />
      <meta property="og:title" content={post.seoTitle || post.title} />
      <meta property="og:description" content={post.seoDescription || post.excerpt} />
      <meta property="og:url" content={`https://wishlyai.in/blogs/${post.slug}`} />
      <meta property="og:image" content={resolveBlogImage(post)} />
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={post.publishedAt} />
      <link rel="canonical" href={`https://wishlyai.in/blogs/${post.slug}`} />
    </Helmet>
    <section className="relative overflow-hidden pt-28 pb-12 lg:pb-16">
      <div className="absolute inset-0">
        <img src={resolveBlogImage(post)} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,5,4,0.96)_0%,rgba(13,8,6,0.8)_42%,rgba(8,5,4,0.95)_100%)]" />
      </div>
      <div className="absolute left-[8%] top-[16%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,hsla(17,82%,45%,0.16)_0%,transparent_72%)]" />

      <div className="container relative">
        <AnimatedSection>
          <Link to="/blogs" className="mb-8 inline-flex items-center gap-2 text-[13px] font-semibold text-white/65 no-underline transition-colors hover:text-white">
            <ArrowLeft size={14} /> Back to all blogs
          </Link>
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex rounded-full border border-orange/25 bg-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-orange">
              {post.badge}
            </div>
            <h1 className="text-[clamp(34px,4.6vw,62px)] font-extrabold leading-[1.03] tracking-tight text-primary-foreground">
              {post.title}
            </h1>
            <p className="mt-5 max-w-[780px] text-[17px] leading-relaxed text-white/80">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-[12.5px] text-white/45">
              <span className="inline-flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
              <span className="inline-flex items-center gap-2"><Clock3 size={14} /> {post.readTime}</span>
              <span>{post.author}</span>
              <span>{post.category}</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <AnimatedSection>
            <div className="rounded-[32px] border border-w-border/60 bg-card p-6 shadow-wishly-card sm:p-10">
              <p className="text-[20px] font-semibold leading-relaxed text-ink">{post.hook}</p>
              <div className="mt-8 space-y-6">
                {post.body.map((paragraph, index) => (
                  <p key={`${post.slug}-paragraph-${index}`} className="text-[15px] leading-8 text-ink/75">
                    {paragraph}
                  </p>
                ))}
              </div>

              {post.sections?.length ? (
                <div className="mt-10 space-y-10 border-t border-w-border/70 pt-10">
                  {post.sections.map((section, index) => (
                    <section key={`${post.slug}-section-${index}`} className="space-y-5">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">Section {index + 1}</div>
                        <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-ink">{section.title}</h2>
                      </div>

                      {section.paragraphs?.map((paragraph, paragraphIndex) => (
                        <p key={`${post.slug}-section-${index}-paragraph-${paragraphIndex}`} className="text-[15px] leading-8 text-ink/75">
                          {paragraph}
                        </p>
                      ))}

                      {section.bullets?.length ? (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {section.bullets.map((bullet, bulletIndex) => (
                            <div
                              key={`${post.slug}-section-${index}-bullet-${bulletIndex}`}
                              className="rounded-[22px] border border-orange/15 bg-orange/[0.05] px-4 py-3 text-[13px] leading-relaxed text-mid"
                            >
                              {bullet}
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {section.table ? (
                        <div className="overflow-hidden rounded-[24px] border border-w-border/70 bg-background">
                          <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse text-left">
                              <thead className="bg-[hsla(17,82%,45%,0.08)]">
                                <tr>
                                  {section.table.columns.map((column) => (
                                    <th
                                      key={`${post.slug}-section-${index}-${column}`}
                                      className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-orange"
                                    >
                                      {column}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {section.table.rows.map((row, rowIndex) => (
                                  <tr key={`${post.slug}-section-${index}-row-${rowIndex}`} className="border-t border-w-border/60">
                                    {row.map((cell, cellIndex) => (
                                      <td
                                        key={`${post.slug}-section-${index}-row-${rowIndex}-cell-${cellIndex}`}
                                        className="px-4 py-3 text-[13px] leading-relaxed text-ink/75 align-top"
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : null}
                    </section>
                  ))}
                </div>
              ) : null}

              {post.faqs?.length ? (
                <section className="mt-12 border-t border-w-border/70 pt-10">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">FAQs</div>
                  <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-ink">Frequently asked questions</h2>
                  <div className="mt-6 space-y-4">
                    {post.faqs.map((faq, index) => (
                      <div key={`${post.slug}-faq-${index}`} className="rounded-[24px] border border-w-border/70 bg-background px-5 py-4">
                        <h3 className="text-[16px] font-bold leading-snug text-ink">{faq.question}</h3>
                        <p className="mt-2 text-[14px] leading-7 text-ink/70">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[28px] border border-w-border/60 bg-background p-5 shadow-wishly-card">
                <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                  <Sparkles size={14} /> Key takeaways
                </div>
                <div className="space-y-3">
                  {post.takeaways.map((takeaway, index) => (
                    <div key={`${post.slug}-takeaway-${index}`} className="rounded-2xl border border-w-border/60 bg-card px-4 py-3 text-[13px] leading-relaxed text-mid">
                      {takeaway}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-w-border/60 bg-background p-5 shadow-wishly-card">
                <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                  <Tag size={14} /> Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-orange/[0.08] px-3 py-1 text-[11px] font-semibold text-orange">
                      #{tag.replace(/\s+/g, "-")}
                    </span>
                  ))}
                </div>
              </div>

              {post.keyword ? (
                <div className="rounded-[28px] border border-w-border/60 bg-background p-5 shadow-wishly-card">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">Primary keyword</div>
                  <p className="mt-3 text-[14px] leading-relaxed text-mid">{post.keyword}</p>
                </div>
              ) : null}

              <div className="rounded-[28px] border border-orange/15 bg-orange/[0.05] p-5 shadow-wishly-card">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange">Ready to act on this?</div>
                <p className="mt-2 text-[13px] leading-relaxed text-mid">
                  Wishly turns ideas like this into fast, repeatable campaigns for restaurant teams.
                </p>
                <a
                  href={post.ctaUrl}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2.5 text-[13px] font-bold text-white no-underline shadow-[0_12px_30px_hsla(17,82%,45%,0.28)] transition-all hover:-translate-y-px hover:bg-orange-dark"
                >
                  {post.ctaLabel} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {relatedPosts.length > 0 && (
      <section className="relative overflow-hidden py-20">
        <img src={sectionBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.06]" />
        <div className="container relative">
          <AnimatedSection className="mb-10 text-center">
            <Eyebrow>Keep reading</Eyebrow>
            <h2 className="text-[clamp(28px,3.8vw,46px)] font-extrabold tracking-tight text-ink">More ideas from the Wishly playbook.</h2>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((related, index) => (
              <AnimatedSection key={related.slug} delay={index * 0.08} direction="scale">
                <Link to={`/blogs/${related.slug}`} className="group block overflow-hidden rounded-[28px] border border-w-border/60 bg-card no-underline shadow-wishly-card transition-transform duration-300 hover:-translate-y-1">
                  <div className="h-[210px] overflow-hidden">
                    <img src={resolveBlogImage(related)} alt={related.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="mb-2 inline-flex rounded-full bg-orange/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-orange">{related.category}</div>
                    <h3 className="text-[18px] font-bold leading-tight text-ink">{related.title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-mid">{related.excerpt}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    )}
  </>
);

const BlogListing = ({ posts }: { posts: BlogPost[] }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((post) => post.category)))], [posts]);
  const featuredPost = posts[0];
  const filteredPosts = activeCategory === "All"
    ? posts.slice(1)
    : posts.filter((post) => post.category === activeCategory && post.slug !== featuredPost?.slug);

  return (
    <>
      <Helmet>
        <title>Restaurant Marketing Blog — Tips for Indian Restaurant Owners | Wishly AI</title>
        <meta name="description" content="Expert guides on Zomato, FSSAI, Instagram, WhatsApp marketing, and restaurant growth strategies for Indian restaurant owners. Practical tips updated weekly." />
        <meta property="og:title" content="Restaurant Marketing Blog — Tips for Indian Restaurant Owners | Wishly AI" />
        <meta property="og:description" content="Expert guides on Zomato, FSSAI, Instagram, WhatsApp marketing, and restaurant growth strategies for Indian restaurant owners." />
        <meta property="og:url" content="https://wishlyai.in/blogs" />
        <link rel="canonical" href="https://wishlyai.in/blogs" />
      </Helmet>
      <section className="relative overflow-hidden pt-28 pb-12 min-h-[560px] lg:min-h-[620px]">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute left-1/2 top-[20%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsla(17,82%,45%,0.14)_0%,transparent_72%)] pointer-events-none" />

        <div className="container relative text-center">
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Eyebrow variant="dark">Practical ideas for restaurant growth</Eyebrow>
            <h1 className="mb-4 text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.04] tracking-tight text-primary-foreground">
              Marketing ideas that help
              <br />
              <span
                className="font-normal italic"
                style={{
                  background: "linear-gradient(90deg, #F5C842, #FFE566, #D4A017, #FFD700, #F5C842)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 3s ease-in-out infinite",
                }}
              >
                restaurants stay top of mind.
              </span>
            </h1>
            <p className="mx-auto max-w-[620px] text-[16px] leading-relaxed text-white/50">
              Strategy notes, campaign ideas, and signal-based playbooks for restaurants that want more than random posting.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />

        {/* Down arrow */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none"
        >
          <a href="#blog-content" className="flex flex-col items-center gap-1 no-underline pointer-events-auto">
            <span className="text-[11px] text-white/30">scroll for articles</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/30">
              <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </section>

      <div id="blog-content" className="border-y border-orange/10 bg-[hsla(17,82%,45%,0.06)] py-5">
        <div className="container">
          <div className="grid grid-cols-3 gap-5 text-center">
            {[
              { val: String(posts.length), label: "articles live" },
              { val: posts[0]?.readTime || "5 min", label: "featured read time" },
              { val: `${categories.length - 1}`, label: "active categories" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-0.5">
                <span className="font-display text-[22px] font-extrabold leading-none text-orange">{item.val}</span>
                <span className="text-[12px] leading-snug text-mid">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {featuredPost && (
        <AnimatedSection className="container py-14">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <Link to={`/blogs/${featuredPost.slug}`} className="overflow-hidden rounded-[30px] border border-w-border/60 bg-card no-underline shadow-wishly transition-transform duration-300 hover:-translate-y-1">
              <div className="grid h-full lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[280px] overflow-hidden">
                  <img src={resolveBlogImage(featuredPost)} alt={featuredPost.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
                    Featured article
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="mb-2 inline-flex rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                      {featuredPost.badge}
                    </div>
                    <h2 className="max-w-[420px] text-[clamp(24px,3vw,36px)] font-extrabold leading-tight text-white">
                      {featuredPost.title}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-[12px] text-mid">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> {featuredPost.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock3 size={14} /> {featuredPost.readTime}</span>
                    </div>
                    <p className="text-[16px] font-semibold leading-relaxed text-ink">{featuredPost.hook}</p>
                    <p className="mt-4 text-[14px] leading-7 text-mid">{featuredPost.excerpt}</p>
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-orange">
                    Open article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>

            <div className="rounded-[30px] border border-w-border/60 bg-card p-6 shadow-wishly-card">
              <Eyebrow>Browse articles</Eyebrow>
              <h3 className="mt-3 text-[26px] font-extrabold tracking-tight text-ink">Filter by topic.</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-mid">
                Filter by topic and open any article to see the exact kind of thinking that powers Wishly campaigns.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${activeCategory === category ? "bg-orange text-white shadow-[0_8px_24px_hsla(17,82%,45%,0.22)]" : "border border-w-border/60 bg-background text-mid hover:border-orange/25 hover:text-ink"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="mt-8 rounded-[24px] border border-orange/15 bg-orange/[0.05] p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-orange">Publishing format</div>
                <p className="mt-2 text-[13px] leading-relaxed text-mid">
                  Every article has its own `/blogs/slug` route, structured sections, practical takeaways, and a clean FAQ block for easier reading.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      <section className="pb-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <AnimatedSection key={post.slug} delay={index * 0.06} direction="scale">
                <Link to={`/blogs/${post.slug}`} className="group block h-full overflow-hidden rounded-[28px] border border-w-border/60 bg-card no-underline shadow-wishly-card transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative h-[240px] overflow-hidden">
                    <img src={resolveBlogImage(post)} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex h-[calc(100%-240px)] flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-[12px] text-mid">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-[20px] font-bold leading-tight text-ink">{post.title}</h3>
                    <p className="mt-3 text-[14px] leading-7 text-mid">{post.excerpt}</p>
                    <div className="mt-auto pt-5 text-[13px] font-bold text-orange">Read article <ArrowRight size={14} className="inline" /></div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const Blogs = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>(() => getAllBlogPosts());

  useEffect(() => {
    let mounted = true;

    const syncPosts = async () => {
      try {
        const livePosts = await fetchPublicBlogPosts();
        if (mounted) setPosts(livePosts);
        return;
      } catch {
        // Fall back to local data when the shared API isn't available yet.
      }

      if (mounted) setPosts(getAllBlogPosts());
    };

    syncPosts();
    window.addEventListener("storage", syncPosts);
    return () => {
      mounted = false;
      window.removeEventListener("storage", syncPosts);
    };
  }, []);

  const activePost = slug ? posts.find((post) => post.slug === slug) : null;
  const relatedPosts = activePost ? posts.filter((post) => post.slug !== activePost.slug).slice(0, 3) : [];

  return (
    <div className="min-h-screen">
      <Navbar />
      {slug ? (
        activePost ? (
          <BlogArticle post={activePost} relatedPosts={relatedPosts} />
        ) : (
          <section className="relative overflow-hidden py-40">
            <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,5,4,0.96)_0%,rgba(13,8,6,0.8)_42%,rgba(8,5,4,0.95)_100%)]" />
            <div className="container relative text-center">
              <Eyebrow variant="dark">Missing article</Eyebrow>
              <h1 className="mt-4 text-[clamp(32px,4.5vw,56px)] font-extrabold leading-tight text-primary-foreground">That blog entry does not exist yet.</h1>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-white/50">
                The route is ready, but there is no article saved under this slug in the current site data.
              </p>
              <Link to="/blogs" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-[14px] font-bold text-white no-underline shadow-[0_12px_30px_hsla(17,82%,45%,0.28)] transition-all hover:-translate-y-px hover:bg-orange-dark">
                Return to blogs <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        )
      ) : (
        <BlogListing posts={posts} />
      )}
      <Footer />
    </div>
  );
};

export default Blogs;
