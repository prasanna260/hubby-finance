
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="glass border-b border-border/50 py-4 px-6 md:px-10 lg:px-20 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 cyber-gradient rounded-lg flex items-center justify-center text-white font-bold glow-purple transition-all duration-300 group-hover:glow-neon">
                M
              </div>
              <span className="text-foreground font-bold text-xl neon-text-purple">Mite Fi</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!user && (
              <>
                <Link to="/features" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:neon-text-purple">Features</Link>
                <Link to="/calculator" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:neon-text-purple">Calculator</Link>
                <Link to="/blog" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:neon-text-purple">Blog</Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:neon-text-purple">
                    News
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glass border-border">
                    <DropdownMenuItem asChild>
                      <Link to="/news" className="w-full hover:text-primary">Market News</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/crypto-news" className="w-full hover:text-primary">Crypto News</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/real-estate-news" className="w-full hover:text-primary">Real Estate News</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Link to="/roadmap" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:neon-text-purple">Roadmap</Link>
                <Link to="#" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:neon-text-purple">About Us</Link>
              </>
            )}
            
            <ThemeToggle />
            
            {!loading && (
                  user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center text-muted-foreground hover:text-primary font-medium transition-colors duration-200">
                        <User className="mr-2 h-4 w-4" />
                        {user.user_metadata?.full_name || user.email}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="glass border-border">
                        <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:text-red-300">
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                <>
                  <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary neon-border-purple">Login</Button>
                    </DialogTrigger>
                    <DialogContent className="glass border-border">
                      <DialogHeader>
                        <DialogTitle className="neon-text-purple">Welcome to Mite Fi</DialogTitle>
                        <DialogDescription>
                          Access your dividend tracker and financial tools
                        </DialogDescription>
                      </DialogHeader>
                      <div className="min-h-0">
                        <LoginForm onSuccess={() => setIsLoginDialogOpen(false)} />
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Link to="/sign-up">
                    <Button className="cyber-gradient glow-purple hover:glow-neon transition-all duration-300">Sign Up</Button>
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-primary focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {!user && (
                <>
                  <Link to="/features" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Features</Link>
                  <Link to="/calculator" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Calculator</Link>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Blog</Link>
                  <Link to="/news" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Market News</Link>
                  <Link to="/crypto-news" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Crypto News</Link>
                  <Link to="/real-estate-news" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Real Estate News</Link>
                  <Link to="/roadmap" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Roadmap</Link>
                  <Link to="#" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">About Us</Link>
                </>
              )}
              {user && (
                <>
                  <Link to="/dividend-tracker" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Dividend Tracker</Link>
                  <Link to="/net-worth" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Net Worth</Link>
                  <Link to="/budget" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Budget</Link>
                  <Link to="/reminders" className="text-muted-foreground hover:text-primary font-medium py-2 transition-colors duration-200">Reminders</Link>
                </>
              )}
              <div className="flex flex-col space-y-3">
                {!loading && (
                  user ? (
                    <Button onClick={handleSignOut} variant="outline" className="border-red-400/50 text-red-400 hover:bg-red-400/10 w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 neon-border-purple w-full">Login</Button>
                        </DialogTrigger>
                        <DialogContent className="glass border-border">
                          <DialogHeader>
                            <DialogTitle className="neon-text-purple">Welcome to Mite Fi</DialogTitle>
                            <DialogDescription>
                              Access your dividend tracker and financial tools
                            </DialogDescription>
                          </DialogHeader>
                          <div className="min-h-0">
                            <LoginForm onSuccess={() => setIsLoginDialogOpen(false)} />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Link to="/sign-up" className="w-full">
                        <Button className="cyber-gradient glow-purple hover:glow-neon transition-all duration-300 w-full">Sign Up</Button>
                      </Link>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
