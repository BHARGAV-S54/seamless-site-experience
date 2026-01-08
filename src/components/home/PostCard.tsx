import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Repeat, Send, MoreHorizontal, Play, Pause, Volume2, VolumeX, Bookmark, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export interface Post {
  id: string;
  type: "text" | "image" | "poll" | "reel";
  username: string;
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
  isLiked?: boolean;
  isSaved?: boolean;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  time: string;
  likes: number;
}

interface PostCardProps {
  post: Post;
  index: number;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onShare: (postId: string) => void;
  onSave: (postId: string) => void;
  onVote: (postId: string, optionIndex: number) => void;
  onDelete?: (postId: string) => void;
}

export function PostCard({ post, index, onLike, onComment, onShare, onSave, onVote, onDelete }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const initials = post.username.split("_")[0].slice(0, 2).toUpperCase();

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setIsLikeAnimating(true);
    onLike(post.id);
    setTimeout(() => setIsLikeAnimating(false), 300);
  };

  const handleDoubleTapLike = () => {
    if (!post.isLiked) {
      handleLike();
    }
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    onComment(post.id, newComment);
    setNewComment("");
  };

  const handleShare = () => {
    onShare(post.id);
    navigator.clipboard.writeText(`Check out this post from ${post.username}!`);
    toast.success("Link copied to clipboard!");
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  if (post.type === "reel") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onDoubleClick={handleDoubleTapLike}
      >
        <Card className="border-0 shadow-card overflow-hidden aspect-[9/14] relative group cursor-pointer">
          {/* Video or Gradient Background */}
          {post.videoUrl ? (
            <div className="absolute inset-0" onClick={handlePlayPause}>
              <video
                ref={videoRef}
                src={post.videoUrl}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              {/* Play/Pause Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Mute Button */}
              <motion.button
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white z-20"
                onClick={toggleMute}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
            </div>
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}
              onClick={handlePlayPause}
            >
              {post.emoji ? (
                <span className="text-7xl">{post.emoji}</span>
              ) : (
                <Play className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" />
              )}
            </div>
          )}

          {/* Like animation */}
          <AnimatePresence>
            {isLikeAnimating && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <Heart className="w-20 h-20 text-white fill-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reel Actions */}
          <div className="absolute right-3 bottom-28 flex flex-col gap-5 items-center z-10">
            <motion.button 
              className="flex flex-col items-center text-white"
              onClick={handleLike}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={`w-6 h-6 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-xs mt-1">{formatNumber(post.likes)}</span>
            </motion.button>
            <button 
              className="flex flex-col items-center text-white"
              onClick={() => setShowComments(true)}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">{post.comments.length}</span>
            </button>
            <button className="flex flex-col items-center text-white" onClick={handleShare}>
              <Send className="w-6 h-6" />
            </button>
            <button 
              className="flex flex-col items-center text-white"
              onClick={() => onSave(post.id)}
            >
              <Bookmark className={`w-6 h-6 ${post.isSaved ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Reel Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
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
      onDoubleClick={handleDoubleTapLike}
    >
      <Card className="border-0 shadow-card overflow-hidden relative">
        {/* Like animation */}
        <AnimatePresence>
          {isLikeAnimating && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
              <Heart className="w-16 h-16 text-red-500 fill-red-500" />
            </motion.div>
          )}
        </AnimatePresence>

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onSave(post.id)}>
                  <Bookmark className="w-4 h-4 mr-2" />
                  {post.isSaved ? "Unsave" : "Save"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Send className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                {onDelete && (
                  <DropdownMenuItem 
                    onClick={() => onDelete(post.id)}
                    className="text-destructive"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            <Badge variant="secondary" className="mb-2 text-xs">
              {post.tag}
            </Badge>

            {post.type === "image" && post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt="Post" 
                className="w-full rounded-xl mb-3 max-h-[400px] object-cover"
              />
            )}

            {post.type === "image" && !post.imageUrl && (
              <div className="w-full aspect-video bg-muted rounded-xl mb-3 flex items-center justify-center text-muted-foreground">
                📸 Image Post
              </div>
            )}

            <p className="text-sm leading-relaxed">{post.content}</p>

            {post.type === "poll" && post.pollOptions && (
              <div className="mt-3 space-y-2">
                {post.pollOptions.map((option, i) => (
                  <motion.button
                    key={i}
                    className="w-full flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left"
                    onClick={() => onVote(post.id, i)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm flex-1">{option.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full gradient-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${option.percent}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-primary w-10 text-right">
                        {option.percent}%
                      </span>
                    </div>
                  </motion.button>
                ))}
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {post.pollOptions.reduce((acc, o) => acc + o.votes, 0)} votes
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-around px-4 py-3 border-t border-border">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-1.5 ${post.isLiked ? "text-red-500" : "text-muted-foreground hover:text-primary"}`}
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? "fill-red-500" : ""}`} />
                {formatNumber(post.likes)}
              </Button>
            </motion.div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary gap-1.5"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-4 h-4" />
              {post.comments.length}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary gap-1.5"
              onClick={handleShare}
            >
              <Repeat className="w-4 h-4" />
              {formatNumber(post.shares)}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${post.isSaved ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
              onClick={() => onSave(post.id)}
            >
              <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-primary" : ""}`} />
            </Button>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border overflow-hidden"
              >
                <div className="p-4 space-y-3 max-h-[200px] overflow-y-auto">
                  {post.comments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No comments yet. Be the first to comment!
                    </p>
                  ) : (
                    post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-[10px] bg-muted">
                            {comment.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-muted rounded-xl px-3 py-2">
                          <p className="text-xs font-semibold">{comment.username}</p>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 flex gap-2 bg-muted/50">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleComment()}
                    className="flex-1 h-9 text-sm"
                  />
                  <Button 
                    size="sm" 
                    className="gradient-primary text-primary-foreground"
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
