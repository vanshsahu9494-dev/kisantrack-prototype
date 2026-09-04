import { useDemo } from "@/lib/demo-store";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Hash, Clock, TrendingUp, Activity, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const { centers, getTodayBookings, getCompletedBookings } = useDemo();
  const navigate = useNavigate();
  const todayBookings = getTodayBookings();
  const completed = getCompletedBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">District Dashboard</h1>
        <p className="text-sm text-zinc-500">Haryana — Today's Overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active Mandis", value: centers.filter(c => c.status === "operational").length.toString(), icon: MapPin, accent: "text-emerald-400 bg-emerald-500/10" },
          { label: "Total Farmers", value: "2,845", icon: Users, accent: "text-emerald-400 bg-emerald-500/10" },
          { label: "Total Tokens", value: "4,562", icon: Hash, accent: "text-amber-400 bg-amber-500/10" },
          { label: "Avg. Wait Time", value: "1.6 hrs", icon: Clock, accent: "text-blue-400 bg-blue-500/10" },
        ].map(stat => (
          <Card key={stat.label} className="bg-[#111512] border-white/5">
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg ${stat.accent} flex items-center justify-center mb-2`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold text-white font-mono">{stat.value}</p>
              <p className="text-[10px] text-zinc-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Token Status */}
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-white mb-4">Token Status</h3>
            <div className="space-y-3">
              {[
                { label: "Completed", count: completed.length + 3200, color: "bg-emerald-500", percent: 70 },
                { label: "In Queue", count: 892, color: "bg-amber-500", percent: 20 },
                { label: "Processing", count: 340, color: "bg-blue-500", percent: 7 },
                { label: "Cancelled", count: 130, color: "bg-zinc-600", percent: 3 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">{item.label}</span>
                    <span className="font-medium text-white font-mono">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 text-center pt-4 border-t border-white/5">
              <p className="text-3xl font-bold text-white font-mono">4,562</p>
              <p className="text-[10px] text-zinc-500">Total Tokens Issued</p>
            </div>
          </CardContent>
        </Card>

        {/* Tokens Over Time */}
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-white mb-4">Tokens Over Time</h3>
            <div className="h-40 flex items-end gap-1.5 px-2">
              {[35, 45, 60, 80, 95, 100, 85, 70, 55, 40, 30, 25].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-gradient-to-t from-emerald-700 to-emerald-500 rounded-t hover:from-emerald-600 hover:to-emerald-400 transition-colors"
                    style={{ height: `${h}%` }} />
                  <span className="text-[8px] text-zinc-600 font-mono">{6 + i}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 text-center mt-2">Hourly token issuance (6 AM – 6 PM)</p>
          </CardContent>
        </Card>
      </div>

      {/* Mandi Performance */}
      <Card className="bg-[#111512] border-white/5">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Mandi Performance</h3>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/mandis")} className="border-white/10 text-zinc-400 hover:bg-white/5 text-xs">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 text-[10px] font-semibold text-zinc-600 uppercase">Mandi Name</th>
                  <th className="text-left py-2 text-[10px] font-semibold text-zinc-600 uppercase">Active Tokens</th>
                  <th className="text-left py-2 text-[10px] font-semibold text-zinc-600 uppercase">Completed</th>
                  <th className="text-left py-2 text-[10px] font-semibold text-zinc-600 uppercase">Avg. Wait</th>
                  <th className="text-left py-2 text-[10px] font-semibold text-zinc-600 uppercase">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {centers.map(center => (
                  <tr key={center.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${center.status === "operational" ? "bg-emerald-400" : center.status === "busy" ? "bg-amber-400" : "bg-zinc-600"}`} />
                        <span className="font-medium text-white">{center.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-zinc-300 font-mono">{center.currentQueue}</td>
                    <td className="py-3 text-zinc-300 font-mono">{Math.floor(center.capacity * 1.5)}</td>
                    <td className="py-3 text-zinc-300">{center.avgWaitTime}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 bg-white/5 rounded-full w-20 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(center.currentQueue / center.capacity) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">{Math.round((center.currentQueue / center.capacity) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#111512] border-emerald-500/10">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">AI Insights</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">Peak hours: 8–10 AM. Pre-booking during off-peak slots reduces wait times by up to 40%.</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111512] border-white/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Trend</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">Wheat procurement up 15% this week. Current MSP: ₹2,450/quintal (+3.2% week-on-week).</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111512] border-amber-500/10">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Alert</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">Kurukshetra Mandi at 95% capacity. Consider redirecting overflow to Ambala or Sonipat centres.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
