import React, { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDemo } from "@/lib/demo-store";
import {
  LayoutDashboard, CalendarPlus, Hash, Truck, MapPin,
  Bell, Headphones, Globe, LogOut, Menu, ChevronDown, Leaf
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Book a Slot", icon: CalendarPlus, path: "/dashboard/book" },
  { label: "My Token", icon: Hash, path: "/dashboard/token" },
  { label: "Track Procurement", icon: Truck, path: "/dashboard/track" },
  { label: "Find Centre", icon: MapPin, path: "/dashboard/centres" },
];

const OTHER_ITEMS = [
  { label: "Notifications", icon: Bell, path: "/dashboard/notifications", badge: 3 },
  { label: "Support", icon: Headphones, path: "/dashboard/support" },
  { label: "Language", icon: Globe, path: "/dashboard/language", extra: "हिंदी" },
];

export default function FarmerLayout({ children }: { children: ReactNode }) {
  const { currentUser, logout, notifications } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate("/"); };

  const NavLink = ({ label, icon: Icon, path, badge, extra }: {
    label: string; icon: React.ComponentType<{ className?: string }>; path: string; badge?: number; extra?: string;
  }) => (
    <button
      onClick={() => { navigate(path); setSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        location.pathname === path
          ? "bg-emerald-500/15 text-emerald-300"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
      }`}
    >
      <Icon className="w-4.5 h-4.5 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
      {extra && <span className="text-xs text-zinc-500">{extra}</span>}
    </button>
  );

  const sidebar = (
    <div className="flex flex-col h-full bg-[#0c0f0d] border-r border-white/5">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">KisanTrack</h1>
            <p className="text-[10px] text-zinc-500 -mt-0.5">Smart Procurement Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        <p className="px-4 py-2 text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Main</p>
        {NAV_ITEMS.map(item => <NavLink key={item.path} {...item} />)}
        <p className="px-4 py-2 mt-3 text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Other</p>
        {OTHER_ITEMS.map(item => <NavLink key={item.path} {...item} />)}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-sm">
            {currentUser?.name?.charAt(0) || "F"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">{currentUser?.name}</p>
            <p className="text-[10px] text-zinc-500">Farmer ID: {currentUser?.farmerId}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-600" />
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-500 hover:text-zinc-200 hover:bg-white/5 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0d0b] text-zinc-100 flex">
      <aside className="hidden lg:block w-64 shrink-0">{sidebar}</aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 z-10">{sidebar}</aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-[#0a0d0b]/80 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg">
            <Menu className="w-5 h-5 text-zinc-400" />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-sm">KisanTrack</span>
          </div>
          <button onClick={() => navigate("/dashboard/notifications")} className="relative p-2 hover:bg-white/5 rounded-lg">
            <Bell className="w-5 h-5 text-zinc-400" />
            {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{unreadCount}</span>}
          </button>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
