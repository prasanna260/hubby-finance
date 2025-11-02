
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Users, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 px-6 md:px-10 lg:px-20 bg-background overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Empowering Families to Build Wealth
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              <span>Take Control of Your</span>
              <br />
              <span>Financial Future</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              The all-in-one platform for modern families to track investments, manage budgets, 
              and build wealth together with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/sign-up">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-7 px-10 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="border border-input bg-background text-foreground hover:bg-accent text-lg py-7 px-10 rounded-xl transition-all duration-300 shadow-sm">
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Family Collaboration</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Main dashboard mockup */}
            <div className="relative z-10 bg-card border border-border rounded-2xl shadow-2xl p-8 transform hover:-translate-y-2 transition-all duration-500">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Portfolio Overview</h3>
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-primary" />
                      <span className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <h4 className="font-semibold text-muted-foreground">Total Value</h4>
                    <p className="text-2xl font-bold text-foreground">$127,340</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                        <span className="font-bold text-sm">$</span>
                      </div>
                      <span className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded-full">Monthly</span>
                    </div>
                    <h4 className="font-semibold text-muted-foreground">Dividends</h4>
                    <p className="text-2xl font-bold text-foreground">$1,247</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                        <span className="font-bold text-sm">₿</span>
                      </div>
                      <span className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded-full">Crypto</span>
                    </div>
                    <h4 className="font-semibold text-muted-foreground">Bitcoin</h4>
                    <p className="text-2xl font-bold text-foreground">0.847</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                        <span className="font-bold text-sm">🏠</span>
                      </div>
                      <span className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded-full">Property</span>
                    </div>
                    <h4 className="font-semibold text-muted-foreground">Real Estate</h4>
                    <p className="text-2xl font-bold text-foreground">$485K</p>
                  </div>
                </div>
                
                {/* Chart placeholder */}
                <div className="bg-muted rounded-2xl p-6 border border-border">
                  <div className="flex items-end justify-between h-20">
                    {[40, 65, 45, 80, 60, 95, 75].map((height, i) => (
                      <div 
                        key={i} 
                        className="bg-primary rounded-t-md transition-all duration-1000" 
                        style={{height: `${height}%`, width: '12%'}}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -right-6 bg-card rounded-2xl shadow-xl border border-border p-4 transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                  <span className="font-bold">↗</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">This Month</p>
                  <p className="text-lg font-bold text-foreground">+$2,340</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl border border-border p-4 transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                  <span className="font-bold">👥</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Family Members</p>
                  <p className="text-lg font-bold text-foreground">4 Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
