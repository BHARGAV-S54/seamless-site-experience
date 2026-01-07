import { motion } from "framer-motion";
import { Copy, History, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProfilePageProps {
  user: { name: string; email: string } | null;
  onEditProfile: () => void;
}

const stats = [
  { label: "GPA (KD)", value: "3.8", sub: "Top 5%" },
  { label: "Accuracy", value: "92%", sub: "Quiz Avg" },
  { label: "Matches", value: "42", sub: "Classes" },
];

const matches = [
  { id: 1, name: "Computer Networks Quiz", type: "Ranked • Solo", score: "28/30", result: "win", badge: "MVP" },
  { id: 2, name: "Data Structures Lab", type: "Casual • Team", score: "B+", result: "draw", badge: "Assist King" },
  { id: 3, name: "Linear Algebra Final", type: "Tournament Mode", score: "95%", result: "win", badge: "Headshot" },
  { id: 4, name: "Physics Assignment", type: "Timed Event", score: "C", result: "loss", badge: "Defeated" },
];

export function ProfilePage({ user, onEditProfile }: ProfilePageProps) {
  const userName = user?.name || "Student";
  const initials = userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-[350px,1fr] gap-6">
        {/* Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 border-game-dark/20 overflow-hidden shadow-lg bg-gradient-to-b from-game-surface to-game-dark text-white">
            {/* Banner */}
            <div className="h-28 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 relative">
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-game-dark to-transparent" />
            </div>

            {/* Avatar */}
            <div className="relative -mt-16 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-game-gold bg-game-dark flex items-center justify-center text-5xl shadow-lg relative">
                👤
                <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center border-2 border-game-dark shadow-lg">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <CardContent className="pt-4 pb-6 text-center">
              <Badge className="bg-white/10 text-game-gold border-0 mb-2 font-mono text-xs">
                [MCA-DEPT]
              </Badge>
              <h2 className="text-2xl font-black uppercase tracking-wide mb-1">{userName}</h2>
              <button
                className="text-xs text-gray-400 flex items-center justify-center gap-1 mx-auto hover:text-white transition-colors"
                onClick={() => navigator.clipboard.writeText("202394821")}
              >
                UID: 202394821 <Copy className="w-3 h-3" />
              </button>

              {/* XP Bar */}
              <div className="mt-5 text-left">
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>LVL 14 (Junior Year)</span>
                  <span>XP: 3450/4000</span>
                </div>
                <div className="h-2 bg-game-dark rounded-full overflow-hidden border border-gray-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-game-gold to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>

              <p className="mt-5 text-sm text-gray-400 italic border-t border-white/10 pt-4">
                "Aiming for that 4.0 GPA Headshot. Coffee is my mana."
              </p>

              <Button
                className="w-full mt-5 gradient-primary text-primary-foreground font-semibold"
                onClick={onEditProfile}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Dashboard */}
        <div className="space-y-5">
          {/* Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className={`text-center ${index < 2 ? "border-r border-border" : ""}`}
                    >
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-black text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.sub}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Match History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg uppercase tracking-wide">
                  <History className="w-5 h-5" /> Recent Battles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {matches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <div
                      className={`w-1 h-10 rounded-full ${
                        match.result === "win"
                          ? "bg-success shadow-[0_0_8px_hsl(var(--success))]"
                          : match.result === "draw"
                          ? "bg-warning"
                          : "bg-destructive"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{match.name}</p>
                      <p className="text-xs text-muted-foreground">{match.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg">{match.score}</p>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          match.badge === "MVP" || match.badge === "Headshot"
                            ? "bg-gradient-to-r from-game-gold to-orange-500 text-white border-0"
                            : ""
                        }`}
                      >
                        {match.badge}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
