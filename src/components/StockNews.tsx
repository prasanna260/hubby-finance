
import { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, TrendingDown, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  impact: 'positive' | 'negative' | 'neutral';
  stocks: string[];
  time: string;
}

const StockNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  // Generate daily news based on current date with more variety
  const generateDailyNews = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const newsTemplates = [
      {
        headline: "Tech Giants Rally on AI Optimism",
        summary: "Major technology companies saw gains today as investors remain bullish on artificial intelligence developments and earnings outlook.",
        impact: 'positive' as const,
        stocks: ['AAPL', 'GOOGL', 'MSFT', 'NVDA'],
      },
      {
        headline: "Federal Reserve Signals Potential Rate Changes",
        summary: "Markets responded to Fed commentary on monetary policy, with financial stocks leading movement across major indices.",
        impact: 'neutral' as const,
        stocks: ['JPM', 'BAC', 'WFC'],
      },
      {
        headline: "Electric Vehicle Sector Faces Headwinds",
        summary: "EV manufacturers struggle with supply chain challenges and changing consumer demand patterns in the automotive sector.",
        impact: 'negative' as const,
        stocks: ['TSLA', 'RIVN', 'LCID'],
      },
      {
        headline: "Healthcare Innovation Drives Biotech Surge",
        summary: "Breakthrough drug approvals and promising clinical trial results boost pharmaceutical and biotech company valuations.",
        impact: 'positive' as const,
        stocks: ['JNJ', 'PFE', 'MRNA'],
      },
      {
        headline: "Energy Sector Volatility Continues",
        summary: "Oil prices fluctuate amid geopolitical tensions and shifting global demand patterns, affecting energy company stocks.",
        impact: 'neutral' as const,
        stocks: ['XOM', 'CVX', 'COP'],
      },
      {
        headline: "Streaming Wars Intensify Competition",
        summary: "Media companies report mixed earnings as the streaming landscape becomes increasingly competitive and saturated.",
        impact: 'negative' as const,
        stocks: ['NFLX', 'DIS', 'PARA'],
      },
      {
        headline: "Semiconductor Shortage Eases Gradually",
        summary: "Chip manufacturers report improved supply chains, benefiting automotive and electronics sectors worldwide.",
        impact: 'positive' as const,
        stocks: ['TSM', 'INTC', 'AMD'],
      },
      {
        headline: "Retail Giants Adapt to Changing Consumer Habits",
        summary: "Major retailers pivot strategies as shopping patterns shift between online and brick-and-mortar experiences.",
        impact: 'neutral' as const,
        stocks: ['WMT', 'AMZN', 'TGT'],
      },
      {
        headline: "Cybersecurity Concerns Drive Tech Spending",
        summary: "Increased cyber threats prompt businesses to boost security investments, benefiting cybersecurity companies.",
        impact: 'positive' as const,
        stocks: ['CRWD', 'ZS', 'PANW'],
      },
      {
        headline: "Banking Sector Faces Regulatory Scrutiny",
        summary: "New regulatory proposals create uncertainty for major financial institutions amid ongoing policy discussions.",
        impact: 'negative' as const,
        stocks: ['C', 'GS', 'MS'],
      }
    ];

    // Select 3 news items based on the date seed with better distribution
    const selectedNews = [];
    for (let i = 0; i < 3; i++) {
      const index = (seed + i * 23 + today.getDay() * 7) % newsTemplates.length;
      const template = newsTemplates[index];
      selectedNews.push({
        id: i,
        ...template,
        time: `${Math.floor((seed + i * 11) % 12) + 1}:${String(Math.floor((seed + i * 13) % 60)).padStart(2, '0')} ${(seed + i) % 2 === 0 ? 'AM' : 'PM'}`
      });
    }

    return selectedNews;
  };

  useEffect(() => {
    const dailyNews = generateDailyNews();
    setNews(dailyNews);
  }, []);

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'border-l-success bg-success/5';
      case 'negative':
        return 'border-l-red-500 bg-red-500/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };

  return (
    <section className="py-12 px-6 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground gradient-text">
              Today's Market News
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest developments affecting US stock markets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div 
              key={item.id} 
              className={`border-l-4 glass rounded-lg p-6 transition-all duration-300 hover:glow-neon ${getImpactColor(item.impact)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  {getImpactIcon(item.impact)}
                  <span className="text-sm text-gray-600 ml-2">{item.time}</span>
                </div>
              </div>
              
              <Link 
                to={`/news/${item.id}`}
                className="hover:underline"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight hover:text-primary neon-text-purple transition-colors duration-200">
                  {item.headline}
                </h3>
              </Link>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {item.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {item.stocks.map((stock) => (
                    <span 
                      key={stock} 
                      className="glass border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {stock}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/news/${item.id}`}
                  className="text-xs text-primary hover:text-secondary hover:underline transition-colors duration-200"
                >
                  Read full article →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/news" 
            className="inline-flex items-center cyber-gradient text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 glow-purple hover:glow-neon"
          >
            View All News
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            News updates daily • Get personalized alerts with our app
          </p>
        </div>
      </div>
    </section>
  );
};

export default StockNews;
