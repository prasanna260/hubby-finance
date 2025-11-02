import { TrendingUp, Bitcoin, Wallet, HomeIcon, Newspaper, Building, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  const features = [
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Smart Stock Tracking",
      description: "AI-powered insights with real-time data, personalized alerts, and portfolio optimization suggestions.",
      color: "",
      iconBg: "",
      borderColor: "",
      hoverColor: ""
    },
    {
      icon: <Bitcoin className="h-10 w-10" />,
      title: "Crypto Intelligence",
      description: "Navigate the crypto market with confidence using advanced analytics and risk management tools.",
      color: "",
      iconBg: "",
      borderColor: "",
      hoverColor: ""
    },
    {
      icon: <Wallet className="h-10 w-10" />,
      title: "Family Budget Hub",
      description: "Collaborative budgeting with smart categorization, spending insights, and goal tracking for the whole family.",
      color: "",
      iconBg: "",
      borderColor: "",
      hoverColor: ""
    },
    {
      icon: <HomeIcon className="h-10 w-10" />,
      title: "Mortgage Optimizer",
      description: "Strategic debt management with payment scheduling, interest tracking, and payoff acceleration plans.",
      color: "",
      iconBg: "",
      borderColor: "",
      hoverColor: ""
    },
    {
      icon: <Building className="h-10 w-10" />,
      title: "Property Portfolio",
      description: "Comprehensive real estate management with market analysis, rental tracking, and ROI calculations.",
      color: "",
      iconBg: "",
      borderColor: "",
      hoverColor: ""
    },
    {
      icon: <Newspaper className="h-10 w-10" />,
      title: "Market Intelligence",
      description: "Curated financial news with AI-powered summaries and personalized impact analysis for your portfolio.",
      color: "",
      iconBg: "",
      borderColor: "",
      hoverColor: ""
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-background" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted text-muted-foreground border border-border text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Financial Tools
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            <span>Everything Your Family Needs</span>
            <br />
            <span>In One Platform</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Powerful, intuitive tools designed to help your family make smarter financial decisions 
            and build lasting wealth together.
          </p>
          
          <Link to="/features" className="inline-flex items-center gap-2 text-primary hover:text-primary/90 font-semibold text-lg transition-colors duration-200">
            Explore All Features
            <TrendingUp className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-card rounded-3xl p-8 border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="relative z-10">
                <div className={`p-4 rounded-2xl w-fit mb-6 bg-primary/20 text-primary border border-border shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-lg transition-colors duration-200">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-3xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Transform Your Financial Future?
            </h3>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of families building wealth with confidence.
            </p>
            <Link to="/sign-up">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 px-10 rounded-xl font-semibold transition-all duration-300">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
