import catFestival from "@/assets/cat-festival.jpg";
import catNews from "@/assets/cat-news.jpg";
import catOffers from "@/assets/cat-offers.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import postDiwali from "@/assets/post-diwali.jpg";
import postReviews from "@/assets/post-reviews.jpg";
import postSports from "@/assets/post-sports.jpg";
import blogGst1 from "@/assets/blog-gst-1.webp";
import blogGst2 from "@/assets/blog-gst-2.webp";
import blogGst3 from "@/assets/blog-gst-3.jpg";
import blogGst4 from "@/assets/blog-gst-4.jpg";
import blogZomato1 from "@/assets/blog-zomato-1.jpg";
import blogZomato2 from "@/assets/blog-zomato-2.jpg";
import blogZomato3 from "@/assets/blog-zomato-3.jpg";
import blogZomato4 from "@/assets/blog-zomato-4.webp";
import blogSwiggy1 from "@/assets/blog-swiggy-1.png";
import blogSwiggy2 from "@/assets/blog-swiggy-2.png";
import blogSwiggy3 from "@/assets/blog-swiggy-3.webp";
import blogSwiggy4 from "@/assets/blog-swiggy-4.webp";
import blogSeating1 from "@/assets/blog-seating-1.jpg";
import blogSeating2 from "@/assets/blog-seating-2.jpg";
import blogSeating3 from "@/assets/blog-seating-3.jpg";
import blogSeating4 from "@/assets/blog-seating-4.jpg";
import blogFssai1 from "@/assets/blog-fssai-1.webp";
import blogFssai2 from "@/assets/blog-fssai-2.png";
import blogFssai3 from "@/assets/blog-fssai-3.webp";
import blogBiryani from "@/assets/blog-biryani.webp";
import blogDosa from "@/assets/blog-dosa.jpg";
import blogBurger from "@/assets/blog-burger.jpg";
import seedPostsJson from "../../content/blog-seed-posts.json";

export type BlogTable = {
  columns: string[];
  rows: string[][];
};

export type BlogSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: BlogTable;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  hook: string;
  image: string;
  imageKey?: string;
  badge: string;
  keyword?: string;
  body: string[];
  sections?: BlogSection[];
  takeaways: string[];
  faqs?: BlogFaq[];
  author: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  ctaLabel: string;
  ctaUrl: string;
  source: "seed" | "local";
};

export type BlogComposerValues = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  hook: string;
  badge: string;
  author: string;
  publishDate: string;
  coverImage: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  ctaLabel: string;
  ctaUrl: string;
  body: string;
  takeaways: string;
};

export const blogCategories = [
  "Restaurant Growth",
  "Social Media Automation",
  "Instagram Marketing",
  "WhatsApp Marketing",
  "Promotion Ideas",
  "Local SEO",
];

const LOCAL_STORAGE_KEY = "wishly-blog-posts";
const HIDDEN_BLOGS_KEY = "wishly-hidden-blog-slugs";
const defaultCtaUrl = "https://wishlyai.in/demo";
const blogImageMap: Record<string, string> = {
  heroBg,
  catFestival,
  catNews,
  catOffers,
  postDiwali,
  postReviews,
  postSports,
  blogGst1,
  blogGst2,
  blogGst3,
  blogGst4,
  blogZomato1,
  blogZomato2,
  blogZomato3,
  blogZomato4,
  blogSwiggy1,
  blogSwiggy2,
  blogSwiggy3,
  blogSwiggy4,
  blogSeating1,
  blogSeating2,
  blogSeating3,
  blogSeating4,
  blogFssai1,
  blogFssai2,
  blogFssai3,
  blogBiryani,
  blogDosa,
  blogBurger,
};

const seededPosts: BlogPost[] = seedPostsJson as BlogPost[];

export const getSeedBlogPosts = () => seededPosts.slice();

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

export const estimateReadTime = (value: string) => {
  const words = value.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.ceil(words / 180));
  return `${minutes} min read`;
};

export const splitLines = (value: string, separator: RegExp) =>
  value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);

export const createBlogPostFromComposer = (values: BlogComposerValues): BlogPost => {
  const normalizedTitle = values.title.trim() || "Untitled blog";
  const normalizedSlug = slugify(values.slug || values.title || normalizedTitle) || `blog-${Date.now()}`;
  const body = splitLines(values.body, /\n\s*\n/);
  const takeaways = splitLines(values.takeaways, /\n/);
  const publishedAt = values.publishDate || new Date().toISOString().slice(0, 10);
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    slug: normalizedSlug,
    title: normalizedTitle,
    category: values.category,
    date,
    publishedAt,
    readTime: estimateReadTime([values.excerpt, values.hook, values.body, values.takeaways].join(" ")),
    excerpt: values.excerpt.trim(),
    hook: values.hook.trim(),
    image: values.coverImage.trim(),
    badge: values.badge.trim() || "Fresh draft",
    body: body.length ? body : ["No body content has been added yet."],
    takeaways: takeaways.length ? takeaways : ["Add at least one takeaway before publishing."],
    author: values.author.trim() || "Wishly Editorial",
    tags: splitLines(values.tags, /,/),
    seoTitle: (values.seoTitle.trim() || normalizedTitle).slice(0, 75),
    seoDescription: (values.seoDescription.trim() || values.excerpt.trim()).slice(0, 160),
    ctaLabel: values.ctaLabel.trim() || "Start with Wishly",
    ctaUrl: values.ctaUrl.trim() || defaultCtaUrl,
    source: "local",
  };
};

