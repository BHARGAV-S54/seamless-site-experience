import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StoriesBar } from "./StoriesBar";
import { PostComposer, NewPost } from "./PostComposer";
import { PostCard, Post } from "./PostCard";
import { TrendingSidebar } from "./TrendingSidebar";
import { SearchBar } from "./SearchBar";
import { toast } from "sonner";
import { getUserPosts, saveUserPost, deleteUserPost } from "@/lib/postsStore";

const initialPosts: Post[] = [
  {
    id: "1",
    type: "text",
    username: "Uni_News_Official",
    time: "2 hours ago",
    tag: "News",
    content: "🚨 BREAKING: University announces flexible attendance policy for final year students! No more 75% mandatory attendance. Students can focus on projects and internships. What do you think? #UniversityNews #StudentLife",
    likes: 1200,
    comments: [
      { id: "c1", username: "student_life", text: "Finally! This is what we needed 🙌", time: "1h ago", likes: 24 },
      { id: "c2", username: "code_master", text: "Now I can focus on my internship!", time: "45m ago", likes: 12 },
    ],
    shares: 89,
    isLiked: false,
    isSaved: false,
  },
  {
    id: "2",
    type: "image",
    username: "CS_Memes_Daily",
    time: "4 hours ago",
    tag: "Meme",
    content: "When your code finally works after 3 hours of debugging 😂 #CodingLife #ProgrammerHumor",
    likes: 5600,
    comments: [
      { id: "c3", username: "dev_jokes", text: "Too relatable 😭", time: "3h ago", likes: 45 },
    ],
    shares: 234,
    isLiked: false,
    isSaved: false,
  },
  {
    id: "3",
    type: "poll",
    username: "Fest_Committee",
    time: "6 hours ago",
    tag: "Poll",
    content: "🎵 Which DJ should headline our campus fest? Vote now!",
    likes: 890,
    comments: [],
    shares: 45,
    pollOptions: [
      { label: "DJ Snake", percent: 65, votes: 234 },
      { label: "Marshmello", percent: 35, votes: 126 },
    ],
    isLiked: false,
    isSaved: false,
  },
  {
    id: "4",
    type: "reel",
    username: "Uni_News_Official",
    time: "1 hour ago",
    tag: "Breaking News",
    content: "75% Attendance Rule made MANDATORY! 💀 Students react... #university #news",
    likes: 1200,
    comments: [],
    shares: 89,
    gradient: "from-blue-600 to-indigo-700",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "5",
    type: "reel",
    username: "CS_Memes_Daily",
    time: "3 hours ago",
    tag: "Trolling",
    content: "Me trying to explain my code to the professor after copying from StackOverflow 😭",
    likes: 5600,
    comments: [],
    shares: 234,
    gradient: "from-green-500 to-emerald-600",
    emoji: "🤣",
    isLiked: false,
    isSaved: false,
  },
  {
    id: "6",
    type: "reel",
    username: "Fest_Committee",
    time: "5 hours ago",
    tag: "Event",
    content: "DJ Night Lineup Revealed! 🎵 Tag your squad! #campuslife #party",
    likes: 890,
    comments: [],
    shares: 45,
    gradient: "from-pink-500 via-red-500 to-yellow-500",
    isLiked: false,
    isSaved: false,
  },
];

interface HomePageProps {
  userName?: string;
}

export function HomePage({ userName = "Student" }: HomePageProps) {
  const [posts, setPosts] = useState<Post[]>(() => {
    // Load user posts from localStorage and merge with initial posts
    const userPosts = getUserPosts();
    return [...userPosts, ...initialPosts];
  });

  // Re-sync with localStorage when component mounts
  useEffect(() => {
    const userPosts = getUserPosts();
    setPosts([...userPosts, ...initialPosts]);
  }, []);

  const handleNewPost = (newPost: NewPost) => {
    const post: Post = {
      id: `user-${Date.now()}`,
      type: newPost.type,
      username: userName.replace(/\s+/g, "_"),
      time: "Just now",
      tag: newPost.type === "poll" ? "Poll" : newPost.type === "image" ? "Photo" : "Update",
      content: newPost.content,
      likes: 0,
      comments: [],
      shares: 0,
      imageUrl: newPost.imagePreview,
      pollOptions: newPost.pollOptions?.map((opt, idx) => ({
        label: opt,
        percent: 0,
        votes: 0,
      })),
      isLiked: false,
      isSaved: false,
    };
    // Save to localStorage
    saveUserPost(post);
    setPosts([post, ...posts]);
    toast.success("Post shared successfully! 🎉");
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1,
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string, text: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `comment-${Date.now()}`,
              username: userName.replace(/\s+/g, "_"),
              text,
              time: "Just now",
              likes: 0,
            },
          ],
        };
      }
      return post;
    }));
    toast.success("Comment added!");
  };

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 };
      }
      return post;
    }));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isSaved = !post.isSaved;
        toast.success(isSaved ? "Post saved!" : "Post unsaved");
        return { ...post, isSaved };
      }
      return post;
    }));
  };

  const handleVote = (postId: string, optionIndex: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.pollOptions) {
        const totalVotes = post.pollOptions.reduce((acc, o) => acc + o.votes, 0) + 1;
        const newOptions = post.pollOptions.map((opt, idx) => {
          const newVotes = idx === optionIndex ? opt.votes + 1 : opt.votes;
          return {
            ...opt,
            votes: newVotes,
            percent: Math.round((newVotes / totalVotes) * 100),
          };
        });
        toast.success("Vote recorded!");
        return { ...post, pollOptions: newOptions };
      }
      return post;
    }));
  };

  const handleDelete = (postId: string) => {
    deleteUserPost(postId);
    setPosts(posts.filter(post => post.id !== postId));
    toast.success("Post deleted");
  };

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
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onSave={handleSave}
                onVote={handleVote}
                onDelete={post.id.startsWith("user-") ? handleDelete : undefined}
              />
            ))}
          </div>
        </div>

        <TrendingSidebar />
      </div>
    </div>
  );
}
