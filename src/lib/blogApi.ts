import {
  BlogPost,
  deleteCustomBlogPost,
  getAllBlogPosts,
  getArchivedBlogPosts,
  getManageableBlogPostBySlug,
  hideBlogPost,
  restoreBlogPost,
  saveCustomBlogPost,
} from "@/lib/blogs";

export type BlogAdminState = {
  archivedPosts: BlogPost[];
  livePosts: BlogPost[];
  mode: "local" | "remote";
};

const isLocalHost = () =>
  typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);

const getErrorMessage = async (response: Response) => {
  try {
    const payload = await response.json();
    return payload?.error || payload?.message || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

const adminHeaders = (adminKey: string) => ({
  "Content-Type": "application/json",
  "x-blog-admin-key": adminKey,
});

const createHttpError = (message: string, status?: number) => {
  const error = new Error(message) as Error & { status?: number };
  error.status = status;
  return error;
};

const getLocalAdminState = (): BlogAdminState => ({
  archivedPosts: getArchivedBlogPosts(),
  livePosts: getAllBlogPosts(),
  mode: "local",
});

export const fetchPublicBlogPosts = async () => {
  try {
    const response = await fetch("/api/blogs");
    if (!response.ok) throw createHttpError(await getErrorMessage(response), response.status);
    const payload = await response.json();
    return Array.isArray(payload?.posts) ? payload.posts : [];
  } catch (error) {
    if (isLocalHost()) return getAllBlogPosts();
    throw error;
  }
};

export const fetchAdminBlogState = async (adminKey: string): Promise<BlogAdminState> => {
  try {
    const response = await fetch("/api/admin/blogs", {
      headers: adminHeaders(adminKey),
      method: "GET",
    });

    if (!response.ok) {
      const message = await getErrorMessage(response);
      const error = createHttpError(message, response.status);
      throw error;
    }

    const payload = await response.json();
    return {
      archivedPosts: Array.isArray(payload?.archivedPosts) ? payload.archivedPosts : [],
      livePosts: Array.isArray(payload?.livePosts) ? payload.livePosts : [],
      mode: "remote",
    };
  } catch (error) {
    if (isLocalHost()) return getLocalAdminState();
    throw error;
  }
};

export const publishBlogToSharedSource = async ({
  adminKey,
  post,
  previousSlug,
}: {
  adminKey: string;
  post: BlogPost;
  previousSlug?: string | null;
}) => {
  try {
    const response = await fetch("/api/admin/blogs", {
      body: JSON.stringify({
        action: "publish",
        post,
        previousSlug: previousSlug || null,
      }),
      headers: adminHeaders(adminKey),
      method: "POST",
    });

    if (!response.ok) throw createHttpError(await getErrorMessage(response), response.status);
    return response.json();
  } catch (error) {
    if (!isLocalHost()) throw error;

    if (previousSlug && previousSlug !== post.slug && getManageableBlogPostBySlug(previousSlug)?.source === "local") {
      deleteCustomBlogPost(previousSlug);
    }

    saveCustomBlogPost(post);
    restoreBlogPost(post.slug);
    return getLocalAdminState();
  }
};

export const archiveBlogInSharedSource = async (slug: string, adminKey: string) => {
  try {
    const response = await fetch("/api/admin/blogs", {
      body: JSON.stringify({ action: "archive", slug }),
      headers: adminHeaders(adminKey),
      method: "POST",
    });

    if (!response.ok) throw createHttpError(await getErrorMessage(response), response.status);
    return response.json();
  } catch (error) {
    if (!isLocalHost()) throw error;
    hideBlogPost(slug);
    return getLocalAdminState();
  }
};

export const restoreBlogInSharedSource = async (slug: string, adminKey: string) => {
  try {
    const response = await fetch("/api/admin/blogs", {
      body: JSON.stringify({ action: "restore", slug }),
      headers: adminHeaders(adminKey),
      method: "POST",
    });

    if (!response.ok) throw createHttpError(await getErrorMessage(response), response.status);
    return response.json();
  } catch (error) {
    if (!isLocalHost()) throw error;
    restoreBlogPost(slug);
    return getLocalAdminState();
  }
};
