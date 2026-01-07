import { motion } from "framer-motion";
import { StoriesBar } from "./StoriesBar";
import { PostComposer } from "./PostComposer";
import { PostCard } from "./PostCard";
import { TrendingSidebar } from "./TrendingSidebar";

const posts = [
  {
    id: "1",
    type: "text" as const,
    username: "Uni_News_Official",
    time: "2 hours ago",
    tag: "News",
    content: "🚨 BREAKING: University announces flexible attendance policy for final year students! No more 75% mandatory attendance. Students can focus on projects and internships. What do you think? #UniversityNews #StudentLife",
    likes: "1.2k",
    comments: "340",
    shares: "89",
  },
  {
    id: "2",
    type: "image" as const,
    username: "CS_Memes_Daily",
    time: "4 hours ago",
    tag: "Meme",
    content: "When your code finally works after 3 hours of debugging 😂 #CodingLife #ProgrammerHumor",
    likes: "5.6k",
    comments: "890",
    shares: "234",
  },
  {
    id: "3",
    type: "poll" as const,
    username: "Fest_Committee",
    time: "6 hours ago",
    tag: "Poll",
    content: "🎵 Which DJ should headline our campus fest? Vote now!",
    likes: "890",
    comments: "110",
    shares: "45",
    pollOptions: [
      { label: "DJ Snake", percent: 65 },
      { label: "Marshmello", percent: 35 },
    ],
  },
  {
    id: "4",
    type: "reel" as const,
    username: "Uni_News_Official",
    time: "1 hour ago",
    tag: "Breaking News",
    content: "75% Attendance Rule made MANDATORY! 💀 Students react... #university #news",
    likes: "1.2k",
    comments: "340",
    shares: "89",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "5",
    type: "reel" as const,
    username: "CS_Memes_Daily",
    time: "3 hours ago",
    tag: "Trolling",
    content: "Me trying to explain my code to the professor after copying from StackOverflow 😭",
    likes: "5.6k",
    comments: "890",
    shares: "234",
    gradient: "from-green-500 to-emerald-600",
    emoji: "🤣",
  },
  {
    id: "6",
    type: "reel" as const,
    username: "Fest_Committee",
    time: "5 hours ago",
    tag: "Event",
    content: "DJ Night Lineup Revealed! 🎵 Tag your squad! #campuslife #party",
    likes: "890",
    comments: "110",
    shares: "45",
    gradient: "from-pink-500 via-red-500 to-yellow-500",
  },
];

interface HomePageProps {
  userName?: string;
}

export function HomePage({ userName }: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <StoriesBar />

      <div className="mt-6 mb-6">
        <PostComposer userName={userName} />
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
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>

        <TrendingSidebar />
      </div>
    </div>
  );
}
