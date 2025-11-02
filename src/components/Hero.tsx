
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Users, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-200/30 to-teal-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-100/20 via-pink-100/20 to-orange-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-sm font-medium text-gray-700">
              <Zap className="w-4 h-4 mr-2 text-yellow-500" />
              Empowering Families to Build Wealth
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-900">Take Control of Your</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
              The all-in-one platform for modern families to track investments, manage budgets, 
              and build wealth together with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/sign-up">
                <Button className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg py-7 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-white text-lg py-7 px-10 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-600">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">Family Collaboration</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Main dashboard mockup */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform hover:-translate-y-2 transition-all duration-500">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Portfolio Overview</h3>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12.5%</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Total Value</h4>
                    <p className="text-2xl font-bold text-gray-900">$127,340</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-2xl border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">$</span>
                      </div>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Monthly</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Dividends</h4>
                    <p className="text-2xl font-bold text-gray-900">$1,247</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">₿</span>
                      </div>
                      <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Crypto</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Bitcoin</h4>
                    <p className="text-2xl font-bold text-gray-900">0.847</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">🏠</span>
                      </div>
                      <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Property</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Real Estate</h4>
                    <p className="text-2xl font-bold text-gray-900">$485K</p>
                  </div>
                </div>
                
                {/* Chart placeholder */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-end justify-between h-20">
                    {[40, 65, 45, 80, 60, 95, 75].map((height, i) => (
                      <div 
                        key={i} 
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-md transition-all duration-1000 hover:from-blue-600 hover:to-purple-600" 
                        style={{height: `${height}%`, width: '12%'}}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-4 transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">↗</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">This Month</p>
                  <p className="text-lg font-bold text-gray-900">+$2,340</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-4 transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">👥</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">Family Members</p>
                  <p className="text-lg font-bold text-gray-900">4 Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
