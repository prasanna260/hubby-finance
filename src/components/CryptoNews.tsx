
import { useState, useEffect } from 'react';
import { Bitcoin, TrendingUp, TrendingDown, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CryptoNewsItem {
  id: number;
  headline: string;
  summary: string;
  impact: 'positive' | 'negative' | 'neutral';
  cryptos: string[];
  time: string;
}

const CryptoNews = () => {
  const [news, setNews] = useState<CryptoNewsItem[]>([]);

  // Generate daily crypto news based on current date
  const generateDailyCryptoNews = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const newsTemplates = [
      {
        headline: "Bitcoin Reaches New Milestone as Institutional Adoption Grows",
        summary: "Major financial institutions continue to embrace Bitcoin, driving increased market confidence and price stability in the crypto space.",
        impact: 'positive' as const,
        cryptos: ['BTC', 'ETH', 'ADA'],
      },
      {
        headline: "Ethereum Network Upgrade Enhances Scalability",
        summary: "Latest Ethereum improvements promise faster transactions and lower fees, boosting developer activity and DeFi protocols.",
        impact: 'positive' as const,
        cryptos: ['ETH', 'UNI', 'LINK'],
      },
      {
        headline: "Regulatory Uncertainty Affects Altcoin Market",
        summary: "Government discussions on cryptocurrency regulations create mixed signals for smaller digital assets and trading volumes.",
        impact: 'negative' as const,
        cryptos: ['SOL', 'DOT', 'MATIC'],
      },
      {
        headline: "DeFi Protocols Report Record Trading Volumes",
        summary: "Decentralized finance platforms see surge in activity as yield farming and liquidity mining attract more participants.",
        impact: 'positive' as const,
        cryptos: ['UNI', 'AAVE', 'COMP'],
      },
      {
        headline: "NFT Market Experiences Cooling Period",
        summary: "Non-fungible token sales decline as market participants reassess digital collectible valuations and utility.",
        impact: 'negative' as const,
        cryptos: ['ETH', 'FLOW', 'MANA'],
      },
      {
        headline: "Central Bank Digital Currencies Gain Momentum",
        summary: "Multiple countries advance CBDC development, potentially reshaping the digital currency landscape and adoption patterns.",
        impact: 'neutral' as const,
        cryptos: ['BTC', 'ETH', 'XRP'],
      },
      {
        headline: "Layer 2 Solutions Drive Ethereum Ecosystem Growth",
        summary: "Scaling solutions demonstrate improved performance metrics, encouraging migration of applications and user activity.",
        impact: 'positive' as const,
        cryptos: ['ETH', 'MATIC', 'ARB'],
      },
      {
        headline: "Cryptocurrency Mining Sustainability Initiatives",
        summary: "Mining operations increasingly adopt renewable energy sources amid ongoing environmental impact discussions.",
        impact: 'neutral' as const,
        cryptos: ['BTC', 'ETH', 'LTC'],
      },
      {
        headline: "Cross-Chain Interoperability Protocols Launch",
        summary: "New bridge technologies enable seamless asset transfers between different blockchain networks, enhancing ecosystem connectivity.",
        impact: 'positive' as const,
        cryptos: ['DOT', 'COSMOS', 'AVAX'],
      },
      {
        headline: "Stablecoin Regulations Tighten Globally",
        summary: "Regulatory bodies implement stricter oversight on stablecoin issuers, affecting market dynamics and reserve transparency.",
        impact: 'negative' as const,
        cryptos: ['USDT', 'USDC', 'BUSD'],
      }
    ];

    // Select 3 crypto news items based on the date seed
    const selectedNews = [];
    for (let i = 0; i < 3; i++) {
      const index = (seed + i * 29 + today.getDay() * 5) % newsTemplates.length;
      const template = newsTemplates[index];
      selectedNews.push({
        id: i,
        ...template,
        time: `${Math.floor((seed + i * 17) % 12) + 1}:${String(Math.floor((seed + i * 19) % 60)).padStart(2, '0')} ${(seed + i * 2) % 2 === 0 ? 'AM' : 'PM'}`
      });
    }

    return selectedNews;
  };

  useEffect(() => {
    const dailyNews = generateDailyCryptoNews();
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
        return 'border-l-secondary bg-secondary/5';
    }
  };

  return (
    <section className="py-12 px-6 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bitcoin className="w-8 h-8 text-secondary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground gradient-cyan-text">
              Today's Crypto News
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest developments in cryptocurrency markets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div 
              key={item.id} 
              className={`border-l-4 glass rounded-lg p-6 transition-all duration-300 hover:glow-cyan ${getImpactColor(item.impact)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  {getImpactIcon(item.impact)}
                  <span className="text-sm text-gray-600 ml-2">{item.time}</span>
                </div>
              </div>
              
              <Link 
                to={`/crypto-news/${item.id}`}
                className="hover:underline"
              >
                <h3 className="text-xl font-semibold text-navy-900 mb-3 leading-tight hover:text-navy-700">
                  {item.headline}
                </h3>
              </Link>
              
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {item.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {item.cryptos.map((crypto) => (
                    <span 
                      key={crypto} 
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {crypto}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/crypto-news/${item.id}`}
                  className="text-xs text-orange-600 hover:text-orange-700 hover:underline"
                >
                  Read full article →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/crypto-news" 
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            View All Crypto News
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            Crypto updates daily • Get real-time alerts with our app
          </p>
        </div>
      </div>
    </section>
  );
};

export default CryptoNews;
