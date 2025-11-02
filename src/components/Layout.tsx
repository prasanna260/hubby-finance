import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-16 flex items-center px-6 bg-card border-b border-border shadow-sm">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center flex-1">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold mr-3 shadow-sm bg-primary text-primary-foreground">
                  M
                </div>
                <span className="font-display font-bold text-xl text-foreground">Mite Fi</span>
              </div>
              <div className="flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-foreground font-medium transition-colors px-3 py-2 rounded-lg hover:bg-accent">
                    <span className="text-sm mr-1">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border border-border">
                    <DropdownMenuItem onClick={signOut} className="text-red-400 focus:text-red-400 focus:bg-red-950/30">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <main className="flex-1 p-6 md:p-8 bg-background">
              <div className="max-w-[1400px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
}