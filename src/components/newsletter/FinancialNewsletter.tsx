import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Bitcoin, CreditCard, Home, Lightbulb, Globe, Mail, Send } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FinancialNewsletter = () => {
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const weekNumber = format(new Date(), "'Week' w 'of' yyyy");

  const sendTestNewsletter = async () => {
    try {
      toast.info("Sending test newsletter...");
      
      const { data, error } = await supabase.functions.invoke('send-weekly-newsletter', {
        body: { testMode: true }
      });

      if (error) {
        console.error('Newsletter error:', error);
        toast.error(`Failed to send newsletter: ${error.message}`);
      } else {
        toast.success("Test newsletter sent successfully! Check your email.");
      }
    } catch (err) {
      console.error('Error sending newsletter:', err);
      toast.error("Failed to send test newsletter");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Newsletter Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Weekly Financial Digest
        </h1>
        <p className="text-muted-foreground">{currentDate} • {weekNumber}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge variant="secondary">
            <Mail className="w-3 h-3 mr-1" />
            Your Weekly Financial Update
          </Badge>
          <Button 
            onClick={sendTestNewsletter}
            variant="outline"
            size="sm"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Test Newsletter
          </Button>
        </div>
      </div>

      {/* Market Overview */}
      <Card className="overflow-hidden border-l-4 border-l-primary">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
              <span className="font-medium">S&P 500</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">4,780.24</span>
                <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +1.2%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
              <span className="font-medium">Nasdaq</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">15,321.81</span>
                <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +1.8%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
              <span className="font-medium">Dow Jones</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">37,468.61</span>
                <Badge variant="default" className="bg-red-500/10 text-red-600 border-red-500/20">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -0.3%
                </Badge>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Key Winners:</span> Tech stocks led gains with NVDA up 5.2% on AI optimism. AAPL reached new highs ahead of earnings.
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Notable Events:</span> Fed minutes suggest rates may stay elevated. Q4 earnings season kicks off with mixed bank results.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Crypto Corner */}
      <Card className="overflow-hidden border-l-4 border-l-orange-500">
        <CardHeader className="bg-gradient-to-r from-orange-500/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <Bitcoin className="w-5 h-5 text-orange-500" />
            Crypto Corner
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-accent/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Bitcoin</span>
                <Badge variant="outline" className="text-xs">BTC</Badge>
              </div>
              <p className="text-xl font-bold">$48,325</p>
              <p className="text-sm text-green-600 font-medium">+3.4%</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Ethereum</span>
                <Badge variant="outline" className="text-xs">ETH</Badge>
              </div>
              <p className="text-xl font-bold">$2,456</p>
              <p className="text-sm text-green-600 font-medium">+4.1%</p>
            </div>
          </div>
          <Separator />
          <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
            <li>SEC approves Bitcoin ETF applications from major asset managers</li>
            <li>Ethereum network upgrade reduces gas fees by 25%</li>
            <li>Major retailers announce crypto payment integration for Q2</li>
          </ul>
        </CardContent>
      </Card>

      {/* Credit Cards & Banking */}
      <Card className="overflow-hidden border-l-4 border-l-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            Credit Cards & Banking
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-accent/30 border-l-2 border-l-blue-400">
              <p className="font-semibold text-sm mb-1">New Chase Sapphire Offer</p>
              <p className="text-sm text-muted-foreground">80,000 bonus points after $4,000 spend in 3 months</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/30 border-l-2 border-l-blue-400">
              <p className="font-semibold text-sm mb-1">Amex Gold Updates</p>
              <p className="text-sm text-muted-foreground">4x points on groceries extended, new dining credits added</p>
            </div>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg">
            <p className="text-sm font-semibold mb-1 flex items-center gap-1">
              💡 Quick Tip
            </p>
            <p className="text-sm text-muted-foreground">
              Stack grocery store gift cards with credit card categories for maximum rewards. Buy restaurant gift cards at 4x points, then dine at 4x for double rewards!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Real Estate */}
      <Card className="overflow-hidden border-l-4 border-l-green-500">
        <CardHeader className="bg-gradient-to-r from-green-500/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5 text-green-500" />
            Real Estate
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">30-Year Fixed</p>
              <p className="text-xl font-bold">6.62%</p>
              <p className="text-sm text-red-600">↑ 0.12%</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Median Home Price</p>
              <p className="text-xl font-bold">$412K</p>
              <p className="text-sm text-green-600">↑ 2.3% YoY</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
            <li>Housing inventory increases 15% month-over-month</li>
            <li>First-time buyer programs expand in major metros</li>
            <li>REITs show strong performance, yielding 4-6% dividends</li>
          </ul>
        </CardContent>
      </Card>

      {/* Personal Finance Tips */}
      <Card className="overflow-hidden border-l-4 border-l-purple-500">
        <CardHeader className="bg-gradient-to-r from-purple-500/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-500" />
            Personal Finance Tip of the Week
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
            <h4 className="font-semibold mb-2">The 1% Rule for Wealth Building</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Improve your finances by just 1% each month. Save 1% more, earn 1% more, or reduce expenses by 1%. 
              These tiny changes compound dramatically over time.
            </p>
            <div className="space-y-1 text-sm">
              <p className="font-medium">This week's challenge:</p>
              <ul className="list-disc list-inside text-muted-foreground ml-2">
                <li>Review all subscriptions and cancel one you don't use</li>
                <li>Negotiate one bill (internet, phone, insurance)</li>
                <li>Automate an extra $25/week to savings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Economic News */}
      <Card className="overflow-hidden border-l-4 border-l-indigo-500">
        <CardHeader className="bg-gradient-to-r from-indigo-500/5 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-500" />
            Global Economic News
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-accent/30 border-l-2 border-l-indigo-400">
              <p className="font-semibold text-sm mb-1">🇺🇸 Federal Reserve Signals</p>
              <p className="text-sm text-muted-foreground">
                Fed maintains hawkish stance, suggesting rates will remain "higher for longer" as inflation shows persistence above 3% target.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-accent/30 border-l-2 border-l-indigo-400">
              <p className="font-semibold text-sm mb-1">🇨🇳 China Economic Stimulus</p>
              <p className="text-sm text-muted-foreground">
                Beijing announces $140B infrastructure package to boost growth, focusing on renewable energy and tech sectors.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-accent/30 border-l-2 border-l-indigo-400">
              <p className="font-semibold text-sm mb-1">🇪🇺 ECB Policy Update</p>
              <p className="text-sm text-muted-foreground">
                European Central Bank hints at potential rate cuts in Q2 as eurozone inflation cools to 2.4%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Footer */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <p className="text-lg font-semibold">Stay Financially Informed! 📈</p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Remember: Knowledge is your best investment. Keep learning, stay diversified, and make informed decisions. 
              See you next week with more insights to grow your wealth!
            </p>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">
              Questions or feedback? We'd love to hear from you. Happy investing! 🚀
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialNewsletter;