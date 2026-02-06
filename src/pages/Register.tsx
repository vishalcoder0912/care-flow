import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Stethoscope, Heart, Users, Phone, FlaskConical, Pill, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppRole } from "@/types/roles";
import { ROLE_CONFIGS } from "@/types/roles";

const ROLE_ICONS: Record<AppRole, React.ElementType> = {
  admin: Shield, doctor: Stethoscope, nurse: Heart, patient: Users,
  receptionist: Phone, lab_tech: FlaskConical, pharmacist: Pill, accountant: Calculator,
};

const roleEntries = Object.entries(ROLE_CONFIGS) as [AppRole, typeof ROLE_CONFIGS[AppRole]][];

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<AppRole>("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-destructive", "bg-warning", "bg-warning", "bg-primary/70", "bg-primary"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) { setError("Passwords do not match"); setLoading(false); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters long"); setLoading(false); return; }

    const { error: signUpError } = await signUp(email, password, fullName, selectedRole);
    if (signUpError) { setError(signUpError.message); setLoading(false); }
    else setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription className="text-base">
              We've sent a verification link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Click the link in your email to verify your account and complete the registration process.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full h-12" onClick={() => navigate("/login")}>
              Back to Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">MediCare</h1>
              <p className="text-white/80 text-sm font-medium">Hospital Pro</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">Join Our Healthcare Community</h2>
            <p className="text-white/80 text-lg max-w-md">8 specialized roles with unique dashboards tailored to your needs.</p>
          </div>
          <div className="space-y-3">
            {["Complete patient records management", "Real-time appointment scheduling", "Doctor attendance tracking", "8 role-based dashboards"].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-white/80" />
                <p className="text-white/90">{feature}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-white/60 text-sm">© 2025 MediCare Hospital Pro. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MediCare</h1>
              <p className="text-muted-foreground text-xs">Hospital Pro</p>
            </div>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription className="text-base">Select your role and fill in your details</CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-lg border border-destructive/20">{error}</div>
                )}

                {/* 8 Role Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select Your Role</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {roleEntries.map(([value, config]) => {
                      const Icon = ROLE_ICONS[value];
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setSelectedRole(value)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all",
                            selectedRole === value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          )}
                        >
                          <Icon className={cn("h-5 w-5", selectedRole === value ? "text-primary" : "text-muted-foreground")} />
                          <p className={cn("font-semibold text-[11px] text-center leading-tight", selectedRole === value ? "text-primary" : "text-foreground")}>
                            {config.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="fullName" type="text" placeholder="Dr. John Smith" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10 h-12" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="name@hospital.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 h-12" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {password && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= passwordStrength ? strengthColors[passwordStrength - 1] : "bg-muted")} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength: <span className="font-medium">{strengthLabels[passwordStrength - 1] || "Very Weak"}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={cn("pl-10 h-12", confirmPassword && password !== confirmPassword && "border-destructive")}
                      required
                    />
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-destructive">Passwords do not match</p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-2">
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading || (confirmPassword !== "" && password !== confirmPassword)}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Create Account
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-semibold">Sign in</Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
