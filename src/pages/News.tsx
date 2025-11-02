
import { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, TrendingDown, Calendar, Clock, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  fullContent: string;
  impact: 'positive' | 'negative' | 'neutral';
  stocks: string[];
  time: string;
  category: string;
  readTime: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Generate comprehensive daily news
  const generateComprehensiveNews = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const newsTemplates = [
      {
        headline: "Tech Giants Rally on AI Optimism",
        summary: "Major technology companies saw gains today as investors remain bullish on artificial intelligence developments and earnings outlook.",
        fullContent: "Technology stocks surged in today's trading session as investors showed renewed confidence in AI developments. Apple, Google, Microsoft, and NVIDIA all posted significant gains as analysts raised price targets following strong earnings guidance. The semiconductor sector led the charge with AI chip manufacturers seeing particularly strong demand.",
        impact: 'positive' as const,
        stocks: ['AAPL', 'GOOGL', 'MSFT', 'NVDA'],
        category: 'Technology',
        readTime: '3 min read'
      },
      {
        headline: "Federal Reserve Signals Potential Rate Changes",
        summary: "Markets responded to Fed commentary on monetary policy, with financial stocks leading movement across major indices.",
        fullContent: "The Federal Reserve's latest meeting minutes revealed discussions about potential adjustments to interest rates in response to evolving economic conditions. Financial institutions are positioning themselves for potential policy shifts, with major banks showing mixed reactions to the news.",
        impact: 'neutral' as const,
        stocks: ['JPM', 'BAC', 'WFC'],
        category: 'Finance',
        readTime: '4 min read'
      },
      {
        headline: "Electric Vehicle Sector Faces Headwinds",
        summary: "EV manufacturers struggle with supply chain challenges and changing consumer demand patterns in the automotive sector.",
        fullContent: "Electric vehicle companies are navigating a complex landscape of supply chain disruptions and shifting consumer preferences. Tesla, Rivian, and other EV manufacturers are adjusting production forecasts as they work to address component shortages and competitive pressures.",
        impact: 'negative' as const,
        stocks: ['TSLA', 'RIVN', 'LCID'],
        category: 'Automotive',
        readTime: '5 min read'
      },
      {
        headline: "Healthcare Innovation Drives Biotech Surge",
        summary: "Breakthrough drug approvals and promising clinical trial results boost pharmaceutical and biotech company valuations.",
        fullContent: "The healthcare sector is experiencing significant momentum following several positive clinical trial announcements and FDA approvals. Biotechnology companies are seeing increased investor interest as breakthrough treatments show promising results in late-stage trials.",
        impact: 'positive' as const,
        stocks: ['JNJ', 'PFE', 'MRNA'],
        category: 'Healthcare',
        readTime: '4 min read'
      },
      {
        headline: "Energy Sector Volatility Continues",
        summary: "Oil prices fluctuate amid geopolitical tensions and shifting global demand patterns, affecting energy company stocks.",
        fullContent: "Energy markets remain volatile as geopolitical factors and changing demand patterns create uncertainty. Major oil companies are adapting their strategies while renewable energy investments continue to attract significant capital.",
        impact: 'neutral' as const,
        stocks: ['XOM', 'CVX', 'COP'],
        category: 'Energy',
        readTime: '3 min read'
      },
      {
        headline: "Streaming Wars Intensify Competition",
        summary: "Media companies report mixed earnings as the streaming landscape becomes increasingly competitive and saturated.",
        fullContent: "The streaming entertainment industry is facing increased competition and market saturation challenges. Major platforms are investing heavily in original content while exploring new revenue models to maintain subscriber growth.",
        impact: 'negative' as const,
        stocks: ['NFLX', 'DIS', 'PARA'],
        category: 'Media',
        readTime: '4 min read'
      },
      {
        headline: "Semiconductor Recovery Gains Momentum",
        summary: "Chip manufacturers report improved supply chains and strong demand across multiple sectors.",
        fullContent: "The semiconductor industry is showing signs of recovery as supply chain constraints ease and demand remains robust. Companies are expanding production capacity to meet growing needs from automotive, consumer electronics, and data center markets.",
        impact: 'positive' as const,
        stocks: ['TSM', 'INTC', 'AMD'],
        category: 'Technology',
        readTime: '3 min read'
      },
      {
        headline: "Retail Adaptation to Digital Transformation",
        summary: "Major retailers continue evolving their strategies to balance online and physical store experiences.",
        fullContent: "Retail giants are investing in omnichannel strategies that integrate online and offline shopping experiences. Companies are leveraging data analytics and AI to improve customer engagement and inventory management.",
        impact: 'neutral' as const,
        stocks: ['WMT', 'AMZN', 'TGT'],
        category: 'Retail',
        readTime: '4 min read'
      }
    ];

    // Generate 8 news items for comprehensive coverage
    const selectedNews = [];
    for (let i = 0; i < 8; i++) {
      const index = (seed + i * 17 + today.getDay() * 11) % newsTemplates.length;
      const template = newsTemplates[index];
      selectedNews.push({
        id: i,
        ...template,
        time: `${Math.floor((seed + i * 13) % 12) + 1}:${String(Math.floor((seed + i * 7) % 60)).padStart(2, '0')} ${(seed + i * 3) % 2 === 0 ? 'AM' : 'PM'}`
      });
    }

    return selectedNews;
  };

  useEffect(() => {
    const comprehensiveNews = generateComprehensiveNews();
    setNews(comprehensiveNews);
  }, []);

  const filteredNews = filter === 'all' ? news : news.filter(item => item.impact === filter);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'border-l-emerald-500 bg-emerald-50 hover:bg-emerald-100';
      case 'negative':
        return 'border-l-red-500 bg-red-50 hover:bg-red-100';
      default:
        return 'border-l-gray-500 bg-gray-50 hover:bg-gray-100';
    }
  };

  return (
    <main className="py-12 px-6 bg-gradient-to-br from-navy-50 to-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Newspaper className="w-12 h-12 text-navy-700 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-navy-900">
                Market News
              </h1>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay informed with comprehensive coverage of US stock market developments, updated daily
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'all' 
                  ? 'bg-navy-700 text-white' 
                  : 'bg-white text-navy-700 border border-navy-200 hover:bg-navy-50'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              All News
            </button>
            <button
              onClick={() => setFilter('positive')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'positive' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              Positive Impact
            </button>
            <button
              onClick={() => setFilter('negative')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'negative' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
              }`}
            >
              Negative Impact
            </button>
            <button
              onClick={() => setFilter('neutral')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'neutral' 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Neutral Impact
            </button>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredNews.map((item) => (
              <article 
                key={item.id} 
                className={`border-l-4 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${getImpactColor(item.impact)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {getImpactIcon(item.impact)}
                    <span className="text-sm text-gray-600 ml-2">{item.time}</span>
                  </div>
                  <span className="bg-navy-100 text-navy-700 px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
                
                <Link 
                  to={`/news/${item.id}`}
                  className="hover:underline"
                >
                  <h2 className="text-2xl font-bold text-navy-900 mb-3 leading-tight hover:text-navy-700">
                    {item.headline}
                  </h2>
                </Link>
                
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {item.summary}
                </p>

                {expandedItems.has(item.id) && (
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed animate-fade-in">
                    {item.fullContent}
                  </p>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="flex items-center text-navy-600 hover:text-navy-800 font-medium text-sm transition-colors duration-200"
                  >
                    {expandedItems.has(item.id) ? (
                      <>
                        <span className="mr-1">Read less</span>
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span className="mr-1">Read more</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <Link 
                    to={`/news/${item.id}`}
                    className="text-xs text-navy-600 hover:text-navy-800 hover:underline"
                  >
                    View full article →
                  </Link>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {item.stocks.map((stock) => (
                      <span 
                        key={stock} 
                        className="bg-navy-200 text-navy-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {stock}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              News content updates daily at market close • All times in Eastern Time
            </p>
          </div>
        </div>
      </main>
  );
};

export default News;
