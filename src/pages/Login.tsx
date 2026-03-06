/**
 * Login Page — Voter authentication interface
 * 
 * Features:
 * - Voter ID & Password form with validation
 * - Web3-styled dark theme card
 * - Redirects to /vote on successful login
 * - Back to Home navigation
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, ArrowLeft, User, Lock, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ voterId?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  /** Validate form fields before submission */
  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!voterId.trim()) {
      newErrors.voterId = "Voter ID is required";
    } else if (voterId.trim().length < 3) {
      newErrors.voterId = "Voter ID must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Handle login — currently simulated, ready for backend integration */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    // Navigate to voting page on success
    navigate("/vote");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background effects — matching Web3 hero aesthetic */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(var(--primary) / 0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 60%, hsl(var(--secondary) / 0.05) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 web3-grid-bg opacity-20" />

      {/* Glow orbs */}
      <div className="animate-subtle-pulse absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-primary/15" />
      <div
        className="animate-subtle-pulse absolute -bottom-16 right-1/4 h-60 w-60 rounded-full bg-secondary/15"
        style={{ animationDelay: "2s" }}
      />

      {/* Login Card */}
      <Card className="animate-fade-in-up relative z-10 w-full max-w-md border-border/50 bg-card/80 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="font-display text-2xl">Voter Login</CardTitle>
          <CardDescription>Enter your credentials to access the voting portal</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-5">
            {/* Voter ID field */}
            <div className="space-y-2">
              <Label htmlFor="voterId" className="text-foreground">
                Voter ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="voterId"
                  placeholder="Enter your Voter ID"
                  value={voterId}
                  onChange={(e) => {
                    setVoterId(e.target.value);
                    if (errors.voterId) setErrors((prev) => ({ ...prev, voterId: undefined }));
                  }}
                  className="pl-10"
                />
              </div>
              {errors.voterId && (
                <p className="text-xs text-destructive">{errors.voterId}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {/* Login button */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Logging in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </span>
              )}
            </Button>

            {/* Back to Home */}
            <Button variant="ghost" className="w-full text-muted-foreground" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
