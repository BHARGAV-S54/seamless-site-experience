// Custom events for real-time sync between components

export const POST_EVENTS = {
  POSTS_UPDATED: "posts-updated",
  SAVED_POSTS_UPDATED: "saved-posts-updated",
} as const;

export function emitPostsUpdated() {
  window.dispatchEvent(new CustomEvent(POST_EVENTS.POSTS_UPDATED));
}

export function emitSavedPostsUpdated() {
  window.dispatchEvent(new CustomEvent(POST_EVENTS.SAVED_POSTS_UPDATED));
}

export function onPostsUpdated(callback: () => void) {
  window.addEventListener(POST_EVENTS.POSTS_UPDATED, callback);
  return () => window.removeEventListener(POST_EVENTS.POSTS_UPDATED, callback);
}

export function onSavedPostsUpdated(callback: () => void) {
  window.addEventListener(POST_EVENTS.SAVED_POSTS_UPDATED, callback);
  return () => window.removeEventListener(POST_EVENTS.SAVED_POSTS_UPDATED, callback);
}
