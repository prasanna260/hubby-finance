
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Bitcoin, Wallet, HomeIcon, Newspaper, Users, ChartBar, Shield, Bell, Building, MapPin, Receipt } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const featuresCategories = [
    {
      title: "Investment Tracking",
      description: "Monitor and manage all your family's investments in one place",
      features: [
        {
          icon: <TrendingUp className="h-8 w-8 text-navy-700" />,
          title: "Real-time Stock Tracking",
          description: "Track stock performance with live market data, custom alerts, and personalized watchlists for your entire portfolio."
        },
        {
          icon: <Bitcoin className="h-8 w-8 text-gold-600" />,
          title: "Crypto Portfolio Management",
          description: "Monitor cryptocurrency investments across multiple wallets with real-time price updates and performance analytics."
        },
        {
          icon: <ChartBar className="h-8 w-8 text-emerald-700" />,
          title: "Performance Analytics",
          description: "Visualize investment performance over time with interactive charts and comprehensive reporting tools."
        }
      ]
    },
    {
      title: "Family Financial Management",
      description: "Collaborate with family members for better financial planning",
      features: [
        {
          icon: <Wallet className="h-8 w-8 text-emerald-700" />,
          title: "Collaborative Budgeting",
          description: "Create and manage shared budgets that everyone in the family can view and contribute to for better financial alignment."
        },
        {
          icon: <Users className="h-8 w-8 text-navy-700" />,
          title: "Multi-user Access",
          description: "Assign different permission levels to family members to maintain privacy while enabling collaboration."
        },
        {
          icon: <HomeIcon className="h-8 w-8 text-gray-700" />,
          title: "Mortgage & Debt Tracking",
          description: "Monitor mortgage payments, track loan balances, and view your projected path to becoming debt-free."
        }
      ]
    },
    {
      title: "Real Estate Portfolio",
      description: "Manage and optimize your property investments",
      features: [
        {
          icon: <Building className="h-8 w-8 text-blue-700" />,
          title: "Property Management",
          description: "Track property values, maintenance costs, and overall portfolio performance with detailed analytics and projections."
        },
        {
          icon: <MapPin className="h-8 w-8 text-gold-600" />,
          title: "Location Analysis",
          description: "Analyze neighborhood trends, property value forecasts, and investment opportunities in your target markets."
        },
        {
          icon: <Receipt className="h-8 w-8 text-emerald-700" />,
          title: "Rental Income Tracking",
          description: "Monitor rental income, expenses, and occupancy rates across all your properties with automated reporting tools."
        }
      ]
    },
    {
      title: "Financial Intelligence",
      description: "Stay informed with customized financial insights",
      features: [
        {
          icon: <Newspaper className="h-8 w-8 text-blue-700" />,
          title: "Curated Financial News",
          description: "Get personalized news feeds that focus on market events relevant to your specific investment portfolio."
        },
        {
          icon: <Bell className="h-8 w-8 text-gold-600" />,
          title: "Custom Alerts & Notifications",
          description: "Set up personalized alerts for price changes, important financial dates, budget limits, and more."
        },
        {
          icon: <Shield className="h-8 w-8 text-navy-700" />,
          title: "Security Monitoring",
          description: "Receive alerts about unusual activity, market volatility, or changes that could impact your financial security."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <main>
        {/* Hero section */}
        <section className="bg-gradient-to-br from-navy-50 via-white to-emerald-50 py-16 md:py-24 px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
              Powerful Features for Your Family's Financial Success
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Discover the comprehensive suite of tools designed to help your family build wealth, 
              track investments, and achieve your financial goals together.
            </p>
          </div>
        </section>

        {/* Features categories section */}
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            {featuresCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-24">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                    {category.title}
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.features.map((feature, featureIndex) => (
                    <Card key={featureIndex} className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="mb-4">{feature.icon}</div>
                        <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Join thousands of families who are transforming their financial future with Family Financial Hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default Features;
