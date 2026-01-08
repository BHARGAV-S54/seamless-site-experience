import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, BookOpen, Award, MapPin, Calendar, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user data - in production this would come from an API
const mockUserProfiles: Record<string, {
  name: string;
  bio: string;
  followers: string;
  following: string;
  posts: number;
  color: string;
  department: string;
  joinedDate: string;
  website?: string;
  recentPosts: { id: number; content: string; likes: number; comments: number }[];
}> = {
  "uni_news_official": {
    name: "Uni_News_Official",
    bio: "Official news channel for campus updates, events, and announcements. Stay informed! 📰",
    followers: "12.5K",
    following: "156",
    posts: 342,
    color: "bg-blue-500",
    department: "Administration",
    joinedDate: "January 2022",
    website: "university.edu/news",
    recentPosts: [
      { id: 1, content: "🎓 Convocation ceremony dates announced! Mark your calendars for the 15th of next month.", likes: 234, comments: 45 },
      { id: 2, content: "📚 Library timings extended during exam season. Now open until midnight!", likes: 189, comments: 23 },
    ]
  },
  "cs_memes_daily": {
    name: "CS_Memes_Daily",
    bio: "Your daily dose of programmer humor 💻😂 Turning bugs into laughs since 2021",
    followers: "8.2K",
    following: "89",
    posts: 567,
    color: "bg-green-500",
    department: "Computer Science",
    joinedDate: "March 2021",
    recentPosts: [
      { id: 1, content: "When the code works on the first try... 👀 *suspicious*", likes: 456, comments: 78 },
      { id: 2, content: "99 little bugs in the code, 99 little bugs... Take one down, patch it around... 127 little bugs in the code 🐛", likes: 523, comments: 92 },
    ]
  },
  "fest_committee": {
    name: "Fest_Committee",
    bio: "Official account for campus festivals and cultural events. Making memories happen! 🎉",
    followers: "5.1K",
    following: "234",
    posts: 189,
    color: "bg-purple-500",
    department: "Student Affairs",
    joinedDate: "August 2020",
    recentPosts: [
      { id: 1, content: "🎭 TechFest 2024 registrations are OPEN! Early bird discounts available.", likes: 312, comments: 67 },
    ]
  },
  "techclub_official": {
    name: "TechClub_Official",
    bio: "Building the future, one hackathon at a time. Join us for workshops, talks & more! 🚀",
    followers: "3.4K",
    following: "178",
    posts: 234,
    color: "bg-orange-500",
    department: "Computer Science",
    joinedDate: "February 2021",
    recentPosts: [
      { id: 1, content: "🔧 Weekend workshop on React.js - Beginners welcome! Register now.", likes: 145, comments: 34 },
    ]
  },
  "studentcouncil": {
    name: "StudentCouncil",
    bio: "Your voice, our mission. Representing students and driving positive change on campus. ✊",
    followers: "6.8K",
    following: "312",
    posts: 289,
    color: "bg-pink-500",
    department: "Student Council",
    joinedDate: "September 2019",
    recentPosts: [
      { id: 1, content: "📢 Town hall meeting this Friday! Come share your ideas and concerns.", likes: 267, comments: 89 },
    ]
  },
};

export function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  const userKey = username?.toLowerCase().replace(/-/g, "_") || "";
  const user = mockUserProfiles[userKey];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">User not found</h2>
          <p className="text-muted-foreground mb-4">The user you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold">{user.name}</h1>
            <p className="text-xs text-muted-foreground">{user.posts} posts</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto">
        {/* Cover & Avatar */}
        <div className="relative">
          <div className={`h-32 ${user.color}`} />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-12 left-4"
          >
            <Avatar className="w-24 h-24 border-4 border-background">
              <AvatarFallback className={`${user.color} text-white text-2xl`}>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        {/* Profile Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pt-14 px-4"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">@{user.name.toLowerCase()}</p>
            </div>
            <Button>Follow</Button>
          </div>

          <p className="text-sm mb-4">{user.bio}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {user.department}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined {user.joinedDate}
            </span>
            {user.website && (
              <span className="flex items-center gap-1 text-primary">
                <LinkIcon className="w-4 h-4" />
                {user.website}
              </span>
            )}
          </div>

          <div className="flex gap-4 text-sm mb-6">
            <span><strong>{user.following}</strong> <span className="text-muted-foreground">Following</span></span>
            <span><strong>{user.followers}</strong> <span className="text-muted-foreground">Followers</span></span>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="px-4">
          <TabsList className="w-full">
            <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
            <TabsTrigger value="media" className="flex-1">Media</TabsTrigger>
            <TabsTrigger value="likes" className="flex-1">Likes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-4 space-y-4">
            {user.recentPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className={user.color}>
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{user.name}</span>
                          <span className="text-muted-foreground text-xs">· 2h</span>
                        </div>
                        <p className="text-sm mb-3">{post.content}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="media" className="mt-4">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No media posts yet
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="likes" className="mt-4">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Liked posts are private
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
