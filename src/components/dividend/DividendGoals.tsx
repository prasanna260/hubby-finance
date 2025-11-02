
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: "income" | "yield" | "portfolio";
  status: "active" | "completed" | "paused";
}

const DividendGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Monthly Dividend Income",
      targetAmount: 500,
      currentAmount: 175,
      targetDate: "2024-12-31",
      category: "income",
      status: "active"
    },
    {
      id: "2",
      title: "Portfolio Yield Target",
      targetAmount: 4.0,
      currentAmount: 3.2,
      targetDate: "2024-06-30",
      category: "yield",
      status: "active"
    },
    {
      id: "3",
      title: "Total Portfolio Value",
      targetAmount: 50000,
      currentAmount: 32500,
      targetDate: "2025-01-01",
      category: "portfolio",
      status: "active"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "income": return "💰";
      case "yield": return "📈";
      case "portfolio": return "💼";
      default: return "🎯";
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    toast.success("Goal deleted successfully");
  };

  const completedGoals = goals.filter(g => g.status === "completed").length;
  const activeGoals = goals.filter(g => g.status === "active").length;
  const avgProgress = goals.reduce((sum, goal) => sum + calculateProgress(goal.currentAmount, goal.targetAmount), 0) / goals.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{goals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{activeGoals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedGoals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{avgProgress.toFixed(0)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target size={20} />
                Dividend Goals
              </CardTitle>
              <CardDescription>Track your dividend investment objectives</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map((goal) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              const isCompleted = progress >= 100;
              
              return (
                <div key={goal.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                        <h3 className="font-bold text-lg">{goal.title}</h3>
                        <Badge className={getStatusColor(goal.status)}>
                          {goal.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Target: {goal.category === "yield" ? `${goal.targetAmount}%` : `$${goal.targetAmount.toLocaleString()}`} 
                        by {new Date(goal.targetDate).toLocaleDateString()}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">
                            {goal.category === "yield" 
                              ? `${goal.currentAmount}% / ${goal.targetAmount}%`
                              : `$${goal.currentAmount.toLocaleString()} / $${goal.targetAmount.toLocaleString()}`
                            }
                          </span>
                        </div>
                        <Progress value={progress} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{progress.toFixed(1)}% Complete</span>
                          {!isCompleted && (
                            <span>
                              {goal.category === "yield" 
                                ? `${(goal.targetAmount - goal.currentAmount).toFixed(1)}% to go`
                                : `$${(goal.targetAmount - goal.currentAmount).toLocaleString()} to go`
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit size={14} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  {isCompleted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-800">
                        <TrendingUp size={16} />
                        <span className="font-medium">Congratulations! Goal achieved!</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DividendGoals;
