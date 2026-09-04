import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarPlus, MapPin, Hash, Truck, Cloud, Sun,
  CloudRain, ArrowRight, Clock, TrendingUp, CheckCircle2
} from "lucide-react";

const QUICK_ACTIONS = [
  { label: "Book a Slot", sub: "Reserve a procurement window", icon: CalendarPlus, path: "/dashboard/book" },
  { label: "Find Centre", sub: "Locate nearby mandis", icon: MapPin, path: "/dashboard/centres" },
  { label: "My Token", sub: "View active token details", icon: Hash, path: "/dashboard/token" },
  { label: "Track Procurement", sub: "Monitor procurement progress", icon: Truck, path: "/dashboard/track" },
];

export default function FarmerDashboard() {
  const { currentUser, getActiveBooking, getFarmerBookings, centers } = useDemo();
  const navigate = useNavigate();
  const activeBooking = getActiveBooking();
  const recentBookings = getFarmerBookings().slice(0, 3);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {greeting()}, {currentUser?.name?.split(" ")[0]} 🌿
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Here's what's happening in your area today.</p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Live Mandi Status */}
        <Card className="bg-[#111512] border-white/5 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Live Mandi Status</span>
              <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Operational
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Karnal Mandi</h3>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-2xl font-bold text-white font-mono">128</p>
                <p className="text-[10px] text-zinc-500">Farmers in Queue</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-mono">1.5 hrs</p>
                <p className="text-[10px] text-zinc-500">Avg. Wait Time</p>
              </div>
            </div>
            <button onClick={() => navigate("/dashboard/centres")} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              View Mandi Details <ArrowRight className="w-4 h-4" />
            </button>
          </CardContent>
        </Card>

        {/* Active Token */}
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Your Active Token</span>
              {activeBooking && <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>}
            </div>
            {activeBooking ? (
              <>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Token Number</p>
                <p className="text-3xl font-bold text-white tracking-wider font-mono">{activeBooking.tokenNumber}</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/10 rounded-lg p-3">
                    <p className="text-lg font-bold text-white font-mono">{activeBooking.queuePosition} / {activeBooking.totalInQueue}</p>
                    <p className="text-[10px] text-zinc-500">Position in Queue</p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                    <p className="text-lg font-bold text-white font-mono">{activeBooking.estimatedWait}</p>
                    <p className="text-[10px] text-zinc-500">Est. Wait Time</p>
                  </div>
                </div>
                <button onClick={() => navigate("/dashboard/token")} className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  Track Now <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <Hash className="w-10 h-10 text-zinc-700 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">No active booking</p>
                <Button onClick={() => navigate("/dashboard/book")} className="mt-3 bg-emerald-600 hover:bg-emerald-500 text-white" size="sm">
                  Book a Slot
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weather */}
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Weather Update</span>
              <Sun className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-bold text-white font-mono">28°</span>
              <span className="text-sm text-zinc-500 mb-1">C</span>
            </div>
            <p className="text-sm text-zinc-300 font-medium mb-1">Partly Cloudy</p>
            <p className="text-xs text-zinc-600">Humidity: 60% · Wind: 12 km/h</p>
            <div className="flex gap-2 mt-4">
              {[
                { day: "Mon", icon: Sun, temp: "30°" },
                { day: "Tue", icon: Cloud, temp: "27°" },
                { day: "Wed", icon: CloudRain, temp: "25°" },
                { day: "Thu", icon: Sun, temp: "31°" },
              ].map(d => (
                <div key={d.day} className="flex-1 text-center bg-white/5 rounded-lg p-2 border border-white/5">
                  <p className="text-[10px] text-zinc-500">{d.day}</p>
                  <d.icon className="w-4 h-4 text-zinc-400 mx-auto my-1" />
                  <p className="text-xs font-bold text-white font-mono">{d.temp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(action => (
            <button key={action.label} onClick={() => navigate(action.path)}
              className="bg-[#111512] border border-white/5 rounded-xl p-5 hover:border-emerald-500/20 transition-all text-center group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/15 transition-colors">
                <action.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-sm font-semibold text-white">{action.label}</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">{action.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <Card className="bg-[#111512] border-emerald-500/10">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Smart Insights</h3>
              <p className="text-[10px] text-zinc-500">Powered by KisanTrack AI</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
              <p className="text-xs font-medium text-zinc-400">🕐 Best Time to Visit</p>
              <p className="text-sm font-bold text-white mt-1">Tomorrow, 6:00–8:00 AM</p>
              <p className="text-[10px] text-zinc-500">Lowest crowd expected</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
              <p className="text-xs font-medium text-zinc-400">📍 Recommended Centre</p>
              <p className="text-sm font-bold text-white mt-1">Ambala Mandi</p>
              <p className="text-[10px] text-zinc-500">Shortest wait: ~45 min</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/5">
              <p className="text-xs font-medium text-zinc-400">🌾 Price Trend</p>
              <p className="text-sm font-bold text-white mt-1">Wheat: ₹2,450/qtl ↑3%</p>
              <p className="text-[10px] text-zinc-500">Favourable time to sell</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-[#111512] border-white/5">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Recent Activity</h3>
            <button onClick={() => navigate("/dashboard/notifications")} className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">View All</button>
          </div>
          <div className="space-y-2">
            {recentBookings.length > 0 ? recentBookings.map(booking => (
              <div key={booking.id} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  booking.status === "completed" ? "bg-emerald-500/15 text-emerald-400" :
                  booking.status === "in_queue" ? "bg-amber-500/15 text-amber-400" :
                  booking.status === "processing" ? "bg-blue-500/15 text-blue-400" :
                  "bg-emerald-500/15 text-emerald-400"
                }`}>
                  {booking.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    {booking.status === "completed" ? "Procurement Completed" :
                     booking.status === "processing" ? "Processing at Mandi" :
                     booking.status === "in_queue" ? "In Queue" :
                     "Slot Booked"} — {booking.centerName}
                  </p>
                  <p className="text-xs text-zinc-500">{booking.crop} · {booking.tokenNumber} · {booking.createdAt}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  booking.status === "completed" ? "bg-emerald-500/15 text-emerald-400" :
                  booking.status === "in_queue" ? "bg-amber-500/15 text-amber-400" :
                  booking.status === "processing" ? "bg-blue-500/15 text-blue-400" :
                  "bg-emerald-500/15 text-emerald-400"
                }`}>
                  {booking.status === "completed" ? "Completed" :
                   booking.status === "in_queue" ? "In Queue" :
                   booking.status === "processing" ? "In Progress" :
                   "Confirmed"}
                </span>
              </div>
            )) : (
              <div className="text-center py-8 text-zinc-600">
                <p className="text-sm">No recent activity</p>
                <Button onClick={() => navigate("/dashboard/book")} className="mt-3 bg-emerald-600 hover:bg-emerald-500 text-white" size="sm">
                  Book Your First Slot
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
