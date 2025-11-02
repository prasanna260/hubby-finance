
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HeroCyberpunk from "@/components/HeroCyberpunk";
import StockNews from "@/components/StockNews";
import CryptoNews from "@/components/CryptoNews";
import FeatureSection from "@/components/FeatureSection";
import SecuritySectionCyberpunk from "@/components/SecuritySectionCyberpunk";
import CallToActionCyberpunk from "@/components/CallToActionCyberpunk";
import Footer from "@/components/Footer";
import UserProfileUpdate from "@/components/UserProfileUpdate";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, HelpCircle, TrendingUp, Bitcoin, BarChart3 } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="neon-text-purple text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-6">
        <UserProfileUpdate />
      </div>
      <main>
        <HeroCyberpunk />
        
        {/* Features Grid - Cyberpunk Style */}
        <section className="py-16 px-6 bg-background cyber-grid">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 gradient-text">
                Everything You Need in One Place
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful tools to manage your finances, investments, and wealth-building journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Stock Market News", icon: TrendingUp, color: "purple", description: "Real-time market updates and analysis" },
                { title: "Crypto Tracking", icon: Bitcoin, color: "cyan", description: "Monitor cryptocurrency investments" },
                { title: "Portfolio Management", icon: BarChart3, color: "purple", description: "Track and optimize your investments" },
              ].map((feature, idx) => (
                <div key={idx} className="glass neon-border group hover:glow-neon transition-all duration-300 overflow-hidden">
                  <div className={`h-32 ${
                    feature.color === 'purple' ? 'cyber-gradient' :
                    'cyber-gradient-cyan'
                  } flex items-center justify-center relative`}>
                    <feature.icon className="w-16 h-16 text-white relative z-10" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scan-lines"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 neon-text-purple">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <StockNews />
        <CryptoNews />
        <FeatureSection />
        <SecuritySectionCyberpunk />
        <CallToActionCyberpunk />
        
        {/* Blog Section - Cyberpunk Style */}
        <section className="py-16 px-6 bg-background relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-primary/30 text-sm font-medium mb-6 neon-border-purple">
              <BookOpen className="w-4 h-4 mr-2 text-primary" />
              Financial Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 gradient-text">
              Learn, Grow, and Succeed
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore expert articles, tips, and strategies to help you master your finances and achieve your financial goals.
            </p>
            <Link to="/blog">
              <Button size="lg" className="cyber-gradient text-white text-lg px-8 py-6 rounded-xl group glow-purple hover:glow-neon transition-all duration-300">
                Visit Our Blog
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4 mr-2 text-primary" />
              Resources
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Started with Confidence
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn how our platform works and discover all the features that will help you take control of your finances.
            </p>
            <Link to="/how-it-works">
              <Button size="lg" className="btn-material-primary text-lg px-8 py-6 rounded-xl group">
                How It Works
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
