
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Users, Lock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <main>
        <section className="pt-10 pb-16 px-6 md:px-10 lg:px-20 bg-muted">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center text-primary mb-6 hover:text-primary/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Security and Privacy at Mite Fi
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
              We've built our platform with security and privacy as our top priorities, ensuring your family's sensitive financial information is always protected.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-card p-8 rounded-xl shadow-md border border-border">
                <div className="bg-primary/20 text-primary p-4 rounded-lg inline-flex mb-6">
                  <Shield className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Bank-Level Encryption</h2>
                <p className="text-muted-foreground">
                  We use 256-bit encryption for all data at rest and in transit, the same level of security used by major financial institutions worldwide.
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-xl shadow-md border border-border">
                <div className="bg-primary/20 text-primary p-4 rounded-lg inline-flex mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Role-Based Access</h2>
                <p className="text-muted-foreground">
                  Customize exactly what financial information each family member can see and interact with through our granular permission system.
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-xl shadow-md border border-border">
                <div className="bg-primary/20 text-primary p-4 rounded-lg inline-flex mb-6">
                  <Lock className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">No Data Selling</h2>
                <p className="text-muted-foreground">
                  Unlike many financial apps, we never sell your data to third parties. Your financial information stays private and secure with us.
                </p>
              </div>
            </div>
            
            <div className="bg-card p-8 md:p-12 rounded-xl shadow-lg border border-border">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Our Security Commitments</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2">Regular Security Audits</h3>
                    <p className="text-muted-foreground">Our systems undergo regular third-party security audits and penetration testing to identify and address potential vulnerabilities before they can be exploited.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2">Multi-Factor Authentication</h3>
                    <p className="text-muted-foreground">We offer multi-factor authentication options to add an extra layer of security to your account, preventing unauthorized access even if passwords are compromised.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2">Transparent Privacy Policy</h3>
                    <p className="text-muted-foreground">Our privacy policy is written in clear, understandable language so you know exactly what data we collect and how we use it to provide our services.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2">Secure Data Centers</h3>
                    <p className="text-muted-foreground">Our infrastructure is hosted in SOC 2 compliant data centers with 24/7 security monitoring, redundant power systems, and physical access controls.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-border">
                <Link to="/sign-up">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 px-8">
                    Start Your Secure Financial Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default Security;
