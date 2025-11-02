
import { Milestone, Route, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import FeatureRequestForm from "@/components/FeatureRequestForm";

const Roadmap = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      
      <main>
        <section className="py-16 md:py-24 px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Product Roadmap
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're constantly improving Family Financial Hub to help your family build wealth. Here's what we're working on and planning for the future.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border transform -translate-x-1/2"></div>

              {/* Current Quarter */}
              <div className="mb-20">
                <div className="flex items-center mb-8">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <CalendarCheck className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground ml-4">Current Quarter</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card p-6 rounded-xl shadow-md border border-border md:translate-x-4 relative">
                    <span className="absolute top-6 left-0 md:left-auto md:right-0 h-3 w-3 rounded-full bg-primary transform -translate-x-7 md:translate-x-7"></span>
                    <div className="flex items-start">
                      <Milestone className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Enhanced Real Estate Tools</h3>
                        <p className="text-muted-foreground">Advanced comparison tools for investment properties, ROI calculators, and rental income trackers.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-xl shadow-md border border-border md:-translate-x-4 relative md:mt-16">
                    <span className="absolute top-6 left-0 h-3 w-3 rounded-full bg-primary transform -translate-x-7"></span>
                    <div className="flex items-start">
                      <Milestone className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Family Budget Collaboration</h3>
                        <p className="text-muted-foreground">Shared budget planning with role-based permissions and spending notifications for family members.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-20">
                <div className="flex items-center mb-8">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <Route className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground ml-4">Next Quarter</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card p-6 rounded-xl shadow-md border border-border md:translate-x-4 relative">
                    <span className="absolute top-6 left-0 md:left-auto md:right-0 h-3 w-3 rounded-full bg-primary transform -translate-x-7 md:translate-x-7"></span>
                    <div className="flex items-start">
                      <Milestone className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Investment Portfolio Analytics</h3>
                        <p className="text-muted-foreground">Comprehensive analytics dashboard for stocks, crypto, and real estate investments with performance metrics.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-xl shadow-md border border-border md:-translate-x-4 relative md:mt-16">
                    <span className="absolute top-6 left-0 h-3 w-3 rounded-full bg-primary transform -translate-x-7"></span>
                    <div className="flex items-start">
                      <Milestone className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Mortgage Optimization Tools</h3>
                        <p className="text-muted-foreground">Advanced mortgage comparison tools and refinancing calculators to save on interest and optimize payments.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-8">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <Route className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground ml-4">Future Roadmap</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card p-6 rounded-xl shadow-md border border-border md:translate-x-4 relative">
                    <span className="absolute top-6 left-0 md:left-auto md:right-0 h-3 w-3 rounded-full bg-primary transform -translate-x-7 md:translate-x-7"></span>
                    <div className="flex items-start">
                      <Milestone className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Financial Advisor</h3>
                        <p className="text-muted-foreground">Personalized financial recommendations based on your family's spending habits and investment goals.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-xl shadow-md border border-border md:-translate-x-4 relative md:mt-16">
                    <span className="absolute top-6 left-0 h-3 w-3 rounded-full bg-primary transform -translate-x-7"></span>
                    <div className="flex items-start">
                      <Milestone className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Estate Planning Integration</h3>
                        <p className="text-muted-foreground">Tools to help with legacy planning, will creation, and intergenerational wealth transfer strategies.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback section */}
            <div className="mt-20 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Have Suggestions?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We'd love to hear your ideas for features that would help your family's financial journey.
              </p>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto">
                    Submit Feature Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Submit a Feature Request</DialogTitle>
                    <DialogDescription>
                      Tell us about the feature you'd like to see in Mite Fi. Your feedback helps us build a better financial platform for families.
                    </DialogDescription>
                  </DialogHeader>
                  <FeatureRequestForm onSuccess={() => setIsDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default Roadmap;
