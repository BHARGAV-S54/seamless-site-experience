import { Post } from "@/components/home/PostCard";

const SAVED_POSTS_KEY = "saved_posts";

export function getSavedPosts(): Post[] {
  try {
    const stored = localStorage.getItem(SAVED_POSTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function savePost(post: Post): void {
  const posts = getSavedPosts();
  // Don't add duplicates
  if (!posts.find(p => p.id === post.id)) {
    posts.unshift(post);
    localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(posts));
  }
}

export function unsavePost(postId: string): void {
  const posts = getSavedPosts().filter(p => p.id !== postId);
  localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(posts));
}

export function isPostSaved(postId: string): boolean {
  return getSavedPosts().some(p => p.id === postId);
}

export function toggleSavePost(post: Post): boolean {
  if (isPostSaved(post.id)) {
    unsavePost(post.id);
    return false;
  } else {
    savePost(post);
    return true;
  }
}
