import { ArrowLeft, Clock, MessageSquare, Send, User } from "lucide-react";
import { useEffect, useState } from "react";
import type { MetaFunction } from "react-router";
import { Link, useParams } from "react-router";
import { addComment, getBlogBySlug, getComments } from "~/lib/blog-store";
import { siteConfig } from "~/content/site";
import type { BlogComment, BlogPost } from "~/content/blogs";

export const meta: MetaFunction = ({ data }) => {
  const post = data as BlogPost | undefined;
  if (!post) {
    return [{ title: "Blog Post | PRATIMA AI" }];
  }
  return [
    { title: `${post.title} | PRATIMA AI` },
    { name: "description", content: post.excerpt },
    { property: "og:title", content: `${post.title} | PRATIMA AI` },
    { property: "og:description", content: post.excerpt },
    { property: "og:image", content: post.bannerImage.startsWith("http") ? post.bannerImage : `${siteConfig.siteUrl}${post.bannerImage}` },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

export default function SingleBlogRoute() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      const found = getBlogBySlug(slug);
      if (found) {
        setPost(found);
        setComments(getComments(slug));
      }
    }
  }, [slug]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || !authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);
    const newComment = addComment({
      blogSlug: slug,
      authorName: authorName.trim(),
      authorRole: authorRole.trim() || undefined,
      content: content.trim(),
    });

    setComments((prev) => [newComment, ...prev]);
    setContent("");
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  if (!post) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center font-sans px-4">
        <h1 className="text-2xl sm:text-3xl font-light mb-4">Post not found</h1>
        <Link to="/blog" className="text-sm font-semibold underline">
          ← Return to all blogs
        </Link>
      </div>
    );
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.bannerImage.startsWith("http") ? post.bannerImage : `${siteConfig.siteUrl}${post.bannerImage}`,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.siteUrl,
      "logo": `${siteConfig.siteUrl}/assets/og-pratima.png`,
    },
    "mainEntityOfPage": `${siteConfig.siteUrl}/blog/${post.slug}`,
  };

  return (
    <article className="w-full min-h-screen bg-[#fafafa] text-[#090909] py-20 sm:py-28 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="w-[var(--content)] max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#666666] hover:text-[#090909] mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to all insights
        </Link>

        {/* Header Kicker */}
        <div className="flex items-center gap-3 text-xs font-mono mb-4">
          <span className="px-3 py-1 rounded-full bg-[#ffbe4a]/25 text-[#090909] font-medium">
            {post.category}
          </span>
          <span className="text-[#777777]">•</span>
          <span className="text-[#777777] flex items-center gap-1">
            <Clock size={13} /> {post.readTime}
          </span>
          <span className="text-[#777777]">•</span>
          <span className="text-[#777777]">{post.publishedAt}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.04] mb-8">
          {post.title}
        </h1>

        {/* Author Card */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-black/10">
          <div className="flex items-center gap-3">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover bg-neutral-200"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-neutral-200 flex items-center justify-center">
                <User size={20} />
              </div>
            )}
            <div>
              <strong className="block text-sm font-medium text-[#090909]">
                {post.author.name}
              </strong>
              <span className="text-xs text-[#666666]">{post.author.role}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#views-section"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-medium text-[#555555] hover:text-[#090909] hover:bg-neutral-100 transition-colors"
            >
              <MessageSquare size={13} />
              <span>{comments.length} Views</span>
            </a>
          </div>
        </div>

        {/* Banner Image */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 bg-neutral-900 shadow-lg">
          <img
            src={post.bannerImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-neutral max-w-none text-base sm:text-lg leading-relaxed text-[#222222] space-y-6 mb-12">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* 2-3 Inline / Gallery Content Images */}
        {post.galleryImages && post.galleryImages.length > 0 && (
          <div className="my-12">
            <p className="utility-label mb-4 text-[#777777]">Architecture & System Artifacts</p>
            <div className={`grid gap-4 ${post.galleryImages.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
              {post.galleryImages.map((imgUrl, imgIdx) => (
                <div key={imgIdx} className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-black/10">
                  <img
                    src={imgUrl}
                    alt={`${post.title} artifact ${imgIdx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-8 pb-12 border-t border-black/10">
          <span className="text-xs font-mono text-[#888888] mr-2">TAGS:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white border border-black/10 text-[#555555]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Interactive Views & Opinions Section */}
        <section id="views-section" className="mt-12 pt-12 border-t border-black/15">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="utility-label mb-1">Open Discussion</p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
                Views & Opinions ({comments.length})
              </h2>
            </div>
          </div>

          {/* Submission Form (No Word Limit) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-sm mb-12">
            <h3 className="text-base sm:text-lg font-medium mb-1">Share Your Perspective</h3>
            <p className="text-xs sm:text-sm text-[#666666] mb-6">
              There is no word limit. We welcome detailed technical opinions, counter-perspectives, and operational experiences.
            </p>

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="authorName" className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">
                    Your Name *
                  </label>
                  <input
                    id="authorName"
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Anand Murthy"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f6] text-sm border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="authorRole" className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">
                    Role / Organisation (Optional)
                  </label>
                  <input
                    id="authorRole"
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="e.g. Head of Operations"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f6] text-sm border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="commentContent" className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">
                  Your View / Opinion * (No Word Limit)
                </label>
                <textarea
                  id="commentContent"
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your detailed analysis, questions, or operating viewpoints..."
                  className="w-full px-4 py-3 rounded-xl bg-[#f4f4f6] text-sm border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none leading-relaxed resize-y"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {submittedSuccess ? (
                  <span className="text-xs font-semibold text-[#6bbf7a]">
                    ✓ Thank you! Your view has been published.
                  </span>
                ) : (
                  <span className="text-[11px] text-[#888888]">
                    Opinions are moderated for bad language and respect.
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !authorName.trim() || !content.trim()}
                  className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>Post View</span>
                  <Send size={13} />
                </button>
              </div>
            </form>
          </div>

          {/* List of Comments / Views */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="italic text-sm text-[#777777] p-8 text-center bg-white rounded-2xl border border-black/5">
                No views shared yet. Be the first to start the discussion!
              </p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-black/10 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#f4f4f6] flex items-center justify-center font-medium text-xs text-[#090909]">
                        {c.authorName[0]?.toUpperCase()}
                      </div>
                      <div>
                        <strong className="block text-sm font-medium text-[#090909]">
                          {c.authorName}
                        </strong>
                        {c.authorRole && (
                          <span className="text-xs text-[#777777]">{c.authorRole}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-[#999999] font-mono">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#333333] leading-relaxed whitespace-pre-line pl-10">
                    {c.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
