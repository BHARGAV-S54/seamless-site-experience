import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { LoginPage } from "@/components/auth/LoginPage";
import { HomePage } from "@/components/home/HomePage";
import { LearnPage } from "@/components/learn/LearnPage";
import { SocialPage } from "@/components/social/SocialPage";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { AIChatbot } from "@/components/chat/AIChatbot";

interface User {
  name: string;
  email: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("login");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("sh_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setActiveSection("home");
      } catch {
        localStorage.removeItem("sh_user");
      }
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("sh_user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("sh_user");
    setActiveSection("login");
  };

  const handleNavigate = (section: string) => {
    // Protected routes check
    const protectedSections = ["home", "learn", "social", "profile"];
    if (protectedSections.includes(section) && !user) {
      setActiveSection("login");
      return;
    }
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "login":
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case "home":
        return <HomePage userName={user?.name} />;
      case "learn":
        return <LearnPage />;
      case "social":
        return <SocialPage />;
      case "profile":
        return <ProfilePage user={user} onEditProfile={() => {}} />;
      default:
        return <HomePage userName={user?.name} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - always visible except on login for mobile */}
      {(activeSection !== "login" || user) && (
        <Header
          activeSection={activeSection}
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content */}
      <main className={`${activeSection !== "login" ? "pt-0 md:pt-20 pb-20 md:pb-4" : ""}`}>
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

      {/* AI Chatbot - visible when logged in */}
      {user && activeSection !== "login" && <AIChatbot />}
    </div>
  );
};

export default Index;
