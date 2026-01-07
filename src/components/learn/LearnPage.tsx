import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Trophy, MapPin, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const tabs = [
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "materials", label: "Materials", icon: FileText },
  { id: "competitions", label: "Competitions", icon: Trophy },
];

const courses = [
  { id: 1, name: "Data Structures & Algorithms", progress: 75, modules: 12, completed: 9, color: "from-blue-500 to-indigo-500" },
  { id: 2, name: "Computer Networks", progress: 45, modules: 8, completed: 4, color: "from-green-500 to-emerald-500" },
  { id: 3, name: "Machine Learning Basics", progress: 20, modules: 15, completed: 3, color: "from-purple-500 to-pink-500" },
  { id: 4, name: "Web Development", progress: 90, modules: 10, completed: 9, color: "from-orange-500 to-red-500" },
];

const materials = [
  { id: 1, title: "DSA Complete Notes", type: "PDF", size: "4.2 MB", downloads: "2.3k", icon: "📄" },
  { id: 2, title: "CN Previous Year Papers", type: "ZIP", size: "12 MB", downloads: "1.8k", icon: "📦" },
  { id: 3, title: "ML Cheat Sheet", type: "PDF", size: "1.5 MB", downloads: "890", icon: "📋" },
  { id: 4, title: "Surprise Quiz: Physics", type: "Quiz", time: "15 mins", questions: 10, icon: "⏰" },
];

const competitions = [
  { id: 1, name: "CodeVars 2025: National Hackathon", date: { day: "15", month: "May" }, location: "Remote", team: "Team of 4", prize: "$5000" },
  { id: 2, name: "Design Sprint: UI/UX Challenge", date: { day: "22", month: "May" }, location: "Auditorium", team: "Solo/Duo", reward: "Internship" },
  { id: 3, name: "Inter-College Math Olympiad", date: { day: "01", month: "Jun" }, location: "Block C", team: "Solo", prize: null },
];

export function LearnPage() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mb-6"
      >
        📚 Learning Hub
      </motion.h2>

      {/* Tabs */}
      <Card className="border-0 shadow-card mb-6">
        <CardContent className="p-2">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                className={`flex-1 gap-2 ${
                  activeTab === tab.id ? "bg-secondary text-primary font-semibold" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {/* Courses Tab */}
        {activeTab === "courses" && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-card overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                  <CardContent className="p-5">
                    <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">
                      {course.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{course.completed}/{course.modules} modules</span>
                      <span className="font-semibold text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <Button size="sm" className="mt-4 w-full" variant="outline">
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Materials Tab */}
        {activeTab === "materials" && (
          <motion.div
            key="materials"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {materials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-0 shadow-card ${material.type === "Quiz" ? "border-l-4 border-l-destructive" : ""}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                      {material.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{material.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {material.type === "Quiz"
                          ? `${material.questions} Questions • ${material.time}`
                          : `${material.type} • ${material.size}`}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className={material.type === "Quiz" ? "gradient-primary text-primary-foreground" : ""}
                      variant={material.type === "Quiz" ? "default" : "outline"}
                    >
                      {material.type === "Quiz" ? "Start" : "Download"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Competitions Tab */}
        {activeTab === "competitions" && (
          <motion.div
            key="competitions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-muted-foreground font-medium">Upcoming Hackathons & Contests</h3>
            {competitions.map((comp, index) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-card">
                  <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex flex-col items-center justify-center text-primary flex-shrink-0">
                      <span className="text-2xl font-bold leading-none">{comp.date.day}</span>
                      <span className="text-xs uppercase font-semibold">{comp.date.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold mb-1">{comp.name}</h4>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {comp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {comp.team}
                        </span>
                      </div>
                      {(comp.prize || comp.reward) && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {comp.prize ? `Prize: ${comp.prize}` : comp.reward}
                        </Badge>
                      )}
                    </div>
                    <Button className="bg-game-dark text-game-gold hover:bg-game-dark/90 w-full sm:w-auto">
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
