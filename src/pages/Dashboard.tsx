import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Wallet, Key, Building2, Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const { user, session, signOut } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckBalance = async () => {
    setBalanceLoading(true);
    setBalance(null);

    const { data, error } = await supabase
      .from("profiles")
      .select("balance")
      .eq("user_id", user?.id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch balance. " + error.message,
        variant: "destructive",
      });
    } else {
      setBalance(data.balance);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#60a5fa", "#93c5fd"],
      });
    }
    setBalanceLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Logged Out", description: "See you soon!" });
    navigate("/login");
  };

  const username = user?.user_metadata?.username || user?.email?.split("@")[0] || "User";

  return (
    <div className="dark min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-border/30 backdrop-blur-md bg-card/30">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">KodBank</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {username}
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {username}!</h1>
          <p className="text-muted-foreground mb-8 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Your session is securely authenticated
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Check Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-8 hover:glow-primary transition-shadow duration-300"
          >
            <div className="mb-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
                <Wallet className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Account Balance</h2>
              <p className="mt-1 text-sm text-muted-foreground">Securely check your current balance</p>
            </div>

            <AnimatePresence mode="wait">
              {balanceLoading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-8">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </motion.div>
              ) : balance !== null ? (
                <motion.div
                  key="balance"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 rounded-xl bg-primary/10 border border-primary/20 p-6 text-center"
                >
                  <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                  <p className="text-4xl font-bold text-primary">
                    ₹{Number(balance).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Role: Customer</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <Button onClick={handleCheckBalance} className="w-full h-12 text-base font-semibold" disabled={balanceLoading}>
              <Wallet className="mr-2 h-5 w-5" />
              {balance !== null ? "Refresh Balance" : "Check Balance"}
            </Button>
          </motion.div>

          {/* JWT Token Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 hover:glow-primary transition-shadow duration-300"
          >
            <div className="mb-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20">
                <Key className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">JWT Token</h2>
              <p className="mt-1 text-sm text-muted-foreground">View your current session token</p>
            </div>

            <div className="mb-6 rounded-xl bg-secondary/50 border border-border/50 p-4">
              <p className="text-xs text-muted-foreground mb-2">Token Preview</p>
              <p className="font-mono text-xs text-foreground/70 break-all line-clamp-3">
                {session?.access_token ? session.access_token.substring(0, 80) + "..." : "No active session"}
              </p>
            </div>

            <Button onClick={() => setShowToken(true)} variant="outline" className="w-full h-12 text-base font-semibold border-primary/30 text-foreground hover:bg-primary/10">
              <Key className="mr-2 h-5 w-5" /> View Full Token
            </Button>
          </motion.div>
        </div>
      </main>

      {/* JWT Token Modal */}
      <Dialog open={showToken} onOpenChange={setShowToken}>
        <DialogContent className="dark glass-card border-border/50 max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Key className="h-5 w-5 text-primary" /> JWT Access Token
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This is your current session token. Keep it secure.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl bg-secondary/50 border border-border/50 p-4 max-h-60 overflow-y-auto">
            <code className="font-mono text-xs text-foreground/80 break-all whitespace-pre-wrap">
              {session?.access_token || "No token available"}
            </code>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/10"
              onClick={() => {
                navigator.clipboard.writeText(session?.access_token || "");
                toast({ title: "Copied!", description: "Token copied to clipboard." });
              }}
            >
              Copy Token
            </Button>
            <div className="text-xs text-muted-foreground flex items-center">
              Expires: {session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : "N/A"}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
