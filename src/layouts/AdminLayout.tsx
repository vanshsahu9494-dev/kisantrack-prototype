import React, { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDemo } from "@/lib/demo-store";
import {
  LayoutDashboard, MapPin, BarChart3, FileText,
  Bell, Settings, LogOut, Menu, Leaf, Users
} from "lucide-react";

const NAV_ITEMS = [
  { label: "District Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Mandi Overview", icon: MapPin, path: "/admin/mandis" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Farmers", icon: Users, path: "/admin/farmers" },
  { label: "Reports", icon: FileText, path: "/admin/reports" },
  { label: "Notifications", icon: Bell, path: "/admin/notifications" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { currentUser, logout } = useDemo();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  const sidebar = (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1a5c2e] to-[#0d3a18]">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">KisanTrack</h1>
            <p className="text-[10px] text-emerald-300/70 -mt-0.5">District Admin</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        <p className="px-4 py-2 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Mandi Overview</p>
        {NAV_ITEMS.slice(0, 2).map(item => (
          <button key={item.path} onClick={() => { navigate(item.path); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              location.pathname === item.path ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}>
            <item.icon className="w-4.5 h-4.5" />
            <span className="text-left">{item.label}</span>
          </button>
        ))}
        <p className="px-4 py-2 mt-3 text-[10px] font-semibold text-white/40 uppercase tracking-wider">Management</p>
        {NAV_ITEMS.slice(2).map(item => (
          <button key={item.path} onClick={() => { navigate(item.path); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              location.pathname === item.path ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}>
            <item.icon className="w-4.5 h-4.5" />
            <span className="text-left">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300 font-bold text-sm">
            {currentUser?.name?.charAt(0) || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser?.name}</p>
            <p className="text-[10px] text-emerald-300/60">District Admin</p>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" /> <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f0f7f2] flex">
      <aside className="hidden lg:block w-64 shrink-0 border-r border-emerald-900/10">{sidebar}</aside>
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 z-10">{sidebar}</aside>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-emerald-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-emerald-50 rounded-lg">
            <Menu className="w-5 h-5 text-emerald-800" />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-emerald-900">KisanTrack</span>
          </div>
          <div className="w-9" />
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
