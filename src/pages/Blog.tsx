import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, TrendingUp, DollarSign, PieChart, BookOpen } from "lucide-react";
import blogDividendImg from "@/assets/blog-dividend-investing.jpg";
import blogNetWorthImg from "@/assets/blog-net-worth.jpg";
import blogBudgetingImg from "@/assets/blog-budgeting.jpg";
import blogRealEstateImg from "@/assets/blog-real-estate.jpg";
import blogMarketImg from "@/assets/blog-market-analysis.jpg";
import blogCryptoImg from "@/assets/blog-cryptocurrency.jpg";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "10 Strategies to Build Passive Income Through Dividend Investing",
      excerpt: "Discover proven strategies to create a steady stream of passive income through dividend-paying stocks. Learn how to build a portfolio that works for you.",
      category: "Dividend Investing",
      author: "Sarah Mitchell",
      date: "2024-03-15",
      readTime: "8 min read",
      image: blogDividendImg,
      tags: ["Dividends", "Passive Income", "Investing"]
    },
    {
      id: 2,
      title: "Mastering Net Worth Tracking: A Complete Guide",
      excerpt: "Understanding your net worth is crucial for financial success. Learn how to accurately track, analyze, and grow your net worth over time.",
      category: "Financial Planning",
      author: "David Chen",
      date: "2024-03-12",
      readTime: "6 min read",
      image: blogNetWorthImg,
      tags: ["Net Worth", "Financial Planning", "Wealth Building"]
    },
    {
      id: 3,
      title: "Budget Planning 101: How to Create a Budget That Actually Works",
      excerpt: "Stop struggling with budgets that fail. Learn practical techniques to create and stick to a budget that aligns with your lifestyle and financial goals.",
      category: "Budgeting",
      author: "Emily Rodriguez",
      date: "2024-03-10",
      readTime: "7 min read",
      image: blogBudgetingImg,
      tags: ["Budgeting", "Money Management", "Savings"]
    },
    {
      id: 4,
      title: "Real Estate Investment Strategies for 2024",
      excerpt: "Navigate the changing real estate market with confidence. Expert insights on property investment, rental income, and portfolio diversification.",
      category: "Real Estate",
      author: "Michael Thompson",
      date: "2024-03-08",
      readTime: "10 min read",
      image: blogRealEstateImg,
      tags: ["Real Estate", "Investment", "Property"]
    },
    {
      id: 5,
      title: "Understanding Market Volatility: A Guide for Long-Term Investors",
      excerpt: "Market ups and downs can be stressful. Learn how to stay calm and make smart decisions during volatile times while keeping your long-term goals in focus.",
      category: "Market Analysis",
      author: "Jennifer Lee",
      date: "2024-03-05",
      readTime: "9 min read",
      image: blogMarketImg,
      tags: ["Stocks", "Market Analysis", "Investing"]
    },
    {
      id: 6,
      title: "Cryptocurrency in Your Investment Portfolio: Yes or No?",
      excerpt: "Explore the role of cryptocurrency in modern investment portfolios. Understand the risks, rewards, and how to integrate crypto wisely.",
      category: "Cryptocurrency",
      author: "Alex Kumar",
      date: "2024-03-03",
      readTime: "8 min read",
      image: blogCryptoImg,
      tags: ["Crypto", "Investment", "Portfolio"]
    }
  ];

  const categories = ["All", "Dividend Investing", "Financial Planning", "Budgeting", "Real Estate", "Market Analysis", "Cryptocurrency"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Dividend Investing":
        return <TrendingUp className="h-4 w-4" />;
      case "Financial Planning":
        return <PieChart className="h-4 w-4" />;
      case "Budgeting":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Financial Insights & Strategies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice, tips, and strategies to help you achieve financial freedom
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-navy-700 hover:bg-navy-800" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow animate-fade-in overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getCategoryIcon(post.category)}
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl hover:text-navy-700 transition-colors">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link to={`/blog/${post.id}`}>
                  <Button variant="outline" className="w-full">
                    Read Article
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Section */}
        <Card className="bg-gradient-to-r from-navy-700 to-navy-900 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Stay Updated</CardTitle>
            <CardDescription className="text-gray-200">
              Subscribe to our newsletter for weekly financial insights and tips
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link to="/newsletter">
              <Button variant="secondary" size="lg">
                Subscribe to Newsletter
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
