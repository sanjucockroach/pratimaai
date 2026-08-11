import { ArrowRight, Clock, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { getBlogs, getComments } from "~/lib/blog-store";
import { siteConfig } from "~/content/site";
import type { BlogPost } from "~/content/blogs";

export const meta: MetaFunction = () => [
  { title: "Blog & Views | PRATIMA AI" },
  {
    name: "description",
    content: "Perspectives, architectural insights, and opinions on applied artificial intelligence, custom software, and learning platforms.",
  },
  { property: "og:title", content: "Blog & Views | PRATIMA AI" },
  {
    property: "og:description",
    content: "Perspectives and opinions on applied AI, custom software systems, and education platforms.",
  },
  { property: "og:image", content: `${siteConfig.siteUrl}/assets/og-pratima.png` },
  { property: "og:url", content: `${siteConfig.siteUrl}/blog` },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
  { tagName: "link", rel: "canonical", href: `${siteConfig.siteUrl}/blog` },
];

const CATEGORIES = ["All", "AI Architecture", "Custom Software", "EdTech & LMS", "Operations"] as const;

export default function BlogRoute() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    setBlogs(getBlogs());
  }, []);

  const filteredBlogs =
    activeCategory === "All" ? blogs : blogs.filter((b) => b.category === activeCategory);

  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];
  const listBlogs = filteredBlogs.filter((b) => b.id !== featuredBlog?.id || activeCategory !== "All");

  return (
    <div className="w-full min-h-screen bg-[#fafafa] text-[#090909] py-24 sm:py-32 font-sans">
      <div className="w-[var(--content)] mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="utility-label mb-3">PRATIMA AI / PERSPECTIVES & VIEWS</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95] mb-6">
            Insights on systems, engineering and intelligence.
          </h1>
          <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
            Direct reflections from our engineering and leadership practice on what works, what fails, and what lasts in real operations. Readers are welcome to share their views on every post.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 border-b border-black/10 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#090909] text-white shadow-sm"
                  : "bg-white border border-black/10 text-[#555555] hover:text-[#090909] hover:bg-neutral-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Blog Card (if viewing All) */}
        {activeCategory === "All" && featuredBlog && (
          <div className="mb-16">
            <Link
              to={`/blog/${featuredBlog.slug}`}
              className="group block bg-white rounded-3xl border border-black/10 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto overflow-hidden bg-neutral-900">
                  <img
                    src={featuredBlog.bannerImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4 text-xs font-mono">
                      <span className="px-3 py-1 rounded-full bg-[#ffbe4a]/20 text-[#090909] font-semibold">
                        Featured
                      </span>
                      <span className="text-[#666666]">{featuredBlog.category}</span>
                      <span className="text-[#888888]">•</span>
                      <span className="text-[#666666] flex items-center gap-1">
                        <Clock size={13} />
                        {featuredBlog.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight mb-4 group-hover:text-[#ff5d5b] transition-colors">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed line-clamp-3 mb-6">
                      {featuredBlog.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-black/10">
                    <div className="flex items-center gap-3">
                      {featuredBlog.author.avatar && (
                        <img
                          src={featuredBlog.author.avatar}
                          alt={featuredBlog.author.name}
                          className="w-8 h-8 rounded-full object-cover bg-neutral-200"
                        />
                      )}
                      <div>
                        <strong className="block text-xs font-medium text-[#090909]">
                          {featuredBlog.author.name}
                        </strong>
                        <span className="text-[10px] text-[#777777]">{featuredBlog.author.role}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#090909] group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listBlogs.map((post) => {
            const commentsCount = getComments(post.slug).length;
            return (
              <article
                key={post.id}
                className="group bg-white rounded-3xl border border-black/10 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200"
              >
                <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={post.bannerImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#777777]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[#888888] text-[11px]">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight leading-snug mb-3 group-hover:text-[#ff5d5b] transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#090909]">{post.author.name}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}#views-section`}
                      className="flex items-center gap-1.5 text-[#666666] hover:text-[#090909] transition-colors"
                    >
                      <MessageSquare size={13} />
                      <span>{commentsCount} {commentsCount === 1 ? "View" : "Views"}</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
