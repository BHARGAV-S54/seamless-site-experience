import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export interface Comment {
  id: string;
  username: string;
  text: string;
  time: string;
  likes: number;
}

export interface Post {
  id: string;
  type: "text" | "image" | "poll" | "reel";
  username: string;
  user_id: string;
  time: string;
  tag: string;
  content: string;
  likes: number;
  comments: Comment[];
  shares: number;
  pollOptions?: { label: string; percent: number; votes: number }[];
  gradient?: string;
  emoji?: string;
  imageUrl?: string;
  videoUrl?: string;
  isLiked: boolean;
  isSaved: boolean;
}

interface DbPost {
  id: string;
  user_id: string;
  type: string;
  content: string;
  image_url: string | null;
  video_url: string | null;
  poll_options: { label: string; percent: number; votes: number }[] | null;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  profiles?: {
    full_name: string;
  } | null;
}

interface DbComment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: {
    full_name: string;
  } | null;
}

// Sample posts for demo (shown when DB is empty)
const samplePosts: Omit<Post, "isLiked" | "isSaved">[] = [
  {
    id: "sample-1",
    user_id: "sample",
    type: "text",
    username: "Uni_News_Official",
    time: "2 hours ago",
    tag: "News",
    content: "🚨 BREAKING: University announces flexible attendance policy for final year students! No more 75% mandatory attendance. Students can focus on projects and internships. What do you think? #UniversityNews #StudentLife",
    likes: 1200,
    comments: [],
    shares: 89,
  },
  {
    id: "sample-2",
    user_id: "sample",
    type: "image",
    username: "CS_Memes_Daily",
    time: "4 hours ago",
    tag: "Meme",
    content: "When your code finally works after 3 hours of debugging 😂 #CodingLife #ProgrammerHumor",
    likes: 5600,
    comments: [],
    shares: 234,
  },
  {
    id: "sample-3",
    user_id: "sample",
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
  },
];

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function getTagFromType(type: string): string {
  switch (type) {
    case "poll": return "Poll";
    case "image": return "Photo";
    case "reel": return "Reel";
    default: return "Update";
  }
}

