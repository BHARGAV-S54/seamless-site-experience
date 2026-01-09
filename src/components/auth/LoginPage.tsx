import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Eye, EyeOff, User, BookOpen, Shield, Loader2 } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string>("student");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        const validation = signUpSchema.safeParse(formData);
        if (!validation.success) {
          setError(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
          role
        );

        if (error) {
          if (error.message.includes("already registered")) {
            setError("This email is already registered. Please sign in instead.");
          } else {
            setError(error.message);
          }
        }
      } else {
        const validation = signInSchema.safeParse(formData);
        if (!validation.success) {
          setError(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("Invalid email or password. Please try again.");
          } else {
            setError(error.message);
          }
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold mb-4">Welcome to EduNest</h1>
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
                <span className="text-xl font-bold text-gradient">EduNest</span>
              </motion.div>

              <h2 className="text-xl font-bold mb-2">
                {isSignup ? "Create your account" : "Sign in to your account"}
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                {isSignup
                  ? "Join EduNest to access community notes and study plans."
                  : "Enter your credentials to continue."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection - Only for signup */}
                {isSignup && (
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
                )}

                {isSignup && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={loading}
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
                    disabled={loading}
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
                      disabled={loading}
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

                <Button 
                  type="submit" 
                  className="w-full gradient-primary text-primary-foreground shadow-glow"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isSignup ? "Creating Account..." : "Signing In..."}
                    </>
                  ) : (
                    isSignup ? "Create Account" : "Sign In"
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {isSignup ? "Already have an account? " : "Don't have an account? "}
                  <button
                    type="button"
                    className="text-primary font-semibold hover:underline"
                    onClick={() => {
                      setIsSignup(!isSignup);
                      setError("");
                    }}
                    disabled={loading}
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
