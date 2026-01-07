import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ChevronLeft, ChevronRight, Image, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Story {
  id: string;
  name: string;
  label?: string;
  isAdd?: boolean;
  color?: string;
  slides?: { id: number; content: string; bg: string; time: string }[];
}

const initialStories: Story[] = [
  { id: "add", name: "Add Story", isAdd: true },
  { 
    id: "math", 
    name: "Math Club", 
    label: "Math", 
    color: "from-blue-500 to-purple-500",
    slides: [
      { id: 1, content: "📐 Today's Topic: Calculus Derivatives", bg: "from-blue-600 to-indigo-700", time: "2h ago" },
      { id: 2, content: "Join our study group at 5 PM! 🎓", bg: "from-purple-600 to-pink-600", time: "2h ago" },
    ]
  },
  { 
    id: "exam", 
    name: "Exams", 
    label: "Exam", 
    color: "from-red-500 to-orange-500",
    slides: [
      { id: 1, content: "⚠️ Final Exams start next Monday!", bg: "from-red-600 to-orange-600", time: "4h ago" },
      { id: 2, content: "📝 Check the schedule in Learn section", bg: "from-orange-600 to-yellow-600", time: "4h ago" },
    ]
  },
  { 
    id: "fest", 
    name: "Fest '25", 
    label: "Fest", 
    color: "from-green-500 to-teal-500",
    slides: [
      { id: 1, content: "🎉 Campus Fest 2025 is HERE!", bg: "from-green-600 to-emerald-600", time: "1h ago" },
      { id: 2, content: "🎵 DJ Night lineup announced!", bg: "from-teal-600 to-cyan-600", time: "1h ago" },
      { id: 3, content: "🎪 Don't miss the cultural events!", bg: "from-cyan-600 to-blue-600", time: "1h ago" },
    ]
  },
  { 
    id: "code", 
    name: "Coding", 
    label: "Code", 
    color: "from-indigo-500 to-blue-500",
    slides: [
      { id: 1, content: "💻 Hackathon registrations open!", bg: "from-indigo-600 to-purple-600", time: "30m ago" },
    ]
  },
];

interface StoriesBarProps {
  onAddStory?: (story: { content: string; bg: string }) => void;
}

export function StoriesBar({ onAddStory }: StoriesBarProps) {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [newStoryContent, setNewStoryContent] = useState("");
  const [selectedBg, setSelectedBg] = useState("from-primary to-primary-glow");

  const bgOptions = [
    "from-primary to-primary-glow",
    "from-blue-600 to-indigo-700",
    "from-green-500 to-emerald-600",
    "from-purple-600 to-pink-600",
    "from-red-500 to-orange-500",
    "from-cyan-500 to-blue-500",
    "from-yellow-500 to-orange-500",
    "from-pink-500 to-rose-500",
  ];

  const handleStoryClick = (story: Story) => {
    if (story.isAdd) {
      setIsCreating(true);
    } else if (story.slides && story.slides.length > 0) {
      setViewingStory(story);
      setCurrentSlide(0);
    }
  };

  const handleNextSlide = () => {
    if (viewingStory?.slides && currentSlide < viewingStory.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setViewingStory(null);
      setCurrentSlide(0);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleCreateStory = () => {
    if (!newStoryContent.trim()) return;

    // Add to "Your Story" or create new
    const yourStory = stories.find(s => s.id === "your-story");
    if (yourStory) {
      yourStory.slides?.push({
        id: Date.now(),
        content: newStoryContent,
        bg: selectedBg,
        time: "Just now",
      });
    } else {
      const newStory: Story = {
        id: "your-story",
        name: "Your Story",
        label: "You",
        color: selectedBg,
        slides: [{ id: Date.now(), content: newStoryContent, bg: selectedBg, time: "Just now" }],
      };
      setStories([stories[0], newStory, ...stories.slice(1)]);
    }

    setNewStoryContent("");
    setIsCreating(false);
    onAddStory?.({ content: newStoryContent, bg: selectedBg });
  };

  return (
    <>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 px-1">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center gap-1.5 min-w-[70px] cursor-pointer group"
            onClick={() => handleStoryClick(story)}
          >
            <div
              className={`w-16 h-16 rounded-full p-0.5 transition-transform group-hover:scale-105 ${
                story.isAdd
                  ? "bg-muted"
                  : `bg-gradient-to-br ${story.color || "from-primary to-primary-glow"}`
              }`}
            >
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center border-2 border-card">
                {story.isAdd ? (
                  <Plus className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <span className="text-xs font-semibold text-muted-foreground">
                    {story.label}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground truncate max-w-[70px]">
              {story.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {viewingStory && viewingStory.slides && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setViewingStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-sm h-[80vh] max-h-[600px] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
                {viewingStory.slides.map((_, idx) => (
                  <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: idx < currentSlide ? "100%" : "0%" }}
                      animate={{ width: idx <= currentSlide ? "100%" : "0%" }}
                      transition={{ duration: idx === currentSlide ? 5 : 0 }}
                      onAnimationComplete={() => {
                        if (idx === currentSlide) handleNextSlide();
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Close button */}
              <button
                className="absolute top-8 right-4 z-10 text-white/80 hover:text-white"
                onClick={() => setViewingStory(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Story Header */}
              <div className="absolute top-8 left-4 z-10 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${viewingStory.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {viewingStory.label}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{viewingStory.name}</p>
                  <p className="text-white/60 text-xs">{viewingStory.slides[currentSlide]?.time}</p>
                </div>
              </div>

              {/* Story Content */}
              <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${viewingStory.slides[currentSlide]?.bg} flex items-center justify-center p-8`}>
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-2xl font-bold text-center leading-relaxed"
                >
                  {viewingStory.slides[currentSlide]?.content}
                </motion.p>
              </div>

              {/* Navigation */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 flex items-center justify-start pl-2"
                onClick={handlePrevSlide}
              >
                {currentSlide > 0 && <ChevronLeft className="w-8 h-8 text-white/50" />}
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 flex items-center justify-end pr-2"
                onClick={handleNextSlide}
              >
                <ChevronRight className="w-8 h-8 text-white/50" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Story Modal */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Story</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Preview */}
            <div className={`w-full aspect-[9/16] max-h-[300px] rounded-xl bg-gradient-to-br ${selectedBg} flex items-center justify-center p-6`}>
              <p className="text-white text-lg font-bold text-center">
                {newStoryContent || "Your story preview..."}
              </p>
            </div>

            {/* Background selector */}
            <div>
              <p className="text-sm font-medium mb-2">Background</p>
              <div className="flex gap-2 flex-wrap">
                {bgOptions.map((bg) => (
                  <button
                    key={bg}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${bg} transition-transform ${
                      selectedBg === bg ? "ring-2 ring-primary ring-offset-2 scale-110" : ""
                    }`}
                    onClick={() => setSelectedBg(bg)}
                  />
                ))}
              </div>
            </div>

            {/* Content input */}
            <Textarea
              placeholder="What's on your mind?"
              value={newStoryContent}
              onChange={(e) => setNewStoryContent(e.target.value)}
              className="resize-none"
              rows={3}
            />

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button 
                className="flex-1 gradient-primary text-primary-foreground"
                onClick={handleCreateStory}
                disabled={!newStoryContent.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Share Story
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
