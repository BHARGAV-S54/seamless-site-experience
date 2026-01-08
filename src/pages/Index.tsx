import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { LoginPage } from "@/components/auth/LoginPage";
import { HomePage } from "@/components/home/HomePage";
import { LearnPage } from "@/components/learn/LearnPage";
import { SocialPage } from "@/components/social/SocialPage";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { AIChatbot } from "@/components/chat/AIChatbot";
import { EducatorDashboard } from "@/components/educator/EducatorDashboard";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Index = () => {
  const { user, profile, role, loading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("home");

  const handleLogout = async () => {
    await signOut();
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <LoginPage />
      </div>
    );
  }

  // User object for components
  const userObj = {
    name: profile?.full_name || user.email?.split("@")[0] || "User",
    email: user.email || "",
    role: role || "student",
  };

  const renderSection = () => {
    // Role-based routing for educator and admin
    if (role === "educator") {
      return <EducatorDashboard user={userObj} onLogout={handleLogout} />;
    }
    if (role === "admin") {
      return <AdminDashboard user={userObj} onLogout={handleLogout} />;
    }

    // Student routes
    switch (activeSection) {
      case "home":
        return <HomePage userName={userObj.name} />;
      case "learn":
        return <LearnPage />;
      case "social":
        return <SocialPage />;
      case "profile":
        return <ProfilePage user={userObj} onEditProfile={() => {}} onLogout={handleLogout} />;
      default:
        return <HomePage userName={userObj.name} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - visible only for students */}
      {role === "student" && (
        <Header
          activeSection={activeSection}
          onNavigate={handleNavigate}
          user={userObj}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content */}
      <main className={`${role === "student" ? "pt-0 md:pt-20 pb-20 md:pb-4" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Chatbot - visible only for students when logged in */}
      {role === "student" && <AIChatbot />}
    </div>
  );
};

export default Index;
