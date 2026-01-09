import { GraduationCap, Home, BookOpen, MessageCircle, User, LogIn, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "social", label: "Social", icon: MessageCircle },
  { id: "profile", label: "Dashboard", icon: User },
];

export function Header({ activeSection, onNavigate, user, onLogout }: HeaderProps) {
  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate("home")}
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">EduNest</span>
          </motion.div>

          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className={`gap-2 ${
                    activeSection === item.id
                      ? "bg-secondary text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </li>
            ))}

            {!user && (
              <li>
                <Button
                  onClick={() => onNavigate("login")}
                  className="gradient-primary text-primary-foreground shadow-glow ml-2"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-area-pb">
        <ul className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                className={`flex flex-col items-center gap-1 p-2 rounded-xl min-w-[60px] ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => onNavigate(item.id)}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon
                  className={`w-6 h-6 ${activeSection === item.id ? "fill-primary/20" : ""}`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            </li>
          ))}
          {!user && (
            <li>
              <motion.button
                className={`flex flex-col items-center gap-1 p-2 ${
                  activeSection === "login" ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => onNavigate("login")}
                whileTap={{ scale: 0.9 }}
              >
                <LogIn className="w-6 h-6" />
                <span className="text-xs font-medium">Login</span>
              </motion.button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
