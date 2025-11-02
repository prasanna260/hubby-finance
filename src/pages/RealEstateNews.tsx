import { useState, useEffect } from 'react';
import { Home, TrendingUp, TrendingDown, MapPin, Clock, Building, ChevronDown, ChevronUp } from 'lucide-react';

interface RealEstateNewsItem {
  id: number;
  headline: string;
  summary: string;
  fullContent: string;
  impact: 'positive' | 'negative' | 'neutral';
  location: string;
  propertyType: string;
  time: string;
  category: string;
  readTime: string;
}

const RealEstateNews = () => {
  const [news, setNews] = useState<RealEstateNewsItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Generate comprehensive daily real estate news
  const generateRealEstateNews = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const newsTemplates = [
      {
        headline: "Federal Reserve Rate Decision Impacts Mortgage Markets",
        summary: "The Federal Reserve's latest decision on interest rates sends ripples through the mortgage market, affecting both buyers and sellers nationwide.",
        fullContent: "The Federal Reserve announced its decision to maintain current interest rates, providing stability to the mortgage market. This decision impacts potential homebuyers' purchasing power and influences refinancing opportunities. Mortgage rates are expected to remain relatively stable in the near term, with 30-year fixed rates hovering around 7.2%. Industry experts suggest this creates a window of opportunity for buyers who have been waiting on the sidelines. The decision also affects real estate investment trusts (REITs) and commercial real estate financing, with many investors adjusting their strategies accordingly.",
        impact: 'positive' as const,
        location: "Nationwide",
        propertyType: "Residential",
        category: "Market Update"
      },
      {
        headline: "Manhattan Commercial Real Estate Sees Record Vacancy Rates",
        summary: "Office vacancy rates in Manhattan reach historic highs as remote work trends continue to reshape the commercial real estate landscape.",
        fullContent: "Manhattan's office market faces unprecedented challenges with vacancy rates climbing to 22.5%, the highest level since tracking began. Major corporations continue to reduce their office footprints, with several high-profile lease terminations announced this quarter. The shift to hybrid work models has fundamentally altered demand for commercial space. However, some investors see opportunity in the distressed market, with conversions to residential units gaining traction. The city is considering zoning changes to facilitate office-to-residential conversions, which could help address both the housing shortage and office oversupply.",
        impact: 'negative' as const,
        location: "New York",
        propertyType: "Commercial",
        category: "Market Analysis"
      },
      {
        headline: "Austin Housing Market Shows Signs of Stabilization",
        summary: "After months of price corrections, Austin's residential market finds equilibrium as inventory levels normalize and buyer demand returns.",
        fullContent: "Austin's real estate market appears to be finding its footing after a period of significant adjustment. Home prices have stabilized after declining 15% from their 2022 peak, with median prices now at $525,000. Inventory levels have increased to a healthy 3.5 months of supply, giving buyers more options while still favoring sellers slightly. The tech sector's continued presence, despite some layoffs, provides underlying support for housing demand. First-time buyers are returning to the market, attracted by improved affordability and more reasonable bidding environments. New construction permits have increased 20% quarter-over-quarter, suggesting builder confidence in future demand.",
        impact: 'neutral' as const,
        location: "Austin, TX",
        propertyType: "Residential",
        category: "Regional Update"
      },
      {
        headline: "Miami Luxury Condo Market Attracts International Buyers",
        summary: "High-end condominium sales in Miami surge as international buyers return, driving prices to new heights in premium developments.",
        fullContent: "Miami's luxury condominium market experiences unprecedented demand from international buyers, particularly from Latin America and Europe. Sales of units priced above $1 million increased 35% year-over-year, with several record-breaking transactions in Brickell and South Beach. The weak dollar makes U.S. real estate attractive to foreign investors, while Miami's growing status as a tech and finance hub adds fundamental support. New developments are selling out in pre-construction phases, with developers reporting waiting lists for premium units. The influx of wealth is also driving demand for related services, from property management to high-end retail.",
        impact: 'positive' as const,
        location: "Miami, FL",
        propertyType: "Luxury Residential",
        category: "Luxury Market"
      },
      {
        headline: "Industrial Real Estate Demand Softens Amid E-commerce Slowdown",
        summary: "Warehouse and distribution center leasing activity declines as e-commerce growth normalizes post-pandemic.",
        fullContent: "The industrial real estate sector faces headwinds as e-commerce growth rates return to pre-pandemic levels. Warehouse vacancy rates have risen to 5.2% nationally, up from historic lows of 3.1% last year. Amazon and other major retailers are reassessing their distribution strategies, with some subleasing excess space. However, the shift toward nearshoring and supply chain resilience continues to support demand for well-located facilities. Cold storage and last-mile delivery facilities remain particularly sought after. Rental rate growth has moderated but remains positive at 4% annually, suggesting a soft landing rather than a crash.",
        impact: 'negative' as const,
        location: "Nationwide",
        propertyType: "Industrial",
        category: "Sector Analysis"
      },
      {
        headline: "California Passes New Affordable Housing Legislation",
        summary: "Sweeping new laws aim to accelerate affordable housing construction by streamlining approvals and providing tax incentives.",
        fullContent: "California legislators passed comprehensive affordable housing reform, marking the most significant policy change in decades. The new laws eliminate certain zoning restrictions, fast-track approval processes for qualifying projects, and provide substantial tax incentives for affordable housing development. Developers can now build up to 10% more units if 20% are designated as affordable. The legislation also includes $2 billion in state funding for infrastructure improvements in areas targeted for affordable housing. Early estimates suggest the measures could facilitate construction of 100,000 new affordable units over the next five years. Critics worry about impacts on neighborhood character, while supporters emphasize the urgent need to address the housing crisis.",
        impact: 'positive' as const,
        location: "California",
        propertyType: "Affordable Housing",
        category: "Policy Update"
      },
      {
        headline: "Phoenix Rental Market Faces Oversupply Concerns",
        summary: "Rapid apartment construction leads to rising vacancy rates and slowing rent growth in the Phoenix metropolitan area.",
        fullContent: "Phoenix's rental market shows signs of oversupply as 15,000 new apartment units come online this quarter. Vacancy rates have climbed to 8.5%, up from 4.2% a year ago, putting downward pressure on rents. Average rental rates have declined 3% year-over-year, marking the first annual decrease since 2009. The correction follows years of explosive growth that saw rents increase over 40% between 2020 and 2022. Property managers are offering increasing concessions, including free months and reduced deposits. However, continued population growth and job creation suggest the oversupply may be temporary, with absorption expected to improve by year-end.",
        impact: 'negative' as const,
        location: "Phoenix, AZ",
        propertyType: "Multifamily",
        category: "Rental Market"
      },
      {
        headline: "Boston Biotech Boom Drives Lab Space Development",
        summary: "Life sciences real estate development accelerates as biotech companies expand, creating new opportunities in the Greater Boston area.",
        fullContent: "Boston's life sciences real estate market continues its remarkable expansion with over 5 million square feet of lab space currently under construction. Venture capital investment in biotech remains robust, driving demand for specialized facilities. Conversion projects are transforming traditional office buildings into state-of-the-art laboratories, with premium rents justifying the substantial renovation costs. The Seaport District and Cambridge continue to be hotspots, with rental rates for lab space exceeding $100 per square foot. The boom is creating spillover effects in suburban markets like Waltham and Lexington. However, some worry about potential oversupply if venture funding slows.",
        impact: 'positive' as const,
        location: "Boston, MA",
        propertyType: "Life Sciences",
        category: "Specialty Market"
      },
      {
        headline: "Climate Change Impacts Coastal Property Insurance",
        summary: "Rising insurance costs and coverage limitations affect property values in flood-prone coastal areas across the Southeast.",
        fullContent: "Property insurance in coastal regions faces a crisis as major insurers exit markets or dramatically increase premiums. Florida, Louisiana, and South Carolina see the most significant impacts, with some properties becoming effectively uninsurable. Premium increases averaging 40% annually are forcing some owners to sell, putting downward pressure on values in vulnerable areas. State-backed insurance programs struggle with solvency as claims from recent hurricanes mount. The situation is reshaping development patterns, with investors increasingly focused on elevation and resilience features. Some communities are implementing aggressive adaptation strategies, including managed retreat from the most vulnerable areas.",
        impact: 'negative' as const,
        location: "Southeast Coast",
        propertyType: "Coastal Properties",
        category: "Risk Analysis"
      },
      {
        headline: "Denver's Build-to-Rent Sector Expands Rapidly",
        summary: "Single-family rental communities proliferate in Denver suburbs as institutional investors bet on long-term rental demand.",
        fullContent: "The build-to-rent (BTR) sector in Denver experiences explosive growth with 3,500 new single-family rental homes planned or under construction. Institutional investors are attracted by strong demographics, employment growth, and lifestyle preferences favoring rental flexibility. These purpose-built rental communities offer amenities similar to homeownership without the commitment, appealing to millennials and downsizing baby boomers. Average rents for BTR homes range from $2,500 to $3,500 monthly, providing attractive yields for investors. The trend is reshaping suburban development patterns, with some communities consisting entirely of rental homes. Local governments grapple with the implications for community stability and school funding.",
        impact: 'positive' as const,
        location: "Denver, CO",
        propertyType: "Single-Family Rental",
        category: "Emerging Trends"
      }
    ];

    // Generate time-seeded variations
    const generatedNews = newsTemplates.map((template, index) => {
      const timeOffset = (seed + index) % 24;
      const minuteOffset = ((seed * index) % 60);
      
      return {
        ...template,
        id: index + 1,
        time: `${timeOffset}:${minuteOffset.toString().padStart(2, '0')}`,
        readTime: `${3 + (index % 3)} min read`
      };
    });

    // Sort by time (most recent first)
    return generatedNews.sort((a, b) => {
      const timeA = parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]);
      const timeB = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
      return timeB - timeA;
    });
  };

  useEffect(() => {
    setNews(generateRealEstateNews());
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
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Building className="w-5 h-5 text-gray-600" />;
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
    <div className="min-h-screen bg-white">
      <main className="py-12 px-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Home className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-navy-900">
                Real Estate News
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Latest updates, market trends, and insights from the real estate industry
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === 'all' 
                  ? 'bg-navy-600 text-white' 
                  : 'bg-white text-navy-600 border border-navy-200 hover:bg-navy-50'
              }`}
            >
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
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-navy-900 mb-3 leading-tight">
                  {item.headline}
                </h2>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-1" />
                    {item.propertyType}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {item.summary}
                </p>

                {expandedItems.has(item.id) && (
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {item.fullContent}
                  </p>
                )}
                
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mb-4 transition-colors"
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
                
                <div className="flex items-center justify-end">
                </div>
              </article>
            ))}
          </div>

          {/* More News Coming Soon */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-lg">
              Real estate market updates refresh daily. Check back for the latest industry news and analysis.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealEstateNews;