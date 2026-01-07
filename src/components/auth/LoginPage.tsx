import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Eye, EyeOff, User, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoginPageProps {
  onLogin: (user: { name: string; email: string; role: string }) => void;
  onNavigate: (section: string) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string>("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (!formData.name || !formData.email || formData.password.length < 4) {
        setError("Please fill all fields (password min 4 chars)");
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        setError("Please enter email and password");
        return;
      }
    }

    // Simulate login/signup
    onLogin({
      name: formData.name || formData.email.split("@")[0],
      email: formData.email,
      role: role,
    });
    onNavigate("home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 pb-24 md:pb-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 items-stretch">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col justify-center p-8 rounded-2xl bg-gradient-to-br from-secondary to-accent"
        >
          <motion.div
            className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Welcome to StudentHub</h1>
          <p className="text-muted-foreground mb-6">
            Smart study tools, a friendly community, and gamified progress to keep you motivated. 
            Sign in to access chats, your dashboard, and personalized study plans.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center text-2xl shadow-card">
              🎓
            </div>
            <span className="text-sm text-muted-foreground">
              Secure, private, and designed for learners.
            </span>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 md:p-8">
              {/* Mobile Logo */}
              <motion.div
                className="md:hidden flex items-center justify-center gap-2 mb-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-gradient">StudentHub AI</span>
              </motion.div>

              <h2 className="text-xl font-bold mb-2">
                {isSignup ? "Create your account" : "Sign in to your account"}
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                {isSignup
                  ? "Join StudentHub to access community notes and study plans."
                  : "Enter your credentials to continue."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Student</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="educator">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>Educator</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isSignup && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full gradient-primary text-primary-foreground shadow-glow">
                  {isSignup ? "Create Account" : "Sign In"}
                </Button>

                <div className="flex items-center gap-2 my-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">Or continue with</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button">Google</Button>
                  <Button variant="outline" type="button">GitHub</Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  {isSignup ? "Already have an account? " : "Don't have an account? "}
                  <button
                    type="button"
                    className="text-primary font-semibold hover:underline"
                    onClick={() => setIsSignup(!isSignup)}
                  >
                    {isSignup ? "Sign in" : "Sign up"}
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
