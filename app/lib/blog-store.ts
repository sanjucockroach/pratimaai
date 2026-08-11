import { INITIAL_BLOGS, INITIAL_COMMENTS, type BlogComment, type BlogPost } from "~/content/blogs";

const BLOGS_STORAGE_KEY = "pratima_ai_blogs_v1";
const COMMENTS_STORAGE_KEY = "pratima_ai_comments_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/** Get all blogs from storage or fallback to initial list */
export function getBlogs(): BlogPost[] {
  if (!isBrowser()) return INITIAL_BLOGS;
  try {
    const raw = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
      return INITIAL_BLOGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BLOGS;
  }
}

/** Get a single blog post by slug */
export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getBlogs();
  return blogs.find((b) => b.slug === slug);
}

/** Save (Create or Update) a blog post */
export function saveBlog(post: BlogPost): void {
  if (!isBrowser()) return;
  const blogs = getBlogs();
  const index = blogs.findIndex((b) => b.id === post.id || b.slug === post.slug);
  if (index >= 0) {
    blogs[index] = post;
  } else {
    blogs.unshift(post);
  }
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
}

/** Delete a blog post */
export function deleteBlog(id: string): void {
  if (!isBrowser()) return;
  const blogs = getBlogs().filter((b) => b.id !== id);
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
}

/** Get all comments/opinions for a specific blog slug (or all if slug is omitted) */
export function getComments(blogSlug?: string): BlogComment[] {
  if (!isBrowser()) {
    return blogSlug ? INITIAL_COMMENTS.filter((c) => c.blogSlug === blogSlug) : INITIAL_COMMENTS;
  }
  try {
    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY);
    let comments: BlogComment[] = [];
    if (!raw) {
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(INITIAL_COMMENTS));
      comments = INITIAL_COMMENTS;
    } else {
      comments = JSON.parse(raw);
    }
    return blogSlug ? comments.filter((c) => c.blogSlug === blogSlug) : comments;
  } catch {
    return blogSlug ? INITIAL_COMMENTS.filter((c) => c.blogSlug === blogSlug) : INITIAL_COMMENTS;
  }
}

/** Add a user view / opinion to a blog */
export function addComment(comment: Omit<BlogComment, "id" | "createdAt">): BlogComment {
  const newComment: BlogComment = {
    ...comment,
    id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };

  if (isBrowser()) {
    const comments = getComments();
    comments.unshift(newComment);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  }
  return newComment;
}

/** Delete a comment / opinion (Admin moderation for bad language or spam) */
export function deleteComment(id: string): void {
  if (!isBrowser()) return;
  const comments = getComments().filter((c) => c.id !== id);
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
}