export function usePosts() {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [userSaves, setUserSaves] = useState<Set<string>>(new Set());

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    try {
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      // Fetch profiles for the posts
      const userIds = [...new Set((postsData || []).map(p => p.user_id))];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", userIds);

      const profilesMap = new Map(
        (profilesData || []).map(p => [p.user_id, p.full_name])
      );

      // Fetch user's likes and saves if logged in
      let likesSet = new Set<string>();
      let savesSet = new Set<string>();

      if (user) {
        const [likesRes, savesRes] = await Promise.all([
          supabase.from("post_likes").select("post_id").eq("user_id", user.id),
          supabase.from("saved_posts").select("post_id").eq("user_id", user.id),
        ]);

        if (likesRes.data) {
          likesSet = new Set(likesRes.data.map(l => l.post_id));
        }
        if (savesRes.data) {
          savesSet = new Set(savesRes.data.map(s => s.post_id));
        }
      }

      setUserLikes(likesSet);
      setUserSaves(savesSet);

      // Fetch all comments
      const postIds = (postsData || []).map(p => p.id);
      const { data: allComments } = await supabase
        .from("comments")
        .select("*")
        .in("post_id", postIds)
        .order("created_at", { ascending: true });

      // Get comment user profiles
      const commentUserIds = [...new Set((allComments || []).map(c => c.user_id))];
      const { data: commentProfilesData } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", commentUserIds);

      const commentProfilesMap = new Map(
        (commentProfilesData || []).map(p => [p.user_id, p.full_name])
      );

      // Group comments by post
      const commentsMap = new Map<string, Comment[]>();
      (allComments || []).forEach(c => {
        const comments = commentsMap.get(c.post_id) || [];
        comments.push({
          id: c.id,
          username: commentProfilesMap.get(c.user_id)?.replace(/\s+/g, "_") || "User",
          text: c.content,
          time: formatTimeAgo(c.created_at),
          likes: 0,
        });
        commentsMap.set(c.post_id, comments);
      });

      // Map posts
      const mappedPosts: Post[] = (postsData || []).map(post => {
        const pollOptions = post.poll_options as { label: string; percent: number; votes: number }[] | null;
        
        return {
          id: post.id,
          user_id: post.user_id,
          type: post.type as Post["type"],
          username: profilesMap.get(post.user_id)?.replace(/\s+/g, "_") || "User",
          time: formatTimeAgo(post.created_at),
          tag: getTagFromType(post.type),
          content: post.content,
          likes: post.likes_count,
          comments: commentsMap.get(post.id) || [],
          shares: post.shares_count,
          imageUrl: post.image_url || undefined,
          videoUrl: post.video_url || undefined,
          pollOptions: pollOptions || undefined,
          isLiked: likesSet.has(post.id),
          isSaved: savesSet.has(post.id),
        };
      });

      // If no posts exist, show sample posts
      if (mappedPosts.length === 0) {
        const samplesWithState = samplePosts.map(p => ({
          ...p,
          isLiked: false,
          isSaved: false,
        }));
        setPosts(samplesWithState);
      } else {
        setPosts(mappedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Show sample posts on error
      const samplesWithState = samplePosts.map(p => ({
        ...p,
        isLiked: false,
        isSaved: false,
      }));
      setPosts(samplesWithState);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Set up realtime subscription
  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel("posts-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          fetchPosts();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        () => {
          fetchPosts();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_likes" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  // Create a new post
  const createPost = async (data: {
    type: Post["type"];
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    pollOptions?: string[];
  }) => {
    if (!user) {
      toast.error("Please sign in to create posts");
      return null;
    }

    try {
      const pollOptionsData = data.pollOptions?.map(opt => ({
        label: opt,
        percent: 0,
        votes: 0,
      }));

      const { data: newPost, error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          type: data.type,
          content: data.content,
          image_url: data.imageUrl || null,
          video_url: data.videoUrl || null,
          poll_options: pollOptionsData || null,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Post shared successfully! 🎉");
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
      return null;
    }
  };

  // Like/unlike a post
  const toggleLike = async (postId: string) => {
    if (!user) {
      toast.error("Please sign in to like posts");
      return;
    }

    // Skip for sample posts
    if (postId.startsWith("sample-")) {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      }));
      return;
    }

    const isCurrentlyLiked = userLikes.has(postId);

    try {
      if (isCurrentlyLiked) {
        await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        await supabase
          .from("posts")
          .update({ likes_count: posts.find(p => p.id === postId)!.likes - 1 })
          .eq("id", postId);

        setUserLikes(prev => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });
      } else {
        await supabase
          .from("post_likes")
          .insert({ post_id: postId, user_id: user.id });

        await supabase
          .from("posts")
          .update({ likes_count: posts.find(p => p.id === postId)!.likes + 1 })
          .eq("id", postId);

        setUserLikes(prev => new Set(prev).add(postId));
      }

      // Optimistic update
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: !isCurrentlyLiked,
            likes: isCurrentlyLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like");
    }
  };

  // Add a comment
  const addComment = async (postId: string, text: string) => {
    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }

    // Handle sample posts
    if (postId.startsWith("sample-")) {
      const newComment: Comment = {
        id: `temp-${Date.now()}`,
        username: profile?.full_name?.replace(/\s+/g, "_") || "User",
        text,
        time: "Just now",
        likes: 0,
      };
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      }));
      toast.success("Comment added!");
      return;
    }

    try {
      const { error } = await supabase
        .from("comments")
        .insert({
          post_id: postId,
          user_id: user.id,
          content: text,
        });

      if (error) throw error;

      await supabase
        .from("posts")
        .update({ comments_count: posts.find(p => p.id === postId)!.comments.length + 1 })
        .eq("id", postId);

      toast.success("Comment added!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  // Save/unsave a post
  const toggleSave = async (postId: string) => {
    if (!user) {
      toast.error("Please sign in to save posts");
      return;
    }

    // Handle sample posts
    if (postId.startsWith("sample-")) {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          const isSaved = !p.isSaved;
          toast.success(isSaved ? "Post saved!" : "Post unsaved");
          return { ...p, isSaved };
        }
        return p;
      }));
      return;
    }

    const isCurrentlySaved = userSaves.has(postId);

    try {
      if (isCurrentlySaved) {
        await supabase
          .from("saved_posts")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        setUserSaves(prev => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });
        toast.success("Post unsaved");
      } else {
        await supabase
          .from("saved_posts")
          .insert({ post_id: postId, user_id: user.id });

        setUserSaves(prev => new Set(prev).add(postId));
        toast.success("Post saved!");
      }

      // Optimistic update
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, isSaved: !isCurrentlySaved };
        }
        return p;
      }));
    } catch (error) {
      console.error("Error toggling save:", error);
      toast.error("Failed to update save");
    }
  };

  // Share a post
  const sharePost = async (postId: string) => {
    // Handle sample posts
    if (postId.startsWith("sample-")) {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, shares: p.shares + 1 };
        }
        return p;
      }));
      return;
    }

    try {
      await supabase
        .from("posts")
        .update({ shares_count: posts.find(p => p.id === postId)!.shares + 1 })
        .eq("id", postId);

      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, shares: p.shares + 1 };
        }
        return p;
      }));
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  // Vote on a poll
  const voteOnPoll = async (postId: string, optionIndex: number) => {
    const post = posts.find(p => p.id === postId);
    if (!post?.pollOptions) return;

    const totalVotes = post.pollOptions.reduce((acc, o) => acc + o.votes, 0) + 1;
    const newOptions = post.pollOptions.map((opt, idx) => {
      const newVotes = idx === optionIndex ? opt.votes + 1 : opt.votes;
      return {
        ...opt,
        votes: newVotes,
        percent: Math.round((newVotes / totalVotes) * 100),
      };
    });

    // Handle sample posts
    if (postId.startsWith("sample-")) {
      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, pollOptions: newOptions };
        }
        return p;
      }));
      toast.success("Vote recorded!");
      return;
    }

    try {
      await supabase
        .from("posts")
        .update({ poll_options: newOptions })
        .eq("id", postId);

      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, pollOptions: newOptions };
        }
        return p;
      }));
      toast.success("Vote recorded!");
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to record vote");
    }
  };

  // Delete a post
  const deletePost = async (postId: string) => {
    if (!user) return;

    // Handle sample posts
    if (postId.startsWith("sample-")) {
      setPosts(posts.filter(p => p.id !== postId));
      toast.success("Post deleted");
      return;
    }

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", user.id);

      if (error) throw error;

      setPosts(posts.filter(p => p.id !== postId));
      toast.success("Post deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  // Update a post
  const updatePost = async (postId: string, content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("posts")
        .update({ content })
        .eq("id", postId)
        .eq("user_id", user.id);

      if (error) throw error;

      setPosts(posts.map(p => {
        if (p.id === postId) {
          return { ...p, content };
        }
        return p;
      }));
      toast.success("Post updated!");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    }
  };

  // Get user's posts
  const getUserPosts = () => {
    if (!user) return [];
    return posts.filter(p => p.user_id === user.id);
  };

  // Get saved posts
  const getSavedPosts = () => {
    return posts.filter(p => userSaves.has(p.id));
  };

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    addComment,
    toggleSave,
    sharePost,
    voteOnPoll,
    deletePost,
    updatePost,
    getUserPosts,
    getSavedPosts,
    refetch: fetchPosts,
  };
}
