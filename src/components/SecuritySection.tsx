
import { Button } from "@/components/ui/button";
import { Shield, Users, Lock, CheckCircle, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const SecuritySection = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise-Grade Security
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span>Security & Privacy</span>
              <br />
              <span>Your Family Can Trust</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Your family's financial data deserves the highest level of protection. We've built 
              our platform with security and privacy as the foundation, not an afterthought.
            </p>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 text-primary p-3 rounded-xl flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">SOC 2 Compliant</h4>
                  <p className="text-muted-foreground text-sm">Independently audited security controls</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 text-primary p-3 rounded-xl flex-shrink-0">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">99.9% Uptime</h4>
                  <p className="text-muted-foreground text-sm">Reliable access when you need it</p>
                </div>
              </div>
            </div>
            
            <Link to="/security">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 px-8 rounded-xl shadow-lg transition-all duration-300">
                Learn About Our Security
              </Button>
            </Link>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative bg-card rounded-3xl shadow-2xl border border-border p-8">
              <div className="space-y-6">
                {/* Security features */}
                <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl border border-border">
                  <div className="bg-primary/20 text-primary p-3 rounded-xl">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">256-Bit Encryption</h3>
                    <p className="text-muted-foreground">Military-grade data protection</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl border border-border">
                  <div className="bg-primary/20 text-primary p-3 rounded-xl">
                    <Users className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Role-Based Access</h3>
                    <p className="text-muted-foreground">Control who sees what information</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl border border-border">
                  <div className="bg-primary/20 text-primary p-3 rounded-xl">
                    <Lock className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Zero-Knowledge</h3>
                    <p className="text-muted-foreground">We can't see your sensitive data</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Security metrics */}
                <div className="bg-muted rounded-2xl p-6 border border-border">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">100%</div>
                      <div className="text-sm text-muted-foreground">Encrypted</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">24/7</div>
                      <div className="text-sm text-muted-foreground">Monitoring</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">0</div>
                      <div className="text-sm text-muted-foreground">Breaches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating security badges */}
            <div className="absolute -top-6 -right-6 bg-card rounded-2xl shadow-xl border border-border p-4 transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-semibold text-foreground">SOC 2</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl border border-border p-4 transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-semibold text-foreground">GDPR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
