import { motion } from "framer-motion";
import { StoriesBar } from "./StoriesBar";
import { PostComposer, NewPost } from "./PostComposer";
import { PostCard } from "./PostCard";
import { TrendingSidebar } from "./TrendingSidebar";
import { SearchBar } from "./SearchBar";
import { usePosts } from "@/hooks/usePosts";
import { Loader2 } from "lucide-react";

interface HomePageProps {
  userName?: string;
}

export function HomePage({ userName = "Student" }: HomePageProps) {
  const {
    posts,
    loading,
    createPost,
    toggleLike,
    addComment,
    toggleSave,
    sharePost,
    voteOnPoll,
    deletePost,
  } = usePosts();

  const handleNewPost = async (newPost: NewPost) => {
    await createPost({
      type: newPost.type,
      content: newPost.content,
      imageUrl: newPost.imagePreview,
      pollOptions: newPost.pollOptions,
    });
  };

  const handleShare = (postId: string) => {
    sharePost(postId);
    navigator.clipboard.writeText(`Check out this post!`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <SearchBar />
      </div>

      <StoriesBar />

      <div className="mt-6 mb-6">
        <PostComposer userName={userName} onPost={handleNewPost} />
      </div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-bold mb-5 flex items-center gap-2"
      >
        Education News & Trends ⚡
      </motion.h2>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                index={index}
                onLike={toggleLike}
                onComment={addComment}
                onShare={handleShare}
                onSave={toggleSave}
                onVote={voteOnPoll}
                onDelete={post.user_id !== "sample" ? () => deletePost(post.id) : undefined}
              />
            ))}
          </div>
        </div>

        <TrendingSidebar />
      </div>
    </div>
  );
}
