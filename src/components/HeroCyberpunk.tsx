import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Users, Zap } from "lucide-react";

const HeroCyberpunk = () => {
  return (
    <section className="relative min-h-screen py-20 md:py-28 lg:py-36 px-6 md:px-10 lg:px-20 overflow-hidden cyber-grid">
      {/* Cyberpunk Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/30 to-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-full blur-3xl animate-glow-pulse"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        
        {/* Scan line effect */}
        <div className="scan-lines absolute inset-0 opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary neon-border-purple animate-border-flow">
              <Zap className="w-4 h-4 mr-2 text-secondary" />
              Empowering Families to Build Wealth
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Take Control of Your</span>
              <br />
              <span className="gradient-text neon-text-purple">
                Financial Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              The all-in-one platform for modern families to track investments, manage budgets, 
              and build wealth together with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/sign-up">
                <Button className="cyber-gradient text-white text-lg py-7 px-10 rounded-xl glow-purple hover:glow-neon transition-all duration-300 transform hover:-translate-y-1 border border-primary/50">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="glass border-secondary/50 text-secondary hover:bg-secondary/10 text-lg py-7 px-10 rounded-xl transition-all duration-300 hover:glow-cyan neon-border-cyan">
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-muted-foreground">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-muted-foreground">Family Collaboration</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Main dashboard mockup with cyberpunk styling */}
            <div className="relative z-10 glass neon-border rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-500">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground neon-text-purple">Portfolio Overview</h3>
                  <div className="w-3 h-3 bg-secondary rounded-full animate-glow-pulse-cyan"></div>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass border border-primary/30 p-4 rounded-2xl hover:neon-border-purple transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-primary" />
                      <span className="text-xs font-medium text-success bg-success/20 px-2 py-1 rounded-full border border-success/30">+12.5%</span>
                    </div>
                    <h4 className="font-semibold text-muted-foreground">Total Value</h4>
                    <p className="text-2xl font-bold text-foreground neon-text-purple">$127,340</p>
                  </div>
                  
                  <div className="glass border border-secondary/30 p-4 rounded-2xl hover:neon-border-cyan transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-secondary/20 border border-secondary/30 rounded-lg flex items-center justify-center">
                        <span className="text-secondary font-bold text-sm">$</span>
                      </div>
                      <span className="text-xs font-medium text-secondary bg-secondary/20 px-2 py-1 rounded-full border border-secondary/30">Monthly</span>
                    </div>
                    <h4 className="font-semibold text-muted-foreground">Dividends</h4>
                    <p className="text-2xl font-bold text-foreground neon-text-cyan">$1,247</p>
                  </div>
                  
                  <div className="glass border border-primary/30 p-4 rounded-2xl hover:neon-border-purple transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 cyber-gradient rounded-lg flex items-center justify-center glow-purple">
                        <span className="text-white font-bold text-sm">₿</span>
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded-full border border-primary/30">Crypto</span>
                    </div>
                    <h4 className="font-semibold text-muted-foreground">Bitcoin</h4>
                    <p className="text-2xl font-bold text-foreground">0.847</p>
                  </div>
                  
                  <div className="glass border border-secondary/30 p-4 rounded-2xl hover:neon-border-cyan transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 cyber-gradient-cyan rounded-lg flex items-center justify-center glow-cyan">
                        <span className="text-white font-bold text-sm">🏠</span>
                      </div>
                      <span className="text-xs font-medium text-secondary bg-secondary/20 px-2 py-1 rounded-full border border-secondary/30">Property</span>
                    </div>
                    <h4 className="font-semibold text-muted-foreground">Real Estate</h4>
                    <p className="text-2xl font-bold text-foreground">$485K</p>
                  </div>
                </div>
                
                {/* Chart placeholder */}
                <div className="glass border border-primary/20 rounded-2xl p-6">
                  <div className="flex items-end justify-between h-20">
                    {[40, 65, 45, 80, 60, 95, 75].map((height, i) => (
                      <div 
                        key={i} 
                        className="cyber-gradient rounded-t-md transition-all duration-1000 hover:glow-neon animate-float" 
                        style={{
                          height: `${height}%`, 
                          width: '12%',
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating cards with cyberpunk glow */}
            <div className="absolute -top-6 -right-6 glass neon-border-purple rounded-2xl p-4 transform rotate-12 hover:rotate-6 transition-transform duration-300 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 cyber-gradient-cyan rounded-xl flex items-center justify-center glow-cyan">
                  <span className="text-white font-bold">↗</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">This Month</p>
                  <p className="text-lg font-bold text-foreground neon-text-cyan">+$2,340</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 glass neon-border-cyan rounded-2xl p-4 transform -rotate-12 hover:-rotate-6 transition-transform duration-300 animate-float" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 cyber-gradient rounded-xl flex items-center justify-center glow-purple">
                  <span className="text-white font-bold">👥</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Family Members</p>
                  <p className="text-lg font-bold text-foreground neon-text-purple">4 Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCyberpunk;
