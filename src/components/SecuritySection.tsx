
import { Button } from "@/components/ui/button";
import { Shield, Users, Lock, CheckCircle, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const SecuritySection = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 text-sm font-medium text-green-700 mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise-Grade Security
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Security & Privacy</span>
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Your Family Can Trust
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Your family's financial data deserves the highest level of protection. We've built 
              our platform with security and privacy as the foundation, not an afterthought.
            </p>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">SOC 2 Compliant</h4>
                  <p className="text-gray-600 text-sm">Independently audited security controls</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">99.9% Uptime</h4>
                  <p className="text-gray-600 text-sm">Reliable access when you need it</p>
                </div>
              </div>
            </div>
            
            <Link to="/security">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Learn About Our Security
              </Button>
            </Link>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="space-y-6">
                {/* Security features */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">256-Bit Encryption</h3>
                    <p className="text-gray-600">Military-grade data protection</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Role-Based Access</h3>
                    <p className="text-gray-600">Control who sees what information</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Zero-Knowledge</h3>
                    <p className="text-gray-600">We can't see your sensitive data</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Security metrics */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">100%</div>
                      <div className="text-sm text-gray-600">Encrypted</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">24/7</div>
                      <div className="text-sm text-gray-600">Monitoring</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">0</div>
                      <div className="text-sm text-gray-600">Breaches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating security badges */}
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-4 transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="font-semibold text-gray-900">SOC 2</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-4 transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-500" />
                <span className="font-semibold text-gray-900">GDPR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
