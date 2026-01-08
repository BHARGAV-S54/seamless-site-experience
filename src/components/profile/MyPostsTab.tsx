import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ImageIcon, Pencil, Trash2, X, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePosts, Post } from "@/hooks/usePosts";
import { toast } from "sonner";

interface MyPostsTabProps {
  userName?: string;
}

export function MyPostsTab({ userName = "Student" }: MyPostsTabProps) {
  const { getUserPosts, updatePost, deletePost } = usePosts();
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const posts = getUserPosts();
  const initials = userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
  };

  const handleSaveEdit = async (postId: string) => {
    if (!editContent.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }
    
    await updatePost(postId, editContent);
    setEditingPostId(null);
    setEditContent("");
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditContent("");
  };

  const handleDelete = async () => {
    if (!deletePostId) return;
    await deletePost(deletePostId);
    setDeletePostId(null);
  };

  if (posts.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Posts Yet</h3>
          <p className="text-muted-foreground">
            When you create posts from the home page, they will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">My Posts ({posts.length})</h3>
        </div>

        {posts.map((post, index) => (
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
                      <DropdownMenuItem onClick={() => handleEdit(post)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDeletePostId(post.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Post Content */}
                <AnimatePresence mode="wait">
                  {editingPostId === post.id ? (
                    <motion.div
                      key="editing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-3"
                    >
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[100px] mb-2"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(post.id)}
                          className="gradient-primary text-primary-foreground"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-foreground mb-3"
                    >
                      {post.content}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Post Image */}
                {post.imageUrl && (
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img
                      src={post.imageUrl}
                      alt="Post attachment"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Poll Options */}
                {post.type === "poll" && post.pollOptions && (
                  <div className="space-y-2 mb-3">
                    {post.pollOptions.map((option, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                      >
                        <span className="text-sm flex-1">{option.label}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${option.percent}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-primary w-10 text-right">
                            {option.percent}%
                          </span>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground text-center">
                      {post.pollOptions.reduce((acc, o) => acc + o.votes, 0)} votes
                    </p>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Heart className={`w-4 h-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="text-sm">{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments.length}</span>
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{post.shares}</span>
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-primary text-primary" : ""}`} />
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
