import { TrendingUp, Bitcoin, Wallet, HomeIcon, Newspaper, Building, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  const features = [
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      title: "Smart Stock Tracking",
      description: "AI-powered insights with real-time data, personalized alerts, and portfolio optimization suggestions.",
      color: "from-blue-50 via-blue-100 to-indigo-100",
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-300"
    },
    {
      icon: <Bitcoin className="h-10 w-10 text-orange-500" />,
      title: "Crypto Intelligence",
      description: "Navigate the crypto market with confidence using advanced analytics and risk management tools.",
      color: "from-orange-50 via-orange-100 to-yellow-100",
      iconBg: "bg-gradient-to-br from-orange-100 to-orange-200",
      borderColor: "border-orange-200",
      hoverColor: "hover:border-orange-300"
    },
    {
      icon: <Wallet className="h-10 w-10 text-emerald-600" />,
      title: "Family Budget Hub",
      description: "Collaborative budgeting with smart categorization, spending insights, and goal tracking for the whole family.",
      color: "from-emerald-50 via-emerald-100 to-teal-100",
      iconBg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      borderColor: "border-emerald-200",
      hoverColor: "hover:border-emerald-300"
    },
    {
      icon: <HomeIcon className="h-10 w-10 text-purple-600" />,
      title: "Mortgage Optimizer",
      description: "Strategic debt management with payment scheduling, interest tracking, and payoff acceleration plans.",
      color: "from-purple-50 via-purple-100 to-pink-100",
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-300"
    },
    {
      icon: <Building className="h-10 w-10 text-indigo-600" />,
      title: "Property Portfolio",
      description: "Comprehensive real estate management with market analysis, rental tracking, and ROI calculations.",
      color: "from-indigo-50 via-indigo-100 to-blue-100",
      iconBg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
      borderColor: "border-indigo-200",
      hoverColor: "hover:border-indigo-300"
    },
    {
      icon: <Newspaper className="h-10 w-10 text-teal-600" />,
      title: "Market Intelligence",
      description: "Curated financial news with AI-powered summaries and personalized impact analysis for your portfolio.",
      color: "from-teal-50 via-teal-100 to-cyan-100",
      iconBg: "bg-gradient-to-br from-teal-100 to-teal-200",
      borderColor: "border-teal-200",
      hoverColor: "hover:border-teal-300"
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-gradient-to-b from-white to-gray-50" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Financial Tools
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900">Everything Your Family Needs</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              In One Platform
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Powerful, intuitive tools designed to help your family make smarter financial decisions 
            and build lasting wealth together.
          </p>
          
          <Link to="/features" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors duration-200">
            Explore All Features
            <TrendingUp className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-gradient-to-br ${feature.color} rounded-3xl p-8 border-2 ${feature.borderColor} ${feature.hoverColor} transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2`}
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 transition-transform duration-300 group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className={`${feature.iconBg} p-4 rounded-2xl w-fit mb-6 border border-white/50 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-600 transition-colors duration-200">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Financial Future?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of families building wealth with confidence.
            </p>
            <Link to="/sign-up">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg py-6 px-10 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
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
