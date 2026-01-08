import { motion } from "framer-motion";
import { Copy, Crown, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTab } from "./DashboardTab";
import { AccountTab } from "./AccountTab";
import { MyPostsTab } from "./MyPostsTab";
import { SavedPostsTab } from "./SavedPostsTab";
import { AvatarUpload } from "./AvatarUpload";
import { useAuth } from "@/hooks/useAuth";
interface ProfilePageProps {
  user: { name: string; email: string } | null;
  onEditProfile: () => void;
  onLogout?: () => void;
}

export function ProfilePage({ user, onEditProfile, onLogout }: ProfilePageProps) {
  const { user: authUser, profile, refreshProfile } = useAuth();
  const userName = user?.name || "Student";
  const initials = userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const handleAvatarChange = (url: string) => {
    refreshProfile?.();
  };
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
              <div className="relative">
                {authUser && (
                  <AvatarUpload
                    userId={authUser.id}
                    currentAvatarUrl={profile?.avatar_url || null}
                    onAvatarChange={handleAvatarChange}
                    initials={initials}
                  />
                )}
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


              <Button
                className="w-full mt-5 gradient-primary text-primary-foreground font-semibold"
                onClick={onEditProfile}
              >
                Edit Profile
              </Button>
              {onLogout && (
                <Button
                  variant="destructive"
                  className="w-full mt-3"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="dashboard" className="font-semibold">Dashboard</TabsTrigger>
              <TabsTrigger value="myposts" className="font-semibold">My Posts</TabsTrigger>
              <TabsTrigger value="saved" className="font-semibold">Saved</TabsTrigger>
              <TabsTrigger value="account" className="font-semibold">Account</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <DashboardTab />
            </TabsContent>
            <TabsContent value="myposts">
              <MyPostsTab userName={userName} />
            </TabsContent>
            <TabsContent value="saved">
              <SavedPostsTab />
            </TabsContent>
            <TabsContent value="account">
              <AccountTab onLogout={onLogout || (() => {})} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
