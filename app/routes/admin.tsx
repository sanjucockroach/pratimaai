import { Edit, LogOut, MessageSquare, Plus, Save, Trash2, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { MetaFunction } from "react-router";
import { deleteBlog, deleteComment, getBlogs, getComments, saveBlog } from "~/lib/blog-store";
import { clearAdminSession, isAdminAuthenticated, setAdminSession, verifyAdminCredentials } from "~/lib/auth";
import type { BlogComment, BlogPost } from "~/content/blogs";

export const meta: MetaFunction = () => [
  { title: "Admin Portal | PRATIMA AI" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function AdminRoute() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Blog states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Blog Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<BlogPost["category"]>("AI Architecture");
  const [contentParagraphs, setContentParagraphs] = useState<string>("");
  const [bannerImage, setBannerImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string>("");
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (isAdminAuthenticated()) {
      setIsAuthenticated(true);
      loadDashboardData();
    }
  }, []);

  const loadDashboardData = () => {
    setBlogs(getBlogs());
    setComments(getComments());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setErrorMsg("");

    const isValid = await verifyAdminCredentials(username, password);
    if (isValid) {
      setAdminSession();
      setIsAuthenticated(true);
      setErrorMsg("");
      loadDashboardData();
    } else {
      setErrorMsg("Invalid username or password credentials.");
    }
    setIsVerifying(false);
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Populate editor form for new or existing post
  const openEditor = (post?: BlogPost) => {
    if (post) {
      setSelectedPost(post);
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setCategory(post.category);
      setContentParagraphs(post.content.join("\n\n"));
      setBannerImage(post.bannerImage);
      setGalleryImages(post.galleryImages.join(", "));
      setAuthorName(post.author.name);
      setAuthorRole(post.author.role);
      setTags(post.tags.join(", "));
    } else {
      // New Post default setup
      setSelectedPost({
        id: `blog-${Date.now()}`,
        slug: "",
        title: "",
        excerpt: "",
        content: [],
        bannerImage: "/assets/services-hero-poster.png",
        galleryImages: [],
        category: "AI Architecture",
        author: { name: "Prashanth", role: "CEO & Founder", avatar: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png" },
        publishedAt: new Date().toISOString().split("T")[0]!,
        readTime: "5 min read",
        tags: [],
      });
      setTitle("");
      setSlug("");
      setExcerpt("");
      setCategory("AI Architecture");
      setContentParagraphs("");
      setBannerImage("/assets/services-hero-poster.png");
      setGalleryImages("");
      setAuthorName("Prashanth");
      setAuthorRole("CEO & Founder");
      setTags("");
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;

    const generatedSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const postToSave: BlogPost = {
      ...selectedPost,
      title: title.trim(),
      slug: generatedSlug,
      excerpt: excerpt.trim(),
      category,
      content: contentParagraphs.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
      bannerImage: bannerImage.trim() || "/assets/services-hero-poster.png",
      galleryImages: galleryImages.split(",").map((img) => img.trim()).filter(Boolean),
      author: {
        ...selectedPost.author,
        name: authorName.trim(),
        role: authorRole.trim(),
      },
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    saveBlog(postToSave);
    loadDashboardData();
    setSelectedPost(null);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog(id);
      loadDashboardData();
      if (selectedPost?.id === id) setSelectedPost(null);
    }
  };

  const handleDeleteComment = (id: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      deleteComment(id);
      loadDashboardData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#F2F2EE] flex items-center justify-center font-sans px-4">
        <div className="w-full max-w-[400px] bg-white rounded-3xl p-8 border border-black/10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <img src="/assets/pratima-mark.svg" alt="PRATIMA AI" className="w-12 h-10" />
          </div>
          <h1 className="text-2xl font-light text-center mb-1 text-[#090909]">Admin Portal</h1>
          <p className="text-xs text-center text-neutral-500 mb-6">Security access verification required</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 text-sm border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter security password"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 text-sm border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-semibold text-center mt-2">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-xl bg-[#090909] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#ffbe4a] hover:text-[#090909] transition-all cursor-pointer mt-4 disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fafafa] text-[#090909] py-24 sm:py-32 font-sans">
      <div className="w-[var(--content)] mx-auto px-4 sm:px-6">
        {/* Header Dashboard Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-black/15 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1 text-[#ff5d5b] text-xs font-mono uppercase">
              <UserCheck size={14} />
              Session Verified
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight">Blog Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openEditor()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#090909] text-white text-xs font-semibold hover:bg-[#ffbe4a] hover:text-[#090909] transition-all cursor-pointer shadow-sm"
            >
              <Plus size={14} />
              <span>Create Blog</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-black/10 text-xs font-semibold hover:bg-neutral-100 transition-all cursor-pointer text-neutral-600"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid splits list/editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main List and Moderation panels */}
          <div className={`${selectedPost ? "lg:col-span-6" : "lg:col-span-12"} space-y-12`}>
            {/* Blogs List */}
            <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center gap-2">
                <span>Manage Blog Posts</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-[#555]">
                  {blogs.length}
                </span>
              </h2>

              <div className="divide-y divide-black/5 max-h-[480px] overflow-y-auto pr-2">
                {blogs.map((b) => (
                  <div key={b.id} className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <strong className="block text-sm sm:text-base font-medium text-[#090909] hover:text-[#ff5d5b] transition-colors">
                        {b.title}
                      </strong>
                      <span className="text-xs text-[#777] font-mono tracking-tight">
                        {b.category} • {b.publishedAt}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditor(b)}
                        className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-[#090909] transition-colors cursor-pointer"
                        title="Edit Blog"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-2 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                        title="Delete Blog"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Views & Opinions Moderation Dashboard */}
            <div className="bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center gap-2">
                <MessageSquare size={18} />
                <span>Views & Opinions Moderation</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-[#555]">
                  {comments.length}
                </span>
              </h2>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {comments.length === 0 ? (
                  <p className="italic text-xs text-[#777] text-center py-6">No user views submitted yet.</p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <strong className="text-xs font-semibold text-[#090909]">{c.authorName}</strong>
                          {c.authorRole && (
                            <span className="text-[10px] text-neutral-500 font-mono">({c.authorRole})</span>
                          )}
                          <span className="text-[10px] text-neutral-400 font-mono">• {new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-neutral-700 leading-relaxed italic">&ldquo;{c.content}&rdquo;</p>
                        <span className="block mt-2 text-[9px] font-mono text-[#ff5d5b] uppercase">Blog Slug: {c.blogSlug}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(c.id)}
                        className="p-1.5 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors cursor-pointer shrink-0"
                        title="Delete Comment"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Form Editor Column */}
          {selectedPost && (
            <div className="lg:col-span-6 bg-white rounded-3xl border border-black/10 p-6 sm:p-8 shadow-md">
              <h2 className="text-xl font-medium tracking-tight mb-6 flex items-center justify-between">
                <span>{selectedPost.slug ? "Edit Post" : "Create New Post"}</span>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="text-xs underline text-neutral-500 hover:text-[#090909] cursor-pointer"
                >
                  Cancel
                </button>
              </h2>

              <form onSubmit={handleSaveBlog} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Scaling AI Infrastructure"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Slug (Auto-generated if empty)</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. scaling-ai-infra"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BlogPost["category"])}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                    >
                      <option value="AI Architecture">AI Architecture</option>
                      <option value="Custom Software">Custom Software</option>
                      <option value="EdTech & LMS">EdTech & LMS</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Excerpt / Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Short description summarizing the post..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Article Content (Separate paragraphs with double Enter) *</label>
                  <textarea
                    required
                    rows={8}
                    value={contentParagraphs}
                    onChange={(e) => setContentParagraphs(e.target.value)}
                    placeholder="Write detailed insights. Double line break creates a new paragraph..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Banner Image URL</label>
                  <input
                    type="text"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    placeholder="e.g. /assets/services-hero-poster.png"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Gallery Image URLs (Comma-separated, up to 3)</label>
                  <input
                    type="text"
                    value={galleryImages}
                    onChange={(e) => setGalleryImages(e.target.value)}
                    placeholder="e.g. /assets/pratima-circuit-poster.png, /assets/og-pratima.png"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Author Name</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Prashanth"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Author Role</label>
                    <input
                      type="text"
                      required
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="e.g. CEO & Founder"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#555555] mb-1.5 uppercase">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. Applied AI, Infrastructure, Engineering"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-transparent focus:border-[#ffbe4a] focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#090909] text-white hover:bg-[#ffbe4a] hover:text-[#090909] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Save size={14} />
                  <span>Save Post</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
