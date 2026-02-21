import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Building2, Shield, Wallet, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="dark min-h-screen gradient-bg flex flex-col items-center justify-center p-6 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 glow-primary">
          <Building2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-foreground mb-4">KodBank</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
          Your secure digital banking experience. Check balances, manage your account, all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
            <Link to="/login">
              Sign In <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base font-semibold border-primary/30 text-foreground hover:bg-primary/10">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 max-w-lg mx-auto">
          <div className="glass-card rounded-xl p-5 text-left">
            <Shield className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-semibold text-foreground text-sm">Secure Auth</h3>
            <p className="text-xs text-muted-foreground mt-1">JWT-based authentication with token verification</p>
          </div>
          <div className="glass-card rounded-xl p-5 text-left">
            <Wallet className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-semibold text-foreground text-sm">Balance Check</h3>
            <p className="text-xs text-muted-foreground mt-1">Real-time balance retrieval with RLS protection</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
