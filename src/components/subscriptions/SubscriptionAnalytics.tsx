import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Subscription } from '@/hooks/useSubscriptionsData';
import { TrendingUp, DollarSign, Calendar, AlertCircle, PieChart } from 'lucide-react';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { format, addDays, addWeeks, addMonths, addYears, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

interface SubscriptionAnalyticsProps {
  subscriptions: Subscription[];
}

export const SubscriptionAnalytics: React.FC<SubscriptionAnalyticsProps> = ({ subscriptions }) => {
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');

  // Calculate spending by period
  const calculateSpending = () => {
    let weekly = 0;
    let monthly = 0;
    let yearly = 0;

    activeSubscriptions.forEach(sub => {
      const amount = Number(sub.amount);
      switch (sub.billing_frequency) {
        case 'weekly':
          weekly += amount;
          monthly += amount * 4.33; // Average weeks per month
          yearly += amount * 52;
          break;
        case 'monthly':
          weekly += amount / 4.33;
          monthly += amount;
          yearly += amount * 12;
          break;
        case 'quarterly':
          weekly += amount / 13;
          monthly += amount / 3;
          yearly += amount * 4;
          break;
        case 'yearly':
          weekly += amount / 52;
          monthly += amount / 12;
          yearly += amount;
          break;
      }
    });

    return { weekly, monthly, yearly };
  };

  // Calculate upcoming bills for next 30 days
  const getUpcomingBills = () => {
    const today = new Date();
    const thirtyDaysFromNow = addDays(today, 30);
    const upcoming: Array<{ subscription: Subscription; date: Date }> = [];

    activeSubscriptions.forEach(sub => {
      let nextDate = new Date(sub.start_date);
      
      // Find next billing date
      while (nextDate <= today) {
        switch (sub.billing_frequency) {
          case 'weekly':
            nextDate = addWeeks(nextDate, 1);
            break;
          case 'monthly':
            nextDate = addMonths(nextDate, 1);
            break;
          case 'quarterly':
            nextDate = addMonths(nextDate, 3);
            break;
          case 'yearly':
            nextDate = addYears(nextDate, 1);
            break;
        }
      }

      // Check if within 30 days
      if (isWithinInterval(nextDate, { start: today, end: thirtyDaysFromNow })) {
        if (!sub.end_date || nextDate <= new Date(sub.end_date)) {
          upcoming.push({ subscription: sub, date: nextDate });
        }
      }
    });

    return upcoming.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Category breakdown
  const getCategoryBreakdown = () => {
    const breakdown: Record<string, number> = {};
    
    activeSubscriptions.forEach(sub => {
      const yearlyAmount = calculateYearlyAmount(sub);
      breakdown[sub.category] = (breakdown[sub.category] || 0) + yearlyAmount;
    });

    return Object.entries(breakdown)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  const calculateYearlyAmount = (sub: Subscription) => {
    const amount = Number(sub.amount);
    switch (sub.billing_frequency) {
      case 'weekly': return amount * 52;
      case 'monthly': return amount * 12;
      case 'quarterly': return amount * 4;
      case 'yearly': return amount;
      default: return 0;
    }
  };

  const spending = calculateSpending();
  const upcomingBills = getUpcomingBills();
  const categoryData = getCategoryBreakdown();
  const inactiveCount = subscriptions.filter(s => s.status === 'inactive').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#A4DE6C'];

  return (
    <div className="space-y-6">
      {/* Spending Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(spending.weekly)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(spending.monthly)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(spending.yearly)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </RechartsChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Bills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Bills (Next 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {upcomingBills.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No upcoming bills in the next 30 days
                </div>
              ) : (
                upcomingBills.map(({ subscription, date }, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{subscription.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(date, 'MMM dd, yyyy')}
                      </div>
                    </div>
                    <Badge variant="outline">{formatCurrency(subscription.amount)}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inactive Subscriptions Alert */}
      {inactiveCount > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="h-5 w-5" />
              Inactive Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 dark:text-yellow-300">
              You have {inactiveCount} inactive subscription{inactiveCount > 1 ? 's' : ''}. 
              Consider removing them if they're no longer needed.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};