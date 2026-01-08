import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Heart, MessageCircle, Repeat, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePosts } from "@/hooks/usePosts";

export function SavedPostsTab() {
  const { getSavedPosts, toggleSave } = usePosts();
  const posts = getSavedPosts();

  const handleUnsave = (postId: string) => {
    toggleSave(postId);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  if (posts.length === 0) {
    return (
      <Card className="border-0 shadow-card">
        <CardContent className="py-12 text-center">
          <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Saved Posts</h3>
          <p className="text-muted-foreground text-sm">
            Posts you bookmark will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bookmark className="w-5 h-5" />
          Saved Posts ({posts.length})
        </h3>
      </div>

      <AnimatePresence mode="popLayout">
        {posts.map((post) => {
          const initials = post.username.split("_")[0].slice(0, 2).toUpperCase();
          
          return (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <Card className="border-0 shadow-card overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{post.username}</span>
                        <Badge variant="secondary" className="text-[10px]">
                          {post.tag}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{post.time}</p>
                      <p className="text-sm line-clamp-3">{post.content}</p>
                      
                      {post.imageUrl && (
                        <img 
                          src={post.imageUrl} 
                          alt="Post" 
                          className="w-full rounded-lg mt-3 max-h-[200px] object-cover"
                        />
                      )}
                      
                      <div className="flex items-center gap-4 mt-3 text-muted-foreground">
                        <span className="flex items-center gap-1 text-xs">
                          <Heart className="w-3.5 h-3.5" />
                          {formatNumber(post.likes)}
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.comments.length}
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                          <Repeat className="w-3.5 h-3.5" />
                          {formatNumber(post.shares)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleUnsave(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
