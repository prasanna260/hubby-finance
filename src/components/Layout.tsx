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
        <div className="min-h-screen flex w-full bg-slate-50">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-16 flex items-center px-6 bg-white border-b border-slate-200 shadow-sm">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center flex-1">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold mr-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
                  M
                </div>
                <span className="font-display font-bold text-xl text-slate-800">Mite Fi</span>
              </div>
              <div className="flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-slate-600 hover:text-slate-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-100">
                    <span className="text-sm mr-1">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border-slate-200">
                    <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <main className="flex-1 p-6 md:p-8 bg-slate-50">
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