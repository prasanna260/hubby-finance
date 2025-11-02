import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToActionCyberpunk = () => {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-glow-pulse"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="glass neon-border rounded-3xl p-12 md:p-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-primary/30 text-sm font-medium mb-8 neon-border-purple">
            <Sparkles className="w-4 h-4 mr-2 text-primary animate-glow-pulse" />
            Join Thousands of Families
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="gradient-text">Ready to Transform</span>
            <br />
            Your Financial Life?
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Start tracking your wealth, managing budgets, and building your financial future today. 
            No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button size="lg" className="cyber-gradient text-white text-xl py-8 px-12 rounded-xl group glow-purple hover:glow-neon transition-all duration-300 transform hover:-translate-y-1">
                Get Started Free
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="glass border-secondary/50 text-secondary hover:bg-secondary/10 text-xl py-8 px-12 rounded-xl neon-border-cyan hover:glow-cyan transition-all duration-300">
                Explore Features
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse"></div>
              <span className="text-sm text-muted-foreground">Free Forever Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse"></div>
              <span className="text-sm text-muted-foreground">No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse"></div>
              <span className="text-sm text-muted-foreground">Setup in Minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionCyberpunk;
