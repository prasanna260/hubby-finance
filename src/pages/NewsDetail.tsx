import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Generate the same news data based on date
  const generateNewsData = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const newsTemplates = [
      {
        headline: "Tech Giants Rally on AI Optimism",
        summary: "Major technology companies saw gains today as investors remain bullish on artificial intelligence developments and earnings outlook.",
        content: `Major technology companies experienced significant gains in today's trading session, driven by renewed optimism surrounding artificial intelligence developments and strong earnings outlooks. 

The rally was led by industry giants including Apple, Google, Microsoft, and NVIDIA, with each posting notable gains. Investors appear increasingly confident in the sector's ability to capitalize on AI innovations and maintain growth trajectories despite broader market uncertainties.

NVIDIA, the chipmaker at the forefront of AI hardware development, saw particularly strong performance as demand for its latest GPU offerings continues to exceed expectations. The company's data center business, which powers AI training and inference workloads, remains a key growth driver.

Microsoft's continued integration of AI capabilities across its product suite, including the widely-discussed Copilot features in Office applications, has reinforced investor confidence. The company's Azure cloud platform also continues to benefit from increased AI workload demand.

Apple's recent announcements regarding on-device AI capabilities and privacy-focused machine learning features have resonated well with both consumers and investors, suggesting the company is well-positioned to compete in the evolving AI landscape.

Analysts suggest that the current rally may have further room to run, particularly as companies continue to demonstrate tangible returns from AI investments. However, some caution that valuations in certain segments of the tech sector may be approaching stretched levels.

The broader implications for the technology sector remain positive, with many viewing AI as a transformative force that could drive the next major wave of productivity gains and economic growth.`,
        impact: 'positive' as const,
        stocks: ['AAPL', 'GOOGL', 'MSFT', 'NVDA'],
        author: "Market Analysis Team",
        category: "Technology"
      },
      {
        headline: "Federal Reserve Signals Potential Rate Changes",
        summary: "Markets responded to Fed commentary on monetary policy, with financial stocks leading movement across major indices.",
        content: `Financial markets showed mixed reactions today following comments from Federal Reserve officials regarding the future path of monetary policy. The central bank's latest communications suggest a careful evaluation of economic data before making any decisions on interest rate adjustments.

Financial sector stocks, including major banks like JPMorgan Chase, Bank of America, and Wells Fargo, experienced notable volatility as investors digested the implications for net interest margins and lending activity. The prospect of sustained higher rates for longer could benefit banks' profitability, though concerns about credit quality and loan demand persist.

Fed officials emphasized their data-dependent approach, citing the need to balance inflation control with maintaining economic stability. Recent economic indicators have shown resilience in consumer spending and labor markets, potentially giving the Fed more flexibility in its policy decisions.

Market participants are closely watching upcoming inflation data and employment reports, which could provide crucial insights into the Fed's next moves. The central bank's commitment to its 2% inflation target remains unchanged, though the timeline for achieving this goal continues to evolve.

Bond markets reflected the uncertainty, with yields fluctuating as traders adjusted their expectations for the rate trajectory. The 10-year Treasury yield, a key benchmark for mortgage rates and corporate borrowing costs, remained volatile throughout the session.

Economists note that the Fed's communication strategy appears designed to maintain optionality while avoiding market disruption. This measured approach reflects the complex economic environment, characterized by persistent inflation concerns balanced against financial stability considerations.

The implications extend beyond U.S. markets, with global central banks closely monitoring the Fed's stance as they navigate their own monetary policy challenges.`,
        impact: 'neutral' as const,
        stocks: ['JPM', 'BAC', 'WFC'],
        author: "Economic Research Division",
        category: "Federal Reserve"
      },
      {
        headline: "Electric Vehicle Sector Faces Headwinds",
        summary: "EV manufacturers struggle with supply chain challenges and changing consumer demand patterns in the automotive sector.",
        content: `The electric vehicle sector encountered significant challenges today as manufacturers grappled with ongoing supply chain disruptions and evolving consumer preferences. Major EV companies, including Tesla, Rivian, and Lucid Motors, saw their stock prices under pressure.

Supply chain constraints, particularly in battery production and semiconductor availability, continue to impact production schedules and delivery timelines. The global competition for critical minerals used in battery manufacturing has intensified, driving up costs and creating uncertainty for manufacturers.

Consumer demand patterns are also shifting, with potential buyers showing increased price sensitivity amid higher interest rates and economic uncertainty. The premium pricing of many EV models relative to traditional vehicles remains a barrier for mainstream adoption, despite improving technology and expanding charging infrastructure.

Tesla, the market leader, faces intensifying competition from both traditional automakers and new entrants. The company's recent price adjustments reflect the challenging market dynamics and the need to maintain market share in an increasingly crowded field.

Rivian and Lucid, newer entrants to the market, continue to work through production ramp-up challenges while managing cash burn rates. Both companies are focusing on achieving production efficiency and expanding their model lineups to appeal to broader market segments.

Government incentives and regulations continue to play a crucial role in the sector's development. Recent changes to EV tax credit eligibility criteria have created additional complexity for manufacturers and consumers alike.

Despite near-term challenges, long-term prospects for the EV sector remain positive, driven by technological improvements, expanding charging infrastructure, and global commitments to reducing carbon emissions. Industry experts suggest that current headwinds may accelerate consolidation and drive innovation in the sector.`,
        impact: 'negative' as const,
        stocks: ['TSLA', 'RIVN', 'LCID'],
        author: "Automotive Industry Desk",
        category: "Electric Vehicles"
      },
      {
        headline: "Healthcare Innovation Drives Biotech Surge",
        summary: "Breakthrough drug approvals and promising clinical trial results boost pharmaceutical and biotech company valuations.",
        content: `The healthcare sector experienced a significant surge today following multiple positive developments in biotechnology and pharmaceutical research. Major companies including Johnson & Johnson, Pfizer, and Moderna saw their stock prices rise on the back of promising clinical trial results and regulatory approvals.

A wave of breakthrough drug approvals from the FDA has reinvigorated investor confidence in the sector. Several companies announced successful Phase 3 trial results for treatments addressing previously untreatable conditions, potentially opening up new multi-billion dollar markets.

The biotechnology segment showed particular strength, with smaller biotech firms reporting breakthrough innovations in gene therapy and precision medicine. These advances are attracting significant investment from both venture capital and strategic partners.

Pfizer's continued development of next-generation vaccines and treatments has maintained strong investor interest, while Moderna's expansion beyond COVID-19 vaccines into other therapeutic areas is showing promising early results.

Johnson & Johnson's pharmaceutical division reported strong performance across multiple therapeutic areas, with particularly robust growth in oncology and immunology treatments. The company's pipeline of innovative drugs continues to expand.

The sector is also benefiting from increased healthcare spending globally and growing demand for innovative treatments as populations age. Advances in artificial intelligence and machine learning are accelerating drug discovery and development processes.

Analysts remain bullish on the healthcare sector's prospects, citing strong fundamentals, robust pipelines, and the potential for continued breakthrough innovations that could transform patient care.`,
        impact: 'positive' as const,
        stocks: ['JNJ', 'PFE', 'MRNA'],
        author: "Healthcare Research Team",
        category: "Healthcare"
      },
      {
        headline: "Energy Sector Volatility Continues",
        summary: "Oil prices fluctuate amid geopolitical tensions and shifting global demand patterns, affecting energy company stocks.",
        content: `Energy markets experienced significant volatility today as oil prices swung on a combination of geopolitical tensions and evolving global demand dynamics. Major energy companies including ExxonMobil, Chevron, and ConocoPhillips saw their stock prices fluctuate throughout the trading session.

Geopolitical tensions in key oil-producing regions continue to create uncertainty in global energy markets. Supply concerns are being balanced against demand projections that remain uncertain due to varying economic growth forecasts across major economies.

OPEC+ production decisions continue to influence market sentiment, with traders closely watching for signals about future output levels. The organization's efforts to balance market stability with member country revenue needs create ongoing price volatility.

The transition to renewable energy sources is adding another layer of complexity to traditional energy markets. Major oil companies are increasingly investing in clean energy projects while maintaining their core fossil fuel operations.

Natural gas markets are also experiencing volatility, influenced by weather patterns, storage levels, and shifting global LNG trade flows. European energy security concerns continue to impact global gas markets.

U.S. shale producers are carefully managing production levels, balancing the need for profitability with market share considerations. Capital discipline remains a key focus for many operators.

Long-term energy transition trends continue to influence investor sentiment, with companies demonstrating clear strategies for navigating the evolving energy landscape attracting premium valuations.`,
        impact: 'neutral' as const,
        stocks: ['XOM', 'CVX', 'COP'],
        author: "Energy Markets Division",
        category: "Energy"
      },
      {
        headline: "Streaming Wars Intensify Competition",
        summary: "Media companies report mixed earnings as the streaming landscape becomes increasingly competitive and saturated.",
        content: `The streaming entertainment industry faced renewed pressure today as major media companies reported mixed earnings results amid an increasingly competitive and saturated market. Netflix, Disney, and Paramount saw varied stock performance as investors assessed their streaming strategies.

The battle for subscriber growth has intensified, with platforms investing billions in original content to differentiate their offerings. However, rising content costs and market saturation are pressuring profit margins across the industry.

Netflix, the streaming pioneer, is navigating a mature market in North America while seeking growth in international markets. The company's recent initiatives including ad-supported tiers and password-sharing crackdowns are being closely watched by investors.

Disney's streaming services continue to work toward profitability, with the company focusing on content efficiency and strategic bundling of its various platforms. The integration of Hulu content and the success of franchise properties remain key to Disney's streaming strategy.

Paramount and other traditional media companies are struggling to balance their linear TV businesses with streaming investments. The shift in viewer habits continues to accelerate, forcing difficult decisions about resource allocation.

The proliferation of streaming services has led to "subscription fatigue" among consumers, with many households reassessing their streaming budgets. This is driving consolidation discussions and partnership opportunities across the industry.

Industry experts suggest that the streaming landscape may see significant consolidation in the coming years as companies seek scale and efficiency in an increasingly challenging market environment.`,
        impact: 'negative' as const,
        stocks: ['NFLX', 'DIS', 'PARA'],
        author: "Media & Entertainment Desk",
        category: "Media"
      },
      {
        headline: "Semiconductor Recovery Gains Momentum",
        summary: "Chip manufacturers report improved supply chains and strong demand across multiple sectors.",
        content: `The semiconductor industry showed strong signs of recovery today as major chip manufacturers reported improving supply chain conditions and robust demand across multiple sectors. Taiwan Semiconductor, Intel, and AMD all saw positive stock movement.

Supply chain constraints that have plagued the industry for the past several years are finally beginning to ease. Manufacturing capacity expansions and improved logistics are helping to meet pent-up demand across various industries.

Taiwan Semiconductor (TSM), the world's largest contract chip manufacturer, reported strong order books and improving margins as it ramps up production of advanced chips for AI and high-performance computing applications.

Intel's efforts to regain technological leadership are showing progress, with the company's new manufacturing processes gaining traction. The company's foundry services ambitions are attracting interest from potential customers.

AMD continues to gain market share in both data center and consumer markets, benefiting from strong demand for its high-performance processors and graphics chips. The company's focus on AI and machine learning capabilities is resonating with customers.

The automotive industry's increasing semiconductor content per vehicle is driving sustained demand, while data center expansions for AI workloads are creating new growth opportunities for chip manufacturers.

Government initiatives to boost domestic semiconductor production in various regions are providing additional support for the industry, with significant investments planned in new manufacturing facilities.

Analysts remain optimistic about the semiconductor sector's prospects, citing long-term demand drivers including AI, IoT, 5G, and automotive electrification.`,
        impact: 'positive' as const,
        stocks: ['TSM', 'INTC', 'AMD'],
        author: "Technology Research Group",
        category: "Technology"
      },
      {
        headline: "Retail Adaptation to Digital Transformation",
        summary: "Major retailers continue evolving their strategies to balance online and physical store experiences.",
        content: `Major retail companies are accelerating their digital transformation efforts as they adapt to changing consumer behaviors and expectations. Walmart, Amazon, and Target reported varied results as they navigate the evolving retail landscape.

The integration of online and offline shopping experiences has become crucial for retail success. Companies are investing heavily in omnichannel capabilities that allow customers to seamlessly shop across different platforms and fulfillment options.

Walmart's continued investment in e-commerce and technology is paying dividends, with the company reporting strong online growth while maintaining its physical store advantages. The retailer's focus on grocery and everyday essentials provides a competitive moat.

Amazon is expanding its physical store presence while continuing to dominate online retail. The company's logistics network and Prime membership program remain key competitive advantages in the retail space.

Target's strategy of positioning stores as fulfillment centers for online orders is proving successful, with the company reporting strong same-day service adoption. The retailer's focus on exclusive brands and partnerships is driving customer loyalty.

Artificial intelligence and data analytics are becoming increasingly important in retail operations, from inventory management to personalized marketing. Retailers are leveraging these technologies to improve efficiency and customer experience.

The shift toward sustainable and ethical retail practices is influencing consumer choices, with retailers adapting their strategies to meet growing demand for environmentally friendly and socially responsible products.

Industry observers note that successful retailers are those that can effectively blend digital innovation with physical store experiences while maintaining operational efficiency and customer satisfaction.`,
        impact: 'neutral' as const,
        stocks: ['WMT', 'AMZN', 'TGT'],
        author: "Retail Industry Analysis",
        category: "Retail"
      },
      {
        headline: "Banking Sector Navigates Rate Environment",
        summary: "Financial institutions adjust strategies as interest rate outlook remains uncertain amid economic indicators.",
        content: `The banking sector showed mixed performance today as financial institutions continue to navigate an uncertain interest rate environment. Major banks are adjusting their strategies to optimize profitability while managing risk in a complex economic landscape.

Net interest margins, a key profitability metric for banks, remain under scrutiny as the Federal Reserve's future rate decisions remain uncertain. Banks are balancing the benefits of higher rates on lending with increased funding costs and potential credit risks.

Large diversified banks are leveraging their multiple business lines to maintain stability, with investment banking and wealth management divisions providing additional revenue streams beyond traditional lending.

Regional banks face particular challenges, with some experiencing deposit pressures as customers seek higher yields elsewhere. These institutions are focusing on relationship banking and specialized lending to maintain their competitive position.

Credit quality remains generally strong, though banks are increasing loan loss provisions as a precautionary measure given economic uncertainties. Commercial real estate exposures continue to be monitored closely.

Digital transformation initiatives are accelerating across the sector, with banks investing in technology to improve customer experience and operational efficiency. Mobile banking adoption continues to grow rapidly.

Regulatory considerations remain important, with banks preparing for potential changes in capital requirements and stress testing scenarios. Compliance costs continue to be a significant factor in operational planning.

Analysts suggest that banks with strong capital positions, diversified revenue streams, and effective risk management will be best positioned to navigate the current environment.`,
        impact: 'neutral' as const,
        stocks: ['JPM', 'BAC', 'GS', 'WFC'],
        author: "Financial Markets Team",
        category: "Finance"
      }
    ];

    // Return the appropriate news item based on ID
    const index = parseInt(id || '0');
    if (index >= 0 && index < newsTemplates.length) {
      const template = newsTemplates[index];
      return {
        id: index,
        ...template,
        time: `${Math.floor((seed + index * 11) % 12) + 1}:${String(Math.floor((seed + index * 13) % 60)).padStart(2, '0')} ${(seed + index) % 2 === 0 ? 'AM' : 'PM'}`,
        date: today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      };
    }
    return null;
  };

  const newsItem = generateNewsData();

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">News article not found</h1>
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
              <Badge variant="secondary">{newsItem.category}</Badge>
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
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Related Stocks</h3>
                <div className="flex gap-2">
                  {newsItem.stocks.map((stock) => (
                    <Badge key={stock} variant="outline" className="text-sm">
                      {stock}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/news')}
              >
                View More News
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;