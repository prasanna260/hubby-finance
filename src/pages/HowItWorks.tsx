import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, Laptop, LockKeyhole, BarChart, Plus, Banknote, Home, MapPin, Currency, Car, Receipt, Calendar, CreditCard, Wallet, TrendingUp, DollarSign, PiggyBank, LayoutDashboard, Building, Shield, Target, Calculator } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const gettingStarted = [
    {
      number: 1,
      title: "Sign Up & Create Your Account",
      description: "Register with your email and set up your secure profile. Your data is protected with bank-level encryption.",
      icon: <Users className="h-10 w-10 text-emerald-600" />
    },
    {
      number: 2,
      title: "Navigate to Your Dashboard",
      description: "Access your personalized financial dashboard where all your tools and insights are centralized.",
      icon: <LayoutDashboard className="h-10 w-10 text-navy-700" />
    },
    {
      number: 3,
      title: "Input Your Financial Data",
      description: "Add your assets, investments, income, and expenses to get a complete picture of your finances.",
      icon: <Laptop className="h-10 w-10 text-gold-600" />
    },
    {
      number: 4,
      title: "Track & Optimize",
      description: "Monitor your progress, receive insights, and make informed decisions to achieve your financial goals.",
      icon: <BarChart className="h-10 w-10 text-emerald-600" />
    }
  ];

  const features = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard className="h-6 w-6" />,
      description: "Your financial command center",
      howItWorks: [
        {
          step: "Overview",
          details: "Get a bird's-eye view of your entire financial situation including net worth, investments, and recent transactions."
        },
        {
          step: "Quick Actions",
          details: "Access frequently used features and add new transactions directly from your dashboard."
        },
        {
          step: "Insights",
          details: "View AI-powered insights and recommendations based on your financial patterns."
        },
        {
          step: "Notifications",
          details: "Stay informed with alerts about bills, investment opportunities, and financial milestones."
        }
      ],
      benefits: ["Centralized view", "Real-time updates", "Actionable insights", "Custom widgets"]
    },
    {
      id: "investment",
      title: "Investment Tracker",
      icon: <BarChart3 className="h-6 w-6" />,
      description: "Monitor and manage your portfolio",
      howItWorks: [
        {
          step: "Add Holdings",
          details: "Input your stocks, bonds, ETFs, and mutual funds with purchase price and quantity."
        },
        {
          step: "Track Performance",
          details: "View real-time price updates, gains/losses, and portfolio allocation charts."
        },
        {
          step: "Analyze Trends",
          details: "See historical performance, compare against benchmarks, and identify patterns."
        },
        {
          step: "Rebalance",
          details: "Get recommendations for portfolio rebalancing based on your risk tolerance and goals."
        }
      ],
      benefits: ["Live market data", "Performance analytics", "Risk assessment", "Tax optimization"]
    },
    {
      id: "dividend",
      title: "Dividend Tracker",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "Maximize your passive income",
      howItWorks: [
        {
          step: "Add Dividend Stocks",
          details: "Enter your dividend-paying investments with shares owned and purchase dates."
        },
        {
          step: "Payment Calendar",
          details: "View upcoming dividend payments in an easy-to-read calendar format."
        },
        {
          step: "Income Projections",
          details: "See projected annual dividend income and growth trends."
        },
        {
          step: "DRIP Analysis",
          details: "Calculate the impact of dividend reinvestment on your long-term wealth."
        }
      ],
      benefits: ["Payment reminders", "Yield tracking", "Income forecasting", "Tax reporting"]
    },
    {
      id: "networth",
      title: "Net Worth Calculator",
      icon: <DollarSign className="h-6 w-6" />,
      description: "Track your wealth over time",
      howItWorks: [
        {
          step: "Add Assets",
          details: "Input all your assets including cash, investments, real estate, and personal property."
        },
        {
          step: "Add Liabilities",
          details: "Record your debts including mortgages, loans, and credit card balances."
        },
        {
          step: "View Net Worth",
          details: "See your total net worth calculated automatically with visual breakdowns."
        },
        {
          step: "Track Progress",
          details: "Monitor how your net worth changes over time with historical snapshots."
        }
      ],
      benefits: ["Asset tracking", "Debt management", "Progress visualization", "Goal setting"]
    },
    {
      id: "budget",
      title: "Budget Manager",
      icon: <PiggyBank className="h-6 w-6" />,
      description: "Control your spending and savings",
      howItWorks: [
        {
          step: "Set Up Categories",
          details: "Create budget categories for income, expenses, and savings goals."
        },
        {
          step: "Track Transactions",
          details: "Log daily expenses and income, or connect bank accounts for automatic tracking."
        },
        {
          step: "Monitor Spending",
          details: "See real-time spending against budget limits with visual indicators."
        },
        {
          step: "Adjust & Optimize",
          details: "Get suggestions for budget optimization and identify areas to cut costs."
        }
      ],
      benefits: ["Expense tracking", "Bill reminders", "Savings goals", "Spending insights"]
    },
    {
      id: "realestate",
      title: "Real Estate Portfolio",
      icon: <Building className="h-6 w-6" />,
      description: "Manage your property investments",
      howItWorks: [
        {
          step: "Add Properties",
          details: "Input property details including purchase price, current value, and mortgage information."
        },
        {
          step: "Track Income",
          details: "Record rental income, expenses, and calculate cash flow for each property."
        },
        {
          step: "Monitor Equity",
          details: "Track property appreciation and mortgage paydown to see growing equity."
        },
        {
          step: "Analyze ROI",
          details: "Calculate return on investment, cap rates, and other real estate metrics."
        }
      ],
      benefits: ["Property valuation", "Rental income tracking", "Expense management", "ROI analysis"]
    }
  ];

  const faqs = [
    {
      question: "Is my financial data secure?",
      answer: "Yes, we use bank-level 256-bit encryption and never store sensitive credentials. All data is encrypted both in transit and at rest."
    },
    {
      question: "Can I import data from my bank?",
      answer: "Currently, you can manually input your financial data. We're working on secure bank connections for automatic imports."
    },
    {
      question: "How often should I update my information?",
      answer: "We recommend updating your investment holdings weekly, tracking expenses daily, and reviewing your net worth monthly."
    },
    {
      question: "Can multiple family members use the same account?",
      answer: "Each user needs their own account for security, but we're developing family sharing features for collaborative planning."
    },
    {
      question: "Is there a mobile app?",
      answer: "Our web app is fully responsive and works great on mobile devices. Native apps are in development."
    },
    {
      question: "What's the cost?",
      answer: "We offer a free tier with essential features. Premium plans with advanced analytics and unlimited tracking are available."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero section */}
        <section className="bg-background py-16 md:py-24 px-6 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              How Mite Fi Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Your complete financial management platform explained. Learn how to leverage our powerful tools to take control of your financial future.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-accent">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Getting Started Steps */}
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Getting Started in 4 Simple Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gettingStarted.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="relative mb-6">
                    <div className="bg-card rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Deep Dive */}
        <section className="py-16 px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Master Each Feature
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Deep dive into each tool and learn how to maximize its potential for your financial success
            </p>
            
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-2 bg-muted">
                {features.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="flex flex-col gap-2 py-3 data-[state=active]:bg-card data-[state=active]:shadow-md"
                  >
                    {feature.icon}
                    <span className="text-xs">{feature.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {features.map((feature) => (
                <TabsContent key={feature.id} value={feature.id}>
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                          {feature.icon}
                        </div>
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-lg text-muted-foreground">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-foreground mb-4">How to Use It:</h4>
                          <div className="space-y-4">
                            {feature.howItWorks.map((step, index) => (
                              <div key={index} className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{step.step}</p>
                                  <p className="text-muted-foreground text-sm mt-1">{step.details}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-4">Key Benefits:</h4>
                          <div className="space-y-3">
                            {feature.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-muted-foreground">{benefit}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6">
                            <Link to={`/${feature.id === 'dashboard' ? 'dashboard' : feature.id === 'dividend' ? 'dividend-tracker' : feature.id === 'networth' ? 'net-worth' : feature.id === 'realestate' ? 'real-estate' : feature.id}`}>
                              <Button className="w-full bg-primary hover:bg-primary/90">
                                Go to {feature.title}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Video Tutorials Coming Soon
            </h2>
            <div className="bg-card border border-border rounded-lg shadow-xl p-8 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Learn with Interactive Video Guides
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're creating comprehensive video tutorials for each feature. These step-by-step guides will help you master every aspect of Mite Fi.
              </p>
            </div>
          </div>
        </section>

        {/* Tips & Best Practices */}
        <section className="py-16 px-6 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Pro Tips for Maximum Results
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <CardTitle>Update Regularly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Keep your data current by updating investments weekly and expenses daily for the most accurate insights.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <CardTitle>Set Clear Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Define specific financial goals in each tool to get personalized recommendations and track progress.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <CardTitle>Review Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Check your dashboard weekly to review AI insights and adjust your strategy based on recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-muted">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-card border border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of families who are already building wealth with Mite Fi
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/sign-up">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                Explore Dashboard
              </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;