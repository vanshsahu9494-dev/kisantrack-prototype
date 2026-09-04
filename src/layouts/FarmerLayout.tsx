import React, { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDemo } from "@/lib/demo-store";
import {
  LayoutDashboard, CalendarPlus, Hash, Truck, MapPin,
  Bell, Headphones, Globe, LogOut, Menu, X, ChevronDown, Leaf
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavLink = ({ label, icon: Icon, path, badge, extra }: {
    label: string; icon: React.ComponentType<{ className?: string }>; path: string; badge?: number; extra?: string;
  }) => (
    <button
      onClick={() => { navigate(path); setSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        location.pathname === path
          ? "bg-white/15 text-white shadow-sm"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className="w-4.5 h-4.5 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
      {extra && <span className="text-xs text-white/60">{extra}</span>}
    </button>
  );

  const sidebar = (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1a5c2e] to-[#0d3a18]">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">KisanTrack</h1>
            <p className="text-[10px] text-emerald-300/70 -mt-0.5">Smart Procurement</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <p className="px-4 py-2 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Main</p>
        {NAV_ITEMS.map(item => <NavLink key={item.path} {...item} />)}
        <p className="px-4 py-2 mt-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Other</p>
        {OTHER_ITEMS.map(item => <NavLink key={item.path} {...item} />)}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300 font-bold text-sm">
            {currentUser?.name?.charAt(0) || "F"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser?.name}</p>
            <p className="text-[10px] text-emerald-300/60">Farmer ID: {currentUser?.farmerId}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f0f7f2] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-emerald-900/10">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 z-10">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-emerald-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-emerald-50 rounded-lg">
            <Menu className="w-5 h-5 text-emerald-800" />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-emerald-900">KisanTrack</span>
          </div>
          <button onClick={() => navigate("/dashboard/notifications")} className="relative p-2 hover:bg-emerald-50 rounded-lg">
            <Bell className="w-5 h-5 text-emerald-800" />
            {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{unreadCount}</span>}
          </button>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
