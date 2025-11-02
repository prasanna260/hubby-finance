import { TrendingUp, DollarSign, PiggyBank, LayoutDashboard, BarChart3, Building, HelpCircle, Bell, CreditCard, User, Mail, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Investment", url: "/investment", icon: BarChart3 },
  { title: "Dividend Tracker", url: "/dividend-tracker", icon: TrendingUp },
  { title: "Net Worth", url: "/net-worth", icon: DollarSign },
  { title: "Budget", url: "/budget", icon: PiggyBank },
  { title: "Real Estate", url: "/real-estate", icon: Building },
  { title: "How It Works", url: "/how-it-works", icon: HelpCircle },
];

const bottomItems = [
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
  { title: "Reminders", url: "/reminders", icon: Bell },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Newsletter", url: "/newsletter", icon: Mail },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, signOut } = useAuth();

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-slate-800 font-semibold text-sky-300"
      : "hover:bg-white text-sky-300 hover:text-black";

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="bg-slate-900 border-r border-slate-800"
    >
      {/* User Profile Section */}
      <div className="p-4 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
          <Avatar className="h-10 w-10" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
            <AvatarFallback className="text-white font-semibold" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          {open && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-white">
                {user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="bg-slate-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sky-400 uppercase tracking-wider px-3 py-2">Financial Tools</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) => `flex items-center px-3 py-2 rounded-lg transition-colors group ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="mr-3 h-5 w-5 text-sky-300 group-hover:text-sky-500 transition-colors" style={{ color: isActive(item.url) ? '#3b82f6' : undefined }} />
                      <span className="text-sm font-medium text-sky-500">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="bg-slate-900 border-t border-slate-800">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end
                  className={({ isActive }) => `flex items-center px-3 py-2 rounded-lg transition-colors group ${getNavCls({ isActive })}`}
                >
                  <item.icon className="mr-3 h-5 w-5 text-white group-hover:text-sky-500 transition-colors" style={{ color: isActive(item.url) ? '#3b82f6' : undefined }} />
                  <span className="text-sm font-medium text-sky-500">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signOut} className="text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors">
              <LogOut className="mr-3 h-5 w-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}