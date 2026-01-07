import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const stories = [
  { id: "add", name: "Add Story", isAdd: true },
  { id: "math", name: "Math Club", label: "Math", color: "from-blue-500 to-purple-500" },
  { id: "exam", name: "Exams", label: "Exam", color: "from-red-500 to-orange-500" },
  { id: "fest", name: "Fest '25", label: "Fest", color: "from-green-500 to-teal-500" },
  { id: "code", name: "Coding", label: "Code", color: "from-indigo-500 to-blue-500" },
];

export function StoriesBar() {
  return (
    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 px-1">
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="flex flex-col items-center gap-1.5 min-w-[70px] cursor-pointer"
        >
          <div
            className={`w-16 h-16 rounded-full p-0.5 ${
              story.isAdd
                ? "bg-muted"
                : "bg-gradient-to-br from-primary to-primary-glow"
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
  );
}
