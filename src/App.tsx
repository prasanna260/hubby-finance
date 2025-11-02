
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Investment from "./pages/Investment";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import TwoFactorVerify from "./pages/TwoFactorVerify";
import RealEstate from "./pages/RealEstate";
import Security from "./pages/Security";
import Roadmap from "./pages/Roadmap";
import News from "./pages/News";
import CryptoNews from "./pages/CryptoNews";
import RealEstateNews from "./pages/RealEstateNews";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import DividendTracker from "./pages/DividendTracker";
import Calculator from "./pages/Calculator";
import NetWorth from "./pages/NetWorth";
import Budget from "./pages/Budget";
import Reminders from "./pages/Reminders";
import Subscriptions from "./pages/Subscriptions";
import Profile from "./pages/Profile";
import Newsletter from "./pages/Newsletter";
import NewsDetail from "./pages/NewsDetail";
import CryptoNewsDetail from "./pages/CryptoNewsDetail";

const App = () => {
  // Create a client inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/investment" element={<Layout><Investment /></Layout>} />
            <Route path="/features" element={<Layout><Features /></Layout>} />
            <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
            <Route path="/sign-up" element={<Layout><SignUp /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/two-factor-verify" element={<TwoFactorVerify />} />
            <Route path="/real-estate" element={<Layout><RealEstate /></Layout>} />
            <Route path="/security" element={<Layout><Security /></Layout>} />
            <Route path="/roadmap" element={<Layout><Roadmap /></Layout>} />
            <Route path="/news" element={<Layout><News /></Layout>} />
            <Route path="/crypto-news" element={<Layout><CryptoNews /></Layout>} />
            <Route path="/real-estate-news" element={<Layout><RealEstateNews /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogDetail /></Layout>} />
            <Route path="/dividend-tracker" element={<Layout><DividendTracker /></Layout>} />
            <Route path="/calculator" element={<Layout><Calculator /></Layout>} />
            <Route path="/net-worth" element={<Layout><NetWorth /></Layout>} />
            <Route path="/budget" element={<Layout><Budget /></Layout>} />
            <Route path="/reminders" element={<Layout><Reminders /></Layout>} />
            <Route path="/subscriptions" element={<Layout><Subscriptions /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/newsletter" element={<Layout><Newsletter /></Layout>} />
            <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
            <Route path="/crypto-news/:id" element={<Layout><CryptoNewsDetail /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
