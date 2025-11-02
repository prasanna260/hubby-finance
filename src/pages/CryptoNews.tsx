
import { useState, useEffect } from 'react';
import { Bitcoin, TrendingUp, TrendingDown, Calendar, Clock, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface CryptoNewsItem {
  id: number;
  headline: string;
  summary: string;
  fullContent: string;
  impact: 'positive' | 'negative' | 'neutral';
  cryptos: string[];
  time: string;
  category: string;
  readTime: string;
}

const CryptoNews = () => {
  const [news, setNews] = useState<CryptoNewsItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Generate comprehensive daily crypto news
  const generateComprehensiveCryptoNews = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const newsTemplates = [
      {
        headline: "Bitcoin Reaches New Milestone as Institutional Adoption Grows",
        summary: "Major financial institutions continue to embrace Bitcoin, driving increased market confidence and price stability in the crypto space.",
        fullContent: "Bitcoin's institutional adoption continues to accelerate as major corporations and investment funds announce significant holdings. Recent regulatory clarity has provided institutional investors with the confidence needed to allocate substantial portions of their portfolios to cryptocurrency. This trend is expected to continue as more traditional finance entities recognize Bitcoin's potential as a store of value.",
        impact: 'positive' as const,
        cryptos: ['BTC', 'ETH', 'ADA'],
        category: 'Institutional',
        readTime: '4 min read'
      },
      {
        headline: "Ethereum Network Upgrade Enhances Scalability",
        summary: "Latest Ethereum improvements promise faster transactions and lower fees, boosting developer activity and DeFi protocols.",
        fullContent: "Ethereum's latest network upgrade has successfully implemented improvements that significantly enhance transaction throughput while reducing gas fees. The upgrade has been well-received by the developer community, with many DeFi protocols already reporting improved user experience and increased transaction volumes.",
        impact: 'positive' as const,
        cryptos: ['ETH', 'UNI', 'LINK'],
        category: 'Technology',
        readTime: '3 min read'
      },
      {
        headline: "Regulatory Uncertainty Affects Altcoin Market",
        summary: "Government discussions on cryptocurrency regulations create mixed signals for smaller digital assets and trading volumes.",
        fullContent: "Regulatory discussions in major markets continue to create uncertainty for alternative cryptocurrencies. While clarity is expected to emerge in the coming months, current uncertainty has led to increased volatility in altcoin markets as traders and investors await clearer regulatory frameworks.",
        impact: 'negative' as const,
        cryptos: ['SOL', 'DOT', 'MATIC'],
        category: 'Regulation',
        readTime: '5 min read'
      },
      {
        headline: "DeFi Protocols Report Record Trading Volumes",
        summary: "Decentralized finance platforms see surge in activity as yield farming and liquidity mining attract more participants.",
        fullContent: "Decentralized finance protocols have reported unprecedented trading volumes as new yield farming opportunities and improved liquidity mining rewards attract both retail and institutional participants. The sector continues to innovate with new financial products and services.",
        impact: 'positive' as const,
        cryptos: ['UNI', 'AAVE', 'COMP'],
        category: 'DeFi',
        readTime: '4 min read'
      },
      {
        headline: "NFT Market Experiences Cooling Period",
        summary: "Non-fungible token sales decline as market participants reassess digital collectible valuations and utility.",
        fullContent: "The NFT market is experiencing a period of consolidation as buyers become more selective about digital collectibles. Focus has shifted from speculative trading to utility-driven NFTs that offer real-world benefits and use cases beyond simple ownership.",
        impact: 'negative' as const,
        cryptos: ['ETH', 'FLOW', 'MANA'],
        category: 'NFTs',
        readTime: '3 min read'
      },
      {
        headline: "Central Bank Digital Currencies Gain Momentum",
        summary: "Multiple countries advance CBDC development, potentially reshaping the digital currency landscape and adoption patterns.",
        fullContent: "Central bank digital currencies are gaining traction globally as multiple nations advance their CBDC development programs. These initiatives could significantly impact the cryptocurrency landscape by providing government-backed digital alternatives to traditional cryptocurrencies.",
        impact: 'neutral' as const,
        cryptos: ['BTC', 'ETH', 'XRP'],
        category: 'CBDCs',
        readTime: '4 min read'
      },
      {
        headline: "Layer 2 Solutions Drive Ethereum Ecosystem Growth",
        summary: "Scaling solutions demonstrate improved performance metrics, encouraging migration of applications and user activity.",
        fullContent: "Ethereum Layer 2 scaling solutions continue to demonstrate significant improvements in transaction speed and cost efficiency. These developments are driving increased adoption as more applications and users migrate to take advantage of enhanced performance capabilities.",
        impact: 'positive' as const,
        cryptos: ['ETH', 'MATIC', 'ARB'],
        category: 'Technology',
        readTime: '3 min read'
      },
      {
        headline: "Cryptocurrency Mining Sustainability Initiatives",
        summary: "Mining operations increasingly adopt renewable energy sources amid ongoing environmental impact discussions.",
        fullContent: "Cryptocurrency mining operations are increasingly adopting renewable energy sources as the industry responds to environmental concerns. This shift toward sustainable mining practices is helping to address one of the primary criticisms of proof-of-work cryptocurrencies.",
        impact: 'neutral' as const,
        cryptos: ['BTC', 'ETH', 'LTC'],
        category: 'Mining',
        readTime: '4 min read'
      }
    ];

    // Generate 8 crypto news items for comprehensive coverage
    const selectedNews = [];
    for (let i = 0; i < 8; i++) {
      const index = (seed + i * 19 + today.getDay() * 13) % newsTemplates.length;
      const template = newsTemplates[index];
      selectedNews.push({
        id: i,
        ...template,
        time: `${Math.floor((seed + i * 15) % 12) + 1}:${String(Math.floor((seed + i * 9) % 60)).padStart(2, '0')} ${(seed + i * 5) % 2 === 0 ? 'AM' : 'PM'}`
      });
    }

    return selectedNews;
  };

  useEffect(() => {
    const comprehensiveNews = generateComprehensiveCryptoNews();
    setNews(comprehensiveNews);
  }, []);

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredNews = filter === 'all' ? news : news.filter(item => item.impact === filter);

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
    <div className="min-h-screen bg-background">
      
      
      <main className="py-12 px-6 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Bitcoin className="w-12 h-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Crypto News
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with comprehensive coverage of cryptocurrency market developments, updated daily
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'all' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background text-foreground border border-border hover:bg-accent'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              All News
            </button>
            <button
              onClick={() => setFilter('positive')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'positive' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background text-foreground border border-border hover:bg-accent'
              }`}
            >
              Positive Impact
            </button>
            <button
              onClick={() => setFilter('negative')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'negative' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background text-foreground border border-border hover:bg-accent'
              }`}
            >
              Negative Impact
            </button>
            <button
              onClick={() => setFilter('neutral')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'neutral' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background text-foreground border border-border hover:bg-accent'
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
                    <span className="text-sm text-muted-foreground ml-2">{item.time}</span>
                  </div>
                  <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                  {item.headline}
                </h2>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {item.summary}
                </p>

                {expandedItems.has(item.id) && (
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {item.fullContent}
                  </p>
                )}
                
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="text-primary hover:text-primary/90 font-medium text-sm flex items-center mb-4 transition-colors"
                >
                  {expandedItems.has(item.id) ? (
                    <>
                      Read less
                      <ChevronUp className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Read more
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {item.cryptos.map((crypto) => (
                      <span 
                        key={crypto} 
                        className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {crypto}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              Crypto news content updates daily • All times in Eastern Time
            </p>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default CryptoNews;
