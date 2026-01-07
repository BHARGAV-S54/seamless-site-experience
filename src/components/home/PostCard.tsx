import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat, Send, MoreHorizontal, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Post {
  id: string;
  type: "text" | "image" | "poll" | "reel";
  username: string;
  time: string;
  tag: string;
  content: string;
  likes: string;
  comments: string;
  shares: string;
  pollOptions?: { label: string; percent: number }[];
  gradient?: string;
  emoji?: string;
}

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const initials = post.username.split("_")[0].slice(0, 2).toUpperCase();

  if (post.type === "reel") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="border-0 shadow-card overflow-hidden aspect-[9/14] relative group cursor-pointer">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}
          >
            {post.emoji ? (
              <span className="text-7xl">{post.emoji}</span>
            ) : (
              <Play className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" />
            )}
          </div>

          {/* Reel Actions */}
          <div className="absolute right-3 bottom-28 flex flex-col gap-5 items-center">
            <button className="flex flex-col items-center text-white">
              <Heart className="w-6 h-6" />
              <span className="text-xs mt-1">{post.likes}</span>
            </button>
            <button className="flex flex-col items-center text-white">
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">{post.comments}</span>
            </button>
            <button className="flex flex-col items-center text-white">
              <Send className="w-6 h-6" />
            </button>
          </div>

          {/* Reel Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold border border-white">
                {initials}
              </div>
              <span className="text-white font-semibold text-sm">{post.username}</span>
            </div>
            <Badge variant="secondary" className="mb-2 text-[10px]">
              {post.tag}
            </Badge>
            <p className="text-white text-sm line-clamp-2">{post.content}</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-0 shadow-card overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{post.username}</p>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            <Badge variant="secondary" className="mb-2 text-xs">
              {post.tag}
            </Badge>

            {post.type === "image" && (
              <div className="w-full aspect-video bg-muted rounded-xl mb-3 flex items-center justify-center text-muted-foreground">
                📸 Image Post
              </div>
            )}

            <p className="text-sm leading-relaxed">{post.content}</p>

            {post.type === "poll" && post.pollOptions && (
              <div className="mt-3 space-y-2">
                {post.pollOptions.map((option, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                    <span className="text-sm flex-shrink-0 w-20">{option.label}</span>
                    <div className="flex-1 h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full"
                        style={{ width: `${option.percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-primary">{option.percent}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-around px-4 py-3 border-t border-border">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1.5">
              <Heart className="w-4 h-4" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1.5">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1.5">
              <Repeat className="w-4 h-4" />
              {post.shares}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
