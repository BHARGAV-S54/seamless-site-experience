import { useState, useRef } from "react";
import { Image, Video, BarChart3, X, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface NewPost {
  type: "text" | "image" | "poll";
  content: string;
  imagePreview?: string;
  pollOptions?: string[];
}

interface PostComposerProps {
  userName?: string;
  onPost: (post: NewPost) => void;
}

export function PostComposer({ userName = "User", onPost }: PostComposerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postType, setPostType] = useState<"text" | "image" | "poll">("text");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setPostType("image");
        setIsExpanded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!content.trim() && !imagePreview && postType !== "poll") return;
    if (postType === "poll" && pollOptions.filter(o => o.trim()).length < 2) return;

    onPost({
      type: postType,
      content,
      imagePreview: imagePreview || undefined,
      pollOptions: postType === "poll" ? pollOptions.filter(o => o.trim()) : undefined,
    });

    // Reset
    setContent("");
    setImagePreview(null);
    setPollOptions(["", ""]);
    setPostType("text");
    setIsExpanded(false);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Input
              placeholder="What's on your mind? Share your thoughts..."
              className="rounded-full bg-muted border-0 focus-visible:ring-primary cursor-pointer"
              onClick={() => setIsExpanded(true)}
              readOnly
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Photo</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-primary"
                onClick={() => { setPostType("poll"); setIsExpanded(true); }}
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Poll</span>
              </Button>
            </div>
            <Button 
              size="sm" 
              className="gradient-primary text-primary-foreground rounded-full px-6"
              onClick={() => setIsExpanded(true)}
            >
              Post
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </CardContent>
      </Card>

      {/* Expanded Post Dialog */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{userName}</p>
                <p className="text-xs text-muted-foreground">Posting publicly</p>
              </div>
            </div>

            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none border-0 focus-visible:ring-0 text-lg"
              autoFocus
            />

            {/* Image Preview */}
            <AnimatePresence>
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative"
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-xl max-h-[300px] object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() => { setImagePreview(null); setPostType("text"); }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Poll Options */}
            <AnimatePresence>
              {postType === "poll" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 p-4 bg-muted rounded-xl"
                >
                  <p className="text-sm font-medium mb-2">Poll Options</p>
                  {pollOptions.map((option, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        placeholder={`Option ${idx + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...pollOptions];
                          newOptions[idx] = e.target.value;
                          setPollOptions(newOptions);
                        }}
                      />
                      {idx > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {pollOptions.length < 4 && (
                    <Button variant="outline" size="sm" onClick={addPollOption}>
                      Add Option
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex gap-1">
                <Button
                  variant={postType === "image" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="w-4 h-4" />
                </Button>
                <Button
                  variant={postType === "poll" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPostType(postType === "poll" ? "text" : "poll")}
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              <Button
                className="gradient-primary text-primary-foreground px-6"
                onClick={handlePost}
                disabled={!content.trim() && !imagePreview && (postType !== "poll" || pollOptions.filter(o => o.trim()).length < 2)}
              >
                Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