export const createComposerValuesFromPost = (post: BlogPost): BlogComposerValues => ({
  title: post.title,
  slug: post.slug,
  category: post.category,
  excerpt: post.excerpt,
  hook: post.hook,
  badge: post.badge,
  author: post.author,
  publishDate: post.publishedAt,
  coverImage: post.image === heroBg ? "" : post.image,
  tags: post.tags.join(", "),
  seoTitle: post.seoTitle,
  seoDescription: post.seoDescription,
  ctaLabel: post.ctaLabel,
  ctaUrl: post.ctaUrl,
  body: post.body.join("\n\n"),
  takeaways: post.takeaways.join("\n"),
});

export const getCustomBlogPosts = (): BlogPost[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(Boolean);
  } catch {
    return [];
  }
};

export const getCustomBlogPostBySlug = (slug: string) =>
  getCustomBlogPosts().find((post) => post.slug === slug);

const getHiddenBlogSlugs = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(HIDDEN_BLOGS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((value) => typeof value === "string");
  } catch {
    return [];
  }
};

const setHiddenBlogSlugs = (slugs: string[]) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(HIDDEN_BLOGS_KEY, JSON.stringify(Array.from(new Set(slugs))));
};

const sortByDate = (posts: BlogPost[]) =>
  posts.slice().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

const getMergedBlogPosts = () => {
  const merged = [...getSeedBlogPosts(), ...getCustomBlogPosts()].reduce<Record<string, BlogPost>>((acc, post) => {
    acc[post.slug] = post;
    return acc;
  }, {});

  return sortByDate(Object.values(merged));
};

export const getManageableBlogPosts = () => getMergedBlogPosts();

export const getAllBlogPosts = () => {
  const hiddenSlugs = new Set(getHiddenBlogSlugs());
  return getMergedBlogPosts().filter((post) => !hiddenSlugs.has(post.slug));
};

export const getArchivedBlogPosts = () => {
  const hiddenSlugs = new Set(getHiddenBlogSlugs());
  return getMergedBlogPosts().filter((post) => hiddenSlugs.has(post.slug));
};

export const saveCustomBlogPost = (post: BlogPost) => {
  if (typeof window === "undefined") return;

  const merged = [...getCustomBlogPosts().filter((entry) => entry.slug !== post.slug), post];
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortByDate(merged)));
  restoreBlogPost(post.slug);
};

export const deleteCustomBlogPost = (slug: string) => {
  if (typeof window === "undefined") return;

  const nextPosts = getCustomBlogPosts().filter((entry) => entry.slug !== slug);
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortByDate(nextPosts)));
};

export const getBlogPostBySlug = (slug: string) => getAllBlogPosts().find((post) => post.slug === slug);
export const getManageableBlogPostBySlug = (slug: string) => getManageableBlogPosts().find((post) => post.slug === slug);

export const hideBlogPost = (slug: string) => {
  setHiddenBlogSlugs([...getHiddenBlogSlugs(), slug]);
};

export const restoreBlogPost = (slug: string) => {
  setHiddenBlogSlugs(getHiddenBlogSlugs().filter((value) => value !== slug));
};

export const getInitialComposerValues = (): BlogComposerValues => ({
  title: "",
  slug: "",
  category: "Guides",
  excerpt: "",
  hook: "",
  badge: "",
  author: "Wishly Editorial",
  publishDate: new Date().toISOString().slice(0, 10),
  coverImage: "",
  tags: "",
  seoTitle: "",
  seoDescription: "",
  ctaLabel: "Read more with Wishly",
  ctaUrl: defaultCtaUrl,
  body: "",
  takeaways: "",
});

export const scoreBlogReadiness = (post: BlogPost) => {
  const checks = [
    post.title.trim().length >= 20,
    post.excerpt.trim().length >= 80,
    post.hook.trim().length >= 60,
    post.body.join(" ").trim().split(/\s+/).filter(Boolean).length >= 180,
    post.takeaways.length >= 3,
    post.tags.length >= 3,
    Boolean(post.ctaLabel.trim() && post.ctaUrl.trim()),
    Boolean(post.seoTitle.trim() && post.seoDescription.trim()),
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};

export const createExportPayload = (post: BlogPost) => JSON.stringify(post, null, 2);

export const resolveBlogImage = (post: Pick<BlogPost, "image" | "imageKey">) => {
  if (post.image?.trim()) return post.image;
  if (post.imageKey && blogImageMap[post.imageKey]) return blogImageMap[post.imageKey];
  return heroBg;
};
