import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Clock, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CryptoNewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Generate the same crypto news data based on date
  const generateCryptoNewsData = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const newsTemplates = [
      {
        headline: "Bitcoin Reaches New Milestone as Institutional Adoption Grows",
        summary: "Major financial institutions continue to embrace Bitcoin, driving increased market confidence and price stability in the crypto space.",
        content: `Bitcoin demonstrated remarkable strength today as institutional adoption continues to accelerate across the financial sector. Major banks and investment firms are increasingly viewing Bitcoin as a legitimate asset class, marking a significant shift from the skepticism that characterized earlier years.

The world's largest cryptocurrency by market capitalization has benefited from a confluence of positive factors, including regulatory clarity in key markets, improved infrastructure for institutional trading, and growing recognition of Bitcoin's role as a potential hedge against currency debasement.

Several major financial institutions announced expanded cryptocurrency services this quarter, including custody solutions, trading desks, and investment products tailored for institutional clients. This infrastructure development has removed many of the barriers that previously prevented large-scale institutional participation.

The maturation of the Bitcoin derivatives market has also contributed to price stability and improved price discovery. The availability of futures, options, and ETF products has provided institutional investors with familiar tools for gaining exposure to Bitcoin while managing risk.

On-chain metrics support the bullish narrative, with long-term holder accumulation reaching new highs and exchange balances continuing to decline. These trends suggest that investors are increasingly viewing Bitcoin as a long-term store of value rather than a short-term trading vehicle.

The macroeconomic environment has also been supportive, with concerns about inflation and currency stability driving interest in alternative stores of value. Bitcoin's fixed supply schedule and decentralized nature continue to appeal to investors seeking protection from monetary policy uncertainty.

Looking ahead, market participants are closely watching regulatory developments, particularly around spot Bitcoin ETF approvals and stablecoin regulations. The continued evolution of the regulatory framework will likely play a crucial role in determining the pace of institutional adoption.

While volatility remains a characteristic of the cryptocurrency market, the growing institutional presence is contributing to improved market depth and reduced price swings during major news events.`,
        impact: 'positive' as const,
        cryptos: ['BTC', 'ETH', 'ADA'],
        author: "Crypto Research Team",
        category: "Bitcoin"
      },
      {
        headline: "Ethereum Network Upgrade Enhances Scalability",
        summary: "Latest Ethereum improvements promise faster transactions and lower fees, boosting developer activity and DeFi protocols.",
        content: `Ethereum's latest network upgrade has successfully deployed, bringing significant improvements to transaction throughput and fee predictability. The upgrade represents another milestone in Ethereum's ongoing evolution toward a more scalable and efficient blockchain platform.

The technical improvements focus on optimizing gas usage and improving the efficiency of smart contract execution. Early data suggests transaction costs have decreased by approximately 30% for common operations, making DeFi protocols more accessible to smaller users who were previously priced out during high-congestion periods.

Developer activity on Ethereum has surged following the upgrade, with new project deployments increasing significantly. The improved performance characteristics have particularly benefited complex DeFi applications that require multiple contract interactions within a single transaction.

Layer 2 scaling solutions have also seen enhanced performance, with rollup technologies achieving even greater throughput when combined with the base layer improvements. This synergy between L1 and L2 scaling approaches is creating a more robust and versatile ecosystem for decentralized applications.

The DeFi sector has been an immediate beneficiary, with major protocols like Uniswap, Aave, and Compound reporting increased user activity and transaction volumes. The reduced friction for users is expected to accelerate DeFi adoption and innovation.

NFT marketplaces and gaming applications are also experiencing renewed interest, as lower transaction costs make smaller-value transactions economically viable again. This could reignite growth in sectors that had been hampered by high gas fees.

The Ethereum developer community has praised the smooth execution of the upgrade, which was completed without any significant issues or network disruptions. This technical excellence reinforces Ethereum's position as the leading smart contract platform.

Looking forward, the Ethereum roadmap includes additional upgrades focused on further scalability improvements and enhanced privacy features. The successful implementation of this latest upgrade provides confidence in the network's ability to continue evolving while maintaining security and decentralization.`,
        impact: 'positive' as const,
        cryptos: ['ETH', 'UNI', 'LINK'],
        author: "DeFi Analytics Division",
        category: "Ethereum"
      },
      {
        headline: "Regulatory Uncertainty Affects Altcoin Market",
        summary: "Government discussions on cryptocurrency regulations create mixed signals for smaller digital assets and trading volumes.",
        content: `The altcoin market experienced heightened volatility today as regulatory uncertainty continues to weigh on investor sentiment. Ongoing discussions among global regulators about the classification and treatment of various cryptocurrencies have created a challenging environment for smaller digital assets.

Recent statements from regulatory bodies suggest increased scrutiny of tokens that may be classified as securities, leading to concerns about potential enforcement actions. Projects like Solana, Polkadot, and Polygon have seen increased price volatility as investors reassess regulatory risks.

Trading volumes across major exchanges have shown mixed patterns, with some investors reducing exposure to altcoins while others view the current uncertainty as a buying opportunity. The divergence in market participant views has contributed to increased price swings and reduced liquidity in certain trading pairs.

Several cryptocurrency projects have proactively engaged with regulators to ensure compliance, including implementing KYC procedures and geographic restrictions. However, the lack of clear regulatory frameworks in many jurisdictions continues to create operational challenges.

The impact has been particularly pronounced for newer projects and tokens associated with specific use cases like governance or utility within decentralized applications. Questions about token classification and the application of existing securities laws remain unresolved in many cases.

Exchange operators are also navigating the complex regulatory landscape, with some platforms delisting certain tokens as a precautionary measure. This has further contributed to liquidity fragmentation and price discovery challenges for affected assets.

Despite the near-term challenges, many industry participants view regulatory clarity as ultimately beneficial for the long-term development of the cryptocurrency ecosystem. Clear rules and guidelines could provide the certainty needed for institutional adoption and mainstream acceptance.

The situation remains fluid, with regulatory developments in major markets like the United States, European Union, and Asia likely to have significant implications for the global altcoin market. Market participants are advised to stay informed about regulatory changes and consider the potential impact on their portfolios.`,
        impact: 'negative' as const,
        cryptos: ['SOL', 'DOT', 'MATIC'],
        author: "Regulatory Affairs Desk",
        category: "Altcoins"
      }
    ];

    // Return the appropriate news item based on ID
    const index = parseInt(id || '0');
    if (index >= 0 && index < newsTemplates.length) {
      const template = newsTemplates[index];
      return {
        id: index,
        ...template,
        time: `${Math.floor((seed + index * 17) % 12) + 1}:${String(Math.floor((seed + index * 19) % 60)).padStart(2, '0')} ${(seed + index * 2) % 2 === 0 ? 'AM' : 'PM'}`,
        date: today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      };
    }
    return null;
  };

  const newsItem = generateCryptoNewsData();

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Crypto news article not found</h1>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

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
        return 'text-emerald-600 bg-emerald-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <article className="bg-card rounded-xl shadow-lg p-8">
          <header className="mb-8 border-b pb-6">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Bitcoin className="w-3 h-3" />
                {newsItem.category}
              </Badge>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getImpactColor(newsItem.impact)}`}>
                {getImpactIcon(newsItem.impact)}
                <span className="text-sm font-medium capitalize">{newsItem.impact}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {newsItem.headline}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {newsItem.summary}
            </p>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {newsItem.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {newsItem.time}
                </span>
              </div>
              <span>By {newsItem.author}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {newsItem.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-8 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Related Cryptocurrencies</h3>
                <div className="flex gap-2">
                  {newsItem.cryptos.map((crypto) => (
                    <Badge key={crypto} variant="outline" className="text-sm">
                      {crypto}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/crypto-news')}
              >
                View More Crypto News
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default CryptoNewsDetail;