import { Shield, Lock, Eye, CheckCircle } from "lucide-react";

const SecuritySectionCyberpunk = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Bank-Level Encryption",
      description: "Your data is protected with 256-bit SSL encryption, the same security used by major financial institutions.",
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "Multi-factor authentication and secure login protocols keep your account safe from unauthorized access.",
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "We never sell your data. Your financial information belongs to you and only you.",
    },
    {
      icon: CheckCircle,
      title: "Regular Audits",
      description: "Our systems undergo regular security audits and compliance checks to ensure the highest standards.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-success/30 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2 text-success" />
            Enterprise-Grade Security
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="gradient-text">Your Security</span> is Our Priority
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We employ industry-leading security measures to protect your financial data and give you peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="glass neon-border p-8 rounded-2xl hover:glow-neon transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="icon-bg-neon flex-shrink-0 group-hover:glow-purple transition-all duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 neon-text-purple">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 glass neon-border-cyan rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 cyber-gradient rounded-xl flex items-center justify-center glow-neon">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground neon-text-purple">SOC 2 Type II Certified</h3>
                <p className="text-muted-foreground">Independently audited and verified security standards</p>
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="w-8 h-8 text-yellow-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySectionCyberpunk;
