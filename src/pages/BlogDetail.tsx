import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, TrendingUp, DollarSign, PieChart, BookOpen } from "lucide-react";
import blogDividendImg from "@/assets/blog-dividend-investing.jpg";
import blogNetWorthImg from "@/assets/blog-net-worth.jpg";
import blogBudgetingImg from "@/assets/blog-budgeting.jpg";
import blogRealEstateImg from "@/assets/blog-real-estate.jpg";
import blogMarketImg from "@/assets/blog-market-analysis.jpg";
import blogCryptoImg from "@/assets/blog-cryptocurrency.jpg";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const generateBlogContent = (id: number): BlogPost | null => {
  const posts: Record<number, BlogPost> = {
    1: {
      id: 1,
      title: "10 Strategies to Build Passive Income Through Dividend Investing",
      content: `
# Building Passive Income Through Dividend Investing

Dividend investing is one of the most reliable ways to build passive income over time. By carefully selecting dividend-paying stocks, you can create a steady stream of income while also benefiting from potential capital appreciation.

## 1. Start with Dividend Aristocrats

Dividend Aristocrats are companies that have increased their dividends for at least 25 consecutive years. These companies have proven business models and strong financials, making them excellent choices for long-term investors.

## 2. Diversify Across Sectors

Don't put all your eggs in one basket. Spread your investments across different sectors like utilities, consumer staples, healthcare, and real estate investment trusts (REITs) to minimize risk.

## 3. Focus on Dividend Yield and Growth

Look for stocks that offer both a healthy dividend yield (typically 3-6%) and a history of dividend growth. This combination provides current income and protection against inflation.

## 4. Reinvest Your Dividends

Use a dividend reinvestment plan (DRIP) to automatically reinvest your dividends. This compound growth can significantly accelerate your wealth building over time.

## 5. Monitor Payout Ratios

A company's payout ratio (dividends paid divided by earnings) should typically be below 70%. This ensures the company can sustain and grow its dividend payments.

## 6. Consider International Dividend Stocks

Don't limit yourself to domestic stocks. Many international companies offer attractive dividend yields and can provide geographic diversification.

## 7. Use Tax-Advantaged Accounts

Maximize your after-tax returns by holding dividend stocks in tax-advantaged accounts like IRAs or 401(k)s when possible.

## 8. Be Patient and Think Long-Term

Building a substantial dividend income stream takes time. Stay committed to your strategy and avoid making emotional decisions based on short-term market fluctuations.

## 9. Regular Portfolio Review

Review your portfolio quarterly to ensure your holdings still meet your criteria and make adjustments as needed.

## 10. Start Early and Stay Consistent

The power of compound growth means that starting early, even with small amounts, can lead to significant wealth over time. Make consistent contributions to your dividend portfolio.

## Conclusion

Building passive income through dividend investing requires patience, research, and discipline. By following these strategies and staying committed to your investment plan, you can create a reliable income stream that grows over time and helps you achieve financial independence.
      `,
      category: "Dividend Investing",
      author: "Sarah Mitchell",
      date: "2024-03-15",
      readTime: "8 min read",
      image: blogDividendImg,
      tags: ["Dividends", "Passive Income", "Investing"]
    },
    2: {
      id: 2,
      title: "Mastering Net Worth Tracking: A Complete Guide",
      content: `
# Mastering Net Worth Tracking

Understanding and tracking your net worth is fundamental to building wealth. Your net worth is the clearest indicator of your financial health and progress toward your goals.

## What is Net Worth?

Net worth is simply the difference between what you own (assets) and what you owe (liabilities). It's the true measure of your financial position.

## Why Track Your Net Worth?

Tracking your net worth helps you:
- Visualize your financial progress over time
- Make better financial decisions
- Stay motivated on your wealth-building journey
- Identify areas for improvement

## Assets to Include

### Liquid Assets
- Cash in checking and savings accounts
- Money market accounts
- Certificates of deposit

### Investments
- Stocks and bonds
- Mutual funds and ETFs
- Retirement accounts (401k, IRA)
- Brokerage accounts

### Real Estate
- Primary residence
- Investment properties
- Land

### Personal Property
- Vehicles
- Jewelry and collectibles
- Business ownership interests

## Liabilities to Track

### Short-term Debt
- Credit card balances
- Personal loans
- Car loans

### Long-term Debt
- Mortgages
- Student loans
- Home equity lines of credit

## How Often to Update

Track your net worth monthly or quarterly. Regular tracking helps you spot trends and make timely adjustments to your financial strategy.

## Tools and Methods

Use spreadsheets, apps, or financial software to track your net worth. Automation can make the process easier and more consistent.

## Setting Goals

Once you're tracking your net worth, set realistic goals for growth. Consider factors like income, savings rate, and investment returns.

## Conclusion

Net worth tracking is a powerful tool for financial success. By regularly monitoring your progress, you'll stay focused on your goals and make better financial decisions.
      `,
      category: "Financial Planning",
      author: "David Chen",
      date: "2024-03-12",
      readTime: "6 min read",
      image: blogNetWorthImg,
      tags: ["Net Worth", "Financial Planning", "Wealth Building"]
    },
    3: {
      id: 3,
      title: "Budget Planning 101: How to Create a Budget That Actually Works",
      content: `
# Creating a Budget That Works

A well-designed budget is the foundation of financial success. Yet many people struggle to create and stick to budgets that actually work for their lifestyle.

## The Problem with Traditional Budgets

Traditional budgets often fail because they're too restrictive, complicated, or don't align with real spending patterns. The key is creating a flexible, realistic budget.

## The 50/30/20 Rule

A simple starting point:
- 50% for needs (housing, food, utilities)
- 30% for wants (entertainment, dining out)
- 20% for savings and debt repayment

## Step 1: Track Your Current Spending

Before creating a budget, spend a month tracking every expense. This reveals your actual spending patterns and habits.

## Step 2: Categorize Your Expenses

Group expenses into meaningful categories:
- Fixed expenses (rent, insurance)
- Variable expenses (groceries, gas)
- Discretionary spending (entertainment)

## Step 3: Set Realistic Limits

Based on your tracking, set realistic spending limits for each category. Don't be too aggressive initially.

## Step 4: Choose Your Method

### Zero-Based Budgeting
Every dollar has a job. Income minus expenses equals zero.

### Envelope System
Allocate cash to physical or digital envelopes for different spending categories.

### Pay Yourself First
Automatically save/invest, then budget remaining income.

## Step 5: Automate What You Can

Set up automatic transfers for:
- Savings contributions
- Investment accounts
- Bill payments

## Step 6: Review and Adjust

Review your budget monthly. Adjust categories based on actual spending and changing needs.

## Common Budgeting Mistakes

- Being too restrictive
- Not accounting for irregular expenses
- Forgetting annual costs
- Not building in flexibility

## Making It Stick

- Use budgeting apps for easy tracking
- Schedule weekly money check-ins
- Celebrate milestones
- Be kind to yourself when you slip up

## Conclusion

The best budget is one you'll actually follow. Start simple, be realistic, and adjust as you learn what works for your lifestyle.
      `,
      category: "Budgeting",
      author: "Emily Rodriguez",
      date: "2024-03-10",
      readTime: "7 min read",
      image: blogBudgetingImg,
      tags: ["Budgeting", "Money Management", "Savings"]
    },
    4: {
      id: 4,
      title: "Real Estate Investment Strategies for 2024",
      content: `
# Real Estate Investment Strategies for 2024

The real estate market continues to evolve, presenting both challenges and opportunities for investors. Here's how to navigate 2024 successfully.

## Current Market Landscape

Interest rates, inflation, and housing supply are shaping the 2024 market. Understanding these factors is crucial for making informed investment decisions.

## Strategy 1: Buy and Hold Rentals

Long-term rental properties remain a solid wealth-building strategy. Focus on:
- Cash flow positive properties
- Growing markets with strong employment
- Properties below median price points

## Strategy 2: House Hacking

Live in one unit while renting others. This strategy:
- Reduces living expenses
- Builds equity
- Provides rental income
- Offers tax benefits

## Strategy 3: Short-Term Rentals

Platforms like Airbnb can generate higher returns, but require:
- Active management
- Favorable local regulations
- Properties in tourist or business areas

## Strategy 4: Real Estate Investment Trusts (REITs)

For passive investors, REITs offer:
- Liquidity
- Diversification
- Professional management
- Dividend income

## Strategy 5: Value-Add Investments

Purchase properties needing improvements, add value through renovations, then refinance or sell for profit.

## Financing Considerations

In 2024's higher rate environment:
- Explore creative financing
- Consider seller financing
- Look for assumable mortgages
- Build strong lender relationships

## Market Selection Criteria

Choose markets with:
- Population growth
- Job diversity
- Infrastructure development
- Favorable landlord laws

## Risk Management

Protect your investments:
- Adequate insurance coverage
- Cash reserves for vacancies/repairs
- Proper entity structure
- Regular property maintenance

## Tax Strategies

Maximize tax benefits through:
- Depreciation
- 1031 exchanges
- Cost segregation studies
- Professional tax planning

## Conclusion

Real estate remains a powerful wealth-building tool in 2024. Success requires research, proper planning, and patience.
      `,
      category: "Real Estate",
      author: "Michael Thompson",
      date: "2024-03-08",
      readTime: "10 min read",
      image: blogRealEstateImg,
      tags: ["Real Estate", "Investment", "Property"]
    },
    5: {
      id: 5,
      title: "Understanding Market Volatility: A Guide for Long-Term Investors",
      content: `
# Understanding Market Volatility

Market volatility can be unsettling, but it's a normal part of investing. Learn how to navigate turbulent markets while staying focused on long-term goals.

## What Causes Market Volatility?

Market volatility stems from:
- Economic data releases
- Geopolitical events
- Interest rate changes
- Corporate earnings reports
- Investor sentiment

## The Psychology of Volatility

During volatile periods, emotions can drive poor decisions:
- Fear leads to selling at bottoms
- Greed causes buying at peaks
- Panic creates irrational behavior

## Historical Perspective

Markets have always experienced volatility. Looking at historical data:
- Average intra-year decline: 14%
- Long-term trend: upward
- Recovery: markets always recover (eventually)

## Strategies for Volatile Markets

### Stay the Course
Maintain your investment strategy. Market timing rarely works, even for professionals.

### Dollar-Cost Average
Continue regular investments regardless of market conditions. This averages your purchase price over time.

### Rebalance Your Portfolio
Volatility creates opportunities to rebalance back to target allocations, buying low and selling high systematically.

### Review Your Risk Tolerance
Ensure your portfolio matches your true risk tolerance, not what you thought it was in calm markets.

## What NOT to Do

Avoid these common mistakes:
- Checking portfolio constantly
- Making emotional decisions
- Following financial media obsessively
- Abandoning your investment plan

## Opportunities in Volatility

Volatility creates opportunities:
- Quality stocks at discount prices
- Higher potential returns
- Rebalancing benefits
- Tax-loss harvesting

## Building Resilience

Protect against volatility:
- Maintain emergency fund
- Diversify across assets
- Focus on quality investments
- Keep long-term perspective

## When to Adjust

Consider changes only if:
- Life circumstances change
- Time horizon shifts
- Risk tolerance changes
- Financial goals evolve

## The Long-Term Mindset

Remember:
- Volatility is temporary
- Quality businesses recover
- Time in market beats timing
- Compound growth rewards patience

## Conclusion

Market volatility is inevitable but manageable. Stay focused on your long-term goals, maintain perspective, and remember that successful investing is about time in the market, not timing the market.
      `,
      category: "Market Analysis",
      author: "Jennifer Lee",
      date: "2024-03-05",
      readTime: "9 min read",
      image: blogMarketImg,
      tags: ["Stocks", "Market Analysis", "Investing"]
    },
    6: {
      id: 6,
      title: "Cryptocurrency in Your Investment Portfolio: Yes or No?",
      content: `
# Cryptocurrency in Your Portfolio

The question isn't whether crypto should be in every portfolio, but rather how much and which cryptocurrencies make sense for your situation.

## Understanding Cryptocurrency

Crypto is a digital asset class using blockchain technology. It's:
- Highly volatile
- Relatively new
- Evolving rapidly
- Potentially high reward/high risk

## The Case FOR Crypto Investment

### Diversification
Crypto often moves independently of traditional markets, offering true diversification benefits.

### Growth Potential
Early adoption of transformative technology has historically created significant wealth.

### Inflation Hedge
Limited supply cryptos like Bitcoin may protect against currency devaluation.

### Innovation Exposure
Blockchain technology is disrupting multiple industries.

## The Case AGAINST Crypto Investment

### Extreme Volatility
70%+ price swings are common, making it unsuitable for risk-averse investors.

### Regulatory Uncertainty
Government regulations could significantly impact values.

### Security Risks
Exchange hacks and wallet security require technical knowledge.

### Lack of Fundamentals
Traditional valuation methods don't apply, making analysis difficult.

## If You Decide to Invest

### Allocation Guidelines
- Conservative: 1-5% of portfolio
- Moderate: 5-10% of portfolio
- Aggressive: 10-20% of portfolio

### Which Cryptocurrencies?

Start with established cryptos:
- Bitcoin (BTC) - digital gold
- Ethereum (ETH) - smart contract platform
- Consider other large-cap cryptos

### Security Best Practices
- Use hardware wallets for large holdings
- Enable two-factor authentication
- Store recovery phrases securely
- Use reputable exchanges

### Tax Considerations
Crypto is taxed as property:
- Capital gains on sales
- Reporting requirements
- Record keeping essential

## Dollar-Cost Averaging Strategy

Given volatility, consider:
- Regular small purchases
- Avoid trying to time the market
- Long-term holding perspective

## Common Mistakes to Avoid

- Investing more than you can afford to lose
- FOMO buying during rallies
- Panic selling during dips
- Inadequate security measures
- Ignoring tax implications

## Staying Informed

Crypto evolves rapidly:
- Follow reputable sources
- Understand projects you invest in
- Monitor regulatory developments
- Join educated communities

## Integration with Traditional Portfolio

Balance crypto with:
- Stocks and bonds
- Real estate
- Cash reserves
- Other alternative investments

## Conclusion

Cryptocurrency can be a valuable portfolio addition for investors who understand the risks and can tolerate volatility. Start small, educate yourself, and never invest more than you can afford to lose.
      `,
      category: "Cryptocurrency",
      author: "Alex Kumar",
      date: "2024-03-03",
      readTime: "8 min read",
      image: blogCryptoImg,
      tags: ["Crypto", "Investment", "Portfolio"]
    }
  };

  return posts[id] || null;
};

const BlogDetail = () => {
  const { id } = useParams();
  const post = generateBlogContent(Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className="flex items-center gap-1 w-fit mb-4">
              {getCategoryIcon(post.category)}
              {post.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto"
            />
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.substring(4)}</h3>;
                  } else if (paragraph.startsWith('- ')) {
                    return <li key={index} className="ml-6">{paragraph.substring(2)}</li>;
                  } else if (paragraph.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>;
                  }
                })}
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Read More Articles
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
