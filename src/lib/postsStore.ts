import { Post } from "@/components/home/PostCard";

const POSTS_STORAGE_KEY = "user_posts";

export function getUserPosts(): Post[] {
  try {
    const stored = localStorage.getItem(POSTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveUserPost(post: Post): void {
  const posts = getUserPosts();
  posts.unshift(post);
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}

export function updateUserPost(postId: string, updates: Partial<Post>): void {
  const posts = getUserPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  }
}

export function deleteUserPost(postId: string): void {
  const posts = getUserPosts().filter(p => p.id !== postId);
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}

export function isUserPost(postId: string): boolean {
  return postId.startsWith("user-");
}
