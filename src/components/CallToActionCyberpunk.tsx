import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToActionCyberpunk = () => {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-10 lg:px-20 overflow-hidden bg-background">
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-card border border-border rounded-3xl p-12 md:p-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-muted text-muted-foreground border border-border text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Join Thousands of Families
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="text-foreground">Ready to Transform</span>
            <br />
            Your Financial Life?
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Start tracking your wealth, managing budgets, and building your financial future today. 
            No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button size="lg" className="bg-primary text-primary-foreground text-xl py-8 px-12 rounded-xl group hover:bg-primary/90 transition-all duration-300">
                Get Started Free
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xl py-8 px-12 rounded-xl transition-all duration-300">
                Explore Features
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Free Forever Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Setup in Minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionCyberpunk;
