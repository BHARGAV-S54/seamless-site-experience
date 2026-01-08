import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MyPostsTabProps {
  userName?: string;
}

// Mock data for user's posts
const mockMyPosts = [
  {
    id: "1",
    content: "Just finished my final year project presentation! 🎉 So grateful for all the support from my professors and classmates.",
    timestamp: "2 days ago",
    likes: 45,
    comments: 12,
    shares: 3,
    image: null,
  },
  {
    id: "2",
    content: "Check out my latest coding project - a React dashboard with real-time data visualization!",
    timestamp: "1 week ago",
    likes: 78,
    comments: 23,
    shares: 8,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop",
  },
  {
    id: "3",
    content: "Excited to share that I've been selected for the summer internship program! 🚀 Hard work pays off!",
    timestamp: "2 weeks ago",
    likes: 156,
    comments: 45,
    shares: 12,
    image: null,
  },
];

export function MyPostsTab({ userName = "Student" }: MyPostsTabProps) {
  const initials = userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  if (mockMyPosts.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Posts Yet</h3>
          <p className="text-muted-foreground">
            When you create posts, they will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">My Posts ({mockMyPosts.length})</h3>
      </div>

      {mockMyPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <p className="text-foreground mb-3">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src={post.image}
                    alt="Post attachment"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-green-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
