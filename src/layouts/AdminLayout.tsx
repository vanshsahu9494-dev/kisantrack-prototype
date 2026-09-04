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
    <div className="flex flex-col h-full bg-[#0c0f0d] border-r border-white/5">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">KisanTrack</h1>
            <p className="text-[10px] text-zinc-500 -mt-0.5">District Administration</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="px-4 py-2 text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Overview</p>
        {NAV_ITEMS.slice(0, 2).map(item => (
          <button key={item.path} onClick={() => { navigate(item.path); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              location.pathname === item.path ? "bg-emerald-500/15 text-emerald-300" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            }`}>
            <item.icon className="w-4.5 h-4.5" />
            <span className="text-left">{item.label}</span>
          </button>
        ))}
        <p className="px-4 py-2 mt-3 text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Management</p>
        {NAV_ITEMS.slice(2).map(item => (
          <button key={item.path} onClick={() => { navigate(item.path); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              location.pathname === item.path ? "bg-emerald-500/15 text-emerald-300" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            }`}>
            <item.icon className="w-4.5 h-4.5" />
            <span className="text-left">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-sm">
            {currentUser?.name?.charAt(0) || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">{currentUser?.name}</p>
            <p className="text-[10px] text-zinc-500">District Administrator</p>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-500 hover:text-zinc-200 hover:bg-white/5 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" /> <span>Sign Out</span>
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
          <div className="w-9" />
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
