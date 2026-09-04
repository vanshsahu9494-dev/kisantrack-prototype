import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarPlus, MapPin, Hash, Truck, Cloud, Sun,
  CloudRain, ArrowRight, Clock, TrendingUp, CheckCircle2
} from "lucide-react";

const QUICK_ACTIONS = [
  { label: "Book a Slot", sub: "Reserve your slot", icon: CalendarPlus, path: "/dashboard/book", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { label: "Find Centre", sub: "Locate mandis", icon: MapPin, path: "/dashboard/centres", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { label: "My Token", sub: "View token details", icon: Hash, path: "/dashboard/token", color: "bg-amber-50 text-amber-600 border-amber-100" },
  { label: "Track Procurement", sub: "Track your produce", icon: Truck, path: "/dashboard/track", color: "bg-purple-50 text-purple-600 border-purple-100" },
];

export default function FarmerDashboard() {
  const { currentUser, getActiveBooking, getFarmerBookings, centers } = useDemo();
  const navigate = useNavigate();
  const activeBooking = getActiveBooking();
  const recentBookings = getFarmerBookings().slice(0, 3);
  const currentCenter = activeBooking ? centers.find(c => c.id === activeBooking.centerId) : null;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-emerald-900">
          Good Morning, {currentUser?.name?.split(" ")[0]}! 🌿
        </h1>
        <p className="text-sm text-emerald-600/70 mt-1">Here's what's happening in your area today.</p>
      </div>

      {/* Top cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Live Mandi Status */}
        <Card className="bg-gradient-to-br from-[#1a5c2e] to-[#0d3a18] text-white border-0 overflow-hidden relative">
          <CardContent className="p-5 relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-emerald-200">Live Mandi Status</span>
              <span className="bg-emerald-400/20 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Operational
              </span>
            </div>
            <h3 className="text-lg font-bold mb-4">Karnal Mandi</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-2xl font-bold">128</p>
                <p className="text-[10px] text-emerald-200/70">Farmers in Queue</p>
              </div>
              <div>
                <p className="text-2xl font-bold">1.5 hrs</p>
                <p className="text-[10px] text-emerald-200/70">Avg. Wait Time</p>
              </div>
            </div>
            <button onClick={() => navigate("/dashboard/centres")} className="w-full bg-white/15 hover:bg-white/25 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              View Mandi Details <ArrowRight className="w-4 h-4" />
            </button>
          </CardContent>
        </Card>

        {/* Active Token */}
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-600/70">Your Active Token</span>
              {activeBooking && <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>}
            </div>
            {activeBooking ? (
              <>
                <p className="text-xs text-emerald-500 mb-1">Token Number</p>
                <p className="text-3xl font-bold text-emerald-900 tracking-wider">{activeBooking.tokenNumber}</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <p className="text-lg font-bold text-emerald-800">{activeBooking.queuePosition} / {activeBooking.totalInQueue}</p>
                    <p className="text-[10px] text-emerald-600/70">Position in Queue</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <p className="text-lg font-bold text-amber-800">{activeBooking.estimatedWait}</p>
                    <p className="text-[10px] text-amber-600/70">Est. Wait Time</p>
                  </div>
                </div>
                <button onClick={() => navigate("/dashboard/token")} className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  Track Now <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <Hash className="w-10 h-10 text-emerald-200 mx-auto mb-2" />
                <p className="text-sm text-emerald-600/70">No active booking</p>
                <Button onClick={() => navigate("/dashboard/book")} className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
                  Book a Slot Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weather */}
        <Card className="border-emerald-100">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-emerald-600/70">Weather Update</span>
              <Sun className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-bold text-emerald-900">28°</span>
              <span className="text-sm text-emerald-600/70 mb-1">C</span>
            </div>
            <p className="text-sm text-emerald-700 font-medium mb-1">Partly Cloudy</p>
            <p className="text-xs text-emerald-600/60">Humidity: 60% • Wind: 12 km/h</p>
            <div className="flex gap-2 mt-4">
              {[
                { day: "Mon", icon: Sun, temp: "30°" },
                { day: "Tue", icon: Cloud, temp: "27°" },
                { day: "Wed", icon: CloudRain, temp: "25°" },
                { day: "Thu", icon: Sun, temp: "31°" },
              ].map(d => (
                <div key={d.day} className="flex-1 text-center bg-emerald-50 rounded-lg p-2">
                  <p className="text-[10px] text-emerald-600/70">{d.day}</p>
                  <d.icon className="w-4 h-4 text-emerald-500 mx-auto my-1" />
                  <p className="text-xs font-bold text-emerald-800">{d.temp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-emerald-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(action => (
            <button key={action.label} onClick={() => navigate(action.path)}
              className="bg-white rounded-xl p-5 border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all text-center group">
              <div className={`w-12 h-12 rounded-xl ${action.color} border flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-emerald-900">{action.label}</p>
              <p className="text-[11px] text-emerald-600/60 mt-0.5">{action.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <Card className="border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-blue-50/50">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-900">AI Smart Insights</h3>
              <p className="text-[10px] text-emerald-600/60">Powered by KisanTrack AI</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-100">
              <p className="text-xs font-medium text-emerald-700">🕐 Best Time to Visit</p>
              <p className="text-sm font-bold text-emerald-900 mt-1">Tomorrow, 6:00-8:00 AM</p>
              <p className="text-[10px] text-emerald-600/60">Lowest crowd expected</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-100">
              <p className="text-xs font-medium text-emerald-700">📍 Recommended Centre</p>
              <p className="text-sm font-bold text-emerald-900 mt-1">Ambala Mandi</p>
              <p className="text-[10px] text-emerald-600/60">Shortest wait time: 45 min</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-emerald-100">
              <p className="text-xs font-medium text-emerald-700">🌾 Price Trend</p>
              <p className="text-sm font-bold text-emerald-900 mt-1">Wheat: ₹2,450/qtl ↑3%</p>
              <p className="text-[10px] text-emerald-600/60">Good time to sell</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-emerald-100">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-emerald-900">Recent Activity</h3>
            <button onClick={() => navigate("/dashboard/notifications")} className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentBookings.length > 0 ? recentBookings.map(booking => (
              <div key={booking.id} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  booking.status === "completed" ? "bg-emerald-100 text-emerald-600" :
                  booking.status === "in_queue" ? "bg-amber-100 text-amber-600" :
                  booking.status === "processing" ? "bg-blue-100 text-blue-600" :
                  "bg-emerald-100 text-emerald-600"
                }`}>
                  {booking.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-emerald-900">
                    {booking.status === "completed" ? "Procurement Completed" :
                     booking.status === "processing" ? "Processing at Mandi" :
                     booking.status === "in_queue" ? "In Queue" :
                     "Slot Booked"} — {booking.centerName}
                  </p>
                  <p className="text-xs text-emerald-600/60">{booking.crop} • {booking.tokenNumber} • {booking.createdAt}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  booking.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                  booking.status === "in_queue" ? "bg-amber-100 text-amber-700" :
                  booking.status === "processing" ? "bg-blue-100 text-blue-700" :
                  "bg-emerald-100 text-emerald-700"
                }`}>
                  {booking.status === "completed" ? "Completed" :
                   booking.status === "in_queue" ? "In Queue" :
                   booking.status === "processing" ? "In Progress" :
                   "Confirmed"}
                </span>
              </div>
            )) : (
              <div className="text-center py-8 text-emerald-600/50">
                <p className="text-sm">No recent activity</p>
                <Button onClick={() => navigate("/dashboard/book")} className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
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
